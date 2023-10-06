import { useGetComingShipmentsQuery } from "@/app/backend/export/shipments";

import useStoreDesk from "@/hooks/useStoreDesk";
import { ShipmentTable } from "@/Components/Table/ShipmentTable";
import ShipmentActions from "@/Components/ShipmentActions";

function ComingShipments() {
	const { currentDesk } = useStoreDesk();
	const { isFetching, isError, data: comingData, refetch } = useGetComingShipmentsQuery({ currentDesk });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<div className="card-body relative">
				<ShipmentTable
					title="Coming in shipments"
					ActionsButtons={(selected, afterAction) => (
						<ShipmentActions track="PREPARED" selected={selected} afterAction={afterAction} />
					)}
					shipments={comingData?.data || []}
					isLoading={isFetching}
					isError={isError}
					Refetch={refetch}
				/>
			</div>
		</div>
	);
}
export default ComingShipments;
