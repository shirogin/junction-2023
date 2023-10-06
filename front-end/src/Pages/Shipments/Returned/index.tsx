import ShipmentActions from "@/Components/ShipmentActions";
import { ShipmentTable } from "@/Components/Table/ShipmentTable";
import { useGetReturnedShipmentsQuery } from "@/app/backend/export/shipments";

import useStoreDesk from "@/hooks/useStoreDesk";

export default function Returned() {
	const { currentDesk } = useStoreDesk();
	const { refetch, isFetching, isError, data } = useGetReturnedShipmentsQuery({ currentDesk });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<div className="card-body relative">
				<ShipmentTable
					title="Returned shipments"
					ActionsButtons={(selected, afterAction) => (
						<ShipmentActions track="RETURNED" selected={selected} afterAction={afterAction} />
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
