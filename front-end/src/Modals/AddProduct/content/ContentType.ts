interface InputContentI {
	content: string;
	suffix?: string;
	error: string[];
}
export default interface ContentType {
	title: string;
	package: {
		title: string;
		name: InputContentI;
		sku: InputContentI;
		description: InputContentI;
		type: InputContentI;
		width: InputContentI;
		height: InputContentI;
		length: InputContentI;
		weight: InputContentI;
	};
	payment: {
		title: string;
		price: InputContentI;
	};
	button: string;
}
