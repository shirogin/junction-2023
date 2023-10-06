import Panel from "@/Components/Panel";
import DZD from "@/utils/Currency";
import { useState } from "react";
const accountsTypes = [
	"Investment",
	<div className="flex gap-2">
		<img src="/dollar-coin-hd.png" className="w-6 h-6" />
		Current
	</div>,
	"Savings",
	"Term deposit",
];
const accounts = [
	{
		name: "Investment",
		balance: 240000,
	},
	{
		name: "Current",
		balance: 42540.45,
	},
	{
		name: "Savings",
		balance: 320040,
	},
	{
		name: "Term deposit",
		balance: 102500,
	},
];
export default function Home() {
	const [currentAccount, setCurrentAccount] = useState(1);

	return (
		<>
			<div className="w-full flex flex-col pt-8 ">
				<div className="flex overflow-x-auto no-scrollbar w-full px-6">
					{accountsTypes.map((account, i) => (
						<a
							key={i}
							href="#"
							onClick={(e) => {
								setCurrentAccount(i);
								// scroll to the current element show fully
								e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" });
							}}
							className={` scroll-mx-6 flex-shrink-0 px-6 py-2  rounded-full transition-all  ${
								currentAccount === i ? "text-black bg-white font-bold" : "text-white"
							}`}
						>
							{account}
						</a>
					))}
				</div>
				<div className="flex flex-col w-full px-6 mt-12">
					<h2 className="text-2xl font-semibold text-center">Balance</h2>
					<p className="text-4xl font-semibold text-center text-white mt-2">{DZD.EN.format(accounts[currentAccount].balance)}</p>
				</div>
			</div>
			<Panel />
		</>
	);
}
