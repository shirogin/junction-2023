import { Schema, model } from "mongoose";
const required = true;
const resetSchema = new Schema<ResetI>(
	{
		email: { type: String, required },
		user: { type: Schema.Types.ObjectId, ref: "User", required },
	},
	{ timestamps: true }
);
// resetSchema add expire index to createdAt after 15min
resetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
const resetModel = model("Reset", resetSchema);
export default resetModel;
