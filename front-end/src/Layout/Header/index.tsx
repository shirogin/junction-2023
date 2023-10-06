//import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
//import { openRightDrawer } from "@/app/context/rightDrawer";
//import { RIGHT_DRAWER_TYPES } from "@/utils/globalConstantUtil";
import { /* useAppDispatch, */ useAppSelector, useUser } from "@/hooks";
import { Link } from "react-router-dom";
import LogoutIcon from "@/icons/LogoutIcon";
import { ProfileCircle } from "iconsax-react";
import { Notifications } from "./Notifications";
function Header() {
	const {  pageTitle } = useAppSelector((state) => state.header);
	const { user } = useUser<UserI>();

	return (
		<>
			<div className="lg:px-10 navbar flex justify-between bg-base-100 lg:bg-base-200 z-10 shadow-md lg:shadow-none">
				{/* Menu toggle for mobile view or small screen */}
				<div className="">
					<label htmlFor="left-sidebar-drawer" className="btn btn-ghost drawer-button lg:hidden">
						<Bars3Icon className="h-5 inline-block w-5" />
					</label>
					<h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
				</div>

				<div className="order-last">
					{/* <ThemeToggle /> */}

					{/* Notification icon */}
					<Notifications/>

					{/* Profile icon, opening menu on click */}
					<div className="dropdown dropdown-end ml-4">
						<label tabIndex={999} htmlFor="profile-dropdown" className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="-4 -4 32 32"
									strokeWidth={1.5}
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
						</label>
						<input type="text" hidden id="profile-dropdown" />
						<ul tabIndex={999} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
							<li>
								<div className="rounded-2xl">
									<ProfileCircle width={24} height={24} />
									<Link to={"/app/profile"} role="menuitem">
										<div className=""> @{user.username}</div>
										<div className="">
											{user?.firstName} {user.lastName}
										</div>
									</Link>
								</div>
							</li>
							<div className="divider mt-0 mb-0"></div>
							<li>
								<div className="rounded-2xl">
									<LogoutIcon className="" />
									<Link to={"/logout"} role="menuitem">
										<div className="w-max text-error">logout</div>
									</Link>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
