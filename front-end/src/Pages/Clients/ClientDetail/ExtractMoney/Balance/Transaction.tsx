import { isShipmentTransaction } from "./isShipmentTransaction";
import { useState, useEffect } from "react";

import { useLang } from "@/hooks";
import ContentType from "./content/ContentType";
//import { Link } from "react-router-dom";
import Error500 from "../Errors/Error500";
import DZD from "@/utils/Currency";
import { BoxTick, MoneyAdd, MoneyChange, MoneyRecive, MoneyRemove, WalletCheck } from "iconsax-react";
function truncateText(text: string, maxLength: number) {
	if (text.length > maxLength) {
		return text.substring(0, maxLength) + "...";
	}
	return text;
}
const transactionDetail = (content: ContentType) => [
	{
		icon: <WalletCheck className="w-12 h-12" />,
		className: "bg-[#426DA9] text-white",
		title: content.transactions.details.Payment,
		valueClassName: "",
	},
	{
		icon: <MoneyAdd className="w-12 h-12" />,
		className: "bg-primary text-white",
		title: content.transactions.details.Collection,
		valueClassName: "text-primary",
	},
	{
		icon: <MoneyChange className="w-12 h-12" />,
		className: "bg-secondary text-white",
		title: content.transactions.details.Adjustment,
		valueClassName: "",
	},
	{
		icon: <MoneyRemove className="w-12 h-12" />,
		className: "bg-error text-white",
		title: content.transactions.details.Return,
		valueClassName: "",
	},
	{
		icon: <BoxTick className="w-12 h-12" />,
		className: "bg-[#5E544B] text-white",
		title: content.transactions.details.Transfer,
		valueClassName: "",
	},
	{
		icon: <MoneyRecive className="w-12 h-12" />,
		className: "bg-accent text-black",
		title: content.transactions.details.Extract,
		valueClassName: "",
	},
];
/* const useTransactionDetail = (trans: TransactionsI, content: ContentType | null) => {
	if (!content)
		return {
			className: "",
			symbol: "",
			render: () => null,
		};
	if (!isShipmentTransaction(trans))
		return {
			className: "",
			symbol: "",
			render: () => (
				<div className="py-2">
					<p className="font-bold">{content.transactions.details.Payment}</p>
				</div>
			),
		};

	return [
		{
			className: "text-error",
			symbol: "-",
			render: () => (
				<Link to={"/app/shipments/" + trans.shipment} className="py-2">
					<p className="font-bold">{content.transactions.details.Payment}</p>
					<p>{trans.description}</p>
				</Link>
			),
		},
		{
			//Collection: {
			className: "text-success",
			symbol: "+",
			render: () => (
				<div className="py-2">
					<p className="font-bold">{content.transactions.details.Collection.title}</p>
					<p>{content.transactions.details.Collection.from}</p>
					<p className="font-semibold">{trans._id}</p>
				</div>
			),
		},
		{
			//Adjustment: {
			className: "",
			symbol: "",
			render: () => (
				<div className="py-2">
					<p className="font-bold">{content.transactions.details.Adjustment}</p>
				</div>
			),
		},
		{
			//Return: {
			className: "",
			symbol: "",
			render: () => (
				<div className="py-2">
					<p className="font-bold">{content.transactions.details.Return}</p>
				</div>
			),
		},
		{
			//Transfer:
			className: "",
			symbol: "",
			render: () => (
				<div className="py-2">
					<p className="font-bold">{content.transactions.details.Transfer}</p>
					<p>{trans.receiver?.ref}</p>
				</div>
			),
		},
	][trans.type];
};
 */
export function Transaction(transaction: TransactionsI) {
	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();

	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	const currentDate = new Date(transaction.createdAt);
	if (!content) return <Error500 />;
	const Detail = transactionDetail(content)[isShipmentTransaction(transaction) ? transaction.type : 5];

	return (
		<div className="flex gap-3 px-3 py-2 rounded-2xl bg-base-100 border border-gray-400 col-span-1">
			<div className={`flex items-center justify-center rounded-2xl ${Detail.className} p-4 border flex-shrink-0 my-auto`}>
				{Detail.icon}
			</div>
			<div className="flex flex-col w-full h-full">
				<p className="font-bold">{Detail.title}</p>
				<div className="flex justify-between h-full">
					<div className="flex flex-col justify-between pt-2">
						{<p className="text-gray-600 text-xs">{truncateText(transaction.description, 80)}</p>}
						<p className="text-gray-600 text-sm font-semibold">
							{currentDate.toLocaleString(language, {
								day: "numeric",
								month: "long",
								year: "numeric",
								hour: "numeric",
								minute: "numeric",
							})}
						</p>
					</div>
					<div
						className={`flex items-center justify-end text-md font-black ${
							transaction.amount < 0 ? "text-error" : Detail.valueClassName
						}`}
					>
						<p className="whitespace-nowrap">{DZD[language].format(transaction.amount)}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
