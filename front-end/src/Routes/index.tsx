import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useUser } from "@/hooks";
import useStoreDesk from "@/hooks/useStoreDesk";
import AdminDetail from "@/Pages/Admin/AdminDetail";
import OnBoarding from "@/Pages/OnBoarding";

const SentMoneyCollections = lazy(() => import("@/Pages/MoneyCollections/Sent"));
const ReceivedMoneyCollections = lazy(() => import("@/Pages/MoneyCollections/Received"));
const ToBeReceivedMoneyCollections = lazy(() => import("@/Pages/MoneyCollections/ToBeReceived"));

const ReturnContract = lazy(() => import("@/Pages/Contracts/ReturnContract"));
const Labels = lazy(() => import("@/Pages/Labels"));
const InDelivery = lazy(() => import("@/Pages/Shipments/InDelivery"));
const InReturnTransition = lazy(() => import("@/Pages/Shipments/InReturnTransition"));
const AssignedReturn = lazy(() => import("@/Pages/Shipments/AssignedReturn"));
const CanceledInHold = lazy(() => import("@/Pages/Shipments/CanceledInHold"));
const Assigned = lazy(() => import("@/Pages/Shipments/Assigned"));
const AssignedTransit = lazy(() => import("@/Pages/Shipments/AssignedTransit"));
const Delivered = lazy(() => import("@/Pages/Shipments/Delivered"));
const MoneyCollected = lazy(() => import("@/Pages/Shipments/MoneyCollected"));
const MoneyAffected = lazy(() => import("@/Pages/Shipments/MoneyAffected"));
const Returned = lazy(() => import("@/Pages/Shipments/Returned"));

const UpsIntegration = lazy(() => import("@/Pages/UpsIntegration"));

const Clients = lazy(() => import("@/Pages/Clients"));
const Client = lazy(() => import("@/Pages/Clients/ClientDetail"));
const CreateClient = lazy(() => import("@/Pages/Clients/Create"));

const Desks = lazy(() => import("@/Pages/Desks"));

const Roles = lazy(() => import("@/Pages/Roles"));

const Shipment = lazy(() => import("@/Pages/Shipments/Shipment"));
const InHoldShipments = lazy(() => import("@/Pages/Shipments/InHold"));
const InTransition = lazy(() => import("@/Pages/Shipments/InTransition"));
const ZonesProvinces = lazy(() => import("@/Pages/PaymentSetting/ZonesProvinces"));
const ZonesFees = lazy(() => import("@/Pages/PaymentSetting/ZonesFees"));
const WeightZonesFees = lazy(() => import("@/Pages/PaymentSetting/WeightZonesFees"));
const GlobalPaymentSettings = lazy(() => import("@/Pages/PaymentSetting/GlobalPaymentSettings"));
const ComingShipments = lazy(() => import("@/Pages/Shipments/Coming"));
const Error404 = lazy(() => import("@/Pages/Errors/Error404"));

const Layout = lazy(() => import("@/Layout"));
const Logout = lazy(() => import("@/Pages/Logout"));
const LogIn = lazy(() => import("@/Pages/LogIn"));

const Dashboard = lazy(() => import("@/Pages/protected/Dashboard"));
const Admins = lazy(() => import("@/Pages/Admin"));
const DeliveryMen = lazy(() => import("@/Pages/DeliveryMen"));
const Welcome = lazy(() => import("@/Pages/protected/Welcome"));
const Blank = lazy(() => import("@/Pages/protected/Blank"));
const Charts = lazy(() => import("@/Pages/protected/Charts"));
const Leads = lazy(() => import("@/Pages/protected/Leads"));
const Integration = lazy(() => import("@/Pages/protected/Integration"));
const Calendar = lazy(() => import("@/Pages/protected/Calendar"));
const Team = lazy(() => import("@/Pages/protected/Team"));
const Transactions = lazy(() => import("@/Pages/protected/Transactions"));
const Bills = lazy(() => import("@/Pages/protected/Bills"));
const ProfileSettings = lazy(() => import("@/Pages/protected/ProfileSettings"));
const GettingStarted = lazy(() => import("@/Pages/GettingStarted"));
const DocFeatures = lazy(() => import("@/Pages/DocFeatures"));
const DocComponents = lazy(() => import("@/Pages/DocComponents"));
const SelectDesk = lazy(() => import("@/Pages/SelectDesk"));

