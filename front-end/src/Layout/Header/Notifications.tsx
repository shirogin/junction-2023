import { useServerNotification } from "@/hooks";
import {  Notification1 } from "iconsax-react";
import NotificationsList from "@/Components/NotificationsList";

//import { ThemeToggle } from "./ThemeToggle";
export function Notifications() {
	const { notifications } = useServerNotification();
	return (<div className="dropdown dropdown-end ">
		<button type="button" tabIndex={120} className={`btn btn-circle btn-ghost my-1 normal-case `}>
			<div className="indicator">
				<Notification1 variant="Broken" className="w-5 h-5" />
				{notifications.length > 0 ? (
					<span className="indicator-item badge badge-secondary badge-sm">{notifications.length}</span>
				) : null}
			</div>
		</button>
		<ul
			tabIndex={120}
			className="menu menu-compact dropdown-content mt-3 p-0 shadow bg-base-100 rounded-box w-max overflow-hidden"
		>
			<NotificationsList />
		</ul>
	</div>);
}
