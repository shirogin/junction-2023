import { useState, useEffect } from "react";
import Error500 from "../Errors/Error500";
import { useLang } from "@/hooks";
import ContentType from "./content/ContentType";
import { Transaction } from "./Transaction";

const toAdd = 6;

export default function Transactions({ transactions }: { transactions: TransactionsI[] }) {
	const [limit, setLimit] = useState(Math.min(toAdd, transactions.length));
	const showMore = transactions.length > limit;
	useEffect(() => {
		setLimit(Math.min(toAdd, transactions.length));
	}, [transactions]);

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
		<div className="w-full flex flex-col gap-6">
			<h1 className="text-5xl text-center font-black mb-6">{content.transactions.title}</h1>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				{transactions
					.filter((_, i) => i < limit)
					.map((transaction) => (
						<Transaction key={transaction._id} {...transaction} />
					))}
			</div>
			{showMore ? (
				<button
					className="btn btn-outline btn-primary"
					onClick={() => {
						const newLimit = limit + toAdd;
						setLimit(Math.min(newLimit, transactions.length));
					}}
				>
					{content.transactions.more}
				</button>
			) : null}
		</div>
	);
}
