import moment from "moment";
import { useDynamicFilter, /* useEffectOnce, */ useModal, useNotification } from "@/hooks";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import { TopSideButtons } from "./TopSideButtons";
import { UseNotificationI } from "@/hooks/useNotification";
import { Link } from "react-router-dom";
import { Edit, Shop, ShopAdd, ShopRemove } from "iconsax-react";
import { useGetDesksQuery, useToggleArchiveMutation } from "@/app/backend/export/desk";
import useProvinces from "@/hooks/useProvinces";
import { useState } from "react";
import Table from "@/Components/Table";
import { FilterInput } from "@/Components/FilterInput";
import SearchBar from "@/Components/SearchBar";
import SortByDropdown from "@/Components/SortByDropdown";
import useSort from "@/hooks/useSort";

function ArchiveButton({
	row,
	Notify,
	Errofy,
	refetch,
}: {
	row: DeskI;
	Notify: UseNotificationI["Notify"];
	Errofy: UseNotificationI["Errofy"];
	refetch: () => void;
}) {
	const [ToggleArchive, { isLoading: isEnabling }] = useToggleArchiveMutation();

	return (
		<div className="tooltip" data-tip={row.enabled ? "Archive Desk" : "Unarchive Desk"}>
			<button
				className="btn btn-square btn-ghost"
				onClick={() =>
					ToggleArchive({ deskId: row._id })
						.unwrap()
						.then((response) => {
							Notify("Archive/Unarchive Desk", response.message);
						})
						.catch((err) => {
							Errofy("Archive/Unarchive Desk", err);
						})
						.finally(() => {
							refetch();
						})
				}
				disabled={isEnabling}
			>
				{row.enabled ? <ShopRemove className="w-6 h-6" /> : <ShopAdd className="w-6 h-6" />}
			</button>
		</div>
	);
}

const Desks = () => {
	const { openModal } = useModal();
	const sortOptions: SortOption<DeskI>[] = [
		{ key: "name", label: "Desk Name" },
		{ key: "createdAt", label: "Created At" },
	];
	const { data: response, isError, isLoading, isFetching, refetch } = useGetDesksQuery();
	const dynamicFilter = useDynamicFilter<DeskI>(response?.data || [], {
		enabled: {
			name: "Status",
			enums: [
				{ name: "active", value: true },
				{ name: "archived", value: false },
			],
		},
	});
	const [selected, setSelected] = useState<DeskI[]>([]);
	const [search, setSearch] = useState("");
	const { Notify, Errofy } = useNotification();
	const provinces = useProvinces();

	const { filteredList, toggleFilter, filters, clearSelected } = dynamicFilter;
	const { sortedData, sortKey, sortDirection, setSort } = useSort<DeskI>(filteredList, "createdAt");

	const searchedData = sortedData.filter(
		(f) =>
			f.name.includes(search) ||
			f.province.toString().includes(search) ||
			f.information.Name.includes(search) ||
			f.information.AttentionName.includes(search)
	);

	return (
		<div className={"card w-full p-6 bg-base-100 shadow-xl  mt-6"}>
			<div className="flex flex-wrap items-center gap-2 my-2">
				<div className="flex gap-2">
					<SearchBar search={search} setSearch={(elm) => setSearch(elm)} placeholder="Search for user" />
					<FilterInput<DeskI> filters={filters} toggleFilter={toggleFilter} clearSelected={clearSelected} />
					<SortByDropdown<DeskI>
						key={"sortProducts"}
						sortKey={sortKey}
						sortDirection={sortDirection}
						setSort={setSort}
						sortOptions={sortOptions}
					/>
				</div>
				<div className="flex gap-2 ml-auto">
					<TopSideButtons refetch={refetch} />
				</div>
			</div>
			<div className="w-full relative">
				<Table<DeskI>
					labels={{
						_id: {
							render: (id, row) => (
								<Link to={"/app/desks/" + id} className="flex items-center space-x-3">
									<div className="avatar">
										<div className="rounded-full text-secondary ring-secondary ring-offset-base-100 ring w-12 h-12 flex items-center justify-center">
											<Shop className="w-10 h-10 m-1" />
										</div>
									</div>
									<div>
										<div className="font-bold whitespace-nowrap">{row.information.Name}</div>
										<div className="text-sm opacity-50">{row.information.AttentionName}</div>
									</div>
								</Link>
							),
						},
						province: {
							name: "Province",
							render: (_, row) => (
								<div>
									<p>{provinces[row.information.Address.StateProvinceCode - 1]?.name["EN"] || "Unknown"}</p>
									<p>{row.information.Address.City}</p>
								</div>
							),
						},
						address: {
							name: "Address",
							render: (_, row) => (
								<div>
									{row.information.Address.AddressLine.map((line, i) => (
										<p key={i} className="whitespace-nowrap">
											{line}
										</p>
									))}
								</div>
							),
						},
						createdAt: {
							name: "Created At",
							render: (l) => (
								<p className="whitespace-nowrap">{l ? moment(l as Date).format("DD MMM YYYY-HH:mm") : "null"}</p>
							),
						},
						updatedAt: {
							name: "Updated At",
							render: (l) => (
								<p className="whitespace-nowrap">{l ? moment(l as Date).format("DD MMM YYYY-HH:mm") : "null"}</p>
							),
						},
						enabled: {
							name: "Status",
							render: (l) => (
								<div
									className={`badge text-ellipsis overflow-hidden whitespace-nowrap ${
										l ? "badge-success" : "badge-error"
									}`}
								>
									{l ? "Active" : "Archived"}
								</div>
							),
						},
						Actions: {
							render: (_, row) => (
								<div className="flex justify-center gap-1 ">
									<ArchiveButton {...{ Errofy, Notify, refetch, row }} />
									<div className="tooltip" data-tip="Edit Desk">
										<button
											className="btn btn-square btn-ghost "
											onClick={async () => {
												await openModal({
													title: "Manage Desk",
													bodyType: MODAL_BODY_TYPES.ADD_MANAGE_DESK,
													extraObject: row,
													size: "lg",
												});
												refetch();
											}}
										>
											<Edit className="w-6 h-6" />
										</button>
									</div>
								</div>
							),
						},
					}}
					data={searchedData}
					isError={isError}
					isLoading={isLoading || isFetching}
					onSelect={(alreadySelected) => {
						setSelected(alreadySelected);
					}}
					sortDirection={sortDirection}
					sortKey={sortKey as string}
					selected={selected}
					sortingKeys={sortOptions.map((s) => s.key) as string[]}
				/>
			</div>
		</div>
	);
};
export default Desks;
