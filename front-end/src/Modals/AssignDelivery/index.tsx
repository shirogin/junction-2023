import { useModalI } from "@/hooks/useModal";
import HomeDelivery from "./HomeDelivery";
import { useState } from "react";
import { ArrowDown2, ShopAdd, Truck } from "iconsax-react";
import Error500 from "@/Pages/Errors/Error500";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import DeskDelivery from "./DeskDelivery";

export default function AssignDelivery(modal: useModalI<ShipmentI[]>) {
	const shipments = modal.modalData.extraObject;
	const correct = shipments[0].isStopDesk
		? shipments.every((shipment) => shipment.isStopDesk)
		: shipments.every((shipment) => !shipment.isStopDesk);
	shipments.length === 0;
	const [assignmentType, setAssignmentType] = useState<ASSIGNED_TYPE>(shipments[0].isStopDesk ? "ASSIGNED_TRANSIT" : "ASSIGNED");
	if (shipments.length === 0) return <Error500 />;
	if (!correct)
		return (
			<div className="flex flex-col items-center px-8 text-center pb-4">
				<FaceFrownIcon className="h-48 w-48 inline-block" />
				<h1 className="text-5xl font-bold">Shipments doesn't have the same status (stop desk / home delivery)</h1>
			</div>
		);
	return (
		<div className="flex flex-col gap-4 min-h-[16rem] pb-4 px-2">
			<div className="dropdown">
				<label tabIndex={0} className="btn btn-outline mb-1 w-full justify-between ">
					{
						{
							ASSIGNED_TRANSIT: (
								<>
									<ShopAdd /> Assign to transit to another desk
								</>
							),
							ASSIGNED: (
								<>
									<Truck /> Assign to home delivery
								</>
							),
						}[assignmentType]
					}
					<ArrowDown2 className="w-4 h-4" />
				</label>
				<ul
					tabIndex={0}
					className="dropdown-content z-[1] menu py-2 px-1 shadow-lg bg-base-100 rounded-lg w-full border border-base-content"
				>
					<li>
						<a onClick={() => setAssignmentType("ASSIGNED_TRANSIT")}>
							<ShopAdd /> Assign to transit to another desk
						</a>
					</li>
					<li>
						<a onClick={() => setAssignmentType("ASSIGNED")}>
							<Truck />
							Assign to home delivery
						</a>
					</li>
				</ul>
			</div>
			{
				{
					ASSIGNED_TRANSIT: <DeskDelivery {...modal} />,
					ASSIGNED: <HomeDelivery {...modal} />,
				}[assignmentType]
			}
		</div>
	);
}
