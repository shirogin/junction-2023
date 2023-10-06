/**
 * Interface for desk within the app
 */
interface DeskBaseI {
	name: string;
	province: number;
	// information of the desk : ShipI<false>;
	information: ShipI; // ShipI
	description: string;

	/** ID of the user who is responsible for the desk */
	geo_location: {
		lat: number;
		lng: number;
		url: string;
	};
}
interface DeskI extends DeskBaseI {
	/** Unique identifier for the desk within the app */
	_id: string;
	enabled: boolean;
	// information of the desk : ShipI<false>;
	/** ID of the user who is responsible for the desk */
	responsible: string;
	workers: string[];
	/** Date and time when the desk was created */
	createdAt: Date;
	/** Date and time when the desk was last updated */
	updatedAt: Date;
}

interface DeskModelI {
	_id: string;
	name: string;
	province: string;
	information: string;
}

interface DeskStoreI {
	current: string;
	list: DeskModelI[];
}
declare interface FlatDesk {
	lat: number;
	lng: number;
	url: string;
	description: string;
	Phone: string;
	AddressLine1: string;
	AddressLine2: string;
	AddressLine3: string;
	City: string;
	StateProvinceCode: number;
	PostalCode: number;
	Name: string;
}
