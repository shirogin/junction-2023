import { Document, Model, Types } from "mongoose";
import { Schema, model } from "mongoose";
const required = true;
export interface MessageI {
	user: Types.ObjectId;
	chat: {
		content: string;
		role: string;
	};
}
export interface MessageD extends MessageI, Document<MessageI> {}
export interface MessageM extends Model<MessageD> {}
const messageSchema = new Schema<MessageI, MessageM>(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required },
		chat: {
			content: { type: String, required },
			role: { type: String, required },
		},
	},
	{ timestamps: true }
);
const messageModel = model<MessageI, MessageM>("Message", messageSchema);
export default messageModel;
