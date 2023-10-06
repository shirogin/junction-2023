import { lazy } from "react";

const IntegrationChecker = lazy(() => import("./IntegrationChecker"));
const PaymentMethod = lazy(() => import("./PaymentMethod"));
export default function Integration({ client }: { client: ClientI }) {
	return (
		<div className="flex flex-col">
			<IntegrationChecker client={client} />
			<div className="mt-4">
				<h1 className="text-2xl font-black text-center">Payment Method</h1>
				<PaymentMethod client={client} />
			</div>
		</div>
	);
}
