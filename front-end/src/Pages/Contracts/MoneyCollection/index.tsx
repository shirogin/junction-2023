import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import { useUser } from "@/hooks";
//import { useGetShipmentsListQuery } from "@/app/backend/export/shipments";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function MoneyCollection() {
	const [shipmentContract, setShipmentContract] = useState<ShipmentI | null>(null);
	//const { data: response, isLoading, isError, error } = useGetShipmentsListQuery();
	//const shipments = response?.data || [];
	const navigate = useNavigate();
	const { user } = useUser<AdminI>();
	console.log(user, shipmentContract);
	useEffect(() => {
		if (shipmentContract) return;
		// check if window is a popup
		if (!window.opener) return navigate("/app/");
		const contract = window.shipmentContract || null;

		if (!contract) window.close();
		else {
			document.title = `Return-Contract-${contract.trackingNumber}`;
			setShipmentContract(contract);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		if (!shipmentContract || !user) return;
		document.fonts.ready.then((/* fontFaceSet */) => {
			window.print();
		});
	}, [shipmentContract, user]);

	return (
		<>
			<link
				id="fontPreload"
				href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Open+Sans:wght@600;800&display=swap"
				rel="stylesheet"
			/>
			<div className="w-[21cm] h-[29.7cm] p-[1cm] bg-white justify-center items-center flex font-['Inter']">
				<div className="w-full h-full flex-col justify-between items-center flex">
					<div className="w-full flex-col gap-4 flex items-center">
						<div className="w-full justify-between items-start flex">
							<div className="w-[70px] h-[70px]">
								<img className="w-full h-auto" src="/conexlog.png" />
							</div>
							<div className="w-[70px] h-[70px] flex justify-end">
								<img className="w-auto h-full" src="/logo.svg" />
							</div>
						</div>
						<div className="w-[443px] h-[52px] flex items-center justify-center bg-opacity-0 border-2 border-black text-black font-bold">
							Retour de Colis Suite à un Échec de Livraison
						</div>
					</div>
					{shipmentContract && user && (
						<>
							<div className="h-[145px] flex-col justify-start items-start gap-5 flex">
								<div className="self-stretch text-black text-xs font-normal ">
									Ce retour de colis atteste que UPS Eurl Conexlog Algérie procède au retour du colis en raison d'une
									tentative de livraison infructueuse.
								</div>
								<div className="self-stretch text-black text-xs font-normal ">
									Je soussigné(e)
									<strong>
										{user.firstName} {user.lastName}
									</strong>
									, certifie que le colis a été retourné pour le compte de{" "}
									<strong>
										{shipmentContract.createdFor.firstName} {shipmentContract.createdFor.lastName}
									</strong>{" "}
									en date du (
									{new Date(shipmentContract.lastTrack.createdAt).toLocaleDateString("en-UK", {
										year: "numeric",
										month: "long",
										day: "numeric",
										hour: "numeric",
										minute: "numeric",
									})}
									). Cette décision de retour fait suite à l'impossibilité de livrer le colis{" "}
									<strong>{shipmentContract.trackingNumber}</strong> à l'adresse spécifiée.
								</div>
								<div className="self-stretch text-black text-xs font-normal ">
									Ce document a été établi en deux exemplaires signés par les deux parties et remis à chaque partie.
								</div>
							</div>
							<div className="w-full justify-end items-center flex">
								<div className="text-black text-xs font-normal ">
									Fait à <strong>{shipmentContract.lastTrack.location?.Name}</strong>, le{" "}
									<strong>
										{new Date().toLocaleDateString("fr-FR", {
											year: "numeric",
											month: "long",
											day: "numeric",
											hour: "numeric",
											minute: "numeric",
										})}
									</strong>
								</div>
							</div>
							<div className="w-full justify-between items-center flex">
								<div className="text-black text-xs text-center">
									<p className="font-extrabold">Signature de la première partie</p>
									<p>
										{user.firstName} {user.lastName}
									</p>
								</div>
								<div className="text-black text-xs text-center">
									<p className="font-extrabold">Signature de la seconde partie</p>
									<p>
										{shipmentContract.createdFor.firstName} {shipmentContract.createdFor.lastName}
									</p>
								</div>
							</div>
							<div className="w-full  text-center">
								<span className="text-black text-[8px] font-bold ">
									Siege social : 02 Boulevard Frantz Fanon, Hôtel El Aurassi Etage «C » N°06
									<br />
									Téléphone : 00213(0)23 482 136 / 00213(0)23 482 353 - Email :{" "}
								</span>
								<span className="text-black text-[8px] font-bold  underline">contact@conexlog-dz.com</span>
								<div className="w-[451px] h-[13px] bg-yellow-950 mx-auto" />
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
