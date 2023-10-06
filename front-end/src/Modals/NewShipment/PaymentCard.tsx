import { useLang } from "@/hooks";
import { Bill, DollarSquare, TruckFast } from "iconsax-react";
import { useEffect, useState } from "react";
import ContentType from "./content/ContentType";
import Error500 from "@/Pages/Errors/Error500";

function PaymentCard({ price }: { price: number; id: string }) {
	/* useEffect(() => {
		console. log(id);
	}, [id]); */

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
		<div className="card bg-base-100 border mt-2 shadow-sm">
			<div className="card-body grid grid-cols-1 md:grid-cols-3 justify-between w-full">
				<div>
					<div className="flex gap-3 ">
						<DollarSquare className="w-4 h-4 mt-1" />
						<p className="text-sm font-bold">{content.paymentCard.value}</p>
					</div>
					<p className="ml-8 break-words">{price}</p>
				</div>
				<div>
					<div className="flex gap-3 ">
						<TruckFast className="w-4 h-4 mt-1" />
						<p className="text-sm font-bold">{content.paymentCard.price}</p>
					</div>
					<p className="ml-8 break-words"></p>
				</div>
				<div>
					<div className="flex gap-3 ">
						<Bill className="w-4 h-4 mt-1" />
						<p className="text-sm font-bold">{content.paymentCard.total}</p>
					</div>
					<p className="ml-8">({content.paymentCard.currency})</p>
				</div>
			</div>
		</div>
	);
}

export default PaymentCard;
