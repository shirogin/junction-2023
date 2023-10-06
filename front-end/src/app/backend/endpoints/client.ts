import { BuilderI } from "@/types/redux";

export default function auth(builder: BuilderI) {
	return {
		getClients: builder.query<ResponseI<ClientI[]>, void>({
			query: () => "/admin/client",
		}),
		createClient: builder.mutation<ResponseI<ClientI>, UserBaseI>({
			query: (newClient) => ({
				url: "/admin/client",
				method: "POST",
				body: newClient,
			}),
		}),
		getClientById: builder.query<ResponseI<ExtendedClientI>, string>({
			query: (clientId) => `/admin/client/${clientId}`,
		}),
		checkAvailable: builder.mutation<ResponseI<boolean>, string>({
			query: (username) => `/admin/client/available/${username}`,
		}),
		checkAvailableEmail: builder.mutation<ResponseI<boolean>, string>({
			query: (email) => `/admin/client/available/email/${email}`,
		}),
		enableClient: builder.mutation<ResponseI<ClientI>, { userId: string; enable: boolean }>({
			query: ({ userId, enable }) => ({
				url: `/admin/client/${userId}`,
				method: "POST",
				body: { enable },
			}),
		}),
		updateClient: builder.mutation<ResponseI<ClientI>, { clientId: string; data: Partial<ClientI> }>({
			query: ({ clientId, data }) => ({
				url: `/admin/client/${clientId}`,
				method: "PUT",
				body: data,
			}),
		}),
		updateClientPaymentMethod: builder.mutation<ResponseI<ClientI>, { clientId: string; paymentMethod: string }>({
			query: ({ clientId, paymentMethod }) => ({
				url: `/admin/client/payment/${clientId}`,
				method: "PUT",
				body: { paymentMethod },
			}),
		}),
		deleteClient: builder.mutation<void, string>({
			query: (clientId) => ({
				url: `/admin/client/${clientId}`,
				method: "DELETE",
			}),
		}),
		setUpPinCodeAccount: builder.mutation<ResponseI<ClientI>, { clientId: string; pinCode: string }>({
			query: ({ clientId, pinCode }) => ({
				url: `/admin/client/pin/${clientId}`,
				method: "PUT",
				body: { pinCode },
			}),
		}),
		changeClientPassword: builder.mutation<ResponseI<ClientI>, { clientId: string; password: string }>({
			query: ({ clientId, password }) => ({
				url: `/admin/client/password/${clientId}`,
				method: "PUT",
				body: { password },
			}),
		}),
		/* Addresses controllers */
		getAddresses: builder.query<ResponseI<{ default: string | null; addresses: ShipI[] }>, string>({
			query: (clientId) => `/admin/client/addresses/${clientId}`,
		}),
		createAddress: builder.mutation<ResponseI<ShipI>, { clientId: string; address: ShipI }>({
			query: ({ clientId, address }) => ({
				url: `/admin/client/addresses/${clientId}`,
				method: "POST",
				body: address,
			}),
		}),
		makeDefaultAddress: builder.mutation<ResponseI<ShipI>, { clientId: string; addressId: string }>({
			query: ({ clientId, addressId }) => ({
				url: `/admin/client/addresses/${clientId}`,
				method: "PUT",
				body: { addressId },
			}),
		}),
		unlinkAddress: builder.mutation<ResponseI<ShipI>, { clientId: string; addressId: string }>({
			query: ({ clientId, addressId }) => ({
				url: `/admin/client/addresses/${clientId}`,
				method: "DELETE",
				body: { addressId },
			}),
		}),
		/* Shipments controllers */
		getClientShipments: builder.query<ResponseI<ShipmentI[]>, string>({
			query: (clientId) => `/admin/client/shipments/${clientId}`,
		}),
		createClientShipment: builder.mutation<ResponseI<ShipmentI>, { clientId: string; shipment: ShipmentRequestI }>({
			query: ({ clientId, shipment }) => ({
				url: `/admin/client/shipments/${clientId}`,
				method: "POST",
				body: shipment,
			}),
		}),
		/* Products controllers */
		getClientProducts: builder.query<ResponseI<ProductI[]>, string>({
			query: (clientId) => `/admin/client/products/${clientId}`,
		}),

		createClientProduct: builder.mutation<ResponseI<ProductI>, { clientId: string; product: BaseProductI }>({
			query: ({ clientId, product }) => ({
				url: `/admin/client/products/${clientId}`,
				method: "POST",
				body: product,
			}),
		}),
	};
}
