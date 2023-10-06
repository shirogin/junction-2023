import ShipmentActions from "@/Components/ShipmentActions";
import { ShipmentTable } from "@/Components/Table/ShipmentTable";
import { useGetCanceledInHoldShipmentsQuery } from "@/app/backend/export/shipments";

import useStoreDesk from "@/hooks/useStoreDesk";

export default function CanceledInHold() {
	const { currentDesk } = useStoreDesk();
	const { isFetching, isError, data, refetch } = useGetCanceledInHoldShipmentsQuery({ currentDesk });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<div className="card-body relative">
				<ShipmentTable
					title="Canceled In storage"
					ActionsButtons={(selected, afterAction) => (
						<ShipmentActions track="CANCELED_IN_HOLD" selected={selected} afterAction={afterAction} />
					)}
					shipments={data?.data || []}
					isLoading={isFetching}
					isError={isError}
					Refetch={refetch}
				/>
			</div>
		</div>
	);
}
