//import { FC } from "react";
import { motion } from "framer-motion";
import { ArrowRight2 } from "iconsax-react";
import { TouchEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ClientsRow } from "./ClientsRow";
import { Transaction } from "./Transaction";
import { Bag, MoneyRecive as MoneyReceive } from "iconsax-react";
const variants = {
	hidden: { height: "50vh" },
	visible: { height: "calc(100%)", padding: 0 },
};
const variants2 = {
	hidden: { height: "auto" },
	visible: { height: 0, padding: 0 },
};
function getTouches(evt: TouchEvent<HTMLDivElement>) {
	return evt.touches;
}
let xDown: number | null = null;
let yDown: number | null = null;
const RecentSenders = [
	{
		name: "Flen",
	},
	{
		name: "Flana",
	},
	{
		name: "Ghafour",
	},
	{
		name: "Youcef",
	},
	{
		name: "Wassim",
	},
	{
		name: "Fatima",
	},
	{
		name: "maria",
	},
];
const RecentTransactions = [
	{
		name: "Groceries",
		date: "02/10/2023",
		amount: -35,
		icon: <Bag className="w-8 h-8" />,
	},
	{
		name: "Groceries",
		date: "01/10/2023",
		amount: -31,
		icon: <Bag className="w-8 h-8" />,
	},
	{
		name: "Transfer from flen",
		date: "30/09/2023",
		amount: 635,
		icon: <MoneyReceive className="w-8 h-8" />,
	},
	// more transactions like netflix subscriptions ...etc
	{
		name: "Netflix subscription",
		date: "30/09/2023",
		amount: -10,
		icon: <Bag className="w-8 h-8" />,
	},
];
const Panel = () => {
	const [transactionsOpen, setTransactionsOpen] = useState("hidden");
	return (
		<motion.div
			variants={variants}
			animate={transactionsOpen}
			onTouchStart={function handleTouchStart(evt) {
				const firstTouch = getTouches(evt)[0];
				xDown = firstTouch.clientX;
				yDown = firstTouch.clientY;
			}}
			onTouchMove={function handleTouchMove(evt) {
				if (!xDown || !yDown) {
					return true;
				}
				const yUp = evt.touches[0].clientY;
				const xUp = evt.touches[0].clientX;
				const xDiff = xDown - xUp;
				const yDiff = yDown - yUp;
				if (Math.abs(xDiff) > Math.abs(yDiff)) {
					/*most significant*/
					if (xDiff > 0) {
						/* left swipe */
					} else {
						/* right swipe */
					}
				} else {
					if (yDiff > 0) {
						/* down swipe */
						setTransactionsOpen("visible");
					} else {
						/* up swipe */
						setTransactionsOpen("hidden");
					}
				}
				/* reset values */
				xDown = null;
				yDown = null;
			}}
			className="card bg-primary bottom-0 absolute mb-[-1px] rounded-b-none w-full border-none"
		>
			<div className="card-body p-0 w-full h-full overflow-hidden">
				<motion.div variants={variants2} animate={transactionsOpen}>
					<Link to="/app/savings" className="flex justify-between px-8 pt-4 pb-2 w-full">
						🎉 You have saved $50 in the last 30 days <ArrowRight2 />
					</Link>
				</motion.div>
				<div className="card bg-gray-200 text-black  rounded-b-none w-full h-full border-none">
					<div className={`card-body w-full px-0 h-full overflow-auto no-scrollbar`}>
						<div
							className="w-1/4 h-1 bg-gray-300 rounded-xl mx-auto flex-shrink-0"
							onClick={() => setTransactionsOpen((e) => (e === "visible" ? "hidden" : "visible"))}
						></div>
						<h2 className="card-title px-6">Recent Transfers</h2>
						<ClientsRow Clients={RecentSenders} />
						<h2 className="card-title px-6">Transactions</h2>
						<div className="flex flex-col gap-4 px-6">
							{RecentTransactions.map((transaction, i) => (
								<Transaction key={i} {...transaction} />
							))}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
export default Panel;
