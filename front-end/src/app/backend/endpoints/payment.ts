import { BuilderI } from "@/types/redux";

interface PaymentSettingUpdateI {
	paymentSetting: Partial<PaymentSettingI>;
	refId: string;
	refType?: string;
}
export default function payment(builder: BuilderI) {
	return {
		getPayment: builder.query<ResponseI<PaymentSettingI>, { refId: string; refType?: string; select?: string }>({
			query: ({ refId, refType, select }) => {
				// query string
				const query = new URLSearchParams({ refId, refType: refType || "", select: select || "" }).toString();
				return {
					url: `/admin/payment?${query}`,
					method: "GET",
				};
			},
		}),
		updatePayment: builder.mutation<ResponseI<PaymentSettingI>, PaymentSettingUpdateI>({
			query: (body) => ({
				url: `/admin/payment`,
				method: "PUT",
				body,
			}),
		}),
	};
}
