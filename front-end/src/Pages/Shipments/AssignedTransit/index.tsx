import ShipmentActions from "@/Components/ShipmentActions";
import { ShipmentTable } from "@/Components/Table/ShipmentTable";
import { useGetAssignedTransitShipmentsQuery } from "@/app/backend/export/shipments";

import useStoreDesk from "@/hooks/useStoreDesk";

export default function AssignedTransit() {
	const { currentDesk } = useStoreDesk();
	const { isFetching, isError, data, refetch } = useGetAssignedTransitShipmentsQuery({ currentDesk });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<div className="card-body relative">
				<ShipmentTable
					title="Assigned transit shipments"
					ActionsButtons={(selected, afterAction) => (
						<ShipmentActions track="ASSIGNED_TRANSIT" selected={selected} afterAction={afterAction} />
					)}
					shipments={data?.data || []}
					isLoading={isFetching}
					isError={isError}
					Refetch={refetch}
				/>{" "}
			</div>
		</div>
	);
}
