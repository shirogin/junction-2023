import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useUser } from "@/hooks";
import OnBoarding from "@/Pages/OnBoarding";

const Error404 = lazy(() => import("@/Pages/Errors/Error404"));

const Layout = lazy(() => import("@/Layout"));
const Logout = lazy(() => import("@/Pages/Logout"));
const LogIn = lazy(() => import("@/Pages/LogIn"));

const Dashboard = lazy(() => import("@/Pages/protected/Dashboard"));

const Welcome = lazy(() => import("@/Pages/protected/Welcome"));

const Router = () => {
	const { user } = useUser();
	return useRoutes([
		{ index: true, element: <Navigate to="/login" /> },

		{
			path: "/app",
			element: user && user._id ? <Layout /> : <Navigate to="/login" />,
			children: [
				{ path: "", element: <Welcome /> },
				{
					path: "dashboard", // the url
					element: <Dashboard />,
				},
				{ path: "*", element: <Error404 /> },
			],
		},
		{
			path: "/onboarding",
			element: <OnBoarding />,
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
