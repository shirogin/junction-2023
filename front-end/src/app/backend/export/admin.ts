import api from "..";
// exporting auth hooks
export const {
	useCreateAdminMutation,
	useGetAdminsQuery,
	useGetAdminByIdQuery,
	useDeleteAdminMutation,
	useUpdateAdminMutation,
	useEnableAdminMutation,
	useCheckAvailableAdminMutation,
	useChangeAdminPasswordMutation,
	useGetAdminClientsQuery,
} = api;
