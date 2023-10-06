import { ArrowForward } from "iconsax-react";

import { useModal } from "@/hooks";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";

export default function ReturnShipment({ selected, afterAction }: ShipmentButtonActionI) {
	const { openModal } = useModal();
	if (selected.length === 0) return null;
	return (
		<button
			className={`btn rounded-lg btn-outline btn-error btn-sm`}
			onClick={async () => {
				await openModal({
					title: "Return shipment to owner",
					bodyType: MODAL_BODY_TYPES.RETURN_SHIPMENT,
					extraObject: selected,
				});
				if (afterAction) afterAction();
			}}
		>
			<ArrowForward className="w-4 h-4" />
			Return package to owner
		</button>
	);
}
