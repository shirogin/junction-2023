import ContentType from "./ContentType";

const content: ContentType = {
    title: "شحنة جديدة",
    productDetails: {
        title: "الطرد",
        id: "معرف الطرد",
        createdAt: "تم الإنشاء في",
        description: "محتويات الطرد",
        type: "نوع الطرد",
        Measurements: {
            title: "قياسات الطرد",
            d: "د",
            cm: "سم",
            w: "ع",
            kg: "كغ",
        },
        value: {
            title: "قيمة الطرد",
            currency: "د.ج",
        },
        price: {
            title: "السعر النهائي يبدأ من",
            currency: "د.ج",
        },
    },
    steps: ["معلومات المرسل", "معلومات المستلم", "معلومات المكتب", "التحقق", "إنهاء"],
    senderInformation: {
        title: "هل ترغب في استخدام عنوانك الافتراضي؟",
        new: "إضافة عنوان جديد",
    },
    receiverInformation: {
        title: "هل ترسل إلى المكتب؟",
        address: "عنوان المستلم",
    },
    DeskInformation: {
        title: "حدد المكتب الذي ستضع فيه طردك",
        select: "حدد مكتبًا",
        inputLabel: "حدد ولاية المكتب",
        placeholder: "ولاية",
    },
    verificationInformation: {
        from: "أنت ترسل من",
        to: "أنت ترسل إلى",
        by: "أنت تسلمه عن طريق",
    },
    paymentCard: {
        value: "قيمة البضاعة / الشحنة",
        price: "سعر التوصيل",
        total: "السعر الإجمالي",
        currency: "د.ج",
    },
    CongratsCard: [
        "فشل الشحنة، يرجى التحقق من المعلومات",
        "تم إنشاء الشحنة بنجاح",
        "انتقل إلى صفحة الشحنة الجديدة",
    ],
    previous: "السابق",
    continue: "متابعة",
    create: "إنشاء الشحنة",
};

export default content;
