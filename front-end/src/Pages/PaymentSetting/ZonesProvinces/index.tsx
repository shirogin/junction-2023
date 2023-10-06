import usePageTitle from "@/hooks/usePageTitle";
import useProvinces from "@/hooks/useProvinces";
import ZonesSettings from "@/Components/PaymentSettings/ZonesSettings";
import { useGetPaymentQuery, useUpdatePaymentMutation } from "@/app/backend/export/payment";

import useStoreDesk from "@/hooks/useStoreDesk";
import Fallback from "@/Components/Fallback";
import { useNotification } from "@/hooks";

export default function ZonesProvinces() {
	usePageTitle("Payment Setting");
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	const { data, isLoading } = useGetPaymentQuery({ refId: currentDesk, refType: "Desk", select: "zones" });
	const [UpdatePayment] = useUpdatePaymentMutation();
	const provinces = useProvinces();

	if (isLoading) return <Fallback />;

	const zones: ZonesProvincesI[] = provinces.map((province, i) => ({
		province: province.name["EN"],
		province_code: province.id,
		fee_zone: data?.data.zones[i].fee_zone || 1,
		weight_zone: data?.data.zones[i].weight_zone || 1,
	}));
	console.log({ zones });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<ZonesSettings
				zones={zones}
				onSubmit={async (zones) => {
					return UpdatePayment({ refId: currentDesk, refType: "Desk", paymentSetting: { zones } })
						.unwrap()
						.then((res) => {
							Notify("Saving Zones", res.message);
						})
						.catch((err) => {
							Errofy("Saving Zones", err);
						});
				}}
			/>
		</div>
	);
}
