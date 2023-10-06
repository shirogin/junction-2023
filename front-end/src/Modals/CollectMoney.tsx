import { useConfirmMoneyCollectedMutation } from "@/app/backend/export/shipments";
import { useNotification } from "@/hooks";
import { useModalI } from "@/hooks/useModal";
import useStoreDesk from "@/hooks/useStoreDesk";
import { Wallet1, Warning2 } from "iconsax-react";

function CollectMoney({ modalData, closeModal }: useModalI<ShipmentI[]>) {
	const { extraObject: shipments } = modalData;
	const { currentDesk } = useStoreDesk();
	const { Errofy, Notify } = useNotification();

	const [ConfirmMoneyCollection, { isLoading, isError }] = useConfirmMoneyCollectedMutation();

	return (
		<div className="flex flex-col w-full">
			<p>
				Are you sure you want to deliver this shipment to the customer? <br />
				You will not be able to undo this action.
			</p>
			<div className="flex gap-4 w-full">
				<button
					className="btn btn-primary w-full mt-4"
					onClick={async () => {
						await Promise.all(
							shipments.map((shipment) => {
								return ConfirmMoneyCollection({ shipmentId: shipment._id, currentDesk, contract: "" })
									.unwrap()
									.then((res) => {
										Notify("Deliver to customer", res.message);
										return res.data;
									})
									.catch((err) => {
										Errofy("Deliver to customer", err, "Error while delivering to customer");
									});
							})
						).then((res) => {
							console.log(res);
							closeModal();
						});
					}}
				>
					{isLoading ? (
						<span className="loading loading-spinner loading-xs"></span>
					) : isError ? (
						<Warning2 className="w-4 h-4" />
					) : (
						<Wallet1 className="w-4 h-4" />
					)}
					Confirm Money Collection
				</button>
			</div>
		</div>
	);
}

export default CollectMoney;
