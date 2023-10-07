import { Request, Response } from "express";
import { ErrorResponse, SuccessResponse } from "../utils/Response";
import { HttpCodes } from "../config/Errors";
import messageModel, { MessageD } from "./Message";

import OpenAI from "openai";

import { MyRequest } from "../types/Express";
import { ChatCompletionMessage } from "openai/resources/chat";
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// get notifications for client or DeliveryMan
export const Chat = async (req: MyRequest, res: Response) => {
	try {
		if (!openai.apiKey) {
			return ErrorResponse(res, HttpCodes.InternalServerError.code, "OpenAI API Key not configured");
		}

		if (!req.body.message) {
			return ErrorResponse(res, HttpCodes.InternalServerError.code, "No messages have been intered");
		}
		const message = req.body.message;
		await messageModel.create({ user: req.user?._id, chat: { role: "user", content: message } });
		const messages = await messageModel.find({ user: req.user?._id }).lean();
		let mRequests: ChatCompletionMessage[] = messages.map((message) => message.chat);
		mRequests = [
			{
				role: "user",
				content:
					"Engineer a GPT model that specializes in providing comprehensive and user-friendly financial literacy advice to individuals. The model should be capable of answering questions and offering guidance on various financial topics, including but not limited to budgeting, saving, investing, retirement planning, managing debt, and understanding financial instruments. The advice should be clear, actionable, and tailored to the user's specific situation whenever possible. The model should also prioritize ethical and responsible financial practices, promoting financial well-being and long-term stability for its users. Please describe how you would train and fine-tune this model, as well as any data sources or guidelines you would use to ensure the accuracy and reliability of the financial advice provided.",
			},
			...mRequests,
		];

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: mRequests,
		});

		await messageModel.create({ user: req.user?._id, chat: response.choices[0].message });
		return SuccessResponse(res, HttpCodes.Accepted.code, response.choices[0].message, "Succeful chatgpt response");
	} catch (error) {
		return ErrorResponse(res, HttpCodes.InternalServerError.code, "Failed to fetch notifications.", error);
	}
};

// get all messages for user
export const getAllMessages = async (req: MyRequest, res: Response) => {
	try {
		console.log(" get all messages", req.user?._id);
		const messages = await messageModel.find({ user: req.user?._id }).lean();
		return SuccessResponse(res, HttpCodes.Accepted.code, messages, "Successful get all messages");
	} catch (error) {
		return ErrorResponse(res, HttpCodes.InternalServerError.code, "Failed to fetch notifications.", error);
	}
};
