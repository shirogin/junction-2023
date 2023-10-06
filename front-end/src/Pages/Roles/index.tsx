import usePageTitle from "@/hooks/usePageTitle";
import { useState } from "react";
import RolesSideBar from "./RolesSideBar";

export default function Roles() {
	usePageTitle("Manage roles");
	const [role, setRole] = useState<string | null>(null);
	return (
		<div className={"card w-full bg-base-100 shadow-xl mt-6"}>
			{/* side */}
			<div className="drawer lg:drawer-open">
				<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col p-4">
					{/* Page content here */}
					<label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
						Open drawer
					</label>
					{role ? (
						role === "new" ? (
							<p className="text-center my-auto">New role to add</p>
						) : (
							<p className="text-center my-auto">Please select a role first </p>
						)
					) : (
						<p className="text-center my-auto">Role details</p>
					)}
				</div>
				<RolesSideBar setRole={setRole} />
			</div>
		</div>
	);
}
