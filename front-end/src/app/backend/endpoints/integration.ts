import { BuilderI } from "@/types/redux";

export default function auth(builder: BuilderI) {
	return {
		/* UPS */
		requestUPSIntegration: builder.mutation<ResponseI<AuthLinkI>, void>({
			query: () => ({
				url: "/integration/ups",
				method: "GET",
			}),
		}),
		refreshIntegration: builder.mutation<ResponseI, { clientId: string }>({
			query: ({ clientId }) => ({
				url: "/integration/ups/" + clientId,
				method: "PUT",
			}),
		}),
		callbackIntegration: builder.mutation<ResponseI, { clientId: string; code: string }>({
			query: (body) => ({
				url: "/integration/ups",
				method: "POST",
				body,
			}),
		}),
	};
}
