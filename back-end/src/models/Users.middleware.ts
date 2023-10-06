import { NextFunction, Request, Response } from "express";

import { ErrorResponse } from "../utils/Response.js";
import { HttpCodes } from "../config/Errors.js";
import authLogs from "./Users.logs.js";
import { Verify } from "../functions/jwt.js";
import usersModel from "./Users.js";
import { UserD } from "./Users.js";
export function clearToken(tokenName: string, res: Response) {
	res.cookie(tokenName, "", {
		sameSite: "none",
		secure: true,
		httpOnly: true,
		expires: new Date(1),
	});
}
function extractAuth(req: Request) {
	//console.log({ userAgent: req.headers["user-agent"], isMobileApp, authHeader: req.headers["authorization"] });
	return req.cookies.token;
}

export const checkLogs = async (req: Request & { user: null | UserD }, res: Response, next: NextFunction) => {
	const token = extractAuth(req);

	// TODO : ADD The access to the device ID
	// const deviceId = req.headers["X-Device-ID"];
	// console.log("Device ID:", deviceId);
	req.user = null;
	if (token) {
		try {
			const payload = Verify(token);
			if (!payload || !payload._id || !payload.kind)
				return ErrorResponse(
					res,
					HttpCodes.Unauthorized.code,
					authLogs.ERROR_WHILE_CHECKING_CREDENTIALS.message,
					authLogs.ERROR_WHILE_CHECKING_CREDENTIALS
				);
			const { _id, kind } = payload;

			const user = await usersModel.findOne({ _id, kind }).select({ password: 0 });
			if (!user) {
				// TODO : Log details for security
				return ErrorResponse(
					res,
					HttpCodes.Unauthorized.code,
					authLogs.ERROR_WHILE_CHECKING_CREDENTIALS.message,
					authLogs.ERROR_WHILE_CHECKING_CREDENTIALS
				);
			}
			req.user = user;
		} catch (e) {
			if (req.headers["user-kind"] === "Admin") clearToken("adminToken", res);
			else clearToken("token", res);

			return ErrorResponse(res, HttpCodes.InternalServerError.code, authLogs.ERROR_WHILE_CHECKING_CREDENTIALS.message, e);
		}
	}

	return next();
};

export const isLoggedIn = (req: Request & { user: null | UserD }, res: Response, next: NextFunction) => {
	if (req.user) {
		if (req.user.enabled) return next();
		return ErrorResponse(res, HttpCodes.Unauthorized.code, authLogs.USER_ISN_T_ENABLED.message, authLogs.USER_ISN_T_ENABLED);
	}
	ErrorResponse(res, HttpCodes.Unauthorized.code, authLogs.USER_ISN_T_LOGGED.message, authLogs.USER_ISN_T_LOGGED);
};
