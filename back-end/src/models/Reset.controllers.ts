import resetModel from "./Reset.js";
import { SendEmail } from "../utils/Email.js";
import { ResetEmail } from "../config/Templates.js";
import { EmailContact, FRONT_URL, MediaURL, PROJECT_Name } from "../config/Env.js";
import usersModel, { UserD } from "./Users.js";
import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response.js";
import { HttpCodes } from "../config/Errors.js";
import { formatString } from "../utils/Strings.js";
import authLogs, { authLogger } from "./Users.logs.js";
// CreateReset sends email to user with a link to reset password
export const CreateReset = async (req: Request & { user: null | UserD }, res: Response) => {
	const { email } = req.body;
	try {
		const user = await usersModel.findOne({ $or: [{ email }, { username: email }] });
		if (!user) return ErrorResponse(res, HttpCodes.BadRequest.code, "No user found with this email");
		const reset = await resetModel.create({ email: user.email, user: user._id });
		SendEmail({
			to: user.email,
			subject: `${PROJECT_Name} Reset email`,
			html: formatString(ResetEmail || "{reset_url}", {
				reset_url: `${FRONT_URL}/reset/${reset._id}`,
				firstName: user.firstName,
				lastName: user.lastName,
				PROJECT_Name,
				MediaURL: MediaURL,
				contact_email: EmailContact,
			}),
		})
			.then(() => {
				authLogger.info("Email sent successfully", { type: authLogs.RESET_SUCCESS.type });
			})
			.catch((err) => {
				authLogger.error("Error while sending email", err);
			});
		const msg = formatString(authLogs.RESET_SUCCESS.message, { email });
		authLogger.info(msg, { type: authLogs.RESET_SUCCESS.type });
		SuccessResponse(res, HttpCodes.OK.code, null, msg);
	} catch (err) {
		const msg = formatString(authLogs.RESET_ERROR_GENERIC.message, { error: (err as Error)?.message || "", email });
		authLogger.error(msg, err as Error);
		ErrorResponse(res, HttpCodes.InternalServerError.code, msg, err);
	}
};

// check if reset exist
export const CheckRest = async (req: Request & { user: null | UserD }, res: Response) => {
	const { resetId } = req.params;
	try {
		const reset = await resetModel.findById(resetId);
		if (!reset)
			return ErrorResponse(
				res,
				HttpCodes.BadRequest.code,
				"No reset found with this link, it probably expired try to generate a new one."
			);
		SuccessResponse(res, HttpCodes.OK.code, null, "Reset found");
	} catch (err) {
		const msg = formatString(authLogs.RESET_ERROR_GENERIC.message, { error: (err as Error)?.message || "", resetId });
		authLogger.error(msg, err as Error);
		ErrorResponse(res, HttpCodes.InternalServerError.code, msg, err);
	}
};
// ResetPassword reset user password
export const ResetPassword = async (req: Request & { user: null | UserD }, res: Response) => {
	const { resetId } = req.params;
	const { password } = req.body;
	try {
		const reset = await resetModel.findById(resetId);
		if (!reset) return ErrorResponse(res, HttpCodes.BadRequest.code, "No reset found with this id");
		const user = await usersModel.findById(reset.user);
		if (!user) return ErrorResponse(res, HttpCodes.BadRequest.code, "No user found with this id");
		user.password = password;
		await user.save();
		await reset.deleteOne();
		// log password change
		const msg = formatString(authLogs.RESET_PASSWORD_SUCCESS.message, { user: user._id });
		authLogger.info(msg, { type: authLogs.RESET_PASSWORD_SUCCESS.type });
		SuccessResponse(res, HttpCodes.OK.code, null, "Password changed successfully");
	} catch (err) {
		const msg = formatString(authLogs.RESET_ERROR_GENERIC.message, { error: (err as Error)?.message || "", resetId });
		authLogger.error(msg, err as Error);
		ErrorResponse(res, HttpCodes.InternalServerError.code, msg, err);
	}
};
