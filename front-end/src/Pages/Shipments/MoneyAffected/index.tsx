import ShipmentActions from "@/Components/ShipmentActions";
import { ShipmentTable } from "@/Components/Table/ShipmentTable";
import { useGetMoneyAffectedShipmentsQuery } from "@/app/backend/export/shipments";
import useStoreDesk from "@/hooks/useStoreDesk";

export default function MoneyAffected() {
	const { currentDesk } = useStoreDesk();
	const { isFetching, isError, data, refetch } = useGetMoneyAffectedShipmentsQuery({ currentDesk });

	return (
		<div className="w-full card bg-base-100 shadow-xl">
			<div className="card-body relative">
				<ShipmentTable
					title="Money affected shipments"
					ActionsButtons={(selected, afterAction) => (
						<ShipmentActions track="MONEY_AFFECTED" selected={selected} afterAction={afterAction} />
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
