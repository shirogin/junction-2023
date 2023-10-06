import Balance from "./Balance";

type Props = {
	clientId: string;
};

export default function ExtractMoney({ clientId }: Props) {
	return (
		<div className="w-full flex flex-col gap-4">
			<h1 className="text-2xl">Extract Money</h1>
			<Balance clientId={clientId} />
		</div>
	);
}
