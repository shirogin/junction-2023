import ContentType from "./ContentType";

const content: ContentType = {
    inputs: {
        name: {
            content: "Nom",
            error: "Vous devez fournir un nom",
        },
        phone: {
            content: "Numéro de téléphone",
            placeholder: "023000000 ou 0550000000",
            error: [
                "Vous devez fournir un numéro de téléphone valide",
                "Vous devez fournir un numéro de téléphone",
            ],
        },
        AttentionName: {
            content: "Nom d'attention",
            placeholder: "ex. : conexlog-dz",
            error: "Vous devez fournir un nom commercial",
        },
        Address: {
            error: "Vous devez fournir une adresse d'expédition",
        },
        AddressLine: {
            content: ["Adresse 1", "Adresse 2", "Adresse 3"],
        },
        City: {
            content: "Ville",
            error: "Vous devez fournir un nom de ville",
        },
        Province: {
            content: "Province",
            error: "Vous devez fournir un état",
        },
        PostalCode: {
            content: "Code postal",
            error: "Vous devez fournir un code postal",
        },
        CountryCode: {
            error: "Vous devez fournir un code de pays",
        },
    },
    save: "Enregistrer les détails de cette expédition",
    deskForm: {
        province: "Province",
        title: "Sélectionnez un bureau de livraison",
        select: "Sélectionner un bureau",
    },
};

export default content;
