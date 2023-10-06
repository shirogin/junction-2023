import api from "..";
// exporting auth hooks

export const {
	useGetComingShipmentsQuery, // done
	useGetInHoldShipmentsQuery, // done
	useGetAssignedShipmentsQuery, // done
	useGetAssignedTransitShipmentsQuery, // done
	useGetAssignedReturnShipmentsQuery, // done
	useGetInDeliveryShipmentsQuery, // done
	useGetInTransitShipmentsQuery, // done
	useGetInReturnTransitShipmentsQuery, // done
	useGetCanceledInHoldShipmentsQuery, // done
	useGetDeliveredShipmentsQuery, // done
	useGetMoneyCollectedShipmentsQuery, // done
	useGetMoneyAffectedShipmentsQuery, // done
	useGetReturnedShipmentsQuery, // done
	useGetShipmentsListQuery,
	// Actions
	useConfirmShipmentMutation,
	usePrepareShipmentMutation,
	usePreCancelShipmentMutation,
	useConfirmDeliveryMutation,
	useTransitionArrivedMutation,
	useReCollectTransitionMutation,
	useGetShipmentByIdQuery,
	useGetShipmentLabelByIdMutation,
	useConfirmReturnMutation,
	useConfirmMoneyCollectedMutation,
	// shipment issues
	useUpdateWeightShipmentMutation,
	useResolveIssueWithCancelMutation,
	useResolveIssueWithTryAgainMutation,
	useCreateIssueMutation,
} = api;
