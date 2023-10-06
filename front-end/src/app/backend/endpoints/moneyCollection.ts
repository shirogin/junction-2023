import { BuilderI } from "@/types/redux";

export default function auth(builder: BuilderI) {
	return {
		/* UPS */
		createMoneyCollection: builder.mutation<ResponseI<MoneyCollectionI<true>>, MoneyCollectionRequest>({
			query: ({ from, initContract, to, shipments, total }) => ({
				url: "/admin/money-collection",
				method: "POST",
				body: { from, initContract, to, shipments, total },
			}),
		}),
		getMoneyCollectionsSent: builder.query<ResponseI<MoneyCollectionI<true>[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => ({
				url: "/admin/money-collection/sent?currentDesk=" + currentDesk,
				method: "GET",
			}),
		}),
		getMoneyCollectionsToReceive: builder.query<ResponseI<MoneyCollectionI<true>[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => ({
				url: "/admin/money-collection/?currentDesk=" + currentDesk,
				method: "GET",
			}),
		}),
		getMoneyCollectionsReceived: builder.query<ResponseI<MoneyCollectionI<true>[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => ({
				url: "/admin/money-collection/received?currentDesk=" + currentDesk,
				method: "GET",
			}),
		}),
		getMoneyCollection: builder.query<ResponseI<MoneyCollectionI<true>>, { collectionId: string; currentDesk: string }>({
			query: ({ collectionId, currentDesk }) => ({
				url: `/admin/money-collection/${collectionId}?currentDesk=${currentDesk}`,
				method: "GET",
			}),
		}),
		// confirm money collection
		confirmMoneyCollection: builder.mutation<
			ResponseI<MoneyCollectionI<true>>,
			{ collectionId: string; endContract: string; currentDesk: string }
		>({
			query: ({ collectionId, endContract, currentDesk }) => ({
				url: `/admin/money-collection/${collectionId}`,
				method: "PUT",
				body: { endContract, currentDesk },
			}),
		}),
		/* By shipments */
		getMoneyCollectionByShipment: builder.query<ResponseI<MoneyCollectionI<true>>, string>({
			query: (id) => ({
				url: `/admin/money-collection/shipment/${id}`,
				method: "GET",
			}),
		}),
		// verify if list of shipments doesn't have any shipment that it's already in a money collection
		verifyShipment: builder.mutation<ResponseI<boolean>, string>({
			query: (shipmentId) => ({
				url: `/admin/money-collection/verify-shipment/${shipmentId}`,
				method: "GET",
			}),
		}),
	};
}
