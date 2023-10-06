export default interface ContentType {
	toBeCollected: string;
	currentValue: string;
	collected: string;
	currency: string;
	notify: {
		title: string;
		content: string;
	};
	errofy: {
		title: string;
		content: string;
	};
	stats: {
		balance: string;
		currently: string;
		collected: string;
		returned: string;
		extracted: string;
		gained: string;
	};
	transactions: {
		title: string;
		more: string;
		details: {
			Payment: string;
			Collection: string;
			Adjustment: string;
			Return: string;
			Transfer: string;
			Extract: string;
		};
	};
	datePicker: {
		last30: string;
		yesterday: string;
		lastWeek: string;
		thisMonth: string;
	};
}
