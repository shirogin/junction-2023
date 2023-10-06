import { BuilderI } from "@/types/redux";

export default function auth(builder: BuilderI) {
	return {
		getAdmins: builder.query<ResponseI<AdminI[]>, void>({
			query: () => "/admin/admin",
		}),
		createAdmin: builder.mutation<ResponseI<AdminI>, UserBaseI>({
			query: (newAdmin) => ({
				url: "/admin/admin",
				method: "POST",
				body: newAdmin,
			}),
		}),
		getAdminById: builder.query<ResponseI<AdminI>, string>({
			query: (adminId) => `/admin/admin/${adminId}`,
		}),
		checkAvailableAdmin: builder.mutation<ResponseI<boolean>, string>({
			query: (username) => `/admin/admin/available/${username}`,
		}),
		enableAdmin: builder.mutation<ResponseI<AdminI>, { userId: string; enable: boolean }>({
			query: ({ userId, enable }) => ({
				url: `/admin/admin/${userId}`,
				method: "POST",
				body: { enable },
			}),
		}),
		changeAdminPassword: builder.mutation<ResponseI<ClientI>, { adminId: string; password: string }>({
			query: ({ adminId, password }) => ({
				url: `/admin/admin/password/${adminId}`,
				method: "PUT",
				body: { password },
			}),
		}),
		updateAdmin: builder.mutation<ResponseI<AdminI>, { adminId: string; data: Partial<AdminI> }>({
			query: ({ adminId, data }) => ({
				url: `/admin/admin/${adminId}`,
				method: "PUT",
				body: data,
			}),
		}),
		deleteAdmin: builder.mutation<void, string>({
			query: (adminId) => ({
				url: `/admin/admin/${adminId}`,
				method: "DELETE",
			}),
		}),
		getAdminClients: builder.query<ResponseI<ClientI[]>, string>({
			query: (adminId) => ({
				url: `/admin/admin/clients/${adminId}`,
				method: "GET",
			}),
		}),
	};
}
