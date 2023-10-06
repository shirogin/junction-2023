import ContentType from "./ContentType";

const content: ContentType = {
	toBeCollected: "Amount to be Collected",
	currentValue: "Value UPS has currently",
	collected: "Amount Collected",
	currency: "DZD",
	notify: {
		title: "Loading Balance",
		content: "Balance Loaded Successfully",
	},
	errofy: {
		title: "Loading Balance",
		content: "Error while fetching balance",
	},
	stats: {
		balance: "YOUR BALANCE",
		currently: "Value UPS has currently",
		collected: "Amount Collected",
		returned: "Product Returned",
		extracted: "Amount Extracted",
		gained: "Amount Gained",
	},
	transactions: {
		title: "Transactions",
		more: "Show more",
		details: {
			Payment: "UPS has delivered a shipment.",
			Collection: "Money affected to your balance.",
			Adjustment: "UPS has changed the pricing of a package.",
			Return: "You have taken back a canceled package.",
			Transfer: "You have delivered your package at UPS.",
			Extract: "You have extracted from your balance.",
		},
	},
	datePicker: {
		last30: "Last 30 days",
		yesterday: "Yesterday",
		lastWeek: "Last Week",
		thisMonth: "This Month",
	},
};

export default content;
