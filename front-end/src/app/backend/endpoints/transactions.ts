import { BuilderI } from "@/types/redux";

export default function transactions(builder: BuilderI) {
	return {
		getClientTransactions: builder.query<ResponseI<TransactionsI[]>, { clientId: string }>({
			query: ({ clientId }) => ({
				// add location to query if it exists
				url: `/admin/transactions/${clientId}`,
				method: "GET",
			}),
		}),
		getBalance: builder.query<ResponseI<BalanceI>, { startDate: number; endDate: number; clientId: string }>({
			query: ({ startDate, endDate, clientId }) => ({
				url: `/admin/transactions/balance/${clientId}?startDate=${startDate}&endDate=${endDate}`,
				method: "GET",
			}),
		}),
		extractMoneyForClient: builder.mutation<
			ResponseI<TransactionsI>,
			{ clientId: string; amount: number; description: string; currentDesk: string; contract: string }
		>({
			query: ({ clientId, amount, description, currentDesk, contract }) => ({
				url: `/admin/transactions/${clientId}`,
				method: "POST",
				body: { amount, description, currentDesk, contract },
			}),
		}),
	};
}
