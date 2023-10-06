import Error500 from "@/Pages/Errors/Error500";
import { useModalI } from "@/hooks/useModal";
import NewDelivery from "./NewDelivery";

export default function NewShipment({ modalData }: useModalI<{ product: ProductI; client: ClientI }>) {
	const { extraObject } = modalData;

	if (!extraObject) return <Error500 backTo="" />;
	return <NewDelivery client={extraObject.client} product={extraObject.product} />;
}