const Router = () => {
	const { user } = useUser();
	const { currentDesk } = useStoreDesk();
	return useRoutes([
		{ index: true, element: <Navigate to="/login" /> },
		{
			path: "/shipments/label",
			element: <Labels />,
		},
		{
			path: "/contracts/*",
			children: [
				{
					path: "return",
					element: <ReturnContract />,
				},
			],
		},
		{
			path: "/app",
			element: user ? currentDesk !== "" ? <Layout /> : <SelectDesk /> : <Navigate to="/login" />,
			children: [
				{ path: "", element: <Welcome /> },
				{
					path: "dashboard", // the url
					element: <Dashboard />,
				},
				{
					path: "clients", // the url
					children: [
						{
							path: "", // the url
							element: <Clients />,
						},
						{
							path: "create", // the url
							element: <CreateClient />,
						},
						{
							path: ":clientId", // the url
							element: <Client />,
						},
					],
				},
				{
					path: "admins", // the url

					children: [
						{
							path: "", // the url
							element: <Admins />,
						},
						{
							path: ":adminId", // the url
							element: <AdminDetail />,
						},
					],
				},
				{
					path: "workers", // the url
					children: [
						{
							path: "", // the url
							element: <DeliveryMen />,
						},
						{
							path: ":workerId", // the url
							element: <DeliveryMen />,
						},
					],
				},
				{
					path: "roles", // the url
					element: <Roles />,
				},
				{
					path: "desks", // the url
					element: <Desks />,
				},
				{
					path: "payment-settings",
					children: [
						{
							path: "zones-provinces", // the url
							element: <ZonesProvinces />,
						},
						{
							path: "zones-fees", // the url
							element: <ZonesFees />,
						},
						{
							path: "weight-fees", // the url
							element: <WeightZonesFees />,
						},
						{
							path: "global", // the url
							element: <GlobalPaymentSettings />,
						},
					],
				},
				{
					path: "shipments", // the url
					children: [
						{
							path: "coming",
							element: <ComingShipments />,
						},
						{
							path: "in-hold",
							element: <InHoldShipments />,
						},
						{
							path: "canceled-in-hold",
							element: <CanceledInHold />,
						},
						{
							path: "assigned",
							element: <Assigned />,
						},
						{
							path: "assigned-transit",
							element: <AssignedTransit />,
						},
						{
							path: "assigned-return",
							element: <AssignedReturn />,
						},
						{
							path: "in-transit",
							element: <InTransition />,
						},
						{
							path: "in-delivery",
							element: <InDelivery />,
						},
						{
							path: "return-transit",
							element: <InReturnTransition />,
						},
						{
							path: "delivered",
							element: <Delivered />,
						},
						{
							path: "money-collected",
							element: <MoneyCollected />,
						},
						{
							path: "money-affected",
							element: <MoneyAffected />,
						},
						{
							path: "returned",
							element: <Returned />,
						},

						{
							path: ":id",
							element: <Shipment />,
						},
					],
				},
				{
					path: "money-collections",
					children: [
						{
							path: "to-be-received",
							element: <ToBeReceivedMoneyCollections />,
						},
						{
							path: "received",
							element: <ReceivedMoneyCollections />,
						},
						{
							path: "sent",
							element: <SentMoneyCollections />,
						},
					],
				},
				{
					path: "integration/ups", // the url
					element: <UpsIntegration />,
				},
				{
					path: "welcome", // the url
					element: <Welcome />,
				},
				{
					path: "leads",
					element: <Leads />,
				},
				{
					path: "settings-team",
					element: <Team />,
				},
				{
					path: "calendar",
					element: <Calendar />,
				},
				{
					path: "transactions",
					element: <Transactions />,
				},
				{
					path: "settings-profile",
					element: <ProfileSettings />,
				},
				{
					path: "settings-billing",
					element: <Bills />,
				},
				{
					path: "getting-started",
					element: <GettingStarted />,
				},
				{
					path: "features",
					element: <DocFeatures />,
				},
				{
					path: "components",
					element: <DocComponents />,
				},
				{
					path: "integration",
					element: <Integration />,
				},
				{
					path: "charts",
					element: <Charts />,
				},
				{
					path: "blank",
					element: <Blank />,
				},

				{ path: "*", element: <Error404 /> },
			],
		},
		{
			path: "/onboarding",
			element:  <OnBoarding />,
		},
		{
			path: "/login",
			element: user ? <Navigate to="/app" /> : <LogIn />,
		},
		{
			path: "logout",
			element: user ? <Logout /> : <Navigate to="/login" />,
		},

		{ path: "*", element: <Error404 /> },
	]);
};
export default Router;
