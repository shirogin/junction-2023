import { BoxTick } from "iconsax-react";
import ShipmentAction from "./ShipmentAction";
import { usePreCancelShipmentMutation } from "@/app/backend/export/shipments";
import useStoreDesk from "@/hooks/useStoreDesk";
import { useNotification } from "@/hooks";

export default function PreCancelShipment({ selected, afterAction }: ShipmentButtonActionI) {
	const [PreCancelShipment, { isLoading }] = usePreCancelShipmentMutation();
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	if (!selected.length) return null;
	return (
		<ShipmentAction
			selected={selected}
			afterAction={afterAction}
			disabled={isLoading}
			className="btn-error"
			Mutation={(shipment) => {
				return PreCancelShipment({ shipmentId: shipment._id, currentDesk })
					.unwrap()
					.then((res) => {
						Notify("Canceling shipment", res.message);
						return res;
					})
					.catch((err) => {
						Errofy("Canceling shipment", err, "Error while Canceling shipment");
					});
			}}
		>
			{isLoading ? <span className="loading loading-spinner loading-xs"></span> : <BoxTick className="w-4 h-4" />}
			Cancel Shipment
		</ShipmentAction>
	);
}
