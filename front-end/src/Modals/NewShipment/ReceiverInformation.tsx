import { useEffect, useState } from "react";

import { useLang } from "@/hooks";
import ContentType from "./content/ContentType";
import Error500 from "@/Pages/Errors/Error500";
import ShipIForm from "./ShipIForm";

type Props = {
	setShipTo: (shipTo: ShipI | PrepId) => void;
	setValid: (valid: boolean) => void;
	client: ClientI;
};
const ReceiverInformation = ({ setShipTo, setValid, client }: Props) => {
	const [shipToDesk, setShipToDesk] = useState(false);

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
		<div className="flex flex-col w-full">
			<div className="form-control w-full flex">
				<label htmlFor="shipToDesk" className="label cursor-pointer">
					<span className="label-text font-bold">{content.receiverInformation.title}</span>
					<input
						id="shipToDesk"
						onChange={(e) => {
							setShipToDesk(e.target.checked);
						}}
						type="checkbox"
						className="toggle toggle-primary"
						checked={shipToDesk}
					/>
				</label>
			</div>

			<ShipIForm
				client={client}
				toDesk={shipToDesk}
				setValid={setValid}
				title={content.receiverInformation.address}
				setShipI={setShipTo}
			/>
		</div>
	);
};

export default ReceiverInformation;
