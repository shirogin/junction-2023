import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useUser } from "@/hooks";
import OnBoarding from "@/Pages/OnBoarding";
import Home from "@/Pages/Home";
import Auth from "@/Pages/Auth";
import AppLayout from "@/Layout/AppLayout";
import Spending from "@/Pages/Spending";
import Confirm from "@/Pages/Beneficiary/Confirm";
import Chat from "@/Pages/Chat";

const Beneficiary = lazy(() => import("@/Pages/Beneficiary"));
const Error404 = lazy(() => import("@/Pages/Errors/Error404"));
const AuthVerification = lazy(() => import("@/Pages/AuthVerification"));
const Support = lazy(() => import("@/Pages/Support"));

const Layout = lazy(() => import("@/Layout"));
const Logout = lazy(() => import("@/Pages/Logout"));
const LogIn = lazy(() => import("@/Pages/LogIn"));

const Dashboard = lazy(() => import("@/Pages/protected/Dashboard"));

const Router = () => {
  const { user } = useUser();
  return useRoutes([
    {
      index: true,
      element: <Navigate to={user ? "/app/home" : "/onboarding"} />,
    },
    {
      path: "app",
      element: user ? <AppLayout /> : <Navigate to="/login" />,
      children: [
        { path: "", element: <Navigate to={"/app/home"} /> },
        { path: "home", element: <Home /> },
        {
          path: "dashboard", // the url
          element: <Dashboard />,
        },
        { path: "beneficiary", element: <Beneficiary /> },
        { path: "confirm", element: <Confirm /> },
        { path: "chat", element: <Chat /> },
        {
          path: "auth",
          element: <Auth />,
        },
        {
          path: "auth-verification",
          element: <AuthVerification />,
        },
        { path: "spending", element: <Spending /> },
        { path: "support", element: <Support /> },
        { path: "*", element: <Error404 /> },
      ],
    },
    {
      path: "/*",
      element: <Layout />,
      children: [
        {
          path: "onboarding",
          element: <OnBoarding />,
        },

        {
          path: "login",
          element: user ? <Navigate to="/app/auth" /> : <LogIn />,
        },

        {
          path: "logout",
          element: user ? <Logout /> : <Navigate to="/login" />,
        },

        { path: "*", element: <Error404 /> },
      ],
    },
  ]);
};
export default Router;
