import useNavbar from "@/hooks/useNavbar";
//import LeftSidebar from "./LeftSidebar";
import ModalLayout from "./ModalLayout";
import PageContent from "./PageContent";
import useNavigation from "@/hooks/useNavigation";
//import RightSidebar from "./RightSidebar";

function AppLayout() {
	useNavbar(true);
	useNavigation(true);
	return (
		<>
			<div className="overflow-hidden w-full h-screen bg-secondary text-secondary-content">
				{/* drawer lg:drawer-open
				<input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" /> */}
				<PageContent />
				{/* <LeftSidebar /> */}
			</div>
			{/* Right drawer - containing secondary content like notifications list etc.. */}
			{/* 	<RightSidebar /> */}

			{/* Modal layout container */}
			<ModalLayout />
		</>
	);
}

export default AppLayout;
