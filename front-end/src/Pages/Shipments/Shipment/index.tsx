import DeliveryCard from "@/Components/Cards/DeliveryCard";
import Fallback from "@/Components/Fallback";
import Stepper from "@/Components/Stepper";
import { useLang, useNotification } from "@/hooks";
import UserIcon from "@/icons/UserIcon";
import { Box, Call, I3DCubeScan, Location, Shop, TruckFast, Warning2, WeightMeter } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ContentType from "./content/ContentType";
import { useGetShipmentByIdQuery } from "@/app/backend/export/shipments";
import Error500 from "@/Pages/Errors/Error500";
import IssueManager from "@/Components/Shipment/IssueManager";
import { ReportIssue } from "./ReportIssue";
import { GetSteps } from "./GetSteps";
import Error404 from "@/Pages/Errors/Error404";
import ShipmentActions from "@/Components/ShipmentActions";

const DeliveryDetail = () => {
	const { id: shipmentId } = useParams();
	const { isLoading, data, refetch, error, isError } = useGetShipmentByIdQuery({ shipmentId: shipmentId as string });
	const shipment = data?.data || null;
	const { Errofy } = useNotification();

	function Refresh() {
		refetch();
	}
	useEffect(() => {
		if (isError) Errofy("Getting shipment", error);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();
	console.log(shipment);
	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);
	if (isLoading) return <Fallback />;
	if (!content) return <Error500 />;
	if (!shipment) return <Error404 />;
	const receiverInfo = shipment.shipTo;
	const senderInfo = shipment.shipFrom;

	return (
		<div className="flex flex-col justify-center gap-4">
			<div className="flex flex-wrap justify-end">
				<ShipmentActions
					selected={[shipment]}
					afterAction={() => Refresh()}
					track={
						["PENDING", "PREPARED"].includes(shipment.status)
							? (shipment.status as "PENDING" | "PREPARED")
							: shipment.lastTrack.status
					}
				/>
			</div>
			<DeliveryCard
				title="Tracking"
				badges={[
					{
						text: shipment.lastTrack?.location?.AttentionName
							? `Current Desk: ${shipment.lastTrack.location.AttentionName}`
							: "Not in desk",
						className: "badge-accent py-4",
					},
					{
						text: ["PENDING", "PREPARED"].includes(shipment.status)
							? (shipment.status as "PENDING" | "PREPARED")
							: shipment.lastTrack.status,
						className: "badge-secondary py-4",
					},
					{
						text: shipment.isStopDesk ? (
							<>
								<Shop className="w-4 h-4" /> Stop Desk
							</>
						) : (
							<>
								<TruckFast className="w-4 h-4" /> Home delivery
							</>
						),
						className: shipment.isStopDesk ? "badge-primary py-4 gap-2" : "badge-accent py-4 gap-2",
					},
				]}
			>
				<Stepper steps={GetSteps(content, shipment.status, shipment.trackHistory)} />
			</DeliveryCard>
			<div className="w-full grid grid-col-1 lg:grid-cols-2 gap-4">
				{/* Assignment infos */}
				{["ASSIGNED", "ASSIGNED_TRANSIT", "ASSIGNED_RETURN", "IN_RETURN", "IN_TRANSIT", "IN_DELIVERY"].includes(
					shipment.lastTrack?.status
				) && (
					<DeliveryCard title={"Assignment Details"}>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
							<div>
								<div className="flex items-center gap-4">
									<Shop className="w-6 h-6" />
									<p className="font-bold">Delivering Desk</p>
								</div>
								<p className="ml-8 mb-4">{shipment.lastTrack.from.AttentionName}</p>
							</div>
							<div>
								<div className="flex items-center gap-4">
									<UserIcon className="w-6 h-6" />
									<p className="font-bold">Delivery man</p>
								</div>
								<Link to={`/app/workers/${shipment.lastTrack.assignedTo._id}`} className="ml-8 mb-4">
									{shipment.lastTrack.assignedTo.firstName} {shipment.lastTrack.assignedTo.lastName}
								</Link>
							</div>
							<div>
								<div className="flex items-center gap-4">
									<Call />
									<p className="font-bold">{content.client.phone}</p>
								</div>
								<a href={`tel:${shipment.lastTrack.assignedTo.phone}`} className="ml-8 mb-4">
									{shipment.lastTrack.assignedTo.phone}
								</a>
							</div>
							<div>
								<div className="flex items-center gap-4">
									<Location />
									<p className="font-bold">{content.client.address}</p>
								</div>
								{shipment.lastTrack.to.Address.AddressLine.map((adr, i) => (
									<p key={"address" + i} className="ml-8">
										{adr}
									</p>
								))}
							</div>
						</div>
					</DeliveryCard>
				)}
				{["ASSIGNED_TRANSIT", "ASSIGNED_RETURN", "IN_RETURN", "IN_TRANSIT"].includes(shipment.lastTrack?.status) && (
					<DeliveryCard title={"Transition Details"}>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
							<div>
								<div className="flex items-center gap-4">
									<Shop className="w-6 h-6" />
									<p className="font-bold">Receiving Desk</p>
								</div>
								<p className="ml-8 mb-4">{shipment.lastTrack.to.AttentionName}</p>
							</div>
							<div>
								<div className="flex items-center gap-4">
									<Call />
									<p className="font-bold">{content.client.phone}</p>
								</div>
								<a href={`tel:${shipment.lastTrack.to.Phone.Number}`} className="ml-8 mb-4">
									{shipment.lastTrack.to.Phone.Number}
								</a>
							</div>
							<div>
								<div className="flex items-center gap-4">
									<Location />
									<p className="font-bold">{content.client.address}</p>
								</div>
								{shipment.lastTrack.from.Address.AddressLine.map((adr, i) => (
									<p key={"address" + i} className="ml-8">
										{adr}
									</p>
								))}
							</div>
						</div>
					</DeliveryCard>
				)}

				{/* package infos */}
				<DeliveryCard title={content.package.title}>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
						<div>
							<div className="flex items-center gap-4">
								<I3DCubeScan />
								<p className="font-bold">{content.package.number}</p>
							</div>
							<p className="ml-8 mb-4">{shipment.trackingNumber}</p>
						</div>
						<div>
							<div className="flex items-center gap-4">
								<WeightMeter />
								<p className="font-bold">Product weight</p>
							</div>
							<p className="ml-8 mb-4">{shipment.weight} KG</p>
						</div>
						<div>
							<div className="flex items-center gap-4">
								<Box />
								<p className="font-bold">Product</p>
							</div>
							<p className="ml-8">Name: {shipment.product.name}</p>
							<p className="ml-8 mb-4">SKU: {shipment.product.sku}</p>
						</div>
					</div>
				</DeliveryCard>
				{/* payment infos */}
				<DeliveryCard title={content.payment.title}>
					<div className="flex flex-col h-full justify-between">
						<div>
							<div className="flex">
								<p className="font-bold">{content.payment.price}</p>
								<p className="text-right">
									{shipment.pricing.product} {content.payment.currency}
								</p>
							</div>
							<div className="flex">
								<p className="font-bold">{content.payment.delivery}</p>
								<p className="text-right">
									{shipment.pricing.delivery} {content.payment.currency}
								</p>
							</div>
							<div className="flex">
								<p className="font-bold">Commission fee</p>
								<p className="text-right">
									{shipment.pricing.commissionFee} {content.payment.currency}
								</p>
							</div>
							<div className="flex">
								<p className="font-bold">Assurance fee</p>
								<p className="text-right">
									{shipment.pricing.assuranceFee} {content.payment.currency}
								</p>
							</div>
							<div className="flex">
								<p className="font-bold">Additional weight fee</p>
								<p className="text-right">
									{shipment.pricing.weightPrice} {content.payment.currency}
								</p>
							</div>
						</div>
						<div className="flex text-primary">
							<p className="font-bold">{content.payment.total}</p>
							<p className="text-right">
								{(shipment.pricing.product || 0) + shipment.pricing.delivery} {content.payment.currency}
							</p>
						</div>
					</div>
				</DeliveryCard>
				{/* Sender infos */}
				<DeliveryCard title={"Sender information"}>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
						<div>
							<div className="flex items-center gap-4">
								<Shop className="w-6 h-6" />
								<p className="font-bold">Delivering Desk</p>
							</div>
							<p className="ml-8 mb-4">{shipment.deliverTo.name}</p>
						</div>
						<div>
							<div className="flex items-center gap-4">
								<UserIcon className="w-6 h-6" />
								<p className="font-bold">{content.client.name}</p>
							</div>

							<p className="ml-8 mb-4">{senderInfo.Name}</p>
						</div>
						<div>
							<div className="flex items-center gap-4">
								<Call />
								<p className="font-bold">{content.client.phone}</p>
							</div>
							<p className="ml-8 mb-4">{senderInfo.Phone.Number}</p>
						</div>
						<div>
							<div className="flex items-center gap-4">
								<Location />
								<p className="font-bold">{content.client.address}</p>
							</div>
							{senderInfo.Address.AddressLine.map((adr, i) => (
								<p key={"address" + i} className="ml-8">
									{adr}
								</p>
							))}
						</div>
					</div>
				</DeliveryCard>
				{/* Receiver infos */}
				<DeliveryCard title={"Receiver information"}>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
						{shipment.isStopDesk && (
							<div>
								<div className="flex items-center gap-4">
									<Shop className="w-6 h-6" />
									<p className="font-bold">Desk</p>
								</div>
								<p className="ml-8 mb-4">{receiverInfo.AttentionName}</p>
							</div>
						)}
						<div>
							<div className="flex items-center gap-4">
								<UserIcon className="w-6 h-6" />
								<p className="font-bold">{content.client.name}</p>
							</div>
							<p className="ml-8 mb-4">{receiverInfo.Name}</p>
						</div>

						<div>
							<div className="flex items-center gap-4">
								<Call />
								<p className="font-bold">{content.client.phone}</p>
							</div>
							<p className="ml-8 mb-4">{receiverInfo.Phone.Number}</p>
						</div>

						<div>
							<div className="flex items-center gap-4">
								<Location />
								<p className="font-bold">{content.client.address}</p>
							</div>
							{receiverInfo.Address.AddressLine.map((adr, i) => (
								<p key={"address" + i} className="ml-8">
									{adr}
								</p>
							))}
						</div>
					</div>
				</DeliveryCard>
			</div>
			<div className="w-full grid grid-col-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				{/* Issues display */}
				<DeliveryCard spans={"col-span-1 xl:col-span-2"} title={"Issues display"} className="text-error">
					<div className="flex flex-col h-full gap-4">
						{shipment.shipmentIssues.map((issue, i) => (
							<div key={"ShipmentIssue" + i} className={"flex gap-4 h-full"}>
								<div className="flex gap-4 w-full border rounded-xl p-4 mb-auto ">
									<div
										className={`w-12 h-12 flex-shrink-0 my-auto ${
											issue.status === "OPEN" ? "text-error" : "text-warning"
										}`}
										title={issue.status}
									>
										<Warning2 className="w-12 h-12 " />
									</div>
									<div className="flex flex-col gap-2 justify-start items-start content-start w-full">
										<p className="flex-grow-0 text-xl font-black">{issue.action}</p>
										<Link
											to={`/app/${issue.reportedBy.kind === "Admin" ? "admins" : "delivery-men"}/${
												issue.reportedBy._id
											}`}
											className="flex-grow-0 font-semibold"
										>
											@{issue.reportedBy.username}
										</Link>
										<p className="text-xs w-full">{issue.comment}</p>
									</div>
									{issue.status === "RESOLVED" ? (
										<div className="flex flex-col w-[70%] border-l px-4 h-full gap-2 ">
											<p className="flex-grow-0 text-xl font-black">{issue.resolution?.action}</p>
											<Link
												to={`/app/${issue.resolution?.by.kind === "Admin" ? "admins" : "delivery-men"}/${
													issue.resolution?.by._id
												}`}
												className="flex-grow-0 font-semibold"
											>
												@{issue.resolution?.by.username}
											</Link>
											<p className="text-xs w-full">{issue.resolution?.comment}</p>
										</div>
									) : null}
								</div>
								{issue.status === "OPEN" ? (
									<IssueManager
										refresh={() => {
											Refresh();
										}}
										issueId={issue._id}
									/>
								) : null}
							</div>
						))}
					</div>
				</DeliveryCard>

				{/* Issues report */}
				<DeliveryCard title={"Issues report"} className="text-error">
					<ReportIssue
						shipmentId={shipment._id as string}
						refresh={() => {
							Refresh();
						}}
					/>
				</DeliveryCard>
			</div>
		</div>
	);
};

export default DeliveryDetail;
