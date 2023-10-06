import { useNotification } from "@/hooks";
import { CloseCircle, RefreshCircle } from "iconsax-react";
import { useState } from "react";
import { useResolveIssueWithCancelMutation, useResolveIssueWithTryAgainMutation } from "@/app/backend/export/shipments";

export default function IssueManager({ issueId, refresh }: { issueId: string; refresh: () => void }) {
	const [comment, setComment] = useState("");
	const { Notify, Errofy } = useNotification();
	const [Cancel, { isLoading: isCanceling }] = useResolveIssueWithCancelMutation();
	const [TryAgain, { isLoading: isTryingAgain }] = useResolveIssueWithTryAgainMutation();
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}}
			className="flex flex-col w-[60%] border rounded-xl p-4 gap-2"
		>
			<button
				className="btn btn-info"
				type="submit"
				disabled={!comment || isCanceling}
				onClick={() => {
					// todo: send issue resolution TO_TRY_AGAIN
					TryAgain({ comment, issueId })
						.unwrap()
						.then((response) => {
							Notify("Resolving issue", response.message);
							refresh();
						})
						.catch((err) => {
							Errofy("Resolving issue", err);
						});
				}}
			>
				{isCanceling ? <span className="loading loading-spinner w-4 h-4"></span> : <RefreshCircle className="w-4 h-4" />}
				Try again another time
			</button>
			<button
				className="btn btn-error"
				type="submit"
				disabled={!comment || isTryingAgain}
				onClick={() => {
					// todo: send issue resolution TO_CANCEL
					Cancel({ comment, issueId })
						.unwrap()
						.then((response) => {
							Notify("Resolving issue", response.message);
							refresh();
						})
						.catch((err) => {
							Errofy("Resolving issue", err);
						});
				}}
			>
				{isTryingAgain ? <span className="loading loading-spinner w-4 h-4"></span> : <CloseCircle className="w-4 h-4" />}
				Cancel shipment
			</button>

			<textarea
				className="textarea textarea-bordered"
				placeholder="Put a comment here"
				required
				onChange={(e) => {
					setComment(e.target.value);
				}}
				value={comment}
			></textarea>
		</form>
	);
}
