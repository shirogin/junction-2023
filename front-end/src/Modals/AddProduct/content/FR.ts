import ContentType from "./ContentType";

const content: ContentType = {
	title: "CRÉER UN NOUVEAU COLIS",
	package: {
		title: "INFORMATIONS SUR LE COLIS",
		name: {
			content: "Nom",
			error: [
				"Vous devez fournir un nom",
				"Le nom doit contenir au moins 3 caractères",
				"Le nom ne doit pas contenir plus de 35 caractères",
			],
		},
		sku: {
			content: "SKU",
			error: [
				"Vous devez fournir un SKU",
				"Le SKU doit contenir au moins 3 caractères",
				"Le SKU ne doit pas contenir plus de 35 caractères",
			],
		},
		description: {
			content: "Description",
			error: ["Vous devez fournir une description"],
		},
		type: {
			content: "Type",
			error: [
				"Vous devez fournir un type",
				"Le type ne peut pas inclure d'espaces au début et à la fin",
				"Le type doit contenir au moins 3 caractères",
			],
		},
		width: {
			content: "Largeur",
			suffix: "CM",
			error: [
				"Vous devez fournir une largeur",
				"La largeur ne peut pas être inférieure à 1,00 cm",
				"La largeur ne peut pas être supérieure à 100,00 cm",
			],
		},
		height: {
			content: "Hauteur",
			suffix: "CM",
			error: [
				"Vous devez fournir une hauteur",
				"La hauteur ne peut pas être inférieure à 1,00 cm",
				"La hauteur ne peut pas être supérieure à 100,00 cm",
			],
		},
		length: {
			content: "Longueur",
			suffix: "CM",
			error: [
				"Vous devez fournir une longueur",
				"La longueur ne peut pas être inférieure à 1,00 cm",
				"La longueur ne peut pas être supérieure à 100,00 cm",
			],
		},
		weight: {
			content: "Poids",
			suffix: "KG",
			error: [
				"Vous devez fournir un poids",
				"Le poids ne peut pas être inférieur à 0,01 kg",
				"Le poids ne peut pas être supérieur à 70,00 kg",
			],
		},
	},
	payment: {
		title: "INFORMATIONS DE PAIEMENT",
		price: {
			content: "Prix",
			suffix: "DZD",
			error: [
				"Vous devez fournir un prix",
				"Le prix ne peut pas être inférieur à 100,00 DZD",
				"Le prix ne peut pas être supérieur à 150 000,00 DZD",
			],
		},
	},
	button: "CRÉER UN PRODUIT",
};

export default content;
