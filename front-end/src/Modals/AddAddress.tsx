import ShipIForm from "@/Components/ShipIForm";
import Error500 from "@/Pages/Errors/Error500";
import { useCreateAddressMutation } from "@/app/backend/export/client";
import { useNotification } from "@/hooks";
import { useModalI } from "@/hooks/useModal";
import { useEffect } from "react";

export default function AddAddress({ modalData, closeModal }: useModalI<ClientI>) {
	const { extraObject } = modalData;
	const [CreateShipInfo, { isLoading }] = useCreateAddressMutation();
	const { Errofy } = useNotification();

	useEffect(() => {
		if (!extraObject._id) {
			Errofy("Add Address", "You have to provide a clientId");
			closeModal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [extraObject]);
	if (!extraObject._id) return <Error500 backTo="" />;
	return (
		<ShipIForm
			SaveAddress={(address) => {
				return CreateShipInfo({ clientId: extraObject._id, address: address }).unwrap();
			}}
			onSaved={() => {
				closeModal();
			}}
			isLoading={isLoading}
		/>
	);
}
