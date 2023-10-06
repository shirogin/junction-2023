import { FieldInputProps, Form, FormikProvider, useFormik } from "formik";
import { MinusCirlce, Save2 } from "iconsax-react";
import * as Yup from "yup";
import NumberInput from "@/Components/NumberInput";
import { useEffect } from "react";
import Loading from "../Loading";
interface ZonesFeesSettingsI {
	fees: number[];
}
export default function WeightZonesFeesSettings({
	fees,
	onSubmit,
}: {
	onSubmit: (values: number[]) => void | Promise<void>;
	fees: number[];
}) {
	const formik = useFormik<ZonesFeesSettingsI>({
		initialValues: { fees },
		validationSchema: Yup.object().shape({
			fees: Yup.array().of(
				Yup.number().min(1, "The zone need to be at least 1 DZD").required("You have to provide a fee for desk zone")
			),
		}),
		validateOnChange: true,
		onSubmit: async (values) => {
			return onSubmit(values.fees);
		},
	});
	const { handleSubmit, getFieldProps, setValues, isValid, errors, isSubmitting } = formik;
	useEffect(() => {
		setValues({ fees });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fees]);
	return (
		<FormikProvider value={formik}>
			<div className="card-body">
				<h2 className="card-title">Zones Fees</h2>
				<p>Set the fees for each zone</p>
			</div>
			<Form onSubmit={handleSubmit} className="card-body relative overflow-auto mx-2">
				<table className="table w-full">
					<thead>
						<tr>
							<th className="pb-4 text-center">Zone Code</th>
							<th className="pb-4 text-center">Additional weight fees</th>
						</tr>
					</thead>
					<tbody>
						{fees.map((_, i) => (
							<tr key={"fee" + i} className="border-t">
								<td className="text-center">{i + 1}</td>
								<td>
									<NumberInput
										className="w-40"
										setValues={(val) => {
											setValues((oldVal) => {
												const oldFees = [...oldVal.fees];
												oldFees[i] += val === -1 && oldFees[i] === 1 ? 0 : val;
												return { ...oldVal, fees: oldFees };
											});
										}}
										error={errors.fees ? errors.fees[i] : undefined}
										id={`weight-fees-${i}`}
										props={getFieldProps(`fees.${i}`) as FieldInputProps<number>}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{errors.fees ? (
					<div className="dropdown dropdown-left dropdown-end dropdown-hover fixed bottom-24 right-6">
						<label tabIndex={0} className="shadow-lg bottom-6 right-6 btn btn-error rounded-full">
							<MinusCirlce className="w-4 h-4" /> Errors
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content flex-nowrap text-error z-[1] menu p-2 shadow bg-base-100 rounded-box min-w-[400px] max-w-[calc(100vw-10rem)] max-h-[60vh] overflow-y-auto"
						>
							{(errors.fees as unknown as PaymentFeeI<string>[])
								.map((error, i) => (error ? Object.values(error).map((e, j) => [e, i, j]) : []))
								.flat()
								.filter(([e]) => e)
								.map(([e, i, j]) => (
									<li key={"error" + i + "-" + j}>
										<a
											onClick={() => {
												const el = document.getElementById(`zones-${i}-${j}`) as HTMLInputElement;
												el.focus();
												el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
											}}
										>{`Province ${i + 1} /${j === 0 ? "Fee zone" : "weight zone"}: '${e}'`}</a>
									</li>
								))}
						</ul>
					</div>
				) : null}
				<button
					type="submit"
					className="fixed shadow-lg bottom-6 right-6 btn btn-primary rounded-full flex gap-2 items-center"
					disabled={!isValid || isSubmitting}
				>
					{isSubmitting ? <Loading /> : <Save2 className="w-4 h-4" />}
					Save
				</button>
			</Form>
		</FormikProvider>
	);
}
