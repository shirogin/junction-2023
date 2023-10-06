import Loading from "@/Components/Loading";
import { apiUrl } from "@/app/backend";
import { useConfirmMoneyCollectionMutation } from "@/app/backend/export/moneyCollection";
import { useUploadFileMutation } from "@/app/backend/export/tools";
import { useNotification } from "@/hooks";
import { useModalI } from "@/hooks/useModal";
import useStoreDesk from "@/hooks/useStoreDesk";
import { Export, Import, Receipt21 } from "iconsax-react";
import { useState } from "react";
import CollectionShipmentTable from "@/Components/Table/CollectionShipmentTable";

export default function MoneyCollection({ modalData, closeModal }: useModalI<MoneyCollectionI<true>>) {
	const { extraObject: moneyCollection } = modalData;
	const { currentDesk } = useStoreDesk();

	return (
		<div className="flex flex-col w-full gap-4">
			<h1 className="text-lg font-semibold">Collection details</h1>
			<div className="overflow-x-auto border rounded-lg">
				<table className="table w-full">
					<thead>
						<tr>
							<th>DESK SENDER</th>
							<th className="text-center">ADMIN SENDER</th>
							<th className="text-center">DESK RECEIVER</th>
							<th className="text-center">ADMIN RECEIVER</th>
							<th className="text-center">CREATED AT</th>
							<th className="text-center">CONFIRMED AT</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<a href={`/app/desks/${moneyCollection.from.desk._id}`} target="_blank" rel="noreferrer">
									{moneyCollection.from.desk.name}
								</a>
							</td>
							<td className="text-center">
								<a href={`/app/admins/${moneyCollection.from.by._id}`} target="_blank" rel="noreferrer">
									{moneyCollection.from.by.firstName} {moneyCollection.from.by.lastName}
								</a>
							</td>
							<td className="text-center">
								<a href={`/app/desks/${moneyCollection.to.desk._id}`} target="_blank" rel="noreferrer">
									{moneyCollection.to.desk.name}
								</a>
							</td>
							<td className="text-center">
								{moneyCollection.to.by ? (
									<a href={`/app/admins/${moneyCollection.to.by?._id}`} target="_blank" rel="noreferrer">
										{moneyCollection.to.by.firstName} {moneyCollection.to.by.lastName}
									</a>
								) : (
									"-none yet-"
								)}
							</td>
							<td className="text-center">{new Date(moneyCollection.createdAt).toLocaleString()}</td>
							<td className="text-center">
								{moneyCollection.confirmedAt ? new Date(moneyCollection.confirmedAt).toLocaleString() : "Not yet"}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h1 className="text-lg font-semibold">Shipments listed in this collection</h1>
			<CollectionShipmentTable shipments={moneyCollection.shipments} />
			<a
				href={`${apiUrl}/files/uploads${moneyCollection.initContract}`}
				className="btn btn-accent"
				/* download in another tab */
				target="_blank"
				download={`MC-initial-${moneyCollection._id}`}
			>
				<Import className="w-4 h-4" />
				Download initial contract
			</a>
			{moneyCollection.to.desk._id !== currentDesk ? (
				moneyCollection.confirmedAt ? (
					<a
						href={`${apiUrl}/files/uploads${moneyCollection.endContract}`}
						className="btn btn-primary"
						/* download in another tab */
						target="_blank"
						download={`MC-final-${moneyCollection._id}`}
					>
						<Import className="w-4 h-4" />
						Download final contract
					</a>
				) : null
			) : moneyCollection.confirmedAt ? (
				<a
					href={`${apiUrl}/files/uploads${moneyCollection.endContract}`}
					className="btn btn-primary"
					/* download in another tab */
					target="_blank"
					download={`MC-final-${moneyCollection._id}`}
				>
					<Import className="w-4 h-4" />
					Download final contract
				</a>
			) : (
				<ConfirmMoneyAffectation moneyCollection={moneyCollection} closeModal={closeModal} />
			)}
		</div>
	);
}
function ConfirmMoneyAffectation({ moneyCollection, closeModal }: { moneyCollection: MoneyCollectionI<true>; closeModal: () => void }) {
	const { currentDesk } = useStoreDesk();
	const { Errofy, Notify } = useNotification();
	const [Confirm, { isLoading }] = useConfirmMoneyCollectionMutation();
	const [contract, setContract] = useState("");
	const [UploadFile, { isLoading: isUploading }] = useUploadFileMutation();
	/**
	 * //has table of shipments and their total prices ( pricing.delivery + pricing.product )
	 * //can download initContract
	 * //has a table with money collection details
	 * can upload finalContract
	 * if finalContract is uploaded, then allow button to confirm money collection
	 * if money collection is confirmed, then show a success message and close the modal
	 * if money collection is not confirmed, then show an error message
	 * has a button to confirm money collection
	 *
	 */
	return (
		<div className="flex flex-col gap-4">
			<div className={`flex justify-between border px-4 py-2 rounded-lg border-secondary`}>
				<div className="flex-1 flex items-center gap-4">
					{isUploading ? <Loading className="w-4 h-4" /> : <Export className="w-4 h-4" />}
					Upload signed contract:
				</div>
				<input
					type="file"
					name="contract"
					id="contract"
					disabled={isUploading}
					className="file-input file-input-bordered rounded-xl w-full flex-1"
					onChange={(e) => {
						if (e.target.files) {
							const file = e.target.files[0];
							if (!file) return Errofy("File upload", null, "Couldn't upload file");
							const formData = new FormData();
							formData.append("file", file);

							UploadFile({ body: formData, location: "contracts-affectation" })
								.unwrap()
								.then((res) => {
									Notify("File upload", res.message);
									const myFile = res.data;
									setContract(`/${myFile.location ? myFile.location + "/" : ""}${myFile.name}`);
									//setContract(res.data);
								})
								.catch((err) => {
									Errofy("File upload", err);
								});
						}
					}}
				/>
			</div>
			<button
				onClick={() => {
					Confirm({ collectionId: moneyCollection._id, endContract: contract, currentDesk })
						.unwrap()
						.then((res) => {
							Notify("Confirm affectation", res.message);
							closeModal();
						})
						.catch((err) => {
							Errofy("Confirm affectation", err);
						});
				}}
				className="btn btn-primary w-full"
				disabled={!contract || isLoading}
			>
				{isLoading ? <Loading className="w-4 h-4" /> : <Receipt21 className="w-4 h-4" />}
				Confirm affectation
			</button>
		</div>
	);
}
