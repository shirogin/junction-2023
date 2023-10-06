import { Suspense } from "react";
import { useGetUserDataMutation } from "@/app/backend/export/auth";
import { useEffectOnce, useUser } from "@/hooks";
import Notifications from "@/Components/Notifications";
import Fallback from "@/Components/Fallback";
import Router from "@/Routes";
import "@/App.css";
import useStoreDesk from "./hooks/useStoreDesk";
declare global {
	interface Window {
		Label_IDS?: string[];
		Label_TRACK_IDS?: string[];
		contract?: ContractI;
		shipmentContract?: ShipmentI;
		shipmentsContract?: ShipmentI[];
	}
}

function App() {
	const [GetUserData] = useGetUserDataMutation();
	const { setUser, removeUser } = useUser();
	const { setDesks, removeDesk } = useStoreDesk();

	useEffectOnce(() => {
		GetUserData()
			.unwrap()
			.then((response) => {
				setDesks(response.data.desks);
				setUser(response.data);
			})
			.catch(() => {
				removeDesk();
				removeUser();
			});
	});
	return (
		<>
			<Suspense fallback={<Fallback />}>
				<Router />
			</Suspense>
			<Notifications />
		</>
	);
}

export default App;
