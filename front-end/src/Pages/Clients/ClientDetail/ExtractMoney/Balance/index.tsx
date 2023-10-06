import { DateValueType } from "react-tailwindcss-datepicker";
import { useState } from "react";
import AmountStats from "./AmountStats";
import MyDatePicker from "./MyDatePicker";
import { useGetBalanceQuery } from "@/app/backend/export/transactions";
import Fallback from "@/Components/Fallback";
import { endOfMonth, startOfMonth } from "date-fns";
import { MoneyRecive } from "iconsax-react";

const Balance = ({ clientId }: { clientId: string }) => {
	const [amount, setAmount] = useState(0);

	const [dateValue, setDateValue] = useState<DateValueType>({
		startDate: startOfMonth(new Date()),
		endDate: endOfMonth(new Date()),
	});
	console.log(dateValue);

	const { isFetching, data } = useGetBalanceQuery({
		startDate: (new Date(dateValue?.startDate as string) || startOfMonth(new Date())).getTime(),
		endDate: (new Date(dateValue?.endDate as string) || endOfMonth(new Date())).getTime(),
		clientId,
	});

	const balanceInfo: BalanceI = data?.data || {
		balance: 0,
		returnedValue: 0,
		extractedValue: 0,
		gainedValue: 0,
		upsCollectedValue: 0,
		upsTransferredValue: 0,
	};
	return (
		<div className="grid grid-cols-1  gap-4 w-full">
			<div className="w-full flex justify-between">
				<MyDatePicker dateValue={dateValue} setDateValue={setDateValue} />
			</div>
			{isFetching ? (
				<Fallback />
			) : (
				<>
					<AmountStats balanceInfo={balanceInfo} />
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-bold">Enter the amount</span>
						</label>
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							placeholder="Type here"
							className="input input-bordered w-full "
						/>
					</div>

					<button
						className="btn btn-primary w-full"
						disabled={!amount || amount > balanceInfo.balance}
						onClick={() => {
							console.log(amount);
						}}
					>
						<MoneyRecive className="w-6 h-6" /> Extract
					</button>
				</>
			)}
		</div>
	);
};

export default Balance;
