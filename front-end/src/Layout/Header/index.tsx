//import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
//import { openRightDrawer } from "@/app/context/rightDrawer";
//import { RIGHT_DRAWER_TYPES } from "@/utils/globalConstantUtil";
import { /* useAppDispatch, */ useAppSelector, useTheme, useUser } from "@/hooks";
import { Link } from "react-router-dom";
import LogoutIcon from "@/icons/LogoutIcon";
import { ProfileCircle } from "iconsax-react";

function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	/* Light and dark theme selection toggle **/
	return (
		<label
			className="swap "
			onClick={(e) => {
				e.preventDefault();
				setTheme(theme === "luxury" ? "UPS-theme" : "luxury");
				return false;
			}}
		>
			<input type="checkbox" id="darkModeSwitcher" />
			<SunIcon className={"fill-current w-6 h-6 " + (theme === "luxury" ? "swap-on" : "swap-off")} />
			<MoonIcon className={"fill-current w-6 h-6 " + (theme === "UPS-theme" ? "swap-on" : "swap-off")} />
		</label>
	);
}
function Header() {
	const { /* noOfNotifications, */ pageTitle } = useAppSelector((state) => state.header);
	const { user } = useUser<AdminI>();

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
					<ThemeToggle />

					{/* Notification icon */}
					{/* <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
						<div className="indicator">
							<BellIcon className="h-6 w-6" />
							{noOfNotifications > 0 ? (
								<span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span>
							) : null}
						</div>
					</button> */}

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
