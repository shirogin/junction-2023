declare interface MoneyPartyI<Populated extends boolean = false> {
	desk: Populated extends true ? DeskI : string;
	by: Populated extends true ? AdminI : string;
}
declare interface MoneyCollectionI<Populated extends boolean = false> {
	_id: Populated extends true ? string : void;
	shipments: Populated extends true ? ShipmentI[] : string[];
	from: MoneyPartyI<Populated>;
	to: MoneyPartyI<Populated>;
	total: number;
	initContract: string;
	endContract?: string;
	createdAt: Populated extends true ? string : void;
	confirmedAt?: Populated extends true ? string : void;
}
declare interface MoneyCollectionRequest {
	shipments: string[];
	from: string;
	to: string;
	total: number;
	initContract: string;
}
