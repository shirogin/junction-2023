import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { useGetDeliveryMenQuery } from "@/app/backend/export/deliveryMan";
import UserTable from "../../Components/UserTable";
import moment from "moment";
import { useDynamicFilter, useNotification } from "@/hooks";

import { TopSideButtons } from "./TopSideButtons";

import EnableIcon from "@/Components/EnableIcon";
import usePageTitle from "@/hooks/usePageTitle";

const Error404 = lazy(() => import("@/Pages/Errors/Error404"));

const DeliveryMen = () => {
	usePageTitle(`Delivery men`);
	const { Errofy, Notify } = useNotification();
	const {
		data: response,
		isError,
		isLoading,
		isFetching,
		refetch,
	} = useGetDeliveryMenQuery(undefined, {
		skip: false,
		refetchOnReconnect: true,
	});

	const data = (response?.data || []) as DeliveryManI[];
	const dynamicFilter = useDynamicFilter<DeliveryManI>(data, {
		enabled: {
			name: "Status",
			enums: [
				{ name: "enabled", value: true },
				{ name: "disabled", value: false },
			],
		},
	});
	return useRoutes([
		{
			index: true,
			element: (
				<UserTable<DeliveryManI>
					ActionsButtons={() => <TopSideButtons Refetch={() => refetch()} />}
					labels={{
						name: {
							render: (_, row, k) => (
								<div className="flex items-center space-x-3">
									<div className="avatar">
										<div className="rounded-full ring-secondary ring-offset-base-100 ring-offset-2 ring w-12 h-12">
											<img src={`https://reqres.in/img/faces/${k + 1}-image.jpg`} alt="Avatar" />
										</div>
									</div>
									<div>
										<div className="font-bold">{row.firstName}</div>
										<div className="text-sm opacity-50">{row.lastName}</div>
									</div>
								</div>
							),
						},
						username: { name: "Username" },
						email: { name: "Email" },
						createdAt: {
							name: "Created At",
							render: (l) => (l ? moment(l as Date).format("DD MMM YY") : "null"),
						},
						updatedAt: {
							name: "Updated At",
							render: (l) => (l ? moment(l as Date).format("DD MMM YY") : "null"),
						},
						enabled: {
							name: "Status",
							render: (l) => (
								<div className={`badge ${l ? "badge-success" : "badge-error"}`}>{l ? "Enabled" : "Disabled"}</div>
							),
						},
						Actions: {
							render: (_, row) => (
								<div className="flex justify-center gap-1">
									<EnableIcon {...{ userType: "DeliveryMan", Errofy, Notify, refetch, row }} />
								</div>
							),
						},
					}}
					sortOptions={[
						{ key: "firstName", label: "First Name" },
						{ key: "username", label: "username" },
						{ key: "email", label: "Email" },
						{ key: "createdAt", label: "Created At" },
					]}
					dynamicFilter={dynamicFilter}
					isError={isError}
					isLoading={isLoading || isFetching}
				/>
			),
		},
		{ path: "*", element: <Error404 /> },
	]);
};
export default DeliveryMen;
