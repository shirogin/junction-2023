import usePageTitle from "@/hooks/usePageTitle";
import { useGetPaymentQuery, useUpdatePaymentMutation } from "@/app/backend/export/payment";
import useStoreDesk from "@/hooks/useStoreDesk";
import Fallback from "@/Components/Fallback";
import { useNotification } from "@/hooks";

import { LiaRedoAltSolid } from "react-icons/lia";

import GlobalSettings from "@/Components/PaymentSettings/GlobalSettings";

function GlobalPaymentSettings() {
	usePageTitle("Payment Setting");
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	const { data, isError, isLoading, refetch } = useGetPaymentQuery({
		refId: currentDesk,
		refType: "Desk",
		select: "globalCommission globalAssurance maxDefaultWeight",
	});
	const [UpdatePayment] = useUpdatePaymentMutation();

	if (isLoading) return <Fallback />;
	if (isError || !data) return <div>Error</div>;
	return (
		<div className="w-full card bg-base-100 shadow-xl relative">
			<button className="btn px-6 normal-case btn-sm absolute top-4 right-4 " onClick={() => refetch()}>
				<LiaRedoAltSolid className="h-4 w-4" />
			</button>
			<GlobalSettings
				payment={data.data}
				onSubmit={async (settings) => {
					return UpdatePayment({ refId: currentDesk, refType: "Desk", paymentSetting: { ...settings } })
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

export default GlobalPaymentSettings;
