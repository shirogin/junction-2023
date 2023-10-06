import ContentType from "./ContentType";

const content: ContentType = {
	steps: {
		PENDING: { step: "Package creation", sub: "Your package has been created" },
		PREPARED: { step: "Package preparation", sub: "Your package is already prepared" },
		IN_TRANSIT: { step: "Delivery in process", sub: "Your package is being shipped" },
		DELIVERED: { step: "Package delivered", sub: "Your package has been delivered." },
		MONEY_IN_TRANSIT: { step: "Money in transit", sub: "Your package has been delivered." },
		MONEY_AFFECTED: { step: "Money effected", sub: "Your money has been effected to your balance." },
		IN_RETURN: { step: "Delivery Canceled", sub: "Your package has been canceled and on the way back." },
		RETURNED: { step: "Delivery Returned", sub: "Your package has been delivered back." },
	},
	defaultSteps: {
		PENDING: { step: "Package creation", sub: "Your package has been received" },
		PREPARED: { step: "Package preparation", sub: "Your need to prepare your package" },
		IN_TRANSIT: { step: "Delivery in process", sub: "You need to ship your package to your desk" },
		DELIVERED: { step: "Package will be delivered", sub: "Hang on, your package will be on the way" },
		MONEY_IN_TRANSIT: { step: "Delivery in process", sub: "Hang on, your package will be on the way" },
		MONEY_AFFECTED: { step: "Money will be effected", sub: "Hang on, your money will be on the way" },
		IN_RETURN: { step: "Delivery Canceled", sub: "Hang on, your package will be on the way back" },
		RETURNED: { step: "Delivery will Return", sub: "Hang on, your package will be on the way back" },
	},
	package: {
		title: "Package information",
		number: "Order number",
		pickUp: "Pick up address",
		delivery: "Delivery address",
	},
	client: {
		title: "Client information",
		name: "Full Name",
		province: "Province",
		phone: "Phone Number",
		address: "Address",
	},
	payment: {
		title: "Payment information",
		price: "Package Price",
		delivery: "Delivery",
		total: "Total",
		currency: "DZD",
	},
};

export default content;
