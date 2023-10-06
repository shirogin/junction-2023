import ContentType from "./ContentType";

const content: ContentType = {
	title: "CREATE A NEW PRODUCT",
	package: {
		title: "PRODUCT INFORMATION",
		name: {
			content: "Name",
			error: [
				"You have to provide a name",
				"The name must contain at least 3 characters",
				"The name must not contain more than 35 characters",
			],
		},
		sku: {
			content: "SKU",
			error: [
				"You have to provide an SKU",
				"The SKU must contain at least 3 characters",
				"The SKU must not contain more than 35 characters",
			],
		},
		description: {
			content: "Description",
			error: ["You have to provide a description"],
		},
		type: {
			content: "Type",
			error: [
				"You have to provide a type",
				"The Type cannot include leading and trailing spaces",
				"The type must contain at least 3 characters",
			],
		},
		width: {
			content: "Width",
			suffix: "CM",
			error: ["You have to provide a width", "The width cannot be less than 1.00 cm", "The width cannot be more than 100.00 cm"],
		},
		height: {
			content: "Height",
			suffix: "CM",
			error: ["You have to provide a height", "The height cannot be less than 1.00 cm", "The height cannot be more than 100.00 cm"],
		},
		length: {
			content: "Length",
			suffix: "CM",
			error: ["You have to provide a length", "The length cannot be less than 1.00 cm", "The length cannot be more than 100.00 cm"],
		},
		weight: {
			content: "Weight",
			suffix: "KG",
			error: ["You have to provide a weight", "The weight cannot be less than 0.01 kg", "The weight cannot be more than 70.00 kg"],
		},
	},
	payment: {
		title: "PAYMENT INFORMATION",
		price: {
			content: "Price",
			suffix: "DZD",
			error: [
				"You have to provide a price",
				"The price cannot be less than 100.00 DZD",
				"The price cannot be more than 150,000.00 DZD",
			],
		},
	},
	button: "CREATE PRODUCT",
};

export default content;
