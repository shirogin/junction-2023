import Error500 from "@/Pages/Errors/Error500";
import { useNotification } from "@/hooks";
import { useModalI } from "@/hooks/useModal";
import { useEffect } from "react";
import NewPackage from "./NewPackage";

export default function AddProduct({ modalData, closeModal }: useModalI<ClientI>) {
	const { extraObject } = modalData;
	const { Errofy } = useNotification();

	useEffect(() => {
		if (!extraObject._id) {
			Errofy("Add Product", "You have to provide a clientId");
			closeModal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [extraObject]);
	if (!extraObject || !extraObject._id) return <Error500 backTo="" />;
	return <NewPackage client={extraObject} onSaved={() => closeModal()} />;
}
