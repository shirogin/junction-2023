import ShipmentActions from "@/Components/ShipmentActions";
import { ShipmentTable } from "@/Components/Table/ShipmentTable";
import { useGetDeliveredShipmentsQuery } from "@/app/backend/export/shipments";
import useStoreDesk from "@/hooks/useStoreDesk";

export default function Delivered() {
	const { currentDesk } = useStoreDesk();
	const { isFetching, refetch, isError, data } = useGetDeliveredShipmentsQuery({ currentDesk });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<div className="card-body relative">
				<ShipmentTable
					title="Delivered shipments"
					ActionsButtons={(selected, afterAction) => (
						<ShipmentActions track="DELIVERED" selected={selected} afterAction={afterAction} />
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
