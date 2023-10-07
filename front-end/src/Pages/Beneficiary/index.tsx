// import DZD from "@/utils/Currency";
import useNavbar from "@/hooks/useNavbar";
import { useEffect, useState } from "react";
import Other from "./Other";
import OwnAccount from "./OwnAccount";

const tabs = ["Other", "Own Account"];

const Beneficiary = () => {
	const [currentTab, setCurrentTab] = useState(0);
	const { setIsOpen } = useNavbar();
	useEffect(() => {
		setIsOpen(true);
		return () => {
			setIsOpen(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderTabContent = () => {
		switch (currentTab) {
			case 0:
				return <Other />;
			case 1:
				return <OwnAccount />;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="w-full h-full flex flex-col justify-center items-center pt-8 gap-12">
				<h1 className="font-bold text-2xl">Beneficiary</h1>
				<div className="flex w-fit px-6 gap-4">
					{tabs.map((tab, i) => (
						<a
							key={i}
							href="#"
							onClick={() => {
								setCurrentTab(i);
							}}
							className={` scroll-mx-6 flex-shrink-0 px-6 py-2  rounded-full transition-all  ${
								currentTab === i ? "text-black bg-white font-bold" : "text-white"
							}`}
						>
							{tab}
						</a>
					))}
				</div>
				<div className="flex flex-col w-full h-full">{renderTabContent()}</div>
			</div>
		</>
	);
};

export default Beneficiary;
