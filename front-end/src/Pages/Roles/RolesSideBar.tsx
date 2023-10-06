import Loading from "@/Components/Loading";
import { useGetRolesQuery } from "@/app/backend/export/role";
import { Add, Refresh2 } from "iconsax-react";
import { useEffect, useState } from "react";

export default function RolesSideBar({ setRole }: { setRole: React.Dispatch<React.SetStateAction<string | null>> }) {
	const { data, isFetching, refetch } = useGetRolesQuery();
	const [currentRole, setCurrentRole] = useState(-1);
	const roles = data?.data || [];
	useEffect(() => {
		setRole(currentRole === -1 ? null : roles[currentRole]._id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentRole]);
	useEffect(() => {
		setRole((role) => {
			if (!role) return null;
			if (roles.find((r) => r._id === role)) return role;
			else return null;
		});
		if (roles.length === 0) setCurrentRole(-1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roles]);
	return (
		<div className="drawer-side h-full rounded-l-xl bg-base-200 text-base-content">
			<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
			<ul className="menu p-4 w-80 min-h-full gap-2">
				<div className="flex items-center mb-8">
					<h1 className="font-bold text-2xl">Roles list</h1>
					<button className="btn btn-sm my-auto ml-auto btn-circle" onClick={() => refetch()}>
						<Refresh2 className="w-4 h-4" />
					</button>
					<button className="btn btn-primary btn-sm my-auto ml-2 btn-circle" onClick={() => setRole("new")}>
						<Add className="w-4 h-4" />
					</button>
				</div>
				{/* Sidebar content here */}
				{isFetching ? (
					<Loading className="w-12 h-12 mx-auto my-8" />
				) : (
					roles?.map((role, i) => (
						<li key={role._id}>
							<a
								className={`border ${
									currentRole === i ? "text-primary-content bg-primary" : ""
								} border-primary hover:bg-primary-focus hover:text-primary-content`}
								onClick={() => setCurrentRole(i)}
							>
								{role.name}
							</a>
						</li>
					))
				)}
			</ul>
		</div>
	);
}
