import { BuilderI } from "@/types/redux";
import querystring from "querystring";
/**
* // in-prepare
"/coming"
* // in-transit
"/in-transit/in-hold"
"/in-transit/assigned"
"/in-transit/assigned-in-transit"
"/in-transit/in-transit"
"/in-transit/in-delivery"
* // in-cancel
"/in-cancel/assigned-in-return"
"/in-cancel/in-return"
"/in-cancel/in-hold"
* // delivered
"/delivered"
* // MONEY_COLLECTED
"/money-collected"
* // Money affected
"/money-affected"
* // RETURNED
"/returned"
 */
export default function shipment(builder: BuilderI) {
	return {
		// in-prepare
		getComingShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/coming?" + query,
					method: "GET",
				};
			},
		}),
		// in-transit
		getInHoldShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/in-transit/in-hold?" + query,
					method: "GET",
				};
			},
		}),
		getAssignedShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/in-transit/assigned?" + query,
					method: "GET",
				};
			},
		}),
		getAssignedTransitShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/in-transit/assigned-in-transit?" + query,
					method: "GET",
				};
			},
		}),
		getInTransitShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/in-transit/in-transit?" + query,
					method: "GET",
				};
			},
		}),
		getInDeliveryShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/in-transit/in-delivery?" + query,
					method: "GET",
				};
			},
		}),
		// in-cancel
		getAssignedReturnShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/in-cancel/assigned-in-return?" + query,
					method: "GET",
				};
			},
		}),
		getInReturnTransitShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/in-cancel/in-return?" + query,
					method: "GET",
				};
			},
		}),
		getCanceledInHoldShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/in-cancel/in-hold?" + query,
					method: "GET",
				};
			},
		}),
		// delivered
		getDeliveredShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/delivered?" + query,
					method: "GET",
				};
			},
		}),
		// MONEY_COLLECTED
		getMoneyCollectedShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/money-collected?" + query,
					method: "GET",
				};
			},
		}),
		// Money affected
		getMoneyAffectedShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/money-affected?" + query,
					method: "GET",
				};
			},
		}),
		// RETURNED
		getReturnedShipments: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string }>({
			query: ({ currentDesk }) => {
				const query = new URLSearchParams({ currentDesk }).toString();
				return {
					url: "/admin/shipment/returned?" + query,
					method: "GET",
				};
			},
		}),
		// =========================================================================
		getShipmentById: builder.query<ResponseI<ShipmentI>, { shipmentId: string }>({
			query: ({ shipmentId }) => ({
				url: "/admin/shipment/" + shipmentId,
				method: "GET",
			}),
		}),
		getShipmentsList: builder.query<ResponseI<ShipmentI[]>, { currentDesk: string; list: string[] }>({
			query: ({ currentDesk, list }) => {
				const query = querystring.stringify({ currentDesk, list });
				return {
					url: "/admin/shipment?" + query,
					method: "GET",
				};
			},
		}),

		createIssue: builder.mutation<
			ResponseI<ShipmentIssueI>,
			{ action: ActionsEnumI; comment: string; shipmentId: string; currentDesk: string }
		>({
			query: ({ comment, action, shipmentId, currentDesk }) => ({
				url: "/admin/shipment/issue/" + shipmentId,
				method: "POST",
				body: {
					comment,
					action,
					currentDesk,
				},
			}),
		}),
		resolveIssueWithCancel: builder.mutation<ResponseI<ShipmentIssueI>, { issueId: string; comment: string }>({
			query: ({ issueId, comment }) => ({
				url: "/admin/shipment/issue/" + issueId,
				method: "DELETE",
				body: {
					comment,
				},
			}),
		}),
		resolveIssueWithTryAgain: builder.mutation<ResponseI<ShipmentIssueI>, { issueId: string; comment: string }>({
			query: ({ issueId, comment }) => ({
				url: "/admin/shipment/issue/" + issueId,
				method: "PUT",
				body: {
					comment,
				},
			}),
		}),
		confirmDelivery: builder.mutation<ResponseI<ShipmentI>, { shipmentId: string; currentDesk: string }>({
			query: ({ shipmentId, currentDesk }) => ({
				url: "/admin/shipment/confirm/" + shipmentId,
				method: "POST",
				body: { currentDesk },
			}),
		}),
		getShipmentLabelById: builder.mutation<string, { shipmentId: string }>({
			query: ({ shipmentId }) => ({
				url: "/admin/shipment/label/" + shipmentId,
				method: "GET",
				headers: {
					"Content-Type": "image/svg+xml",
				},
			}),
		}),
		createShipment: builder.mutation<ResponseI<ShipmentI | ShipmentI[]>, ShipmentRequestI | ShipmentRequestI[]>({
			query: (body) => ({
				url: "/shipment",
				method: "POST",
				body,
			}),
		}),
		prepareShipment: builder.mutation<ResponseI<ShipmentI>, { shipmentId: string; currentDesk: string }>({
			query: ({ shipmentId, currentDesk }) => ({
				url: "/admin/shipment/prepare/" + shipmentId,
				method: "PUT",
				body: { currentDesk },
			}),
		}),
		cancelAssignedShipment: builder.mutation<ResponseI<ShipmentI>, { shipmentId: string; currentDesk: string }>({
			query: ({ shipmentId, currentDesk }) => ({
				url: "/admin/shipment/cancel/" + shipmentId,
				method: "PUT",
				body: { currentDesk },
			}),
		}),
		preCancelShipment: builder.mutation<ResponseI<ShipmentI>, { shipmentId: string; currentDesk: string }>({
			query: ({ shipmentId, currentDesk }) => ({
				url: "/admin/shipment/" + shipmentId,
				method: "DELETE",
				body: { currentDesk },
			}),
		}),
		transitionArrived: builder.mutation<ResponseI<ShipmentI>, { shipmentId: string; currentDesk: string }>({
			query: ({ shipmentId, currentDesk }) => ({
				url: "/admin/shipment/arrived/" + shipmentId,
				method: "POST",
				body: { currentDesk },
			}),
		}),
		reCollectTransition: builder.mutation<ResponseI<ShipmentI>, { shipmentId: string; currentDesk: string }>({
			query: ({ shipmentId, currentDesk }) => ({
				url: "/admin/shipment/arrived/" + shipmentId,
				method: "PUT",
				body: { currentDesk },
			}),
		}),
		confirmShipment: builder.mutation<ResponseI<ShipmentI>, { shipmentId: string; currentDesk: string }>({
			query: ({ shipmentId, currentDesk }) => ({
				url: "/admin/shipment/confirm/" + shipmentId,
				method: "PUT",
				body: { currentDesk },
			}),
		}),
		updateWeightShipment: builder.mutation<ResponseI<ShipmentI>, { shipmentId: string; weight: number }>({
			query: ({ shipmentId, weight }) => ({
				url: "/admin/shipment/" + shipmentId,
				method: "PUT",
				body: { weight },
			}),
		}),
		cancelShipment: builder.mutation<ResponseI<ShipmentI>, { shipmentId: string }>({
			query: ({ shipmentId }) => ({
				url: "/shipment/" + shipmentId,
				method: "DELETE",
			}),
		}),
		confirmReturn: builder.mutation<
			ResponseI<DeliveryManI>,
			{ contract: string; currentDesk: string; amountToSub: number; shipmentId: string }
		>({
			query: ({ shipmentId, currentDesk, contract, amountToSub }) => ({
				url: `/admin/shipment/return/${shipmentId}`,
				method: "DELETE",
				body: { contract, currentDesk, amountToSub },
			}),
		}),
		confirmMoneyCollected: builder.mutation<ResponseI<ShipmentI>, { contract: string; currentDesk: string; shipmentId: string }>({
			query: ({ shipmentId, currentDesk, contract }) => ({
				url: `/admin/shipment/confirm-money/${shipmentId}`,
				method: "PUT",
				body: { contract, currentDesk },
			}),
		}),
	};
}
