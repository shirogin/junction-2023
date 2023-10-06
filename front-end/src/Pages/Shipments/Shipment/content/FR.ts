import ContentType from "./ContentType";

const content: ContentType = {
	steps: {
		PENDING: { step: "Création du colis", sub: "Votre colis a été créé" },
		PREPARED: { step: "Préparation du colis", sub: "Votre colis est prêt" },
		IN_TRANSIT: { step: "Livraison en cours", sub: "Votre colis est en cours de livraison" },
		DELIVERED: { step: "Colis livré", sub: "Votre colis a été livré." },
		MONEY_IN_TRANSIT: { step: "Livraison en cours", sub: "Votre colis est en cours de livraison." },
		MONEY_AFFECTED: { step: "Livraison en cours", sub: "Votre colis est en cours de livraison." },
		IN_RETURN: { step: "Livraison annulé", sub: "Votre colis a été annulé et est en cours de retour." },
		RETURNED: { step: "Livraison retourné", sub: "Votre colis a été retourné." },
	},
	defaultSteps: {
		PENDING: { step: "Création du colis", sub: "Votre colis a été reçu" },
		PREPARED: { step: "Préparation du colis", sub: "Vous devez préparer le colis" },
		IN_TRANSIT: { step: "Livraison en cours", sub: "Vous devez expédier votre colis à votre bureau" },
		DELIVERED: { step: "Colis vas être livré", sub: "Attendez un peu, votre colis sera en chemin" },
		MONEY_IN_TRANSIT: { step: "Livraison en cours", sub: "Attendez un peu, votre colis sera en chemin" },
		MONEY_AFFECTED: { step: "Livraison en cours", sub: "Attendez un peu, votre colis sera en chemin" },
		IN_RETURN: { step: "Livraison en annulé", sub: "Attendez un peu, votre colis sera en chemin de retour" },
		RETURNED: { step: "Livraison en retour", sub: "Attendez un peu, votre colis sera en chemin de retour" },
	},
	package: {
		title: "Informations sur la commande",
		number: "Numéro de commande",
		pickUp: "Adresse de ramassage",
		delivery: "Adresse de livraison",
	},
	client: {
		title: "Informations sur le client",
		name: "Nom complet",
		province: "Province",
		phone: "Numéro de téléphone",
		address: "Adresse",
	},
	payment: {
		title: "Informations de paiement",
		price: "Prix de la commande",
		delivery: "Livraison",
		total: "Total",
		currency: "DZD",
	},
};

export default content;
