import { Suspense, lazy } from "react";
import { useModal } from "@/hooks";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import Fallback from "@/Components/Fallback";
import { useModalI } from "@/hooks/useModal";
import CollectMoney from "@/Modals/CollectMoney";
import CreateMoneyReceipt from "@/Modals/CreateMoneyReceipt";
import MoneyCollection from "@/Modals/MoneyCollection";
// turn modals to lazy load

const EditShipment = lazy(() => import("@/Modals/EditShipment")),
	ConfirmationModalBody = lazy(() => import("@/Modals/ConfirmationModalBody")),
	DeliveryManModal = lazy(() => import("@/Modals/DeliveryMan")),
	AssignDelivery = lazy(() => import("@/Modals/AssignDelivery")),
	AdminModal = lazy(() => import("@/Modals/Admin")),
	DeskModal = lazy(() => import("@/Modals/Desk")),
	AddAddress = lazy(() => import("@/Modals/AddAddress")),
	NewShipment = lazy(() => import("@/Modals/NewShipment")),
	DeliverToCustomer = lazy(() => import("@/Modals/DeliverToCustomer")),
	ReturnShipment = lazy(() => import("@/Modals/ReturnShipment")),
	AddProduct = lazy(() => import("@/Modals/AddProduct"));

function ModalLayout() {
	const model = useModal();
	const { modalData, closeModal } = model;
	const { isOpen, bodyType, size, extraObject, title } = modalData;

	return (
		<dialog
			className={`modal ${isOpen ? "modal-open" : ""}`}
			onClick={(e) => {
				if (e.target === e.currentTarget) closeModal();
			}}
		>
			<div className={`modal-box min-h-[200px]  ${size === "lg" ? "max-w-5xl" : ""}`}>
				<button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5" onClick={closeModal}>
					✕
				</button>
				<h3 className="font-semibold text-2xl pb-6 ">{title}</h3>
				<div className="max-h-[calc(100vh-20rem)] overflow-auto pr-2">
					<Suspense fallback={<Fallback />}>
						{
							/* Loading modal body according to different modal type */
							isOpen &&
								{
									[MODAL_BODY_TYPES.ADD_CLIENT_ADDRESS]: <AddAddress {...(model as useModalI<ClientI>)} />,
									[MODAL_BODY_TYPES.ADD_NEW_SHIPMENT]: (
										<NewShipment {...(model as useModalI<{ client: ClientI; product: ProductI }>)} />
									),
									[MODAL_BODY_TYPES.ADD_NEW_PRODUCT]: <AddProduct {...(model as useModalI<ClientI>)} />,
									[MODAL_BODY_TYPES.ADD_MANAGE_ADMIN]: <AdminModal {...model} />,
									[MODAL_BODY_TYPES.RETURN_SHIPMENT]: <ReturnShipment {...(model as useModalI<ShipmentI>)} />,
									[MODAL_BODY_TYPES.ADD_MANAGE_DESK]: <DeskModal {...model} />,
									[MODAL_BODY_TYPES.ADD_MANAGE_DELIVERYMAN]: <DeliveryManModal {...model} />,
									[MODAL_BODY_TYPES.DELIVER_TO_CUSTOMER]: <DeliverToCustomer {...(model as useModalI<ShipmentI>)} />,
									[MODAL_BODY_TYPES.CONFIRM_COLLECT_MONEY]: <CollectMoney {...(model as useModalI<ShipmentI[]>)} />,
									[MODAL_BODY_TYPES.CREATE_MONEY_RECEIPT]: <CreateMoneyReceipt {...(model as useModalI<ShipmentI[]>)} />,
									[MODAL_BODY_TYPES.MONEY_COLLECTION]: (
										<MoneyCollection {...(model as useModalI<MoneyCollectionI<true>>)} />
									),

									[MODAL_BODY_TYPES.CONFIRMATION]: (
										<ConfirmationModalBody
											extraObject={extraObject as { _id: string; message: string; index: number; type: string }}
											closeModal={closeModal}
										/>
									),
									[MODAL_BODY_TYPES.EDIT_SHIPMENT_WEIGHT]: <EditShipment {...(model as useModalI<ShipmentI>)} />,
									[MODAL_BODY_TYPES.ASSIGN_DELIVERY]: <AssignDelivery {...(model as useModalI<ShipmentI[]>)} />,
									[MODAL_BODY_TYPES.DEFAULT]: <div></div>,
								}[bodyType]
						}
					</Suspense>
				</div>
			</div>
		</dialog>
	);
}

export default ModalLayout;
