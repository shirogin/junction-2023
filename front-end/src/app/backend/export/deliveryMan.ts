import api from "..";
// exporting auth hooks
export const {
	useCreateDeliveryManMutation,
	useGetDeliveryMenQuery,
	useGetDeliveryManByIdQuery,
	useDeleteDeliveryManMutation,
	useUpdateDeliveryManMutation,
	useEnableDeliveryManMutation,
	useGetDeliveryMenListQuery,
	useAssignTaskMutation,
	useAssignTransitTaskMutation,
	useAssignReturnTaskMutation,
	useCancelAssignmentMutation,
	useCheckAvailableDeliveryManMutation,
} = api;
