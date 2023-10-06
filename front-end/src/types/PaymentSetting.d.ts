interface ZonesI<T extends number | string = number> {
	fee_zone: T;
	weight_zone: T;
}
interface PaymentFeeI<T extends number | string = number> {
	desk: T;
	door: T;
}
interface PaymentSettingI {
	zones: ZonesI[];
	fees: PaymentFeeI[];
	defaultFee: PaymentFeeI;
	additionalWeightFees: number[];
	defaultAdditionalWeightFee: number;
	globalCommission: number;
	globalAssurance: number;

	maxDefaultWeight: number;
	settingRef: Types.ObjectId;
	settingType?: "Desk" | "User";
}
interface ZonesProvincesI<T extends number | string = number> extends ZonesI<T> {
	province: string;
	province_code: number;
}
