import { BuilderI } from "@/types/redux";

export default function auth(builder: BuilderI) {
	return {
		enableClient: builder.mutation<ResponseI<ClientI>, { clientId: string; enabled: boolean }>({
			query: ({ clientId, enabled }) => ({
				url: `/admin/user/${clientId}`,
				method: "POST",
				body: { enabled },
			}),
		}),
	};
}
