import { useModalI } from "@/hooks/useModal";
import CreateDeliveryMan from "./CreateDeliveryMan";
import UpdateDeliveryMan from "./UpdateDeliveryMan";
function isDelivery(delivery: DeliveryManI | object): delivery is DeliveryManI {
	return "_id" in delivery && !!delivery._id;
}
export default function DeliveryManModal({ modalData, closeModal }: useModalI<DeliveryManI | object>) {
	const { extraObject } = modalData;
	const delivery = isDelivery(extraObject) ? extraObject : null;
	return (
		<div className="flex flex-col max-w-xl mx-auto overflow-y-auto max-h-[80vh] h-full">
			<div className="flex flex-col h-full px-2">
				{delivery ? <UpdateDeliveryMan delivery={delivery} /> : <CreateDeliveryMan closeModal={() => closeModal()} />}
			</div>
		</div>
	);
}
