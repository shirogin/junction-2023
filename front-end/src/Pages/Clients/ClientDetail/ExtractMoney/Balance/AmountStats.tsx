import { MoneyAdd, MoneyChange, MoneyRecive, MoneyRemove, MoneySend, WalletMoney } from "iconsax-react";
import { MoneyCard } from "./MoneyCard";
import { useLang } from "@/hooks";
import ContentType from "./content/ContentType";
import { useEffect, useState } from "react";
import DZD from "@/utils/Currency";
import Error500 from "@/Pages/Errors/Error500";

export default function AmountStats({ balanceInfo }: { balanceInfo: BalanceI }) {
	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();

	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);
	if (!content) return <Error500 />;

	return (
		<div className="w-full flex flex-col gap-3">
			<MoneyCard
				{...{
					title: content.stats.balance,
					value: DZD[language].format(balanceInfo.balance),
					icon: <MoneySend className="w-8 h-8" />,
					column: true,
				}}
			/>
			<div className="grid grid-cols-1 xl:grid-cols-3 text-base-100 flex-wrap gap-3 w-full">
				<MoneyCard
					{...{
						title: content.stats.currently,
						value: DZD[language].format(balanceInfo.upsTransferredValue),
						color: "bg-secondary hover:bg-secondary-focus ring-accent",
						icon: <MoneyChange className="w-8 h-8" />,
					}}
				/>

				<MoneyCard
					{...{
						title: content.stats.collected,
						value: DZD[language].format(balanceInfo.upsCollectedValue),
						color: "bg-accent hover:bg-accent-focus text-black ring-black",
						icon: <WalletMoney className="w-8 h-8" />,
					}}
				/>
				<MoneyCard
					{...{
						title: content.stats.returned,
						value: DZD[language].format(balanceInfo.returnedValue),
						color: "bg-error hover:bg-red-800  ring-black",
						icon: <MoneyRemove className="w-8 h-8" />,
					}}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 text-base-100 flex-wrap gap-3 w-full">
				<MoneyCard
					{...{
						title: content.stats.extracted,
						value: DZD[language].format(balanceInfo.extractedValue),
						color: "bg-info text-black hover:bg-blue-400  ring-black",
						icon: <MoneyRecive className="w-8 h-8" />,
					}}
				/>
				<MoneyCard
					{...{
						title: content.stats.gained,
						value: DZD[language].format(balanceInfo.gainedValue),
						color: "bg-green-600 text-black hover:bg-green-400  ring-black",
						icon: <MoneyAdd className="w-8 h-8" />,
					}}
				/>
			</div>
		</div>
	);
}
