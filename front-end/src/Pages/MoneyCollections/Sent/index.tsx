import { useGetMoneyCollectionsSentQuery } from "@/app/backend/export/moneyCollection";
import MoneyCollectionTable from "@/Components/Table/MoneyCollectionTable";
import useStoreDesk from "@/hooks/useStoreDesk";

export default function SentMoneyCollections() {
	const { currentDesk } = useStoreDesk();
	const { data: response, isLoading, isError, isFetching, refetch } = useGetMoneyCollectionsSentQuery({ currentDesk });
	const data = response?.data || [];
	return (
		<MoneyCollectionTable
			data={data}
			isLoading={isLoading || isFetching}
			isError={isError}
			refetch={refetch}
			title="Sent Money Collections"
		/>
	);
}
