import { FieldInputProps, Form, FormikProvider, useFormik } from "formik";
import { MinusCirlce, Save2 } from "iconsax-react";
import * as Yup from "yup";
import NumberInput from "@/Components/NumberInput";
import Loading from "../Loading";

export default function ZonesSettings({
	zones,
	onSubmit,
}: {
	onSubmit: (zones: ZonesI[]) => void | Promise<void>;
	zones: ZonesProvincesI[];
}) {
	const formik = useFormik<{ zones: ZonesProvincesI[] }>({
		initialValues: { zones },
		validationSchema: Yup.object().shape({
			zones: Yup.array().of(
				Yup.object().shape({
					fee_zone: Yup.number().min(1, "The zone need to be at least 1").required("You have to provide a fee zone"),
					weight_zone: Yup.number().min(1, "The zone need to be at least 1").required("You have to provide a weight zone"),
				})
			),
		}),
		validateOnChange: true,
		onSubmit: async (values) => onSubmit(values.zones.map((zone) => ({ fee_zone: zone.fee_zone, weight_zone: zone.weight_zone }))),
	});
	const { handleSubmit, getFieldProps, setValues, isValid, errors, isSubmitting } = formik;

	return (
		<FormikProvider value={formik}>
			<div className="card-body">
				<h2 className="card-title">Zones provinces</h2>
				<p className="mb-4">Set the fee and weight zones for each province</p>
			</div>
			<Form onSubmit={handleSubmit} className="card-body relative overflow-auto mx-2">
				<table className="table w-full">
					<thead>
						<tr>
							<th className="pb-4 text-center">Province</th>
							<th className="pb-4 text-center">Province code</th>
							<th className="pb-4 text-center">Fee zone</th>
							<th className="pb-4 text-center">Weight zone</th>
						</tr>
					</thead>
					<tbody>
						{zones.map((zone, i) => (
							<tr key={"zone" + i} className="border-t">
								<td className="text-center">{zone.province}</td>
								<td className="text-center">{zone.province_code}</td>
								<td>
									<NumberInput
										setValues={(val) => {
											setValues((oldVal) => {
												const oldValues = [...oldVal.zones];
												oldValues[i].fee_zone +=
													val === -1 && oldValues[i].fee_zone === 1
														? 0
														: val === 1 && oldValues[i].fee_zone >= zones.length - 1
														? 0
														: val;
												return { zones: oldValues };
											});
										}}
										error={errors.zones ? (errors.zones[i] as unknown as ZonesProvincesI<string>)?.fee_zone : undefined}
										id={`zones-${i}-0`}
										props={getFieldProps(`zones.${i}.fee_zone`) as FieldInputProps<number>}
									/>
								</td>
								<td>
									<NumberInput
										setValues={(val) => {
											setValues((oldVal) => {
												const newVal = [...oldVal.zones];
												newVal[i].weight_zone +=
													val === -1 && newVal[i].weight_zone === 1
														? 0
														: val === 1 && newVal[i].weight_zone >= zones.length - 1
														? 0
														: val;

												return { zones: newVal };
											});
										}}
										error={
											errors.zones ? (errors.zones[i] as unknown as ZonesProvincesI<string>)?.weight_zone : undefined
										}
										id={`zones-${i}-1`}
										props={getFieldProps(`zones.${i}.weight_zone`) as FieldInputProps<number>}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{errors.zones ? (
					<div className="dropdown dropdown-left dropdown-end dropdown-hover fixed bottom-24 right-6">
						<label tabIndex={0} className="shadow-lg bottom-6 right-6 btn btn-error rounded-full">
							<MinusCirlce className="w-4 h-4" /> Errors
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content flex-nowrap text-error z-[1] menu p-2 shadow bg-base-100 rounded-box min-w-[400px] max-w-[calc(100vw-10rem)] max-h-[60vh] overflow-y-auto"
						>
							{(errors.zones as unknown as ZonesProvincesI<string>[])
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
