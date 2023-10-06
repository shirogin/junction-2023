import { Edit } from "iconsax-react";
import ShipmentAction from "./ShipmentAction";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import { useModal } from "@/hooks";

export default function EditShipmentWeight({ selected, afterAction }: ShipmentButtonActionI) {
	const { openModal } = useModal();
	if (selected.length !== 1) return null;
	return (
		<ShipmentAction
			selected={selected}
			afterAction={afterAction}
			Mutation={(shipment) => {
				return openModal({
					title: "Edit Shipment weight",
					bodyType: MODAL_BODY_TYPES.EDIT_SHIPMENT_WEIGHT,
					extraObject: shipment,
				});
			}}
		>
			<Edit className="w-4 h-4" />
			Edit Shipment weight
		</ShipmentAction>
	);
}
