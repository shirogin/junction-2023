import { Gift, UserTick } from "iconsax-react";
import { useModal } from "@/hooks";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import useStoreDesk from "@/hooks/useStoreDesk";

export default function AssignShipment({ selected, afterAction }: ShipmentButtonActionI) {
	const { openModal } = useModal();
	const { desks, currentDesk } = useStoreDesk();
	const currentDeskD = desks.find((d) => d._id === currentDesk);
	if (selected.length === 0) return null;
	const currentLocation = selected[0].lastTrack.location?._id;
	const isAtDesk = currentLocation === currentDeskD!.information;
	const isFinalDesk = currentLocation === selected[0].shipTo.ref;
	const isStopDesk = selected[0].isStopDesk;
	if (isStopDesk) {
		if (!isAtDesk) return <>is at Desk</>;
		if (isFinalDesk)
			return (
				<button
					className="btn btn-primary btn-sm rounded-lg"
					onClick={async () => {
						await openModal({
							title: "Deliver to customer",
							bodyType: MODAL_BODY_TYPES.DELIVER_TO_CUSTOMER,
							size: "lg",
							extraObject: selected[0],
						});
						if (afterAction) afterAction();
					}}
				>
					<Gift className="w-4 h-4" />
					Deliver to customer
				</button>
			);
	}
	return (
		<button
			className="btn btn-primary btn-sm rounded-lg"
			onClick={async () => {
				await openModal({
					title: "Assign shipment to a delivery man",
					bodyType: MODAL_BODY_TYPES.ASSIGN_DELIVERY,
					size: "lg",
					extraObject: selected,
				});
				if (afterAction) afterAction();
			}}
		>
			<UserTick className="w-4 h-4" />
			Assign
		</button>
	);
}
