import { NextFunction, Request, Response } from "express";
import usersModel, { UserD } from "./Users.js";

import { getCookiesSettings, isMobileRequest } from "../functions/index.js";
import { Sign } from "../functions/jwt.js";
import authLogs, { IAuthLogs, authLogger } from "./Users.logs.js";
import { formatString } from "../utils/Strings.js";
import { ErrorResponse, SuccessResponse } from "../utils/Response.js";
import { HttpCodes } from "../config/Errors.js";

export const SignIn = async (req: Request & { user: null | UserD }, res: Response, next: NextFunction) => {
	const { username, password, stay = false } = req.body;

	try {
		const user = await usersModel.findOne({ username });
		if (user) {
			const isPasswordMatch = await user.comparePasswords(password);

			if (isPasswordMatch) {
				if (!user.enabled) {
					const msg = formatString(authLogs.LOGIN_ERROR_DISABLED_ACCOUNT.message, { username });
					authLogger.error(msg);
					return ErrorResponse(res, HttpCodes.Unauthorized.code, msg);
				}
				const token = Sign({ _id: user._id.toString() });

				const resp: ICode<IAuthLogs> = authLogs.LOGIN_SUCCESS;
				const msg = formatString(resp.message, user);
				authLogger.info(msg, { type: resp.type });

				return SuccessResponse(res, HttpCodes.Accepted.code, { ...user.Optimize() }, msg, resp.type);
			}

			const msg = formatString(authLogs.LOGIN_ERROR_INCORRECT_PASSWORD_FOUND.message, { username });
			authLogger.error(msg);
			return ErrorResponse(res, HttpCodes.Unauthorized.code, msg);
		}

		const msg = formatString(authLogs.LOGIN_ERROR_USERNAME_NOT_FOUND.message, {
			username,
		});
		authLogger.error(msg);
		return ErrorResponse(res, HttpCodes.BadRequest.code, msg);
	} catch (err) {
		const msg = formatString(authLogs.LOGIN_ERROR_GENERIC.message, {
			error: (err as Error)?.message || "",
			username,
		});
		authLogger.error(msg, err as Error);
		ErrorResponse(res, HttpCodes.InternalServerError.code, msg, err);
	}
};

export const Logout = async (req: Request & { user: null | UserD }, res: Response) => {
	if (req.headers["user-kind"] === "Admin")
		res.cookie("adminToken", "", {
			sameSite: "none",
			secure: true,
			httpOnly: true,
			expires: new Date(1),
		});
	else
		res.cookie("token", "", {
			sameSite: "none",
			secure: true,
			httpOnly: true,
			expires: new Date(1),
		});
	const msg = formatString(authLogs.LOGOUT_SUCCESS.message, req.user || { username: "", lastName: "", firstName: "" });
	authLogger.info(msg, { type: authLogs.LOGOUT_SUCCESS.type });
	SuccessResponse(res, HttpCodes.OK.code, null, msg);
};

export const GetUser = async (req: Request & { user: UserD }, res: Response, next: NextFunction) => {
	const user = req.user;

	const msg = formatString(authLogs.AUTH_BACK.message, user);
	authLogger.info(msg, { type: authLogs.AUTH_BACK.type });

	return SuccessResponse(res, HttpCodes.Accepted.code, user.Optimize(), msg, authLogs.AUTH_BACK.type);
};
export const updateProfile = async (req: Request & { user: UserD }, res: Response) => {
	const user = req.user;
	const { firstName, lastName, email, phoneNumber } = req.body;
	try {
		if (firstName) user.firstName = firstName;
		if (lastName) user.lastName = lastName;
		if (email) user.email = email;
		if (phoneNumber) user.phoneNumber = phoneNumber;
		await user.save();

		return SuccessResponse(res, HttpCodes.OK.code, user.Optimize(), `Profile updated successfully`);
	} catch (err) {
		// If an error occurred, return an error response
		return ErrorResponse(res, HttpCodes.InternalServerError.code, `Failed to update profile information to client ${user._id}.`, err);
	}
};
