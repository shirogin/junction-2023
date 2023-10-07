import DZD from "@/utils/Currency";

export function Transaction({
	name = "Groceries",
	date = "12/12/2021",
	amount = -35,
	icon,
}: {
	name?: string;
	date?: string;
	amount?: number;
	icon: React.ReactNode;
}) {
	return (
		<div className="flex w-full gap-4 ">
			<div className={`w-12 p-2 rounded-2xl ${amount > 0 ? "text-green-800 bg-green-200" : "text-error bg-red-200"} `}>{icon}</div>
			<div className="flex flex-col mr-auto">
				<p className="text-lg font-semibold">{name}</p>
				<p className="text-sm">{date}</p>
			</div>
			<div className="flex items-center">
				<p className={`${amount > 0 ? "text-green-800" : "text-error"} font-bold`}>{DZD.EN.format(amount)}</p>
			</div>
		</div>
	);
}
