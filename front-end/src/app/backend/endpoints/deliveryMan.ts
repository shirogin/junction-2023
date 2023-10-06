import { BuilderI } from "@/types/redux";

export default function auth(builder: BuilderI) {
	return {
		getDeliveryMen: builder.query<ResponseI<DeliveryManI[]>, void>({
			query: () => "/admin/delivery-man",
		}),
		getDeliveryMenList: builder.query<ResponseI<DeliveryManI[]>, void>({
			query: () => "/admin/delivery-man/list",
		}),
		createDeliveryMan: builder.mutation<ResponseI<DeliveryManI>, UserBaseI>({
			query: (newDeliveryMan) => ({
				url: "/admin/delivery-man",
				method: "POST",
				body: newDeliveryMan,
			}),
		}),
		getDeliveryManById: builder.query<ResponseI<DeliveryManI>, string>({
			query: (deliveryManId) => `/admin/delivery-man/${deliveryManId}`,
		}),
		enableDeliveryMan: builder.mutation<ResponseI<DeliveryManI>, { userId: string; enable: boolean }>({
			query: ({ userId, enable }) => ({
				url: `/admin/delivery-man/${userId}`,
				method: "POST",
				body: { enable },
			}),
		}),
		checkAvailableDeliveryMan: builder.mutation<ResponseI<boolean>, string>({
			query: (username) => `/admin/delivery-man/available/${username}`,
		}),
		updateDeliveryMan: builder.mutation<ResponseI<DeliveryManI>, { deliveryManId: string; data: Partial<DeliveryManI> }>({
			query: ({ deliveryManId, data }) => ({
				url: `/admin/delivery-man/${deliveryManId}`,
				method: "PUT",
				body: data,
			}),
		}),
		assignTask: builder.mutation<ResponseI<DeliveryManI>, { deliveryManId: string; currentDesk: string; shipmentId: string }>({
			query: ({ deliveryManId, shipmentId, currentDesk }) => ({
				url: `/admin/shipment/${shipmentId}`,
				method: "POST",
				body: { deliveryManId, currentDesk },
			}),
		}),
		assignTransitTask: builder.mutation<
			ResponseI<DeliveryManI>,
			{ deliveryManId: string; currentDesk: string; desk: string; shipmentId: string }
		>({
			query: ({ deliveryManId, shipmentId, currentDesk, desk }) => ({
				url: `/admin/shipment/transit/${shipmentId}`,
				method: "PUT",
				body: { deliveryManId, desk, currentDesk },
			}),
		}),
		assignReturnTask: builder.mutation<
			ResponseI<DeliveryManI>,
			{ deliveryManId: string; currentDesk: string; desk: string; shipmentId: string }
		>({
			query: ({ deliveryManId, shipmentId, currentDesk, desk }) => ({
				url: `/admin/shipment/return/${shipmentId}`,
				method: "PUT",
				body: { deliveryManId, desk, currentDesk },
			}),
		}),
		cancelAssignment: builder.mutation<ResponseI<DeliveryManI>, { shipmentId: string; currentDesk: string }>({
			query: ({ shipmentId, currentDesk }) => ({
				url: `/admin/shipment/transit/${shipmentId}`,
				method: "DELETE",
				body: { currentDesk },
			}),
		}),
		deleteDeliveryMan: builder.mutation<void, string>({
			query: (deliveryManId) => ({
				url: `/admin/delivery-man/${deliveryManId}`,
				method: "DELETE",
			}),
		}),
	};
}
