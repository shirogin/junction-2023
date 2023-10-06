import React from "react";
import PrepareShipment from "./PrepareShipment";
import ConfirmShipment from "./ConfirmShipment";
import EditShipmentWeight from "./EditShipmentWeight";
import PrintShipmentLabel from "./PrintShipmentLabel";
import AssignShipment from "./AssignShipment";
import PreCancelShipment from "./PreCancelShipment";
import CancelAssignmentShipment from "./CancelAssignmentShipment";
import ShipmentReCollected from "./ShipmentReCollected";
import ShipmentArrived from "./ShipmentArrived";
import AssignReturn from "./AssignReturn";
import CollectMoney from "./CollectMoney";
import CreateMoneyReceipt from "./CreateMoneyReceipt";

interface Props extends ShipmentButtonActionI {
	track: ShipmentGlobalStatus;
}

export default function ShipmentActions({ track, selected, afterAction }: Props) {
	const action: Record<ShipmentGlobalStatus, React.ReactNode> = {
		IN_HOLD: <AssignShipment selected={selected} afterAction={afterAction} />,
		CANCELED_IN_HOLD: selected.length === 1 ? <AssignReturn selected={selected[0]} afterAction={afterAction} /> : null,
		ASSIGNED: <CancelAssignmentShipment selected={selected} afterAction={afterAction} />,
		ASSIGNED_TRANSIT: <CancelAssignmentShipment selected={selected} afterAction={afterAction} />,
		ASSIGNED_RETURN: <CancelAssignmentShipment selected={selected} afterAction={afterAction} />,
		IN_DELIVERY: <ShipmentReCollected selected={selected} afterAction={afterAction} />,
		IN_TRANSIT: (
			<>
				<ShipmentArrived selected={selected} afterAction={afterAction} />
				<ShipmentReCollected selected={selected} afterAction={afterAction} />
			</>
		),
		IN_RETURN_TRANSIT: null,
		DELIVERED: <CollectMoney selected={selected} afterAction={afterAction} />,
		MONEY_COLLECTED: <CreateMoneyReceipt selected={selected} afterAction={afterAction} />,
		MONEY_AFFECTED: null,
		RETURNED: null,
		PENDING: (
			<>
				<PreCancelShipment selected={selected} afterAction={afterAction} />
				<PrepareShipment selected={selected} afterAction={afterAction} />
			</>
		),
		PREPARED: (
			<>
				<PreCancelShipment selected={selected} afterAction={afterAction} />
				<EditShipmentWeight selected={selected} afterAction={afterAction} />
				<ConfirmShipment selected={selected} afterAction={afterAction} />
			</>
		),
	};
	return (
		<div className="flex flex-wrap gap-2">
			<div>
				<PrintShipmentLabel selected={selected} afterAction={afterAction} />
			</div>
			{action[track]}
		</div>
	);
}
