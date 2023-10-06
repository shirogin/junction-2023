import Fallback from "@/Components/Fallback";
import { Suspense, lazy, useState } from "react";

const ZonesProvinces = lazy(() => import("./ZonesProvinces"));
const ZonesFees = lazy(() => import("./ZonesFees"));
const WeightZonesFees = lazy(() => import("./WeightZonesFees"));
const GlobalPaymentSettings = lazy(() => import("./GlobalPaymentSettings"));

export default function PaymentSettings({ clientId }: { clientId: string }) {
	const [currentTab, setCurrentTab] = useState(0);
	const tabs = [
		{
			title: "Zones & Provinces",
			render: () => {
				return <ZonesProvinces clientId={clientId} />;
			},
		},
		{
			title: "Zones fees",
			render: () => {
				return <ZonesFees clientId={clientId} />;
			},
		},
		{
			title: "Additional weight fees",
			render: () => {
				return <WeightZonesFees clientId={clientId} />;
			},
		},
		{
			title: "Global settings",
			render: () => {
				return <GlobalPaymentSettings clientId={clientId} />;
			},
		},
	];
	return (
		<div className="w-full flex flex-col">
			<h1 className="text-2xl">Payment Settings</h1>
			<div className="tabs mx-auto">
				{tabs.map((tab, i) => {
					return (
						<a
							key={i}
							className={`tab tab-bordered ${i === currentTab ? "tab-active" : ""}`}
							onClick={() => {
								setCurrentTab(i);
							}}
						>
							{tab.title}
						</a>
					);
				})}
			</div>

			<Suspense fallback={<Fallback />}>{tabs[currentTab].render()}</Suspense>
		</div>
	);
}
