import ContentType from "./content/ContentType";
import { useEffect, useState } from "react";
import { useLang } from "@/hooks";
import Error500 from "@/Pages/Errors/Error500";
import { Box } from "iconsax-react";

type Props = { packageInfos: ProductI; finalPrice: number };

function ProductDetails({ packageInfos, finalPrice }: Props) {
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
		<>
			<h1 className="text-3xl font-bold m-8">
				{content.productDetails.title} '{packageInfos.name}'
			</h1>
			<div className="card bg-secondary">
				<div className="card-body  text-neutral-content">
					<div className="grid grid-cols-1 md:grid-cols-4 pb-4 justify-between w-full">
						<div>
							<div className="flex items-center gap-3 ">
								<Box className="w-4 h-4" />
								<p className="text-sm font-bold">{content.productDetails.id}</p>
							</div>
							<p className="ml-7 text-[#9e716d] break-words">{packageInfos._id}</p>
						</div>
						<div>
							<div className="flex items-center gap-3 ">
								<Box className="w-4 h-4" />
								<p className="text-sm font-bold">SKU</p>
							</div>
							<p className="ml-7 text-[#9e716d]">{packageInfos.sku}</p>
						</div>
						<div className="md:col-span-2">
							<div className="flex items-center gap-3 ">
								<Box className="w-4 h-4" />
								<p className="text-sm font-bold">{content.productDetails.description} </p>
							</div>
							<p className="ml-7 text-[#9e716d]">{packageInfos.description}</p>
						</div>
					</div>
					<div className="grid grid-cols-1  md:grid-cols-4 border-t border-t-base-200 pt-8  justify-between w-full">
						<div>
							<div className="flex items-center gap-3">
								<Box className="w-4 h-4" />
								<p className="text-sm font-bold">{content.productDetails.type}</p>
							</div>
							<p className="ml-7 text-[#9e716d]">{packageInfos.type}</p>
						</div>
						<div>
							<div className="flex items-center gap-3">
								<Box className="w-4 h-4" />
								<p className="text-sm font-bold">{content.productDetails.Measurements.title} </p>
							</div>
							<div className="flex justify-start ml-7 text-[#9e716d] ">
								<p className="">
									{content.productDetails.Measurements.d}: {packageInfos.height} x {packageInfos.width} x{" "}
									{packageInfos.length} {content.productDetails.Measurements.cm} / {content.productDetails.Measurements.w}
									: {packageInfos.weight} {content.productDetails.Measurements.kg}
								</p>
							</div>
						</div>
						<div>
							<div className="flex items-center gap-3">
								<Box className="w-4 h-4" />

								<p className="text-sm font-bold">{content.productDetails.value.title}</p>
							</div>
							<p className="ml-7 text-[#9e716d] ">
								{packageInfos.price} {content.productDetails.value.currency}
							</p>
						</div>
						<div>
							<div className="flex items-center gap-3 ">
								<Box className="w-4 h-4" />
								<p className="text-sm font-bold">{content.productDetails.price.title}</p>
							</div>
							<p className="ml-7 text-[#9e716d]">
								{finalPrice} {content.productDetails.price.currency}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProductDetails;
