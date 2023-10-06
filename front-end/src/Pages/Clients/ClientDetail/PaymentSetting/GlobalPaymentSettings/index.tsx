import usePageTitle from "@/hooks/usePageTitle";
import { useGetPaymentQuery, useUpdatePaymentMutation } from "@/app/backend/export/payment";

import Fallback from "@/Components/Fallback";
import { useNotification } from "@/hooks";

import { LiaRedoAltSolid } from "react-icons/lia";

import GlobalSettings from "@/Components/PaymentSettings/GlobalSettings";

function GlobalPaymentSettings({ clientId }: { clientId: string }) {
	usePageTitle("Payment Setting");

	const { Notify, Errofy } = useNotification();
	const { data, isError, isFetching, refetch } = useGetPaymentQuery({
		refId: clientId,
		refType: "User",
		select: "globalCommission globalAssurance maxDefaultWeight",
	});
	const [UpdatePayment] = useUpdatePaymentMutation();

	if (isFetching) return <Fallback />;
	if (isError || !data) return <div>Error</div>;
	return (
		<>
			<button className="btn px-6 normal-case btn-sm absolute top-4 right-4 " onClick={() => refetch()}>
				<LiaRedoAltSolid className="h-4 w-4" />
			</button>
			<GlobalSettings
				payment={data.data}
				onSubmit={async (settings) => {
					return UpdatePayment({ refId: clientId, refType: "User", paymentSetting: { ...settings } })
						.unwrap()
						.then((res) => {
							Notify("Saving Zones", res.message);
						})
						.catch((err) => {
							Errofy("Saving Zones", err);
						});
				}}
			/>
		</>
	);
}

export default GlobalPaymentSettings;
