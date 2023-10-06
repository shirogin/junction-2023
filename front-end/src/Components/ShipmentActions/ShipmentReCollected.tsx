import { ArrowRotateRight } from "iconsax-react";
import ShipmentAction from "./ShipmentAction";

import useStoreDesk from "@/hooks/useStoreDesk";
import { useReCollectTransitionMutation } from "@/app/backend/export/shipments";
import { useNotification } from "@/hooks";

export default function ShipmentReCollected({ selected, afterAction }: ShipmentButtonActionI) {
	const [ConfirmShipment, { isLoading }] = useReCollectTransitionMutation();
	const { Notify, Errofy } = useNotification();
	const { currentDesk, desks } = useStoreDesk();
	if (selected.length === 0) return null;
	const from = desks.find((desk) => desk.information === selected[0].lastTrack.from._id);
	if (!from || from._id !== currentDesk) return <></>;

	return (
		<ShipmentAction
			selected={selected}
			afterAction={afterAction}
			disabled={isLoading}
			className="btn-secondary"
			Mutation={(shipment) => {
				return ConfirmShipment({ shipmentId: shipment._id, currentDesk })
					.unwrap()
					.then((res) => {
						Notify("Transition returned", res.message);
						return res;
					})
					.catch((err) => {
						Errofy("Transition returned", err, "Error while Transition return");
					});
			}}
		>
			{isLoading ? <span className="loading loading-spinner loading-xs"></span> : <ArrowRotateRight className="w-4 h-4" />}
			Transition returned
		</ShipmentAction>
	);
}
