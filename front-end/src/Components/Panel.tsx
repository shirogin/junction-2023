//import { FC } from "react";
import { motion } from "framer-motion";
import { ArrowRight2 } from "iconsax-react";
import { TouchEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ClientsRow } from "./ClientsRow";
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
			className="card bg-primary bottom-0 absolute rounded-b-none w-full"
		>
			<div className="card-body p-0 w-full">
				<motion.div variants={variants2} animate={transactionsOpen}>
					<Link to="/app/savings" className="flex justify-between px-8 pt-4 pb-2 w-full">
						🎉 You have saved $50 in the last 30 days <ArrowRight2 />
					</Link>
				</motion.div>
				<div className="card bg-white text-black  rounded-b-none w-full h-full">
					<div className="card-body w-full ">
						<div
							className="w-1/4 h-1 bg-gray-300 rounded-xl mx-auto"
							onClick={() => setTransactionsOpen((e) => (e === "visible" ? "hidden" : "visible"))}
						></div>
						<h2 className="card-title">Recent Senders</h2>
						<ClientsRow Clients={RecentSenders} />
						<h2 className="card-title">Transactions</h2>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default Panel;
