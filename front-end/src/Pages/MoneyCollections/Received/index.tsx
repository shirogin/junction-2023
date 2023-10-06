import MoneyCollectionTable from "@/Components/Table/MoneyCollectionTable";
import { useGetMoneyCollectionsReceivedQuery } from "@/app/backend/export/moneyCollection";
import useStoreDesk from "@/hooks/useStoreDesk";

export default function ReceivedMoneyCollections() {
	const { currentDesk } = useStoreDesk();
	const { data: response, isLoading, isError, isFetching, refetch } = useGetMoneyCollectionsReceivedQuery({ currentDesk });
	const data = response?.data || [];
	return (
		<MoneyCollectionTable
			data={data}
			isLoading={isLoading || isFetching}
			isError={isError}
			refetch={refetch}
			title="Received Money Collections"
		/>
	);
}
