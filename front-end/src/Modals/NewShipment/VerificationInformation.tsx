import { useLang } from "@/hooks";
import ShipmentCard from "../../Components/Cards/ShipmentCard";
import ContentType from "./content/ContentType";
import { useEffect, useState } from "react";
import Error500 from "@/Pages/Errors/Error500";
//import PaymentCard from "./PaymentCard";

type Props = {
	shipment: ShipmentRequestPrepI;
	client: ClientI;
	/* product: ProductI; */
};

function VerificationInformation({ shipment, client }: Props) {
	const shipFrom = shipment.shipFrom;

	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();

	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	if (!content) return <Error500 />;
	return (
		<div className="w-full">
			<h3 className="text-primary font-bold text-center text-xl">{content.verificationInformation.from}</h3>
			<div className="border w-0 h-10 mx-auto -mb-2"></div>
			<ShipmentCard
				shipInfo={
					!shipFrom
						? client.businessInfo?.defaultShipment || undefined
						: shipFrom?._id
						? (shipFrom as PrepId).info
						: (shipFrom as ShipI)
				}
			/>
			<h3 className="text-primary font-bold mt-6 text-center text-xl">{content.verificationInformation.to}</h3>
			<div className="border w-0 h-10 mx-auto -mb-2"></div>
			<ShipmentCard shipInfo={shipment.shipTo?._id ? (shipment.shipTo as PrepId).info : (shipment.shipTo as ShipI)} />
		</div>
	);
}

export default VerificationInformation;
