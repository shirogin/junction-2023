import { useLang, useNotification } from "@/hooks";
import { useEffect, useState } from "react";
import ShipmentCard from "../../Components/Cards/ShipmentCard";
import ContentType from "./content/ContentType";
import Error500 from "@/Pages/Errors/Error500";
import ShipIForm from "./ShipIForm";
import { useGetAddressesQuery } from "@/app/backend/export/client";
import Fallback from "@/Components/Fallback";

type Props = {
	setShipFrom: (shipFrom?: ShipI | PrepId) => void;
	shipFrom?: ShipI | PrepId;
	setValid: (valid: boolean) => void;
	client: ClientI;
};

export default function SenderInformation({ shipFrom, setShipFrom, setValid, client }: Props) {
	const { data: response, isFetching, isError, error } = useGetAddressesQuery(client._id);
	const [senderShip, setSenderShip] = useState(response?.data.default ? "default" : "new");
	const { Errofy } = useNotification();
	const clientAddresses = response?.data || {
		addresses: [],
		default: "",
	};

	useEffect(() => {
		if (senderShip === "default") {
			setShipFrom(
				clientAddresses.default
					? {
							_id: clientAddresses.default as string,
							info: clientAddresses.addresses.find((ship) => ship._id === clientAddresses.default) as ShipI,
					  }
					: undefined
			);
			setValid(true);
		} else if (senderShip !== "new") {
			console.log(senderShip);
			setShipFrom({
				_id: senderShip,
				info: clientAddresses.addresses.find((ship) => ship._id === senderShip) as ShipI,
			});
			setValid(true);
		} else {
			setValid(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [senderShip]);
	useEffect(() => {
		if (client.businessInfo?.defaultShipment) {
			setSenderShip("default");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [client.businessInfo?.defaultShipment]);

	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();

	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	useEffect(() => {
		if (isError) Errofy("Error retrieving addresses", error, `Something went wrong retrieving client ${client.username} addresses`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	if (!content || !response) return <Error500 />;
	if (isFetching) return <Fallback />;

	function setFormState(shipI: ShipI | PrepId) {
		if (shipI._id) setSenderShip(shipI._id);
		else setShipFrom(shipI);
	}

	return (
		<div className="flex flex-col w-full">
			<div className="form-control w-full ">
				<label htmlFor="SenderShipI" className="label">
					<span className="label-text font-bold">{content.senderInformation.title}</span>
				</label>
				<select
					id="SenderShipI"
					className="select select-bordered w-full"
					value={senderShip}
					onChange={(e) => {
						setSenderShip(e.target.value);
					}}
				>
					{clientAddresses.addresses.map((shipI, index) => {
						const Default = clientAddresses.default === shipI._id;
						return (
							<option key={index} value={Default ? "default" : shipI._id}>
								{Default && "(Default) "}
								{shipI.AttentionName}
							</option>
						);
					})}
					<option value={"new"}>
						{"["}
						{content.senderInformation.new}
						{"]"}
					</option>
				</select>
			</div>
			{senderShip === "new" ? (
				<ShipIForm client={client} setShipI={setFormState} setValid={setValid} savable />
			) : (
				<ShipmentCard
					shipInfo={
						shipFrom === undefined
							? clientAddresses.addresses.find((ship) => ship._id === clientAddresses.default) || undefined
							: clientAddresses.addresses.find((ship) => ship._id === shipFrom._id) || undefined
					}
					sender
				/>
			)}
		</div>
	);
}
