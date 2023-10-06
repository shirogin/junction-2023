import Loading from "@/Components/Loading";
import Error500 from "@/Pages/Errors/Error500";
import { useConfirmReturnMutation } from "@/app/backend/export/shipments";
import { useUploadFileMutation } from "@/app/backend/export/tools";
import { useNotification } from "@/hooks";
import { useModalI } from "@/hooks/useModal";
import useStoreDesk from "@/hooks/useStoreDesk";
import DZD from "@/utils/Currency";
import { Export, Printer, TruckRemove } from "iconsax-react";
import { useEffect, useState } from "react";

export default function ReturnShipment({ modalData, closeModal }: useModalI<ShipmentI>) {
	const { extraObject: shipment } = modalData;
	const [ConfirmReturn, { isLoading }] = useConfirmReturnMutation();
	const [UploadFile, { isLoading: isUploading }] = useUploadFileMutation();
	const { Errofy, Notify } = useNotification();
	const { currentDesk } = useStoreDesk();
	const [contract, setContract] = useState("");
	useEffect(() => {
		if (!shipment._id) {
			Errofy("Return shipment", "You have to provide a shipment ID");
			closeModal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipment]);
	if (!shipment._id) return <Error500 backTo="" />;
	return (
		<div className=" flex flex-col mb-4 gap-4">
			<div className="flex justify-between border px-4 py-2 rounded-lg border-secondary">
				<p>Amount to be paid for canceling :</p>
				<p>{DZD["EN"].format(shipment.pricing.delivery)}</p>
			</div>
			{contract}
			{/* download template file */}
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

							UploadFile({ body: formData, location: "contracts-return" })
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
			<div className="flex gap-2">
				<button
					className={`btn rounded-xl btn-accent flex-1`}
					onClick={() => {
						const printWindow = window.open(`/contracts/return`, undefined, "height=1100,width=794");
						if (printWindow) {
							printWindow.shipmentContract = shipment;
							printWindow.onafterprint = () => {
								printWindow.close();
							};
						}
					}}
				>
					<Printer className="w-4 h-4" />
					Print template file
				</button>
			</div>
			<button
				className="btn btn-secondary"
				disabled={isLoading || !contract}
				onClick={() => {
					if (contract)
						ConfirmReturn({
							amountToSub: shipment.pricing.delivery,
							shipmentId: shipment._id,
							contract,
							currentDesk,
						})
							.unwrap()
							.then((res) => {
								Notify("Return shipment", res.message);
								closeModal();
							})
							.catch((err) => {
								Errofy("Return shipment", err);
							});
				}}
			>
				{isLoading ? (
					<>
						<Loading className="w-4 h-4" />
						returning
					</>
				) : (
					<>
						<TruckRemove className="w-4 h-4" />
						Confirm return
					</>
				)}
			</button>
		</div>
	);
}
