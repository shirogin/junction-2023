import Fallback from "@/Components/Fallback";
import { useGetAdminByIdQuery } from "@/app/backend/export/admin";
import { lazy, useState, Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User, Call } from "iconsax-react";
import usePageTitle from "@/hooks/usePageTitle";

const AdminClients = lazy(() => import("./AdminClients"));
const UpdateAdmin = lazy(() => import("./UpdateAdmin"));

const Error500 = lazy(() => import("@/Pages/Errors/Error500"));

function AdminDetail() {
	const { adminId } = useParams();
	const [currentTab, setCurrentTab] = useState(0);

	const { data, isFetching } = useGetAdminByIdQuery(adminId || "");

	const [admin, setAdmin] = useState(data?.data || null);
	usePageTitle(`Admin @${admin?.username || ""}`);
	useEffect(() => {
		setAdmin(data?.data || null);
	}, [data]);
	if (isFetching) return <Fallback />;
	if (!admin) return <Error500 />;
	const tabs = [
		{
			title: "Clients",
			render: () => {
				return <AdminClients />;
			},
		},
		{
			title: "Profile",
			render: () => {
				return <UpdateAdmin admin={admin} />;
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
							{admin.firstName} {admin.lastName}
						</h1>
						<p className="font-bold">@{admin.username}</p>
						<span className={`badge mx-auto ${admin.enabled ? "badge-success" : "badge-error"}`}>
							{admin.enabled ? "Enabled" : "Disabled"}
						</span>
						<a className="btn btn-ghost flex items-center gap-2 mx-auto btn-sm justify-center" href={`tel:${admin.phone}`}>
							<Call variant="Bold" className="w-4 h-4" /> {admin.phone}
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

			<Suspense fallback={<Fallback />}>{tabs[currentTab].render()}</Suspense>
		</div>
	);
}

export default AdminDetail;
