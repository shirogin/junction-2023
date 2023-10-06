// import DZD from "@/utils/Currency";
import { useState } from "react";

const tabs = [
	"Other",
	"Own Account",
];


const Beneficiary = () => {
	const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
			<div className="w-f flex flex-col justify-center items-center pt-8 ">
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
				<div className="flex flex-col w-full px-6 mt-12">
					<h2 className="text-2xl font-semibold text-center">Balance</h2>
					{/* <p className="text-4xl font-semibold text-center text-white mt-2">{DZD.EN.format(tabs[currentTab])}</p> */}
				</div>
			</div>
		</>
  );
};


export default Beneficiary