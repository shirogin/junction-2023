import ContentType from "./ContentType";

const content: ContentType = {
	steps: {
		PENDING: { step: "إنشاء الحزمة", sub: "تم إنشاء حزمتك" },
		PREPARED: { step: "إعداد الحزمة", sub: "تم إعداد حزمتك" },
		IN_TRANSIT: { step: "تسليم الحزمة", sub: "تم البدء في تسليم حزمتك" },
		DELIVERED: { step: "تم تسليم الحزمة", sub: "تم تسليم حزمتك." },
		MONEY_IN_TRANSIT: { step: "تسليم الحزمة", sub: "تم تسليم حزمتك." },
		MONEY_AFFECTED: { step: "تسليم الحزمة", sub: "تم تسليم حزمتك." },
		IN_RETURN: { step: "تسليم الحزمة", sub: "تم إلغاء حزمتك وهي في طريق العودة." },
		RETURNED: { step: "تسليم الحزمة", sub: "تم إرجاع حزمتك." },
	},
	defaultSteps: {
		PENDING: { step: "إنشاء الحزمة", sub: "تم استلام حزمتك" },
		PREPARED: { step: "إعداد الحزمة", sub: "يجب عليك إعداد الحزمة" },
		IN_TRANSIT: { step: "تسليم الحزمة", sub: "يجب عليك شحن حزمتك إلى مكتبك" },
		DELIVERED: { step: "تم تسليم الحزمة", sub: "انتظر قليلاً، سيتم تسليم حزمتك قريبًا" },
		MONEY_IN_TRANSIT: { step: "تسليم الحزمة", sub: "انتظر قليلاً، سيتم تسليم حزمتك قريبًا" },
		MONEY_AFFECTED: { step: "تسليم الحزمة", sub: "انتظر قليلاً، سيتم تسليم حزمتك قريبًا" },
		IN_RETURN: { step: "تسليم الحزمة", sub: "انتظر قليلاً، سيتم إرجاع حزمتك قريبًا" },
		RETURNED: { step: "تسليم الحزمة", sub: "انتظر قليلاً، سيتم إرجاع حزمتك قريبًا" },
	},
	package: {
		title: "معلومات الطلب",
		number: "رقم الطلب",
		pickUp: "عنوان الاستلام",
		delivery: "عنوان التوصيل",
	},
	client: {
		title: "معلومات العميل",
		name: "الاسم الكامل",
		phone: "رقم الهاتف",
		province: "الولاية",
		address: "العنوان",
	},
	payment: {
		title: "معلومات الدفع",
		price: "سعر الطلب",
		delivery: "تكلفة التوصيل",
		total: "الإجمالي",
		currency: "د.ج",
	},
};

export default content;
