import { useEffect, useState } from "react";

import { useLang } from "@/hooks";
import ContentType from "./content/ContentType";
import Error500 from "@/Pages/Errors/Error500";

export function MoneyCard({
	title,
	value,
	color,
	icon,
	column = false,
}: {
	title: string;
	value: string;
	column?: boolean;
	color?: string;
	icon: JSX.Element;
}) {
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
		<div className={`card flex ${color || "bg-primary hover:bg-primary-focus text-base-100"} transition-colors cursor-pointer w-full`}>
			<div className={`card-body w-full justify-center ${column ? "" : "flex-row"} items-center`}>
				<span className="rounded-full bg-base-100 text-black p-3 flex-shrink-0 my-auto">{icon}</span>
				<div>
					<div className={`text-sm font-bold ${column ? "text-center" : ""}`}>{title}</div>
					<div className="card-title text-3xl font-black whitespace-nowrap">{value}</div>
				</div>
			</div>
		</div>
	);
}
