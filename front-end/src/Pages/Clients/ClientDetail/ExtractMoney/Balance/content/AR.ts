import ContentType from "./ContentType";

const content: ContentType = {
	toBeCollected: "المبلغ الذي يجب جمعه",
	currentValue: "القيمة الحالية لشركة UPS ",
	collected: "المبلغ المحصل",
	currency: "دج",
	notify: {
		title: "جاري تحميل الرصيد",
		content: "تم تحميل الرصيد بنجاح",
	},
	errofy: {
		title: "جاري تحميل الرصيد",
		content: "حدث خطأ أثناء جلب الرصيد",
	},
	stats: {
		balance: "رصيدك",
		currently: "القيمة الحالية لشركة UPS",
		collected: "المبلغ المحصل",
		returned: "المنتج المُرجَع",
		extracted: "المبلغ المُستخرج",
		gained: "المبلغ المُكتسب",
	},
	transactions: {
		title: "المعاملات",
		more: "عرض المزيد",
		details: {
			Payment: "قامت شركة UPS بتسليم شحنة.",
			Collection: "لقد تم إيداع الأموال في رصيدك.",
			Adjustment: "قامت شركة UPS بتغيير سعر الحزمة.",
			Return: "لقد أعدت حزمة ملغاة.",
			Transfer: "لقد قمت بتسليم حزمتك إلى شركة UPS.",
			Extract: "لقد استخرجت من رصيدك.",
		},
	},
	datePicker: {
		last30: "آخر 30 يومًا",
		yesterday: "البارحة",
		lastWeek: "الأسبوع الماضي",
		thisMonth: "هذا الشهر",
	},
};

export default content;
