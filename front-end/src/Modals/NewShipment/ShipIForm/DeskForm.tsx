import { useEffect, useState } from "react";
import Input from "@/Components/Input/InputNew";
import { useLang, useNotification } from "@/hooks";
import Fallback from "@/Components/Fallback";
import useDesks from "@/hooks/useDesks";
import ContentType from "./content/ContentType";
import ShipmentCard from "@/Components/Cards/ShipmentCard";
import { useGetAddressesQuery } from "@/app/backend/export/client";
import Error500 from "@/Pages/Errors/Error500";

export default function DeskForm({
	setShipTo,
	provinces,
	client,
}: {
	setShipTo: (shipTo: PrepId | null) => void;
	provinces: ProvinceI[];
	client: ClientI;
}) {
	const { data: response, isFetching, isError, error } = useGetAddressesQuery(client._id);
	const [province, setProvince] = useState(
		response?.data ? response?.data.addresses.find((ship) => ship._id === response?.data.default)?.Address.StateProvinceCode || 16 : 16
	);
	const { desks, isLoading } = useDesks({
		province,
	});
	const { language } = useLang();
	const { Errofy } = useNotification();

	const [selectedDesk, setSelectedDesk] = useState("");

	useEffect(() => {
		if (selectedDesk)
			setShipTo({
				_id: selectedDesk,
				info: desks.find((ship) => ship._id === selectedDesk) as ShipI,
			});
		else setShipTo(null);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedDesk]);
	useEffect(() => {
		if (isError) Errofy("Error retrieving addresses", error, `Something went wrong retrieving client ${client.username} addresses`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	const [content, setContent] = useState<ContentType | null>(null);

	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);
	if (isFetching) <Fallback />;
	if (!content || !response) return <Error500 />;

	return [
		<Input
			key={"Select Province"}
			{...{
				required: true,
				name: "Address.StateProvinceCode",
				label: content?.deskForm.province,
				placeholder: content?.deskForm.province,
				type: "select",
				id: "Province",
				autoComplete: "address",
				className: "w-full",
				getFieldProps: () => ({
					value: province,
					onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
						setProvince(Number(e.target.value));
					},
				}),
				errors: {},
				touched: {},
				enums: provinces.map((province) => ({
					label: province.name[language] || province.name["EN"],
					value: province.id,
				})),
			}}
		/>,
		isLoading ? (
			<Fallback key={"loading"} />
		) : (
			[
				<div key={"desk-select"} className="form-control w-full ">
					<label htmlFor="ReceiverShipI" className="label">
						<span className="label-text font-bold">{content.deskForm.title}</span>
					</label>
					<select
						id="ReceiverShipI"
						className="select select-bordered w-full"
						value={selectedDesk}
						onChange={(e) => {
							setSelectedDesk(e.target.value);
						}}
					>
						<option value={""}>
							{"["}
							{content.deskForm.select}
							{"]"}
						</option>
						{desks.map((shipI, index) => (
							<option key={index} value={shipI._id}>
								{shipI.AttentionName}
							</option>
						))}
					</select>
				</div>,
				<ShipmentCard key={"shipment-card"} shipInfo={desks.find((ship) => ship._id === selectedDesk) || undefined} />,
			]
		),
	];
}
