import React from "react";

interface ShipmentActionI extends ShipmentButtonActionI {
	Mutation: (shipmentId: ShipmentI) => Promise<unknown>;
	children: React.ReactNode;
	disabled?: boolean;
	className?: string;
}

export default function ShipmentAction({
	selected,
	afterAction,
	Mutation,
	children,
	disabled,
	className = "btn-primary",
}: ShipmentActionI) {
	return (
		<button
			onClick={() => {
				Promise.all(selected.map((s) => Mutation(s))).then(() => {
					if (afterAction) afterAction();
				});
			}}
			disabled={disabled}
			className={`btn btn-outline ${className} btn-sm rounded-lg`}
		>
			{children}
		</button>
	);
}
