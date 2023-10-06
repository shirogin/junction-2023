import ContentType from "./ContentType";

const content: ContentType = {
	title: "إنشاء طرد جديد",
	package: {
		title: "معلومات الطرد",
		name: {
			content: "الاسم",
			error: ["يجب تقديم اسم", "يجب أن يحتوي الاسم على 3 أحرف على الأقل", "يجب ألا يحتوي الاسم على أكثر من 35 حرفًا"],
		},
		sku: {
			content: "SKU",
			error: ["يجب تقديم SKU", "يجب أن يحتوي SKU على 3 أحرف على الأقل", "يجب ألا يحتوي SKU على أكثر من 35 حرفًا"],
		},
		description: {
			content: "محتويات الطرد",
			error: ["يجب تقديم محتويات الطرد"],
		},
		type: {
			content: "النوع",
			error: ["يجب تقديم نوع", "لا يمكن أن يحتوي النوع على مسافات في البداية والنهاية", "يجب أن يحتوي النوع على 3 أحرف على الأقل"],
		},
		width: {
			content: "العرض",
			suffix: "سم",
			error: ["يجب تقديم عرض", "لا يمكن أن يكون العرض أقل من 1.00 سم", "لا يمكن أن يكون العرض أكثر من 100.00 سم"],
		},
		height: {
			content: "الارتفاع",
			suffix: "سم",
			error: ["يجب تقديم ارتفاع", "لا يمكن أن يكون الارتفاع أقل من 1.00 سم", "لا يمكن أن يكون الارتفاع أكثر من 100.00 سم"],
		},
		length: {
			content: "الطول",
			suffix: "سم",
			error: ["يجب تقديم طول", "لا يمكن أن يكون الطول أقل من 1.00 سم", "لا يمكن أن يكون الطول أكثر من 100.00 سم"],
		},
		weight: {
			content: "الوزن",
			suffix: "كغ",
			error: ["يجب تقديم وزن", "لا يمكن أن يكون الوزن أقل من 0.01 كغ", "لا يمكن أن يكون الوزن أكثر من 70.00 كغ"],
		},
	},
	payment: {
		title: "معلومات الدفع",
		price: {
			content: "السعر",
			suffix: "دج",
			error: ["يجب تقديم سعر", "لا يمكن أن يكون السعر أقل من 100.00 دج", "لا يمكن أن يكون السعر أكثر من 150,000.00 دج"],
		},
	},
	button: "إنشاء الطرد",
};

export default content;