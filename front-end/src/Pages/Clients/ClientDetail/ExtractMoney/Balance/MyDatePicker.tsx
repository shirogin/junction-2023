import DatePicker, { DateValueType } from "react-tailwindcss-datepicker";
import { CalendarEdit } from "iconsax-react";
import { useEffect, useState } from "react";
import { useLang } from "@/hooks";
import ContentType from "./content/ContentType";
import { endOfMonth, startOfMonth, subDays } from "date-fns/esm";
import Error500 from "@/Pages/Errors/Error500";

export default function MyDatePicker({
	dateValue,
	setDateValue,
}: {
	dateValue: DateValueType;
	setDateValue: React.Dispatch<React.SetStateAction<DateValueType>>;
}) {
	const handleDatePickerValueChange = (newValue: DateValueType) => setDateValue(newValue);
	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();

	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);
	if (!content) return <Error500 />;

	return (
		<div className="relative m-r w-full md:w-72 z-[1]">
			<DatePicker
				containerClassName="w-full"
				value={dateValue}
				inputClassName="input input-bordered w-full hover:cursor-pointer select-none"
				readOnly
				popoverDirection={"down"}
				toggleClassName="invisible"
				onChange={handleDatePickerValueChange}
				showShortcuts={true}
				primaryColor={"teal"}
				configs={{
					shortcuts: {
						last30Days: {
							text: content.datePicker.last30,
							period: {
								start: subDays(new Date(), 30),
								end: new Date(),
							},
						},
						yesterday: {
							text: content.datePicker.yesterday,
							period: {
								start: subDays(new Date(), 1),
								end: subDays(new Date(), 1),
							},
						},
						customToday: {
							text: content.datePicker.lastWeek,
							period: {
								start: subDays(new Date(), 7),
								end: new Date(),
							},
						},
						next8Days: {
							text: content.datePicker.thisMonth,
							period: {
								start: startOfMonth(new Date()),
								end: endOfMonth(new Date()),
							},
						},
					},
				}}
			/>
			<CalendarEdit className="absolute top-3 right-3 text-gray-500" />
		</div>
	);
}
