import Loading from "@/Components/Loading";
import Error500 from "@/Pages/Errors/Error500";
import { useCreateMoneyCollectionMutation } from "@/app/backend/export/moneyCollection";
import { useUploadFileMutation } from "@/app/backend/export/tools";
import { useNotification } from "@/hooks";
import useDesks from "@/hooks/useDesks";
import { useModalI } from "@/hooks/useModal";
import useProvinces from "@/hooks/useProvinces";
import useStoreDesk from "@/hooks/useStoreDesk";
import DZD from "@/utils/Currency";
import { Export, Printer, ReceiptAdd } from "iconsax-react";
import { useEffect, useState } from "react";
import CollectionShipmentTable from "@/Components/Table/CollectionShipmentTable";

export default function CreateMoneyReceipt({ modalData, closeModal }: useModalI<ShipmentI[]>) {
	const { extraObject: shipments } = modalData;
	const [CreateMoneyCollection, { isLoading }] = useCreateMoneyCollectionMutation();
	const [UploadFile, { isLoading: isUploading }] = useUploadFileMutation();
	const { Errofy, Notify } = useNotification();
	const { currentDesk } = useStoreDesk();
	const [contract, setContract] = useState("");
	const [toDesk, setToDesk] = useState(shipments[0].deliverTo.information as unknown as string);
	//console.log(toDesk, shipments[0].deliverTo.information, currentDesk);
	const [province, setProvince] = useState(16);
	const provinces = useProvinces();

	const { desks, isLoading: isLoadingDesks } = useDesks({ province });
	useEffect(() => {
		if (shipments.length === 0) {
			Errofy("Create money receipt", "You have to provide a shipment ID");
			closeModal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipments]);
	if (shipments.length === 0) return <Error500 backTo="" />;
	// shipments has same deliverTo._id
	const hasSame = shipments.every((s) => s.deliverTo._id === shipments[0].deliverTo._id);
	if (!hasSame)
		return (
			<div className="w-full">
				<h1 className="text-center">You can't create a collection for shipments that have different desks</h1>
			</div>
		);
	// shipments has same deliverTo._id
	if ((shipments[0].deliverTo.information as unknown as string) === currentDesk)
		return (
			<div className="w-full">
				<h1 className="text-center">You can't create a collection for your own desk</h1>
			</div>
		);
	const total = shipments.reduce((acc, cur) => acc + cur.pricing.delivery + cur.pricing.product, 0);
	return (
		<div className=" flex flex-col mb-4 gap-4 px-2">
			<div className="flex flex-col gap-2">
				<div className="form-control w-full">
					<label className="label" htmlFor="province">
						Province
					</label>
					<select
						name="province"
						id="province"
						className="select select-bordered w-full"
						value={province}
						onChange={(e) => setProvince(parseInt(e.target.value))}
					>
						{provinces.map((p) => (
							<option key={p.id} value={p.id}>
								{p.id} - {p.name["EN"]}
							</option>
						))}
					</select>
				</div>
				{isLoadingDesks ? (
					<Loading className="w-4 h-4" />
				) : (
					<div className="form-control w-full">
						<label className="label" htmlFor="desk">
							To desk
						</label>
						<select
							name="desk"
							id="desk"
							className="select select-bordered w-full"
							value={toDesk}
							disabled={!!toDesk}
							onChange={(e) => {
								setToDesk(e.target.value);
							}}
						>
							<option value={""}>-Select a desk-</option>
							{desks.map((d) => (
								<option key={d._id} value={d._id}>
									{d.Name}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
			<CollectionShipmentTable shipments={shipments} />
			<div className="flex flex-col border px-4 py-2 rounded-lg border-secondary">
				<div className="flex justify-between ">
					<p>Total amount to send :</p>
					<p>{DZD["EN"].format(total)}</p>
				</div>
				<div className="flex justify-between ">
					<p>Shipments money to be sent :</p>
					<p>{shipments.length}</p>
				</div>
			</div>
			<div className="flex gap-2">
				<button
					className={`btn rounded-xl btn-accent flex-1`}
					onClick={() => {
						const printWindow = window.open(`/contracts/collection`, undefined, "height=1100,width=794");
						if (printWindow) {
							printWindow.shipmentsContract = shipments;
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
				className="btn btn-secondary"
				disabled={isLoading || !contract || !toDesk}
				onClick={() => {
					if (contract)
						CreateMoneyCollection({
							shipments: shipments.map((s) => s._id),
							initContract: contract,
							from: currentDesk,
							to: toDesk,
							total: total,
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
						creating
					</>
				) : (
					<>
						<ReceiptAdd className="w-4 h-4" />
						Create Collection
					</>
				)}
			</button>
		</div>
	);
}
