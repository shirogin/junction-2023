import usePageTitle from "@/hooks/usePageTitle";
import { useGetPaymentQuery, useUpdatePaymentMutation } from "@/app/backend/export/payment";
import useStoreDesk from "@/hooks/useStoreDesk";
import Fallback from "@/Components/Fallback";
import { useNotification } from "@/hooks";
import ZonesFeesSettings from "@/Components/PaymentSettings/ZonesFeesSettings";
import { useEffect, useState } from "react";
import DefaultFee from "../../../Components/PaymentSettings/DefaultFee";
import { LiaRedoAltSolid } from "react-icons/lia";
function getFeesZones(zones: ZonesI[]) {
	return Array(Math.max(...zones.map((zone) => zone.fee_zone))).fill(0);
}

function ZonesFees() {
	usePageTitle("Payment Setting");
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	const { data, isError, isLoading, refetch } = useGetPaymentQuery({
		refId: currentDesk,
		refType: "Desk",
		select: "zones fees defaultFee",
	});
	const [UpdatePayment] = useUpdatePaymentMutation();
	const [defaultFee, setDefaultFee] = useState<PaymentFeeI>({ desk: 200, door: 300 });
	const [fees, setFees] = useState<PaymentFeeI[]>([]);
	useEffect(() => {
		if (data) {
			if (data.data.defaultFee) {
				setDefaultFee(data.data.defaultFee);
			}
			if (data.data.zones) {
				setFees(getFeesZones(data.data.zones).map((_, i) => data.data.fees[i] || data.data.defaultFee));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	useEffect(() => {
		if (data?.data.zones) setFees(getFeesZones(data.data.zones).map((_, i) => data.data.fees[i] || defaultFee));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultFee]);

	if (isLoading) return <Fallback />;
	if (isError || !data) return <div>Error</div>;
	return (
		<div className="w-full card bg-base-100 shadow-xl relative">
			<button className="btn px-6 normal-case btn-sm absolute top-4 right-4 " onClick={() => refetch()}>
				<LiaRedoAltSolid className="h-4 w-4" />
			</button>
			<DefaultFee
				defaultFee={defaultFee}
				onSubmit={async (defaultFee) => {
					return UpdatePayment({ refId: currentDesk, refType: "Desk", paymentSetting: { defaultFee } })
						.unwrap()
						.then((res) => {
							setDefaultFee(defaultFee);
							Notify("Saving Zones", res.message);
						})
						.catch((err) => {
							Errofy("Saving Zones", err);
						});
				}}
			/>
			{fees.length === 0 ? (
				<div className="card-body">No zones found</div>
			) : (
				<ZonesFeesSettings
					fees={fees}
					onSubmit={async (fees) => {
						return UpdatePayment({ refId: currentDesk, refType: "Desk", paymentSetting: { fees } })
							.unwrap()
							.then((res) => {
								Notify("Saving Zones", res.message);
							})
							.catch((err) => {
								Errofy("Saving Zones", err);
							});
					}}
				/>
			)}
		</div>
	);
}
export default ZonesFees;
