export default interface ContentType {
    inputs: {
        name: {
            content: string;
            error: string;
        };
        phone: {
            content: string;
            placeholder: string;
            error: string[];
        };
        AttentionName: {
            content: string;
            placeholder: string;
            error: string;
        };
        Address: {
            error: string;
        };
        AddressLine: {
            content: string[];
        };
        City: {
            content: string;
            error: string;
        };
        Province: {
            content: string;
            error: string;
        };
        PostalCode: {
            content: string;
            error: string;
        };
        CountryCode: {
            error: string;
        };
    };
    save: string;
    deskForm: {
        province: string;
        title: string;
        select: string;
    };
}
