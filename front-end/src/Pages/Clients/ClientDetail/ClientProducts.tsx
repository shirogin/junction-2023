import ExportButton from "@/Components/ExportButton";
import Fallback from "@/Components/Fallback";
import { FilterInput } from "@/Components/FilterInput";
import SearchBar from "@/Components/SearchBar";
import SortByDropdown from "@/Components/SortByDropdown";
import Table from "@/Components/Table";
import Error500 from "@/Pages/Errors/Error500";
import { useGetClientProductsQuery } from "@/app/backend/export/client";
import { useDynamicFilter, useModal, useNotification } from "@/hooks";
import useSort from "@/hooks/useSort";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import { Bag2, BoxAdd, Refresh2, Truck } from "iconsax-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

type Props = {
	client: ClientI;
};

function ClientProducts({ client }: Props) {
	const { data: response, isFetching, refetch, isError, error } = useGetClientProductsQuery(client._id);
	const [search, setSearch] = useState("");
	const [products, setProducts] = useState<ProductI[]>(response?.data || []);
	const [selected, setSelected] = useState<ProductI[]>([]);
	const { sortedData, sortKey, sortDirection, setSort } = useSort<ProductI>(products, "shipped");
	const sortOptions: SortOption<ProductI>[] = [
		{ key: "name", label: "Name" },
		{ key: "sku", label: "SKU" },
		{ key: "type", label: "Type" },
		{ key: "price", label: "Price" },
		{ key: "weight", label: "Weight" },
		{ key: "shipped", label: "Shipment Count" },
		{ key: "createdAt", label: "Created At" },
	];

	const { filteredList, toggleFilter, filters, clearSelected, updateFilters } = useDynamicFilter<ProductI>(sortedData, {});
	const searchedData = filteredList.filter(
		(f) =>
			f.name.toLocaleLowerCase().includes(search) ||
			f.sku.toLocaleLowerCase().includes(search) ||
			f.type.toLocaleLowerCase().includes(search) ||
			f.price.toString().toLocaleLowerCase().includes(search) ||
			f.description.toLocaleLowerCase().includes(search)
	);

	const { Errofy } = useNotification();
	useEffect(() => {
		if (response) {
			setProducts(response.data);
			if (response.data.length > 0)
				updateFilters({
					type: {
						name: "Type",
						enums: [...new Set(response.data.map((d) => d.type))].map((d) => ({ name: d, value: d })),
					},
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response]);
	useEffect(() => {
		if (isError) Errofy("Loading products", error, "Couldn't load products");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error]);
	const { openModal } = useModal();
	if (isError) return <Error500 refetch={refetch} backTo="" />;
	if (isFetching) return <Fallback />;

	return (
		<div className="w-full">
			<div className="relative">
				<div className="flex flex-wrap items-center gap-2 mb-2">
					<div className="flex gap-2">
						<SearchBar
							search={search}
							setSearch={(elm) => setSearch(elm.toLocaleLowerCase())}
							placeholder="Search for products"
						/>
						<FilterInput<ProductI> filters={filters} toggleFilter={toggleFilter} clearSelected={clearSelected} />
						<SortByDropdown<ProductI>
							key={"sortProducts"}
							sortKey={sortKey}
							sortDirection={sortDirection}
							setSort={setSort}
							sortOptions={sortOptions}
						/>
					</div>
					<div className="flex gap-2 ml-auto">
						<ExportButton<ProductI>
							key={"exportProducts"}
							data={selected.length === 0 ? searchedData : selected}
							fileNameSuffix="Products"
						/>
						<button
							className="flex btn btn-primary btn-outline btn-sm"
							onClick={() => {
								console.log({ client });
								openModal({
									title: "Add a new product",
									bodyType: MODAL_BODY_TYPES.ADD_NEW_PRODUCT,
									extraObject: client,
									size: "lg",
								}).then(() => {
									refetch();
								});
							}}
						>
							<BoxAdd className="w-4 h-4" />
							new product
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

				<Table<ProductI>
					data={searchedData}
					labels={{
						name: {
							name: "Name",
							render: (element, row) => (
								<div className="flex">
									<div
										className={`cursor-pointer rounded-full border-2 flex-shrink-0 hover:bg-neutral-500 hover:text-white border-neutral-600 w-12 h-12 flex items-center justify-center mr-4 ${
											selected.some((s) => s._id === row._id) ? "bg-neutral-600 text-white" : ""
										}`}
									>
										<Bag2 className="w-6 h-6" />
									</div>
									<Link to={"/app/products/" + row._id}>
										<div className="flex flex-col">
											<span className="font-bold">{element as string}</span>
											<span>{row.sku}</span>
										</div>
									</Link>
								</div>
							),
						},
						createdAt: {
							name: "Created at",
							render: (createdAt) => (
								<div className="text-center font-bold">
									<span>
										{createdAt &&
											new Date(createdAt).toLocaleString("EN-UK", {
												day: "2-digit",
												month: "2-digit",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											})}
									</span>
								</div>
							),
						},
						shipped: {
							name: "Shipped",
							render: (shipped) => <div className="text-center font-bold">{shipped as number}</div>,
						},
						type: {
							name: "Type",
							render: (element) => (
								<div className="flex items-center justify-center">
									<span className="badge badge-outline">{element as string}</span>
								</div>
							),
						},
						price: {
							name: "Price",
							render: (element) => <div className="flex items-center justify-center">{`${element}.00 DZD`}</div>,
						},
						weight: {
							name: "Measures",
							render: (_, row) => (
								<div className="text-center">
									{`W:${row.width} x H:${row.height} x L:${row.length} CM| ${row.weight} KG`}
								</div>
							),
						},
						ADD: {
							name: "Create Shipment",
							render: (_, row) => (
								<div className="flex justify-center">
									<button
										onClick={(e) => {
											e.stopPropagation();
											e.preventDefault();
											openModal({
												title: "Create a new shipment",
												bodyType: MODAL_BODY_TYPES.ADD_NEW_SHIPMENT,
												extraObject: { product: row, client: client },
												size: "lg",
											});
										}}
										className={`btn btn-primary rounded-2xl btn-sm px-6`}
									>
										<Truck className="" />
									</button>
								</div>
							),
						},
					}}
					selected={selected}
					isLoading={isFetching}
					isError={isError}
					onSelect={(alreadySelected) => {
						setSelected(alreadySelected);
					}}
				/>
			</div>
		</div>
	);
}

export default ClientProducts;
