import { BuilderI } from "@/types/redux";

export default function auth(builder: BuilderI) {
	return {
		/* UPS */
		getDesks: builder.query<ResponseI<DeskI[]>, void>({
			query: () => ({
				url: "/admin/desks",
				method: "GET",
			}),
		}),
		getDesksList: builder.mutation<ResponseI<ShipI[]>, { province: number }>({
			query: ({ province }) => ({
				url: "/desk?province=" + province,
				method: "Get",
			}),
		}),
		updateResponsible: builder.mutation<ResponseI, { deskId: string }>({
			query: ({ deskId }) => ({
				url: "/admin/desks/responsible/" + deskId,
				method: "PUT",
			}),
		}),
		getWorkersOfDesk: builder.mutation<ResponseI, { deskId: string }>({
			query: ({ deskId }) => ({
				url: "/admin/desks/workers/" + deskId,
				method: "GET",
			}),
		}),
		addWorkerToDesk: builder.mutation<ResponseI, { deskId: string }>({
			query: ({ deskId }) => ({
				url: "/admin/desks/workers/" + deskId,
				method: "PUT",
			}),
		}),
		removeWorkerFromDesk: builder.mutation<ResponseI, { deskId: string }>({
			query: ({ deskId }) => ({
				url: "/admin/desks/workers/" + deskId,
				method: "DELETE",
			}),
		}),
		updateDeskInformation: builder.mutation<ResponseI, { deskId: string }>({
			query: ({ deskId }) => ({
				url: "/admin/desks/information/" + deskId,
				method: "PUT",
			}),
		}),
		toggleArchive: builder.mutation<ResponseI, { deskId: string }>({
			query: ({ deskId }) => ({
				url: "/admin/desks/" + deskId,
				method: "PUT",
			}),
		}),
		createDesk: builder.mutation<ResponseI<DeskI>, DeskBaseI>({
			query: (body) => ({
				url: "/admin/desks",
				method: "POST",
				body,
			}),
		}),
	};
}
