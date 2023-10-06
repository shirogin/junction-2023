import { Printer } from "iconsax-react";
//import { useNotification } from "@/hooks";

export default function PrintShipmentLabel({ selected }: ShipmentButtonActionI) {
	//const { Notify, Errofy } = useNotification();
	if (selected.length === 0) return null;
	return (
		<button
			className={`btn rounded-lg btn-outline btn-primary btn-sm`}
			onClick={() => {
				// open a popup window at /shipments/label/
				const printWindow = window.open(`/shipments/label/`, undefined, "height=1100,width=794");
				if (printWindow) {
					// add list of _id to the window data
					printWindow.Label_IDS = selected.map((shipment) => shipment._id);
					printWindow.Label_TRACK_IDS = selected.map((shipment) => shipment.trackingNumber);
					printWindow.onafterprint = () => {
						printWindow.close();
					};
				}
			}}
		>
			<Printer className="w-4 h-4" />
			Print label
		</button>
	);
}
