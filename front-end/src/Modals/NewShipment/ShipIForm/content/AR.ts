import ContentType from "./ContentType";

const content: ContentType = {
	inputs: {
		name: {
			content: "الاسم",
			error: "يجب عليك تقديم اسم",
		},
		phone: {
			content: "رقم الهاتف",
			placeholder: "مثال: 0555555555",
			error: ["يجب عليك تقديم رقم هاتف صالح", "يجب عليك تقديم رقم الهاتف"],
		},
		AttentionName: {
			content: "اسم الانتباه",
			placeholder: "مثال: conexlog-dz",
			error: "يجب عليك تقديم اسم تجاري",
		},
		Address: {
            error: "يجب عليك تقديم عنوان المرسل/المستلم"
          },
		AddressLine: {
			content: ["العنوان 1", "العنوان 2", "العنوان 3"],
		},
		City: {
			content: "المدينة",
			error: "يجب عليك تقديم اسم المدينة",
		},
		Province: {
			content: "الولاية",
			error: "يجب عليك تقديم حالة",
		},
		PostalCode: {
			content: "الرمز البريدي",
			error: "يجب عليك تقديم الرمز البريدي",
		},
		CountryCode: {
			error: "يجب عليك تقديم رمز البلد",
		},
	},
	save: "حفظ تفاصيل هذه الشحنة",
	deskForm: {
		province: "الولاية",
		title: "حدد مكتبًا لتوصيل الشحنة",
		select: "حدد مكتبًا",
	},
};

export default content;
