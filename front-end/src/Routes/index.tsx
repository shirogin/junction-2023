import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useUser } from "@/hooks";
import useStoreDesk from "@/hooks/useStoreDesk";
import OnBoarding from "@/Pages/OnBoarding";

const SentMoneyCollections = lazy(() => import("@/Pages/MoneyCollections/Sent"));
const ReceivedMoneyCollections = lazy(() => import("@/Pages/MoneyCollections/Received"));
const ToBeReceivedMoneyCollections = lazy(() => import("@/Pages/MoneyCollections/ToBeReceived"));

const ReturnContract = lazy(() => import("@/Pages/Contracts/ReturnContract"));
const Labels = lazy(() => import("@/Pages/Labels"));

const Error404 = lazy(() => import("@/Pages/Errors/Error404"));

const Layout = lazy(() => import("@/Layout"));
const Logout = lazy(() => import("@/Pages/Logout"));
const LogIn = lazy(() => import("@/Pages/LogIn"));

const Dashboard = lazy(() => import("@/Pages/protected/Dashboard"));

const Welcome = lazy(() => import("@/Pages/protected/Welcome"));

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
					path: "dashboard", // the url
					element: <SentMoneyCollections />,
				},
				{
					path: "dashboard", // the url
					element: <ReceivedMoneyCollections />,
				},
				{
					path: "dashboard", // the url
					element: <ToBeReceivedMoneyCollections />,
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
