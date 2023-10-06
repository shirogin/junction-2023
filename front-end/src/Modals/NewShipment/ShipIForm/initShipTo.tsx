export const initShipTo: (desk: boolean) => ShipI = (desk) => ({
	Name: "",
	Phone: { Number: "" },
	AttentionName: "",
	Address: {
		AddressLine: ["", "", ""],
		City: "0",
		StateProvinceCode: 16,
		PostalCode: 16000,
		CountryCode: "DZ",
		ResidentialAddressIndicator: desk ? undefined : "Y",
	},
	ref: undefined,
});
