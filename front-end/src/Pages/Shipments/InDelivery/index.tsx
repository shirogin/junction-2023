import ShipmentActions from "@/Components/ShipmentActions";
import { ShipmentTable } from "@/Components/Table/ShipmentTable";
import { useGetInDeliveryShipmentsQuery } from "@/app/backend/export/shipments";

import useStoreDesk from "@/hooks/useStoreDesk";

export default function InDelivery() {
	const { currentDesk } = useStoreDesk();
	const { isFetching, isError, data, refetch } = useGetInDeliveryShipmentsQuery({ currentDesk });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<div className="card-body relative">
				<ShipmentTable
					title="In Delivery shipments"
					ActionsButtons={(selected, afterAction) => (
						<ShipmentActions track="IN_DELIVERY" selected={selected} afterAction={afterAction} />
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
