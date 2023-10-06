type TransactionsTypes =
	| 0 //"Payment" // Transaction type for payment ( payment from receiver to delivery or desk)
	| 1 //"Collection" // Transaction type for Collection ( sending money from desk to desk)
	| 2 //"Adjustment" // Transaction type for Collection ( sending money from desk to desk)
	| 3 //"Return" // Transaction type for Returned shipment ( returning package to user)
	| 4; //"Transfer"; // Transaction type for product transfer ( package value to desk )

// create interface that represent the transaction sender or receiver
interface TransactionPartyI {
	ref: string;
	refType: "User" | "Desk";
}

interface TransactionI {
	_id: string;
	client: string; // Reference of the desk in the transaction
	desk: string | null; // Reference of the desk in the transaction
	sender: TransactionPartyI | null; // Reference to the sender
	receiver: TransactionPartyI | null; // Reference to the receiver
	amount: number; // The amount of money involved in the transaction
	description: string; // A description or note for the transaction
	status: 0 | 1 | 2 | 3; // Transaction status : "Pending" |"In-Transit"| "Completed" | "Archived"
	createdAt: Date;
	kind:
		| "Package" // Transaction type for Shipments ( payment , collection or transfer )
		| "Extract"; // Transaction type for extraction ( sending money from desk to client)
}
interface ShipmentTransactionI<T extends TransactionsTypes = TransactionsTypes> extends TransactionI {
	// Any additional fields specific to your transactions
	type: T;
	shipment: string; // Reference to a shipment or order
	kind: "Package"; // Transaction type for Shipments ( payment , collection or transfer )
}
interface ExtractTransactionI extends TransactionI {
	kind: "Extract"; // Transaction type for extraction ( sending money from desk to client)
}
declare type TransactionsI = ShipmentTransactionI | ExtractTransactionI;
declare type TransactionsKindI = TransactionsTypes | "Extract";
// balance object
interface BalanceI {
	balance: number;
	returnedValue: number;
	extractedValue: number;
	gainedValue: number;
	upsCollectedValue: number;
	upsTransferredValue: number;
}
interface TransactionFilter {
	type: TransactionsTypes | undefined;
	kind: TransactionKind;
}
interface ExportedTransactionI {
	amount: string;
	description: string;
	createdAt: string;
	type: string;
	shipment: string;
	status: string;
}
