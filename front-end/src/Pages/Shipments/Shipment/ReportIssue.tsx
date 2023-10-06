import { useNotification } from "@/hooks";
import { CloseCircle } from "iconsax-react";
import { useState } from "react";
import { useCreateIssueMutation } from "@/app/backend/export/shipments";
import useStoreDesk from "@/hooks/useStoreDesk";

export function ReportIssue({ shipmentId, refresh }: { shipmentId: string; refresh: () => void }) {
	const [comment, setComment] = useState("");
	const [action, setAction] = useState<ActionsEnumI>("NOT_HOME");
	const [CreateIssue, { isLoading }] = useCreateIssueMutation();
	const { currentDesk } = useStoreDesk();

	const { Notify, Errofy } = useNotification();
	const actions: Record<ActionsEnumI, string> = {
		CANCELED: "Canceled",
		NOT_HOME: "Not home",
		NO_PHONE_RESPONSE: "No phone response",
		WRONG_ADDRESS: "wrong address",
		OTHER: "Other",
	};
	return (
		<div className="flex flex-col h-full justify-between gap-2">
			<select
				onChange={(e) => {
					setAction(e.target.value as ActionsEnumI);
				}}
				value={action}
				className="select select-bordered w-full"
			>
				{Object.entries(actions).map(([key, value]) => (
					<option key={key} value={key}>
						{value}
					</option>
				))}
			</select>
			<textarea
				className="textarea textarea-bordered"
				placeholder="Put a comment here"
				required
				value={comment}
				onChange={(e) => {
					setComment(e.target.value);
				}}
			></textarea>
			<button
				onClick={() => {
					CreateIssue({ shipmentId, comment, action, currentDesk })
						.unwrap()
						.then((response) => {
							Notify("Reporting issue", response.message);
							refresh();
						})
						.catch((err) => {
							Errofy("Reporting issue", err);
						});
				}}
				className="btn btn-error"
				type="submit"
				disabled={!comment}
			>
				{isLoading ? <span className="loading loading-spinner w-4 h-4"></span> : <CloseCircle className="w-4 h-4" />}
				Report issue
			</button>
		</div>
	);
}
