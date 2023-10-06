import api from "..";
// exporting auth hooks
export const {
	useCreateClientMutation,
	useGetClientsQuery,
	useGetClientByIdQuery,
	useDeleteClientMutation,
	useUpdateClientMutation,
	useUpdateClientPaymentMethodMutation,
	useEnableClientMutation,
	useSetUpPinCodeAccountMutation,
	useCheckAvailableMutation,
	useCheckAvailableEmailMutation,
	useChangeClientPasswordMutation,
	useGetAddressesQuery,
	useCreateAddressMutation,
	useMakeDefaultAddressMutation,
	useUnlinkAddressMutation,
	useGetClientShipmentsQuery,
	useCreateClientShipmentMutation,
	useGetClientProductsQuery,
	useCreateClientProductMutation,
} = api;
