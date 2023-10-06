import MoneyCollectionTable from "@/Components/Table/MoneyCollectionTable";
import { useGetMoneyCollectionsToReceiveQuery } from "@/app/backend/export/moneyCollection";
import useStoreDesk from "@/hooks/useStoreDesk";

export default function ToBeReceivedMoneyCollections() {
	const { currentDesk } = useStoreDesk();
	const { data: response, isLoading, isError, isFetching, refetch } = useGetMoneyCollectionsToReceiveQuery({ currentDesk });
	const data = response?.data || [];
	return (
		<MoneyCollectionTable
			data={data}
			isLoading={isLoading || isFetching}
			isError={isError}
			refetch={refetch}
			title="To be Received Money Collections"
		/>
	);
}
