import { BuilderI } from "@/types/redux";

export default function product(builder: BuilderI) {
	return {
		getProductById: builder.query<ResponseI<ProductI>, string>({
			query: (productId) => ({
				url: `/admin/product/${productId}`,
				method: "GET",
			}),
		}),
	};
}
