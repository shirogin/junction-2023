import usePageTitle from "@/hooks/usePageTitle";
import { useGetPaymentQuery, useUpdatePaymentMutation } from "@/app/backend/export/payment";
import Fallback from "@/Components/Fallback";
import { useNotification } from "@/hooks";
import ZonesFeesSettings from "@/Components/PaymentSettings/ZonesFeesSettings";
import { useEffect, useState } from "react";
import DefaultFee from "@/Components/PaymentSettings/DefaultFee";
import { LiaRedoAltSolid } from "react-icons/lia";
import Error500 from "@/Pages/Errors/Error500";
function getFeesZones(zones: ZonesI[]) {
	return Array(Math.max(...zones.map((zone) => zone.fee_zone))).fill(0);
}

function ZonesFees({ clientId }: { clientId: string }) {
	usePageTitle("Payment Setting");

	const { Notify, Errofy } = useNotification();
	const { data, isError, isFetching, refetch } = useGetPaymentQuery({
		refId: clientId,
		refType: "User",
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

	if (isFetching) return <Fallback />;
	if (isError || !data) return <Error500 />;
	return (
		<>
			<button className="btn px-6 normal-case btn-sm absolute top-4 right-4 " onClick={() => refetch()}>
				<LiaRedoAltSolid className="h-4 w-4" />
			</button>
			<DefaultFee
				defaultFee={defaultFee}
				onSubmit={async (defaultFee) => {
					return UpdatePayment({ refId: clientId, refType: "User", paymentSetting: { defaultFee } })
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
						return UpdatePayment({ refId: clientId, refType: "User", paymentSetting: { fees } })
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
		</>
	);
}
export default ZonesFees;
