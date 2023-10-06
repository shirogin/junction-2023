import Fallback from "@/Components/Fallback";
import { useGetClientByIdQuery } from "@/app/backend/export/client";
import { lazy, useState, Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User, Call } from "iconsax-react";
import usePageTitle from "@/hooks/usePageTitle";
import ExtractMoney from "./ExtractMoney";

const PaymentSettings = lazy(() => import("./PaymentSetting"));
const ClientAddresses = lazy(() => import("./ClientAddresses"));
const ClientTransactions = lazy(() => import("./ClientTransactions"));
const ClientShipments = lazy(() => import("./ClientShipments"));
const ClientProducts = lazy(() => import("./ClientProducts"));
const UpdateClient = lazy(() => import("./UpdateClient"));
const Integration = lazy(() => import("./Integration"));

const Error500 = lazy(() => import("@/Pages/Errors/Error500"));

function Client() {
	const { clientId } = useParams();
	const [currentTab, setCurrentTab] = useState(0);

	const { data, isFetching } = useGetClientByIdQuery(clientId || "");

	const [client, setClient] = useState(data?.data || null);
	usePageTitle(`Client @${client?.username || ""}`);
	useEffect(() => {
		setClient(data?.data || null);
	}, [data]);
	if (isFetching) return <Fallback />;
	if (!client) return <Error500 />;
	const tabs = [
		{
			title: "Shipments",
			render: () => {
				return <ClientShipments clientId={client._id} />;
			},
		},

		{
			title: "Products",
			render: () => {
				return <ClientProducts client={client} />;
			},
		},
		{
			title: "Addresses",
			render: () => {
				return <ClientAddresses client={client} />;
			},
		},
		{
			title: "Transactions",
			render: () => {
				return <ClientTransactions clientId={client._id} />;
			},
		},
		{
			title: "Profile",
			render: () => {
				return <UpdateClient client={client} />;
			},
		},
		{
			title: "UPS Integration",
			render: () => {
				return <Integration client={client} />;
			},
		},
		{
			title: "Payment settings",
			render: () => {
				return <PaymentSettings clientId={client._id} />;
			},
		},
		{
			title: "Extract Money",
			render: () => {
				return <ExtractMoney clientId={client._id} />;
			},
		},
	];
	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div id="Profile" className="flex flex-col mb-4">
				<div className="flex flex-col gap-4 w-full max-w-lg">
					<figure className="avatar mx-auto">
						<div className="rounded-full text-primary ring-primary ring-offset-base-100 ring w-12 h-12">
							<User className="w-full h-full" />
						</div>
					</figure>
					<div className="text-center flex flex-col gap-2">
						<h1 className="text-2xl font-black">
							{client.firstName} {client.lastName}
						</h1>
						<p className="font-bold">@{client.username}</p>
						<span className={`badge mx-auto ${client.enabled ? "badge-success" : "badge-error"}`}>
							{client.enabled ? "Enabled" : "Disabled"}
						</span>
						<a className="btn btn-ghost flex items-center gap-2 mx-auto btn-sm justify-center" href={`tel:${client.phone}`}>
							<Call variant="Bold" className="w-4 h-4" /> {client.phone}
						</a>
					</div>
				</div>
			</div>
			<div className="tabs tabs-boxed mb-2 justify-center">
				{tabs.map((tab, i) => {
					return (
						<a
							key={i}
							className={`tab ${i === currentTab ? "tab-active" : ""}`}
							onClick={() => {
								setCurrentTab(i);
							}}
						>
							{tab.title}
						</a>
					);
				})}
			</div>

			<div className="card w-full bg-base-100">
				<div className="card-body">
					<Suspense fallback={<Fallback />}>{tabs[currentTab].render()}</Suspense>
				</div>
			</div>
		</div>
	);
}

export default Client;
