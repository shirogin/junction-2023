import ShipmentActions from "@/Components/ShipmentActions";
import { ShipmentTable } from "@/Components/Table/ShipmentTable";
import { useGetMoneyCollectedShipmentsQuery } from "@/app/backend/export/shipments";
import useStoreDesk from "@/hooks/useStoreDesk";
import DZD from "@/utils/Currency";
import { Shop, TruckFast } from "iconsax-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function MoneyCollected() {
	const { currentDesk } = useStoreDesk();
	const { isFetching, isError, data, refetch } = useGetMoneyCollectedShipmentsQuery({ currentDesk });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<div className="card-body relative">
				<ShipmentTable
					title="Money collected shipments"
					labels={({ selected, provinces }) => ({
						name: {
							name: "Product",
							render: (_, row) => (
								<div className="flex items-center">
									<div
										className={`cursor-pointer rounded-full border-2 flex-shrink-0 hover:bg-neutral-500 hover:text-white border-neutral-600 w-12 h-12 flex items-center justify-center mr-4 ${
											selected.some((s) => s._id === row._id) ? "bg-neutral-600 text-white" : ""
										}`}
									>
										{row.isStopDesk ? <Shop className="w-6 h-6" /> : <TruckFast className="w-6 h-6" />}
									</div>
									<Link to={"/app/shipments/" + row._id}>
										<div className="flex flex-col">
											<span className="font-bold">{row.product.name}</span>
											<span className="whitespace-nowrap">{row.product.sku}</span>
										</div>
									</Link>
								</div>
							),
						},
						owner: {
							name: "Owner",
							render: (_, row) => (
								<Link to={"/app/clients/" + row.createdFor._id}>
									<div className="flex flex-col text-center hover:text-primary">
										<span className="font-bold">{row.createdFor.username}</span>
										<span>
											{row.createdFor.firstName} {row.createdFor.lastName}
										</span>
									</div>
								</Link>
							),
						},
						trackingNumber: {
							name: "Tracking Number",
							render: (l) => <p className="whitespace-nowrap text-center">{l as string}</p>,
						},
						createdAt: {
							name: "Created At",
							render: (l) => (
								<p className="whitespace-nowrap">{l ? moment(l as Date).format("DD MMM YYYY-HH:mm") : "null"}</p>
							),
						},
						deliverTo: {
							name: "Collecting desk",
							render: (_, row) => (
								<div>
									<p className="font-bold whitespace-nowrap">{row.deliverTo.name}</p>

									<p className="text-sm whitespace-nowrap">
										{provinces.length > 0 ? provinces[row.deliverTo.province - 1].name["EN"] : ""}
									</p>
								</div>
							),
						},
						shipTo: {
							name: "Client Address",
							render: (_, row) => (
								<div>
									{row.shipTo.Address.AddressLine.map((line, i) => (
										<p key={i} className="whitespace-nowrap">
											{line}
										</p>
									))}
								</div>
							),
						},
						Receiver: {
							name: "Receiver",
							render: (_, row) => {
								return (
									<div>
										<div className="font-bold whitespace-nowrap">{row.shipTo.AttentionName}</div>
										<div className="text-sm opacity-50 whitespace-nowrap">{row.shipTo.Name}</div>
									</div>
								);
							},
						},
						status: {
							name: "Collection Status",
							render: (_, row) => (
								<div
									className={`badge ${
										row.alreadyInCollection ? "badge-info" : "badge-accent"
									} text-ellipsis overflow-hidden whitespace-nowrap`}
								>
									{row.alreadyInCollection ? "Sent" : "Not yet"}
								</div>
							),
						},
						weight: {
							name: "Weight",
							render: (l) => <p className="whitespace-nowrap text-center">{l as string} KG</p>,
						},
						price: {
							name: "Price",
							render: (_, row) => (
								<p className="whitespace-nowrap text-center">
									{DZD["EN"].format(row.pricing.product + row.pricing.delivery)}
								</p>
							),
						},
					})}
					ActionsButtons={(selected, afterAction) => (
						<ShipmentActions track="MONEY_COLLECTED" selected={selected} afterAction={afterAction} />
					)}
					shipments={data?.data || []}
					isLoading={isFetching}
					isError={isError}
					Refetch={refetch}
				/>
			</div>
		</div>
	);
}
