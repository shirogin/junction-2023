import UserTable from "../../Components/UserTable";
import moment from "moment";
import { useDynamicFilter, useNotification, useEffectOnce } from "@/hooks";

import { TopSideButtons } from "./TopSideButtons";
import { LiaUserTagSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import EnableIcon from "../../Components/EnableIcon";
import usePageTitle from "@/hooks/usePageTitle";
import { useGetAdminsQuery } from "@/app/backend/export/admin";

const Admins = () => {
	usePageTitle("Admins");

	const { data: response, isError, isLoading, isFetching, refetch } = useGetAdminsQuery();

	const data = (response?.data || []) as AdminI[];
	const { Notify, Errofy } = useNotification();
	const dynamicFilter = useDynamicFilter<AdminI>(data, {
		enabled: {
			name: "Status",
			enums: [
				{ name: "enabled", value: true },
				{ name: "disabled", value: false },
			],
		},
	});

	const { toggleFilter } = dynamicFilter;

	useEffectOnce(() => {
		toggleFilter("enabled", "enabled");
	});

	return (
		<UserTable<AdminI>
			ActionsButtons={() => <TopSideButtons refetch={refetch} />}
			labels={{
				_id: {
					render: (id, row) => (
						<Link to={"/app/admins/" + id} className="flex items-center space-x-3">
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
					render: (l) => <p className="whitespace-nowrap">{l ? moment(l as Date).format("DD MMM YYYY-HH:mm") : "null"}</p>,
				},
				enabled: {
					name: "Status",
					render: (l) => (
						<div className={`badge text-ellipsis overflow-hidden whitespace-nowrap ${l ? "badge-success" : "badge-error"}`}>
							{l ? "Enabled" : "Disabled"}
						</div>
					),
				},
				Actions: {
					render: (_, row) => (
						<div className="flex justify-center gap-1">
							<EnableIcon {...{ Errofy, Notify, refetch, row, userType: "Admin" }} />
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
	);
};
export default Admins;
