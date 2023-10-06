import Fallback from "@/Components/Fallback";
import Loading from "@/Components/Loading";
import Table from "@/Components/Table";
import Error500 from "@/Pages/Errors/Error500";
import { useGetAddressesQuery, useMakeDefaultAddressMutation } from "@/app/backend/export/client";
import { useModal, useNotification } from "@/hooks";
import useProvinces from "@/hooks/useProvinces";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import { Add, ArchiveBook, Refresh2 } from "iconsax-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { LiaAddressBook } from "react-icons/lia";
import UnlinkButton from "@/Components/UnlinkButton";
import useSort from "@/hooks/useSort";
import SearchBar from "@/Components/SearchBar";
import SortByDropdown from "@/Components/SortByDropdown";

type Props = {
	client: ClientI;
};
function ClientAddresses({ client }: Props) {
	const { data: response, refetch, isFetching, isError, error } = useGetAddressesQuery(client._id);
	const [MakeDefault, { isLoading: isMakingDefault }] = useMakeDefaultAddressMutation();
	const { Errofy, Notify } = useNotification();
	const provinces = useProvinces();
	const [search, setSearch] = useState("");

	const { sortedData, sortKey, sortDirection, setSort } = useSort<ShipI>(response?.data.addresses || [], "createdAt");
	const sortOptions: SortOption<ShipI>[] = [
		{ key: "createdAt", label: "Created At" },
		{ key: "Name", label: "Name" },
	];
	const sortingKeys = sortOptions.map((s) => s.key);
	const searchedData = sortedData.filter((f) =>
		sortingKeys.some((key) =>
			String(f[key as keyof ShipI])
				?.toLowerCase()
				.includes(search.toLowerCase())
		)
	);

	const { openModal } = useModal();

	useEffect(() => {
		if (isError) Errofy("Loading addresses", error, "Couldn't load addresses");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError]);

	if (isError) return <Error500 refetch={refetch} backTo="" />;
	if (isFetching) return <Fallback />;

	return (
		<div className="flex flex-col">
			<div className="flex gap-4">
				<div className="flex gap-2">
					<SearchBar search={search} setSearch={(elm) => setSearch(elm.toLocaleLowerCase())} placeholder="Search for address" />
					<SortByDropdown<ShipI>
						key={"sortProducts"}
						sortKey={sortKey}
						sortDirection={sortDirection}
						setSort={setSort}
						sortOptions={sortOptions}
					/>
				</div>
				<div className="flex gap-2 ml-auto">
					<button
						className="btn btn-primary btn-outline ml-auto btn-sm"
						onClick={() => {
							openModal({
								title: "Add a new address",
								bodyType: MODAL_BODY_TYPES.ADD_CLIENT_ADDRESS,
								extraObject: client,
								size: "lg",
							}).then(() => {
								refetch();
							});
						}}
					>
						<Add className="w-4 h-4" /> Add Address
					</button>
					<button
						key={"Refresh"}
						onClick={() => {
							refetch();
						}}
						className="btn btn-sm btn-ghost rounded-full flex items-center justify-center"
					>
						<Refresh2 className="w-4 h-4" />
					</button>
				</div>
			</div>
			<Table<ShipI>
				data={searchedData}
				isError={isError}
				isLoading={isFetching}
				sortingKeys={sortingKeys}
				sortKey={sortKey}
				sortDirection={sortDirection}
				labels={{
					_id: {
						render: (id, row) => (
							<div key={id as string} className="flex items-center space-x-3">
								<div className="avatar">
									<div className="rounded-full text-primary ring-primary ring-offset-base-100 ring w-12 h-12">
										<LiaAddressBook className="w-full h-full" />
									</div>
								</div>
								<div>
									<div className="font-bold ">{row.AttentionName}</div>
									<div className="text-sm opacity-50">{row.Name}</div>
								</div>
							</div>
						),
					},
					Phone: {
						name: "Phone number",
						render: (_, row) => {
							return <a href={`tel:${row.Phone.Number}`}>{row.Phone.Number}</a>;
						},
					},
					createdAt: {
						name: "Created At",
						render: (l) => <p className="whitespace-nowrap">{l ? moment(l as Date).format("DD MMM YYYY-HH:mm") : "null"}</p>,
					},
					Address: {
						name: "Address",
						render: (_, row) => (
							<div>
								{row.Address.AddressLine.map((line, i) => (
									<p key={i}>{line}</p>
								))}
							</div>
						),
					},
					Province: {
						name: "Province",
						render: (_, row) => {
							return (
								<span className="badge badge-accent whitespace-nowrap font-semibold">
									{provinces[row.Address.StateProvinceCode - 1].name["EN"]} ({row.Address.StateProvinceCode})
								</span>
							);
						},
					},
					PostalCode: {
						name: "Postal Code",
						render: (_, row) => {
							return <p>{row.Address.PostalCode}</p>;
						},
					},
					Action: {
						name: "Action",
						render: (_, row) => {
							return (
								<div>
									{row._id !== response?.data.default && (
										<button
											className="btn btn-ghost btn-sm rounded-full flex items-center justify-center"
											disabled={isMakingDefault}
											title={
												row._id === response?.data.default
													? "This is the default address"
													: "Make this address default"
											}
											onClick={() => {
												MakeDefault({ clientId: client._id, addressId: row._id as string })
													.unwrap()
													.then((res) => {
														Notify("Making Address Default", res.message);
														refetch();
													})
													.catch((err) => {
														Errofy("Making Address Default", err, "Couldn't make Address default");
													});
											}}
										>
											{isMakingDefault ? <Loading className="w-4 h-4" /> : <ArchiveBook className="w-4 h-4" />}
										</button>
									)}
									<UnlinkButton addressId={row._id as string} clientId={client._id} />
								</div>
							);
						},
					},
				}}
			/>
		</div>
	);
}

export default ClientAddresses;
