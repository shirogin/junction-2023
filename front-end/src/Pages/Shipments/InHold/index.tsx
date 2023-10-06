import ShipmentActions from "@/Components/ShipmentActions";
import { ShipmentTable } from "@/Components/Table/ShipmentTable";
import { useGetInHoldShipmentsQuery } from "@/app/backend/export/shipments";

import useStoreDesk from "@/hooks/useStoreDesk";

export default function InHoldShipments() {
	const { currentDesk } = useStoreDesk();
	const { isFetching, refetch, isError, data } = useGetInHoldShipmentsQuery({ currentDesk });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<div className="card-body relative">
				<ShipmentTable
					title="In stock shipments"
					ActionsButtons={(selected, afterAction) => (
						<ShipmentActions track="IN_HOLD" selected={selected} afterAction={afterAction} />
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
