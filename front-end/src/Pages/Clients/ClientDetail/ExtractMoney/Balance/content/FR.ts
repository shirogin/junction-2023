import ContentType from "./ContentType";

const content: ContentType = {
	toBeCollected: "Montant à collecter",
	currentValue: "Valeur actuelle d'UPS",
	collected: "Montant collecté",
	currency: "DZD",
	notify: {
		title: "Chargement du solde",
		content: "Solde chargé avec succès",
	},
	errofy: {
		title: "Chargement du solde",
		content: "Erreur lors de la récupération du solde",
	},
	stats: {
		balance: "VOTRE SOLDE",
		currently: "Valeur actuelle d'UPS",
		collected: "Montant collecté",
		returned: "Produit retourné",
		extracted: "Montant extrait",
		gained: "Montant gagné",
	},
	transactions: {
		title: "Transactions",
		more: "Afficher plus",
		details: {
			Payment: "UPS a livré un colis.",
			Collection: "Argent affecté à votre solde.",
			Adjustment: "UPS a changé le prix d'un colis.",
			Return: "Vous avez repris un colis annulé.",
			Transfer: "Vous avez livré votre colis à UPS.",
			Extract: "Vous avez extrait de votre solde.",
		},
	},
	datePicker: {
		last30: "30 derniers jours",
		yesterday: "Hier",
		lastWeek: "La semaine dernière",
		thisMonth: "Ce mois-ci",
	},
};

export default content;
