import StackBarChart from "@/features/charts/components/StackBarChart";
import useNavbar from "@/hooks/useNavbar";
import usePageTitle from "@/hooks/usePageTitle";
import DZD from "@/utils/Currency";
import { ArrowDown, ArrowDown2, ArrowRight2, ArrowUp } from "iconsax-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Spending() {
	usePageTitle("Spending");
	const { setIsOpen } = useNavbar();
	useEffect(() => {
		setIsOpen(true);
		// scroll to the bottom of the chat

		return () => {
			setIsOpen(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div className="flex justify-between w-full px-6">
				<div className="flex flex-col gap-1">
					<p className="text-md font-semibold">Total Spending</p>
					<p className="text-xs">{DZD.EN.format(15205.27)}</p>
				</div>
				<div className="flex flex-col gap-2">
					<button className="btn btn-sm">
						Oct-Nov <ArrowDown2 />
					</button>
				</div>
			</div>
			<div className="px-6 mt-8">
				<StackBarChart />
			</div>
			<div className="px-6 mt-8">
				<Link to="#" className="flex rounded-2xl bg-primary gap-2 p-4  justify-between">
					<div>🎯</div>
					<div className="flex flex-col mr-auto">
						<p className="text-md font-semibold">Budget</p>
						<p className="text-xs">You are doing great in terms of respecting your spending, keep it up !</p>
					</div>
					<ArrowRight2 className="self-center w-5 h-5" />
				</Link>
			</div>
			<div className="px-6 mt-4">
				<div className="flex rounded-2xl bg-white text-black gap-2 p-4 justify-between">
					<div>🏆</div>
					<div className="flex flex-col mr-auto">
						<p className="text-md font-semibold">Spending limit</p>
						<p className="text-xs">Monthly transaction limit</p>
					</div>
					<h1 className="font-bold self-center">{DZD.EN.format(15000)}</h1>
					<ArrowDown2 className={`self-center w-5 h-5 `} />
				</div>
			</div>
			<div className="pt-4 mt-auto w-full">
				<div className="flex flex-col rounded-2xl bg-gray-200 text-black gap-2 py-4 justify-between h-full rounded-b-none mb-[-10px] w-full">
					<div className="flex flex-col mr-auto flex-shrink-0 px-4">
						<p className="text-xl font-semibold">Categories</p>
						<p className="text-xs">Spending by Category</p>
					</div>
					<div className="h-full flex overflow-scroll no-scrollbar gap-4 w-full px-4 mt-4">
						<CategoryCard />
						<CategoryCard
							amount={500}
							category="Transportation"
							icon={<ArrowUp className="text-green-800" />}
							className="bg-green-300"
							message={
								<>
									You Saved <span className="text-success font-bold">{DZD.EN.format(700)}</span> you set for this category
								</>
							}
							image="/bus.png"
						/>
					</div>
				</div>
			</div>

			{/* <div className="px-6 mt-8">
				<div className="flex justify-between">
					<p className="text-md font-semibold">Spending by Category</p>
					<p className="text-xs">Oct-Nov</p>
				</div>
				<div className="flex flex-col gap-2 mt-4">
					<div className="flex justify-between">
						<p className="text-sm">Food</p>
						<p className="text-sm">{DZD.EN.format(15205.27)}</p>
					</div>
					<div className="flex justify-between">
						<p className="text-sm">Transport</p>
						<p className="text-sm">{DZD.EN.format(15205.27)}</p>
					</div>
					<div className="flex justify-between">
						<p className="text-sm">Shopping</p>
						<p className="text-sm">{DZD.EN.format(15205.27)}</p>
					</div>
					<div className="flex justify-between">
						<p className="text-sm">Entertainment</p>
						<p className="text-sm">{DZD.EN.format(15205.27)}</p>
					</div>
					<div className="flex justify-between">
						<p className="text-sm">Bills</p>
						<p className="text-sm">{DZD.EN.format(15205.27)}</p>
					</div>
					<div className="flex justify-between">
						<p className="text-sm">Others</p>
						<p className="text-sm">{DZD.EN.format(15205.27)}</p>
					</div>
				</div>
			</div> */}
		</>
	);
}
function CategoryCard({
	category = "Housing",
	amount = 8000,
	className = "bg-red-300",
	icon = <ArrowDown className="text-error" />,
	image = "/house.png",
	message = (
		<>
			You exceeded the <span className="text-error font-bold">{DZD.EN.format(1200)}</span> you set for this category
		</>
	),
}: {
	category?: string;
	amount?: number;
	className?: string;
	icon?: JSX.Element;
	image?: string;
	message?: JSX.Element;
}) {
	return (
		<div className="card shadow bg-white w-80 flex-shrink-0">
			<div className="card-body px-6 pt-4 pb-6">
				<div className="flex justify-between">
					<h3 className="text-left">{category}</h3>
					<h3 className="text-right font-semibold">{DZD.EN.format(amount)}</h3>
				</div>
				<div className="flex justify-between gap-2">
					<div className={`${className} rounded-full p-2 my-auto`}>{icon}</div>
					<p className="text-left text-sm">{message}</p>
					<img src={image} className="w-8 h-8 my-auto" />
				</div>
			</div>
		</div>
	);
}
