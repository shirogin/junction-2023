//import BellIcon from "@heroicons/react/24/outline/BellIcon";
//import { openRightDrawer } from "@/app/context/rightDrawer";
//import { RIGHT_DRAWER_TYPES } from "@/utils/globalConstantUtil";

import useNavigation from "@/hooks/useNavigation";
import { ArrowSwapVertical, Card, Home, MessageNotif, Setting } from "iconsax-react";
import { Link } from "react-router-dom";
const navs = [
	{
		name: "Home",
		icon: <Home className="w-8 h-8" />,
		path: "/app/home",
	},
	{
		name: "Transactions",
		icon: <ArrowSwapVertical className="w-8 h-8" />,
		path: "/app/spending",
	},
	{
		name: "Cards",
		icon: <Card className="w-8 h-8" />,
		path: "/app/cards",
	},
	{
		name: "Home",
		icon: <MessageNotif className="w-8 h-8" />,
		path: "/app/chat",
	},
	{
		name: "Home",
		icon: <Setting className="w-8 h-8" />,
		path: "/app/settings",
	},
];
function Navigation() {
	const { isOpen } = useNavigation();
	if (!isOpen) return null;
	return (
		<div className="bg-gray-200">
			<ul className="px-6 lg:px-10 py-2 navbar flex justify-between z-100 bg-base-100 flex-shrink-0 rounded-[30px] h-24 -mb-6 shadow-lg text-black">
				{navs.map((elm) => (
					<li className="mb-auto mt-3" title={elm.name}>
						<Link to={elm.path}>{elm.icon}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Navigation;
