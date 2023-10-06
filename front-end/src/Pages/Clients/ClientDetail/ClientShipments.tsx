import { ShipmentTable } from "@/Components/Table/ShipmentTable";

import { useGetClientShipmentsQuery } from "@/app/backend/export/client";

type Props = {
	clientId: string;
};

function ClientShipments({ clientId }: Props) {
	const { data: response, isFetching, refetch, isError } = useGetClientShipmentsQuery(clientId);

	return (
		<div className="w-full">
			<div className="relative">
				<ShipmentTable
					shipments={response?.data || []}
					isError={isError}
					isLoading={isFetching}
					key={"shipments"}
					title={"Client Shipments"}
					Refetch={() => {
						refetch();
					}}
				/>
			</div>
		</div>
	);
}

export default ClientShipments;
