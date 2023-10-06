export default interface ContentType {
    title: string;
    productDetails: {
        title: string;
        id: string;
        createdAt: string;
        description: string;
        type: string;
        Measurements: {
            title: string;
            d: string;
            cm: string;
            w: string;
            kg: string;
        };
        value: {
            title: string;
            currency: string;
        };
        price: {
            title: string;
            currency: string;
        };
    };
    steps: string[];
    senderInformation: {
        title: string;
        new: string;
    };
    receiverInformation: {
        title: string;
        address: string;
    };
    DeskInformation: {
        title: string;
        select: string;
        inputLabel: string;
        placeholder: string;
    }
    verificationInformation: {
        from: string;
        to: string;
        by: string;
    };
    paymentCard: {
        value: string;
        price: string;
        total: string;
        currency: string;
    }
    CongratsCard: string[];
    previous: string;
    continue: string;
    create: string;
}
