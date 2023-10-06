import api from "..";
// exporting auth hooks
export const {
	useCreateMoneyCollectionMutation,
	useGetMoneyCollectionsSentQuery,
	useGetMoneyCollectionsToReceiveQuery,
	useGetMoneyCollectionsReceivedQuery,
	useGetMoneyCollectionQuery,
	useGetMoneyCollectionByShipmentQuery,
	useVerifyShipmentMutation,
	useConfirmMoneyCollectionMutation,
} = api;
