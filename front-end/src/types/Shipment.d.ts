/**
 * The status of a shipment
 */
declare type ShipmentStatus =
	| "PENDING"
	| "PREPARED"
	| "IN_TRANSIT"
	| "DELIVERED"
	| "MONEY_IN_TRANSIT"
	| "MONEY_AFFECTED"
	| "IN_RETURN" // means it has been canceled
	| "RETURNED"; // client collected it back

declare type IN_HOLDS =
	| "IN_HOLD" // it means that the pack is in the cargo of the desk
	| "CANCELED_IN_HOLD"; // it means that the shipment in cargo is for returning
type ASSIGNED_TYPE =
	| "ASSIGNED" // assigned to a delivery man to deliver it to a domicile address
	| "ASSIGNED_TRANSIT"; // assigned to delivery man to transit it to a desk

declare type ASSIGNED =
	| ASSIGNED_TYPE
	| "ASSIGNED_RETURN" // assigned to delivery man to return it to a desk
	| "IN_TRANSIT" // it means the shipment is in transit to another desk
	| "IN_DELIVERY" // it means the shipment is in delivery to a domicile address
	| "IN_RETURN_TRANSIT"; // it means the shipment is in return to a desk
declare type MONEY_TRACKS =
	| "MONEY_COLLECTED" // money collected by desk worker
	| "MONEY_AFFECTED"; // money affected to the client balance

declare type TRACKS = "IN_HOLDS" | "ASSIGNED" | "MONEY_TRACKS" | "DELIVERED" | "RETURNED";
declare type TrackStatus =
	| IN_HOLDS
	| ASSIGNED
	| MONEY_TRACKS
	| "DELIVERED" // it means shipment has been delivered
	| "RETURNED"; // package has return to it's owner

declare type ShipmentGlobalStatus = "PENDING" | "PREPARED" | TrackStatus;
/**
/**
 * An object representing an assigned user
 */
declare interface IN_CARGO {
	location: ShipI; // ref Ships
}
declare interface IN_ASSIGNMENT<T extends string | ShipI = string> {
	from: T; // ref Ships
	to: T; // ref ships
	assignedTo: T extends string ? string : DeliveryManI; // ref Delivery Man
}
declare interface IN_MONEY_TRANSACTION {
	ref: string; // ref Transaction
	contract: string; // file name of the contract
}
declare interface IN_RETURNED {
	contract: string; // file name of the contract
}
/**
 * An object representing the tracking information of a shipment
 */
declare interface TrackI<T extends TrackStatus> {
	status: T;
	createdAt: Date;
	assignedBy: string; // the person who changed the status of the shipment
	shipment: string; // the shipment id
	data: {
		IN_HOLDS: T extends IN_HOLDS ? IN_CARGO : undefined;
		ASSIGNED: T extends ASSIGNED ? IN_ASSIGNMENT : undefined;
		MONEY_TRACKS: T extends MONEY_TRACKS ? IN_MONEY_TRANSACTION : undefined;
		RETURNED: T extends "RETURNED" ? IN_RETURNED : undefined;
	};
}
declare interface ShipmentTrackI<T extends ShipmentStatus> {
	status: T;
}
/**
 * An object representing an address
 */
declare interface AddressI<T = string> {
	AddressLine: [string, string?, string?];
	City: string;
	PostalCode: T;
	StateProvinceCode: T;
	CountryCode?: "DZ";
	ResidentialAddressIndicator?: "Y";
}

/**
 * An object representing a shipper
 */
declare type ShipI<Data = number> = {
	_id?: string;
	Name: string;
	AttentionName: string;
	Phone: {
		Number: string;
		Extension?: "213";
	};
	Address: AddressI<Data>;
	ref?: string;
	createdAt?: Date;
};

type ActionsEnumI = "NOT_HOME" | "WRONG_ADDRESS" | "NO_PHONE_RESPONSE" | "CANCELED" | "OTHER";
interface ShipmentIssueResolutionI {
	by: UserI;
	at: Date;
	action: "TO_TRY_AGAIN" | "TO_CANCEL" | "OTHER";
	comment: string;
}
/**
 * An object representing an issue with a shipment
 */
interface ShipmentIssueI<T extends "OPEN" | "RESOLVED" = "OPEN" | "RESOLVED"> {
	_id: string;
	shipmentId: string; // Reference to the related shipment
	reportedBy: UserI; // ID of the user who reported the issue
	reportedAt: Date; // Date when the issue was reported
	comment: string; // Description of the issue
	// all actions that can happen to delivery man while delivering the shipment
	action: ActionsEnumI;
	status: T; // Status of the issue
	resolution: T extends "RESOLVED" ? ShipmentIssueResolutionI : null;
}
/**
 * An object representing a shipment request
 */
declare interface ShipmentRequestI {
	createdFor?: string; // Reference to the client who created the shipment for
	product: ProductI | string; // Reference to the product being shipped
	shipTo: ShipI | string; // address where the products will be delivered
	deliverTo: string; // address where the products will be delivered
	shipFrom?: ShipI | string; // if ship from is different from client address
}

/**
 * An object representing a shipment
 */
declare interface ShipmentI {
	_id: string;
	createdBy: string; // Reference to the client who created the shipment
	createdFor: ClientI; // Reference to the client who created the shipment for
	alreadyInCollection: boolean; // if the shipment is already in collection or not
	product: ProductI; // Reference to the product being shipped
	isStopDesk: boolean; // if the shipment is a stop desk or not
	shipTo: ShipI; // address where the products will be delivered
	deliverTo: DeskI; // address where the products will be delivered
	shipFrom: ShipI; // if ship from is different from client address
	pricing: {
		product: number; // Tracking number for the shipment from UPS
		weightPrice: number;
		commissionFee: number;
		assuranceFee: number;
		delivery: number;
	};
	shipmentIssues: ShipmentIssueI[];
	lastTrack: TrackI<TrackStatus> & IN_ASSIGNMENT<ShipI> & { location?: ShipI };
	trackingNumber: string; // Tracking number for the shipment from UPS
	weight: number;
	references: [string, ...string[]]; // Shipment references
	status: ShipmentStatus; // Status of the shipment
	trackHistory: ShipmentTrackI<ShipmentStatus>[]; // tracking history of the shipment
	createdAt: Date; // Date when the shipment was created
}
interface PrepId {
	_id: string;
	info: ShipI;
}
declare interface ShipmentRequestPrepI {
	product: string; // Reference to the product being shipped
	deliverTo: string; // the location of the desk to be handed to
	shipTo: ShipI | PrepId; // address where the products will be delivered
	shipFrom?: ShipI | PrepId; // if ship from is different from client address
}

declare interface ShipmentButtonActionI<T extends ShipmentI | ShipmentI[] = ShipmentI[]> {
	selected: T;
	afterAction?: () => void;
}
