/**
 * Interface for a product within the app
 */
declare interface BaseProductI {
	/** SKU of the product */
	sku: string;
	/** Name of the product */
	name: string;
	/** Description of the product, visible to both the app and UPS */
	description: string;
	type: string;
	/** Weight of the product in pounds */
	weight: number;
	/** Width of the product in inches */
	width: number;
	/** Height of the product in inches */
	height: number;
	/** Length of the product in inches */
	length: number;
	/** Price of the product */
	price: number;
}
declare interface ProductI extends BaseProductI {
	/** Unique identifier for the product within the app */
	_id: string;
	/** Name of the product */
	/** ID of the user who created the product */
	createdBy: string;
	/** ID of the user who the product was created for */
	createdFor: string;
	shipped: number;
	/** Date the product was created at */
	createdAt: string;
}

declare type DimensionsUnits = {
	Code: "CM";
	Description: "Centimeter";
}; // add more using '|' operator
declare type WeightUnits = {
	Code: "KGS";
	Description: "Kilograms";
}; // add more using '|' operator

/**
 * Interface for a product as expected by UPS
 */
declare interface UPSProductI {
	/** Description of the product */
	Description: string;
	/** Packaging information for the product */
	Packaging: {
		/** Code for the packaging type */
		Code: "02";
		/** Description of the packaging type */
		Description: "Nails";
	};
	/** Dimensions of the product */
	Dimensions?: {
		/** Unit of measurement for the dimensions */
		UnitOfMeasurement: DimensionsUnits;
		/** Length of the product in inches */
		Length: string;
		/** Width of the product in inches */
		Width: string;
		/** Height of the product in inches */
		Height: string;
	};
	/** Weight of the product */
	PackageWeight: {
		/** Unit of measurement for the weight */
		UnitOfMeasurement: WeightUnits;
		/** Weight of the product in pounds */
		Weight: string;
	};
}
