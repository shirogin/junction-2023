import { Wallet1 } from "iconsax-react";
import { useModal } from "@/hooks";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import useStoreDesk from "@/hooks/useStoreDesk";

export default function CollectMoney({ selected, afterAction }: ShipmentButtonActionI<ShipmentI[]>) {
	const { openModal } = useModal();
	const { currentDesk, desks } = useStoreDesk();

	if (selected.length === 0) return null;
	const currentDeskD = desks.find((d) => d._id === currentDesk);
	if (!currentDeskD) return null;
	const cameFromSameDesk = selected.every((s) => s.lastTrack.from._id === currentDeskD.information);
	if (!cameFromSameDesk) return null;
	console.log({ selected, currentDesk, cameFromSameDesk, desks });
	return (
		<button
			className="btn btn-info btn-sm rounded-lg"
			onClick={async () => {
				await openModal({
					title: "Confirm money collection",
					bodyType: MODAL_BODY_TYPES.CONFIRM_COLLECT_MONEY,
					size: "lg",
					extraObject: selected,
				});
				if (afterAction) afterAction();
			}}
		>
			<Wallet1 className="w-4 h-4" />
			Confirm money collection
		</button>
	);
}
