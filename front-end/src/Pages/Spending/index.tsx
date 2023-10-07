import usePageTitle from "@/hooks/usePageTitle";
import DZD from "@/utils/Currency";
import { ArrowDown2 } from "iconsax-react";

export default function Spending() {
	usePageTitle("Spending");
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
		</>
	);
}
