import usePageTitle from "@/hooks/usePageTitle";
import { useGetPaymentQuery, useUpdatePaymentMutation } from "@/app/backend/export/payment";
import useStoreDesk from "@/hooks/useStoreDesk";
import Fallback from "@/Components/Fallback";
import { useNotification } from "@/hooks";
import { useEffect, useState } from "react";

import { LiaRedoAltSolid } from "react-icons/lia";
import DefaultWeightFee from "@/Components/PaymentSettings/DefaultWeightFee";
import WeightZonesFeesSettings from "@/Components/PaymentSettings/WeightZonesFeesSettings";
function getWeightFeesZones(zones: ZonesI[]) {
	return Array(Math.max(...zones.map((zone) => zone.weight_zone))).fill(0);
}

function WeightZonesFees() {
	usePageTitle("Payment Setting");
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	const { data, isError, isLoading, refetch } = useGetPaymentQuery({
		refId: currentDesk,
		refType: "Desk",
		select: "zones additionalWeightFees defaultAdditionalWeightFee",
	});
	const [UpdatePayment] = useUpdatePaymentMutation();
	const [defaultFee, setDefaultFee] = useState<number>(50);
	const [fees, setFees] = useState<number[]>([]);
	useEffect(() => {
		if (data) {
			if (data.data.defaultFee) {
				setDefaultFee(data.data.defaultAdditionalWeightFee);
			}
			if (data.data.zones) {
				setFees(
					getWeightFeesZones(data.data.zones).map(
						(_, i) => data.data.additionalWeightFees[i] || data.data.defaultAdditionalWeightFee
					)
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	useEffect(() => {
		if (data?.data.zones) setFees(getWeightFeesZones(data.data.zones).map((_, i) => data.data.additionalWeightFees[i] || defaultFee));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultFee]);

	if (isLoading) return <Fallback />;
	if (isError || !data) return <div>Error</div>;
	return (
		<div className="w-full card bg-base-100 shadow-xl relative">
			<button className="btn px-6 normal-case btn-sm absolute top-4 right-4 " onClick={() => refetch()}>
				<LiaRedoAltSolid className="h-4 w-4" />
			</button>
			<DefaultWeightFee
				defaultFee={defaultFee}
				onSubmit={async (defaultAdditionalWeightFee) => {
					return UpdatePayment({ refId: currentDesk, refType: "Desk", paymentSetting: { defaultAdditionalWeightFee } })
						.unwrap()
						.then((res) => {
							setDefaultFee(defaultAdditionalWeightFee);
							Notify("Saving Zones", res.message);
						})
						.catch((err) => {
							Errofy("Saving Zones", err);
						});
				}}
			/>
			<WeightZonesFeesSettings
				fees={fees}
				onSubmit={async (additionalWeightFees) => {
					return UpdatePayment({ refId: currentDesk, refType: "Desk", paymentSetting: { additionalWeightFees } })
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
export default WeightZonesFees;