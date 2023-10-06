import Error500 from "@/Pages/Errors/Error500";
import { useConfirmDeliveryMutation } from "@/app/backend/export/shipments";
import { useNotification } from "@/hooks";
import { useModalI } from "@/hooks/useModal";
import useStoreDesk from "@/hooks/useStoreDesk";
import { TruckTick, Warning2 } from "iconsax-react";
import { useEffect } from "react";

export default function DeliverToCustomer({ modalData, closeModal }: useModalI<ShipmentI>) {
	const { extraObject: shipment } = modalData;
	const { currentDesk } = useStoreDesk();
	const { Errofy, Notify } = useNotification();

	const [ConfirmDelivery, { isLoading, isError }] = useConfirmDeliveryMutation();
	useEffect(() => {
		if (!shipment._id) {
			Errofy("Add Address", "You have to provide a shipment");
			closeModal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shipment]);
	if (!shipment._id) return <Error500 backTo="" />;
	return (
		<div className="flex flex-col w-full">
			<p>
				Are you sure you want to deliver this shipment to the customer? <br />
				You will not be able to undo this action.
			</p>
			<div className="flex gap-4 w-full">
				<button
					className="btn btn-primary w-full mt-4"
					onClick={() => {
						ConfirmDelivery({ shipmentId: shipment._id, currentDesk })
							.unwrap()
							.then((res) => {
								Notify("Deliver to customer", res.message);
								closeModal();
							})
							.catch((err) => {
								Errofy("Deliver to customer", err, "Error while delivering to customer");
							});
					}}
				>
					{isLoading ? (
						<span className="loading loading-spinner loading-xs"></span>
					) : isError ? (
						<Warning2 className="w-4 h-4" />
					) : (
						<TruckTick className="w-4 h-4" />
					)}
					Confirm delivery
				</button>
			</div>
		</div>
	);
}
