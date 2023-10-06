import ContentType from "./ContentType";

const content: ContentType = {
	title: "New Shipement",
	productDetails: {
		title: "Product",
		id: "Product ID",
		createdAt: "Created at",
		description: "Product Description",
		type: "Product Type",
		Measurements: {
			title: "Product Measurements",
			d: "D",
			cm: "CM",
			w: "W",
			kg: "KG",
		},
		value: {
			title: "Product value",
			currency: "DZD",
		},
		price: {
			title: "Final price start at",
			currency: "DZD",
		},
	},
	steps: ["Sender Information", "Receiver information", "Desk information", "Verification", "Finish"],
	senderInformation: {
		title: "Would you use your default address?",
		new: "Add New",
	},
	receiverInformation: {
		title: "Are you shipping to desk?",
		address: "Receiver Address",
	},
	DeskInformation: {
		title: "Select the desk that you will put your package in ?",
		select: "Select a desk",
		inputLabel: "Select the province of the desk",
		placeholder: "Province",
	},
	verificationInformation: {
		from: "You are shipping from",
		to: "You are shipping to",
		by: "You are dropping it by",
	},
	paymentCard: {
		value: "Product Value",
		price: "Delivery price",
		total: "Total price",
		currency: "DZD",
	},
	CongratsCard: ["Shipment failed try to check the information", "Shipment created successfully", "Go to new shipment page"],
	previous: "Previous",
	continue: "Continue",
	create: "Create the shipment",
};

export default content;
