declare interface UserAuthI {
	username: string;
	password: string;
	stay: boolean;
}

declare interface UserBaseI extends Omit<UserAuthI, "stay"> {
	email: string;
	firstName: string;
	lastName: string;
	phone: string;
	desks?: string[];
	kind?: "Client" | "DeliveryMan" | "Admin";
	confirmPassword: string;
}
declare interface UserI extends Omit<UserBaseI, "password" | "confirmPassword"> {
	_id: string;
	enabled: boolean;
	createdAt: Date;
	desks: DeskModelI[];
	updatedAt: Date;
}
type IntegrationsEnum = { ups: TokenI };

/* declare interface DeviceUpdates {
	deviceId: string;
	date: Date;
	ip: string;
	byUser: string;
} */

declare interface IntegrationI /* <T extends keyof IntegrationsEnum = "ups">  */ {
	uuid: string | null;
	/* data: IntegrationsEnum[T] | null;
    updates: DeviceUpdates[]; */
}
declare interface BusinessInfoI {
	savedShipments: ShipI[];
	defaultShipment: ShipI | null;
	defaultDesk: DeskI | null;
	desks: DeskI[];
}
declare interface ClientI extends UserI {
	paymentMethod?: string;
	balance?: Types.ObjectId | null;
	description?: string;
	businessInfo?: BusinessInfoI;
	upsIntegrationSet: boolean;
	kind: "Client";
}

declare interface DeliveryManI extends UserI {
	kind: "DeliveryMan";
}

declare interface AdminI extends UserI {
	kind: "Admin";
	role: string | null;
}

type UsersI = AdminI | ClientI | DeliveryManI;
interface ExtendedClientI extends ClientI {
	shipments: ShipmentI[];
	products: ProductI[];
	savedShipments: ShipI[];
}
