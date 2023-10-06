import ContentType from "./ContentType";

const content: ContentType = {
    inputs: {
        name: {
            content: "Name",
            error: "You have to provide a name",
        },
        phone: {
            content: "Phone number",
            placeholder: "023000000 or 0550000000",
            error: [
                "You have to provide a valid phone number",
                "You have to provide a phone number",
            ],
        },
        AttentionName: {
            content: "Attention Name",
            placeholder: "example : conexlog-dz",
            error: "You have to provide a business name",
        },
        Address: {
            error: "You have to provide a shipTo",
        },
        AddressLine: {
            content: ["Address 1", "Address 2", "Address 3"],
        },
        City: {
            content: "City",
            error: "You have to provide a city name",
        },
        Province: {
            content: "Province",
            error: "You have to provide a state",
        },
        PostalCode: {
            content: "Postal code",
            error: "You have to provide a postal code",
        },
        CountryCode: {
            error: "You have to provide a country code",
        },
    },
    save: "Save this shipment details",
    deskForm: {
        province: "Province",
        title: "Select a desk to deliver to ?",
        select: "Select a desk",
    },
};

export default content;
