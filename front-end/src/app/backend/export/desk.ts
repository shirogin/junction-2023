import api from "..";
// exporting auth hooks
export const {
	useToggleArchiveMutation,
	useCreateDeskMutation,
	useGetDesksQuery,
	useAddWorkerToDeskMutation,
	useRemoveWorkerFromDeskMutation,
	useUpdateDeskInformationMutation,
	useUpdateResponsibleMutation,
	useGetDesksListMutation,
} = api;
