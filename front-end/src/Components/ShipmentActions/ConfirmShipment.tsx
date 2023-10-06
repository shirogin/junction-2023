import { BoxTick } from "iconsax-react";
import ShipmentAction from "./ShipmentAction";

import useStoreDesk from "@/hooks/useStoreDesk";
import { useConfirmShipmentMutation } from "@/app/backend/export/shipments";
import { useNotification } from "@/hooks";

export default function ConfirmShipment({ selected, afterAction }: ShipmentButtonActionI) {
	const [ConfirmShipment, { isLoading }] = useConfirmShipmentMutation();
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	if (!selected.length) return null;
	return (
		<ShipmentAction
			selected={selected}
			afterAction={afterAction}
			disabled={isLoading}
			Mutation={(shipment) => {
				return ConfirmShipment({ shipmentId: shipment._id, currentDesk })
					.unwrap()
					.then((res) => {
						Notify("Confirming shipment", res.message);
						return res;
					})
					.catch((err) => {
						Errofy("Confirming shipment", err, "Error while confirming shipment");
					});
			}}
		>
			{isLoading ? <span className="loading loading-spinner loading-xs"></span> : <BoxTick className="w-4 h-4" />}
			Confirm Shipment
		</ShipmentAction>
	);
}
