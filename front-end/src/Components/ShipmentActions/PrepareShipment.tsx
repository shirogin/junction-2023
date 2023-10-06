import { BoxTick } from "iconsax-react";
import ShipmentAction from "./ShipmentAction";
import { usePrepareShipmentMutation } from "@/app/backend/export/shipments";
import useStoreDesk from "@/hooks/useStoreDesk";
import { useNotification } from "@/hooks";

export default function PrepareShipment({ selected, afterAction }: ShipmentButtonActionI) {
	const [PrepareShipment, { isLoading }] = usePrepareShipmentMutation();
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	if (selected.length === 0) return null;
	return (
		<ShipmentAction
			selected={selected}
			afterAction={afterAction}
			disabled={isLoading}
			Mutation={(shipment) => {
				return PrepareShipment({ shipmentId: shipment._id, currentDesk })
					.unwrap()
					.then((res) => {
						Notify("Preparing shipment", res.message);
						return res;
					})
					.catch((err) => {
						Errofy("Preparing shipment", err, "Error while preparing shipment");
					});
			}}
		>
			{isLoading ? <span className="loading loading-spinner loading-xs"></span> : <BoxTick className="w-4 h-4" />}
			Prepare Shipment
		</ShipmentAction>
	);
}
