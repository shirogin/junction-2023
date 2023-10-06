import routes from "@/Routes/sidebar";
import { NavLink, Link, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { ArrowUp2, Shop } from "iconsax-react";
import useStoreDesk from "@/hooks/useStoreDesk";

//import { useAppDispatch } from "../app/store";

function LeftSidebar() {
	const location = useLocation();
	const { desks, currentDesk, setCurrentDesk } = useStoreDesk();

	const close = () => {
		document.getElementById("left-sidebar-drawer")?.click();
	};

	return (
		<div className="drawer-side ">
			<label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
			<ul className="menu pt-20 md:pt-2 h-[calc(100vh-4rem)] overflow-auto flex-nowrap w-80 bg-base-100 text-base-content gap-1">
				<button
					className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
					onClick={() => close()}
				>
					<XMarkIcon className="h-5 inline-block w-5" />
				</button>

				<li className="mb-2 font-semibold text-xl">
					<Link to={"/app/welcome"}>
						<img className="w-10" src="/favicon.svg" alt="UPS - Manager Logo" />
						UPS - Manager
					</Link>
				</li>
				{routes.map((route, k) => {
					return (
						<li key={k}>
							{route.submenu ? (
								<SidebarSubmenu {...route} submenu={route.submenu} />
							) : (
								<NavLink
									end
									to={route.path}
									className={({ isActive }) =>
										`flex items-center gap-2 ${isActive ? "font-semibold  bg-base-200 " : "font-normal"}`
									}
								>
									{route.icon} {route.name}
									{location.pathname === route.path ? (
										<span
											className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
											aria-hidden="true"
										></span>
									) : null}
								</NavLink>
							)}
						</li>
					);
				})}
			</ul>
			<div className="dropdown absolute bottom-0 left-0 dropdown-top w-80 p-2 bg-base-100">
				<label htmlFor="desk-dropdown" tabIndex={110} className="btn w-full btn-outline btn-secondary normal-case flex-nowrap">
					<Shop className="w-4 h-4 flex-shrink-0" />
					<span>My Desk: {desks.find((desk) => desk._id === currentDesk)?.name}</span>
					<ArrowUp2 className="w-4 h-4 ml-auto" />
				</label>
				<input type="text" hidden id="desk-dropdown" />
				<ul
					tabIndex={110}
					className="p-2 border border-secondary mx-2 shadow menu dropdown-content w-[calc(100%-2rem)] z-[1] bg-base-200 rounded-box"
				>
					{desks.map((desk, i) => (
						<li key={"desk-" + i}>
							<a
								className="flex"
								onClick={() => {
									//dispatch(setDesk(desk._id))
									console.log(desk._id);
									setCurrentDesk(desk._id);
								}}
							>
								<span>{desk.name}</span>
								<span className="ml-auto">{desk.province}</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default LeftSidebar;
