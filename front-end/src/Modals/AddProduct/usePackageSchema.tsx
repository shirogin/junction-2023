import * as Yup from "yup";
import ContentType from "./content/ContentType";
import { useEffect, useState } from "react";
import { useLang } from "@/hooks";

export function usePackageSchema() {
	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();
	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);
	return Yup.object().shape({
		name: Yup.string()
			.min(3, content?.package.name.error[1])
			.max(35, content?.package.name.error[2])
			.required(content?.package.name.error[0]),
		sku: Yup.string()
			.min(3, content?.package.sku.error[1])
			.max(35, content?.package.sku.error[2])
			.required(content?.package.sku.error[0]),
		description: Yup.string().required(content?.package.description.error[0]),
		type: Yup.string()
			.trim(content?.package.type.error[1])
			.min(3, content?.package.type.error[2])
			.required(content?.package.type.error[0]),
		price: Yup.number()
			.min(100, content?.payment.price.error[1])
			.max(150000, content?.payment.price.error[2])
			.required(content?.payment.price.error[0]),
		width: Yup.number()
			.min(1, content?.package.width.error[1])
			.max(100, content?.package.width.error[2])
			.required(content?.package.width.error[0]),
		height: Yup.number()
			.min(1, content?.package.height.error[1])
			.max(100, content?.package.height.error[2])
			.required(content?.package.height.error[0]),
		length: Yup.number()
			.min(1, content?.package.length.error[1])
			.max(100, content?.package.length.error[2])
			.required(content?.package.length.error[0]),
		weight: Yup.number()
			.min(0.01, content?.package.weight.error[1])
			.max(100, content?.package.weight.error[2])
			.required(content?.package.weight.error[0]),
	});
}
