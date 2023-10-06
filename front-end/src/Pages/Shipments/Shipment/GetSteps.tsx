import ContentType from "./content/ContentType";

const stepperColor: Record<ShipmentStatus, string> = {
	PENDING: "warning",
	PREPARED: "warning",
	IN_TRANSIT: "info",
	DELIVERED: "success",
	MONEY_IN_TRANSIT: "success",
	MONEY_AFFECTED: "success",
	IN_RETURN: "error",
	RETURNED: "error",
};
const ShipmentStatusToShow: ShipmentStatus[] = ["PENDING", "PREPARED", "IN_TRANSIT", "DELIVERED", "IN_RETURN", "RETURNED"],
	successStatus: ShipmentStatus[] = ["IN_TRANSIT", "DELIVERED"],
	failedStatus: ShipmentStatus[] = ["IN_RETURN", "RETURNED"],
	startingStatus: ShipmentStatus[] = ["PENDING", "PREPARED", "IN_TRANSIT", "DELIVERED"],
	stepsToShow: Record<ShipmentStatus, (typeof ShipmentStatusToShow)[number]> = {
		PENDING: "PENDING",
		PREPARED: "PREPARED",
		IN_TRANSIT: "IN_TRANSIT",
		DELIVERED: "DELIVERED",
		MONEY_IN_TRANSIT: "DELIVERED",
		MONEY_AFFECTED: "DELIVERED",
		IN_RETURN: "IN_RETURN",
		RETURNED: "RETURNED",
	};
export function GetSteps(content: ContentType, status: ShipmentStatus, trackHistory: ShipmentTrackI<ShipmentStatus>[]) {
	const lastTrack = status;
	let filteredTrackHistory = trackHistory
		.filter((th) => ShipmentStatusToShow.includes(th.status))
		.map((th) => ({ status: th.status, active: true }));
	// if lastTrack is in successStatus, then we need to add all the remaining steps in successStatus
	let index = successStatus.indexOf(lastTrack);
	if (index >= 0) {
		filteredTrackHistory = [...filteredTrackHistory, ...successStatus.slice(index + 1).map((elm) => ({ status: elm, active: false }))];
	} else {
		index = failedStatus.indexOf(lastTrack);
		if (index >= 0) {
			filteredTrackHistory = [
				...filteredTrackHistory,
				...failedStatus.slice(index + 1).map((elm) => ({ status: elm, active: false })),
			];
		} else {
			index = startingStatus.indexOf(lastTrack);
			if (index >= 0) {
				filteredTrackHistory = [
					...filteredTrackHistory,
					...startingStatus.slice(index + 1).map((elm) => ({ status: elm, active: false })),
				];
			}
		}
	}

	return [
		...filteredTrackHistory.map((th) => ({
			title: (th.active ? content.steps : content.defaultSteps)[stepsToShow[th.status]].step,
			state: th.active ? stepperColor[status] : "",
			subtitle: (th.active ? content.steps : content.defaultSteps)[stepsToShow[th.status]].sub,
		})),
	];
}
