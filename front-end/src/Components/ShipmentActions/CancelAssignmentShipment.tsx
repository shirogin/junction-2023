import { TruckRemove } from "iconsax-react";
import ShipmentAction from "./ShipmentAction";
import useStoreDesk from "@/hooks/useStoreDesk";
import { useNotification } from "@/hooks";
import { useCancelAssignmentMutation } from "@/app/backend/export/deliveryMan";

export default function CancelAssignmentShipment({ selected, afterAction }: ShipmentButtonActionI) {
	const [PreCancelShipment, { isLoading }] = useCancelAssignmentMutation();
	const { currentDesk, desks } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	const currentDeskD = desks.find((d) => d._id === currentDesk);

	if (selected.length === 0 || selected[0].lastTrack.from._id !== currentDeskD?.information) return null;
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
						Notify("Canceling Assignment", res.message);
						return res;
					})
					.catch((err) => {
						Errofy("Canceling Assignment", err, "Error while Canceling shipment");
					});
			}}
		>
			{isLoading ? <span className="loading loading-spinner loading-xs"></span> : <TruckRemove className="w-4 h-4" />}
			Cancel Assignment
		</ShipmentAction>
	);
}
