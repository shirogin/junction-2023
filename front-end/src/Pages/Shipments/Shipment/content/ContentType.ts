interface ShipmentStepI {
	step: string;
	sub: string;
}
export default interface ContentType {
	steps: Record<ShipmentStatus, ShipmentStepI>;
	defaultSteps: Record<ShipmentStatus, ShipmentStepI>;
	package: {
		title: string;
		number: string;
		pickUp: string;
		delivery: string;
	};
	client: {
		title: string;
		name: string;
		phone: string;
		province: string;
		address: string;
	};
	payment: {
		title: string;
		price: string;
		delivery: string;
		total: string;
		currency: string;
	};
}
