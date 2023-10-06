import ContentType from "./ContentType";

const content: ContentType = {
	title: "Nouvel Envoi",
	productDetails: {
		title: "Colis",
		id: "ID du Colis",
		createdAt: "Créé le",
		description: "Description du Colis",
		type: "Type de Colis",
		Measurements: {
			title: "Dimensions du Colis",
			d: "D",
			cm: "CM",
			w: "L",
			kg: "KG",
		},
		value: {
			title: "Valeur du Colis",
			currency: "DZD",
		},
		price: {
			title: "Prix final à partir de",
			currency: "DZD",
		},
	},
	steps: ["Informations de l'Expéditeur", "Informations du Destinataire", "Informations du Bureau", "Vérification", "Terminer"],
	senderInformation: {
		title: "Voulez-vous utiliser votre adresse par défaut ?",
		new: "Ajouter Nouvelle Adresse",
	},
	receiverInformation: {
		title: "Expédiez-vous au bureau ?",
		address: "Adresse du Destinataire",
	},
	DeskInformation: {
		title: "Sélectionnez le bureau dans lequel vous placerez votre colis",
		select: "Sélectionner un bureau",
		inputLabel: "Sélectionnez la province du bureau",
		placeholder: "Province",
	},
	verificationInformation: {
		from: "Vous expédiez depuis",
		to: "Vous expédiez vers",
		by: "Vous le déposez via",
	},
	paymentCard: {
		value: "Valeur du Produit",
		price: "Prix de Livraison",
		total: "Prix Total",
		currency: "DZD",
	},
	CongratsCard: ["Échec de l'envoi, veuillez vérifier les informations", "Envoi créé avec succès", "Aller à la page de nouvel envoi"],
	previous: "Précédent",
	continue: "Continuer",
	create: "Créer l'envoi",
};

export default content;
