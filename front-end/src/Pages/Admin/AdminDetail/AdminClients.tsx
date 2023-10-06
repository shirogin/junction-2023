import EnableIcon from "@/Components/EnableIcon";
import Fallback from "@/Components/Fallback";

import UserTable from "@/Components/UserTable";
import Error500 from "@/Pages/Errors/Error500";

import { useGetClientsQuery } from "@/app/backend/export/client";
import { useDynamicFilter, useNotification } from "@/hooks";

import { Refresh2, UserAdd } from "iconsax-react";
import moment from "moment";
import { useEffect } from "react";
import { LiaUserTagSolid } from "react-icons/lia";

import { Link } from "react-router-dom";

function AdminClients() {
	const { data: response, isFetching, refetch, isError, error } = useGetClientsQuery();

	const clients = response?.data || [];

	const dynamicFilter = useDynamicFilter<ClientI>(clients, {
		enabled: {
			name: "Status",
			enums: [
				{ name: "enabled", value: true },
				{ name: "disabled", value: false },
			],
		},
		upsIntegrationSet: {
			name: "Integration",
			enums: [
				{ name: "Integrated", value: true },
				{ name: "Not Integrated", value: false },
			],
		},
	});

	const { Errofy, Notify } = useNotification();

	useEffect(() => {
		if (isError) Errofy("Loading products", error, "Couldn't load products");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);

	if (isError) return <Error500 refetch={refetch} backTo="" />;
	if (isFetching) return <Fallback />;

	return (
		<div className="w-full">
			<div className="relative">
				<UserTable<ClientI>
					ActionsButtons={() => (
						<button className="btn px-6 normal-case btn-sm " onClick={() => refetch()}>
							<Refresh2 className="h-4 w-4" />
						</button>
					)}
					labels={{
						_id: {
							render: (id, row) => (
								<Link to={"/app/clients/" + id} className="flex items-center space-x-3">
									<div className="avatar">
										<div className="rounded-full text-secondary ring-secondary ring-offset-base-100 ring w-12 h-12">
											<LiaUserTagSolid className="w-12 h-12" />
										</div>
									</div>
									<div>
										<div className="font-bold">{row.firstName}</div>
										<div className="text-sm opacity-50">{row.lastName}</div>
									</div>
								</Link>
							),
						},
						username: { name: "Username" },
						email: { name: "Email" },
						createdAt: {
							name: "Created At",
							render: (l) => (
								<p className="whitespace-nowrap">{l ? moment(l as Date).format("DD MMM YYYY-HH:mm") : "null"}</p>
							),
						},
						enabled: {
							name: "Status",
							render: (l) => (
								<div
									className={`badge text-ellipsis overflow-hidden whitespace-nowrap ${
										l ? "badge-success" : "badge-error"
									}`}
								>
									{l ? "Enabled" : "Disabled"}
								</div>
							),
						},
						upsIntegrationSet: {
							name: "Integration",
							render: (l) => (
								<div
									className={`badge text-ellipsis overflow-hidden whitespace-nowrap ${
										l ? "badge-accent" : "badge-warning"
									}`}
								>
									{l ? "Integrated" : "Not Integrated"}
								</div>
							),
						},
						Actions: {
							render: (_, row) => (
								<div className="flex justify-center gap-1">
									<EnableIcon {...{ Errofy, Notify, refetch, row }} />
									<button className="btn">
										<UserAdd />
									</button>
								</div>
							),
						},
					}}
					sortOptions={[
						{ key: "firstName", label: "First Name" },
						{ key: "lastName", label: "Last Name" },
						{ key: "username", label: "username" },
						{ key: "email", label: "Email" },
						{ key: "createdAt", label: "Created At" },
					]}
					dynamicFilter={dynamicFilter}
					isError={isError}
					isLoading={isFetching}
				/>
			</div>
		</div>
	);
}

export default AdminClients;
