import ExportButton from "@/Components/ExportButton";
import { FilterInput } from "@/Components/FilterInput";
import SearchBar from "@/Components/SearchBar";
import SortByDropdown from "@/Components/SortByDropdown";
import Table from "@/Components/Table";
import { useGetClientTransactionsQuery } from "@/app/backend/export/transactions";
import { useDynamicFilter } from "@/hooks";
import useSort from "@/hooks/useSort";
import DZD from "@/utils/Currency";
import { isShipmentTransaction } from "@/utils/isShipmentTransaction";
import { Refresh2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TransactionStatus = ["Pending", "In Progress", "Completed", "Archived"];
const TransactionTypesList = [
	"Money collected",
	"Affected to Balance",
	"Price Adjustment",
	"Package return",
	"Transfer package",
	"Extract money",
];
function ClientTransactions({ clientId }: { clientId: string }) {
	const { data: response, isFetching, isError, refetch } = useGetClientTransactionsQuery({ clientId });
	const transactions = response?.data || [];
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<TransactionsI[]>([]);
	const dynamicFilter = useDynamicFilter<TransactionsI>(transactions, {});
	const { filteredList, toggleFilter, filters, clearSelected } = dynamicFilter;

	const searchLow = search.toLocaleLowerCase();
	const searchedData = filteredList.filter((f) => f.description.toLocaleLowerCase().includes(searchLow));
	const { sortKey, sortDirection, setSort, sortedData } = useSort<TransactionsI>(searchedData, "createdAt");

	const sortOptions: SortOption<TransactionsI>[] = [
		{ key: "createdAt", label: "Created At" },
		{ key: "amount", label: "Amount" },
		{ key: "status", label: "Description" },
	];

	useEffect(() => {
		setSelected([]);
	}, [response]);

	return (
		<>
			<div className="flex flex-wrap items-center gap-2 my-2">
				<div className="flex gap-2 flex-wrap">
					<SearchBar search={search} setSearch={(elm) => setSearch(elm)} placeholder="Search for user" />
					<FilterInput<TransactionsI> filters={filters} toggleFilter={toggleFilter} clearSelected={clearSelected} />
					<SortByDropdown<TransactionsI>
						key={"sortProducts"}
						sortKey={sortKey}
						sortDirection={sortDirection}
						setSort={setSort}
						sortOptions={sortOptions}
					/>
				</div>
				<div className="flex gap-2 ml-auto flex-wrap">
					{selected.length !== 0 || searchedData.length !== 0 ? (
						<ExportButton<ExportedTransactionI>
							data={(selected.length > 0 ? selected : sortedData).map((transaction) => ({
								amount: DZD["EN"].format(transaction.amount),
								description: transaction.description,
								shipment: (transaction as ShipmentTransactionI).shipment || "",
								status: TransactionStatus[transaction.status],
								type: TransactionTypesList[isShipmentTransaction(transaction) ? transaction.type : 5],
								createdAt: new Date(transaction.createdAt).toLocaleString(),
							}))}
							fileName={new Date().toDateString()}
							fileNameSuffix={`transactions`}
						/>
					) : null}

					<button className="btn btn-outline btn-sm" onClick={() => refetch()}>
						<Refresh2 className="w-4 h-4" />
					</button>
				</div>
			</div>
			<Table<TransactionsI>
				data={sortedData}
				isError={isError}
				isLoading={isFetching}
				selected={selected}
				onSelect={setSelected}
				sortDirection={sortDirection}
				sortKey={sortKey}
				sortingKeys={sortOptions.map((sort) => sort.key)}
				labels={{
					_id: {
						name: "ID",
						render: (_, elm) => elm._id,
					},
					amount: {
						name: "Amount",
						render: (_, elm) => <p className="whitespace-nowrap badge badge-outline">{DZD["EN"].format(elm.amount)}</p>,
					},
					description: {
						name: "Description",
						render: (_, elm) => elm.description,
					},
					shipment: {
						name: "Shipment",
						render: (_, elm) =>
							isShipmentTransaction(elm) ? (
								<Link className="hover:text-primary" to={`/app/shipments/${elm.shipment}`}>
									{elm.shipment}
								</Link>
							) : (
								""
							),
					},
					status: {
						name: "Status",
						render: (_, elm) => <p className="whitespace-nowrap badge badge-accent">{TransactionStatus[elm.status]}</p>,
					},
					type: {
						name: "Type",
						render: (_, elm) => (
							<p className="whitespace-nowrap badge badge-primary">
								{TransactionTypesList[isShipmentTransaction(elm) ? elm.type : 5]}
							</p>
						),
					},
					createdAt: {
						name: "Created At",
						render: (_, elm) => new Date(elm.createdAt).toLocaleString(),
					},
				}}
			/>
		</>
	);
}

export default ClientTransactions;
