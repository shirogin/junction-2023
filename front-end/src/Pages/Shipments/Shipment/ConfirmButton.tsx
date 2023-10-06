import { useNotification } from "@/hooks";
import { BoxTick } from "iconsax-react";
import { useConfirmShipmentMutation } from "@/app/backend/export/shipments";
import useStoreDesk from "@/hooks/useStoreDesk";

export function ConfirmButton({ Refresh, row }: { Refresh: () => void; row: ShipmentI }) {
	const [ConfirmShipment, { isLoading: isConfirming }] = useConfirmShipmentMutation();
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	return (
		<button
			onClick={() => {
				ConfirmShipment({ shipmentId: row._id as string, currentDesk })
					.unwrap()
					.then((res) => {
						Refresh();
						Notify("Confirming shipment", res.message);
					})
					.catch((err) => {
						Errofy("Confirming shipment", err, "Error while confirming shipment");
					});
			}}
			className="btn btn-secondary btn-sm ml-auto"
		>
			{isConfirming ? <span className="loading loading-spinner loading-xs"></span> : <BoxTick className="w-4 h-4" />}
			Confirm package collection
		</button>
	);
}
