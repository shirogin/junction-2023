import { BuilderI } from "@/types/redux";

export default function auth(builder: BuilderI) {
	return {
		getRoles: builder.query<ResponseI<RoleI[]>, void>({
			query: () => "/admin/role",
		}),
		createRole: builder.mutation<ResponseI<RoleI>, UserBaseI>({
			query: (body) => ({ url: "/admin/role", method: "POST", body }),
		}),
		getRoleById: builder.query<ResponseI<RoleI>, string>({
			query: (roleId) => `/admin/role/${roleId}`,
		}),
		reloadRoles: builder.mutation<ResponseI<RoleI[]>, void>({
			query: () => ({ url: "/admin/role", method: "PUT" }),
		}),
		updateRole: builder.mutation<ResponseI<RoleI>, { roleId: string; data: Partial<RoleI> }>({
			query: ({ roleId, data }) => ({ url: `/admin/role/${roleId}`, method: "PUT", body: data }),
		}),
		deleteRole: builder.mutation<void, string>({
			query: (roleId) => ({ url: `/admin/role/${roleId}`, method: "DELETE" }),
		}),
	};
}
