import { BoxTick } from "iconsax-react";
import ShipmentAction from "./ShipmentAction";

import useStoreDesk from "@/hooks/useStoreDesk";
import { useTransitionArrivedMutation } from "@/app/backend/export/shipments";
import { useNotification } from "@/hooks";

export default function ShipmentArrived({ selected, afterAction }: ShipmentButtonActionI) {
	const [ConfirmShipment, { isLoading }] = useTransitionArrivedMutation();
	const { Notify, Errofy } = useNotification();
	const { currentDesk, desks } = useStoreDesk();
	if (selected.length === 0) return null;
	const toList = selected.map((s) => s.lastTrack.to._id);
	const to = toList.map((deskInfo) => desks.find((desk) => desk.information === deskInfo)).filter((desk) => !!desk);
	if (!to || !to.every((desk) => desk?._id === currentDesk)) return null;
	return (
		<ShipmentAction
			selected={selected}
			afterAction={afterAction}
			disabled={isLoading}
			Mutation={(shipment) => {
				return ConfirmShipment({ shipmentId: shipment._id, currentDesk })
					.unwrap()
					.then((res) => {
						Notify("Confirming Transition arrival", res.message);
						return res;
					})
					.catch((err) => {
						Errofy("Confirming Transition arrival", err, "Error while confirming transition arrival");
					});
			}}
		>
			{isLoading ? <span className="loading loading-spinner loading-xs"></span> : <BoxTick className="w-4 h-4" />}
			Transition Arrived
		</ShipmentAction>
	);
}
