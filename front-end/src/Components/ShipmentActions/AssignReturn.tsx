import { BoxRemove, UserTick } from "iconsax-react";
import { useModal } from "@/hooks";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import useStoreDesk from "@/hooks/useStoreDesk";

export default function AssignReturn({ selected, afterAction }: ShipmentButtonActionI<ShipmentI>) {
	const { openModal } = useModal();
	const { desks, currentDesk } = useStoreDesk();
	const currentDeskD = desks.find((d) => d._id === currentDesk);
	if (!selected) return null;
	const currentLocation = selected.lastTrack.location?._id;
	const isAtDesk = currentLocation === currentDeskD!.information;
	const isFinalDesk = currentLocation === (selected.deliverTo.information as unknown as string);
	const isStopDesk = selected.isStopDesk;
	if (isStopDesk) {
		if (!isAtDesk) return <></>;
	}
	if (isFinalDesk)
		return (
			<button
				className="btn btn-error btn-sm rounded-lg"
				onClick={async () => {
					await openModal({
						title: "Return to customer",
						bodyType: MODAL_BODY_TYPES.RETURN_SHIPMENT,
						size: "lg",
						extraObject: selected,
					});
					if (afterAction) afterAction();
				}}
			>
				<BoxRemove className="w-4 h-4" />
				Return to customer
			</button>
		);
	return (
		<button
			className="btn btn-secondary btn-sm rounded-lg"
			onClick={async () => {
				await openModal({
					title: "Assign return shipment to a delivery man",
					bodyType: MODAL_BODY_TYPES.ASSIGN_RETURN_DELIVERY,
					size: "lg",
					extraObject: selected,
				});
				if (afterAction) afterAction();
			}}
		>
			<UserTick className="w-4 h-4" />
			Assign return
		</button>
	);
}
