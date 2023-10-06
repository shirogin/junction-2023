import { ReceiptAdd } from "iconsax-react";

import { useModal } from "@/hooks";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";

export default function CreateMoneyReceipt({ selected, afterAction }: ShipmentButtonActionI) {
	const { openModal } = useModal();
	const shipments = selected.filter((shipment) => !shipment.alreadyInCollection);

	if (shipments.length === 0) return null;
	return (
		<button
			className={`btn rounded-lg btn-info btn-sm`}
			onClick={async () => {
				await openModal({
					title: "Create Money receipt",
					bodyType: MODAL_BODY_TYPES.CREATE_MONEY_RECEIPT,
					extraObject: shipments,
					size: "lg",
				});
				if (afterAction) afterAction();
			}}
		>
			<ReceiptAdd className="w-4 h-4" />
			Create Money Receipt
		</button>
	);
}
