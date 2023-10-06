import usePageTitle from "@/hooks/usePageTitle";
import useProvinces from "@/hooks/useProvinces";
import ZonesSettings from "@/Components/PaymentSettings/ZonesSettings";
import { useGetPaymentQuery, useUpdatePaymentMutation } from "@/app/backend/export/payment";

import Fallback from "@/Components/Fallback";
import { useNotification } from "@/hooks";

export default function ZonesProvinces({ clientId }: { clientId: string }) {
	usePageTitle("Payment Setting");

	const { Notify, Errofy } = useNotification();
	const { data, isFetching } = useGetPaymentQuery({ refId: clientId, refType: "User", select: "zones" });
	const [UpdatePayment] = useUpdatePaymentMutation();
	const provinces = useProvinces();

	if (isFetching) return <Fallback />;

	const zones: ZonesProvincesI[] = provinces.map((province, i) => ({
		province: province.name["EN"],
		province_code: province.id,
		fee_zone: data?.data.zones[i].fee_zone || 1,
		weight_zone: data?.data.zones[i].weight_zone || 1,
	}));
	console.log({ zones });

	return (
		<ZonesSettings
			zones={zones}
			onSubmit={async (zones) => {
				return UpdatePayment({ refId: clientId, refType: "User", paymentSetting: { zones } })
					.unwrap()
					.then((res) => {
						Notify("Saving Zones", res.message);
					})
					.catch((err) => {
						Errofy("Saving Zones", err);
					});
			}}
		/>
	);
}
