import NumberInput from "@/Components/NumberInput";
import { FieldInputProps, Form, FormikProvider, useFormik } from "formik";
import { Save2 } from "iconsax-react";
import { useEffect } from "react";
import * as Yup from "yup";
import Loading from "../Loading";
export default function GlobalSettings({
	payment,
	onSubmit,
}: {
	payment: Partial<PaymentSettingI>;
	onSubmit: (payment: Partial<PaymentSettingI>) => Promise<unknown>;
}) {
	const formik = useFormik<Partial<PaymentSettingI>>({
		initialValues: payment,
		validationSchema: Yup.object().shape({
			globalCommission: Yup.number()
				.min(0, "The global commission must be at least 0%")
				.max(100, "The global commission must be at most 100%")
				.required("You have to provide a global commission."),
			globalAssurance: Yup.number()
				.min(0, "The global assurance must be at least 0%")
				.max(100, "The global assurance must be at most 100%")
				.required("You have to provide a global assurance."),
			maxDefaultWeight: Yup.number()
				.min(0, "The weight interval must be at least 1 KG")
				.max(70, "The weight interval must be at most 70 KG")
				.required("You have to provide a max weight for default fee."),
		}),
		validateOnChange: true,
		onSubmit: async (values) => onSubmit(values),
	});

	const { handleSubmit, getFieldProps, setValues, isValid, errors, isSubmitting } = formik;
	useEffect(() => {
		setValues(payment);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [payment]);
	return (
		<FormikProvider value={formik}>
			<div className="card-body">
				<h2 className="card-title">Default Zones Fees</h2>
				<p className="mb-4">Set the default fee (minimum fee) in case you haven't define the weight fees list.</p>
			</div>
			<div className="overflow-auto w-full mb-6">
				<Form onSubmit={handleSubmit} className="flex flex-col w-full px-8">
					<div className="flex justify-between">
						<label className="label" htmlFor="globalCommission">
							Global Commission of Products value (0-100%)
						</label>
						<NumberInput
							suffix="%"
							className="w-40"
							setValues={(val) => {
								setValues((oldVal) => {
									const oldCommission = oldVal.globalCommission || 0;
									return {
										...oldVal,
										globalCommission: oldCommission + (val === -1 && oldCommission === 0 ? 0 : val),
									};
								});
							}}
							error={errors.globalCommission ? errors.globalCommission : undefined}
							id={`globalCommission`}
							props={getFieldProps(`globalCommission`) as FieldInputProps<number>}
						/>
					</div>
					<div className="flex justify-between">
						<label className="label" htmlFor="globalAssurance">
							Global Assurance of Products value (0-100%)
						</label>
						<NumberInput
							suffix="%"
							className="w-40"
							setValues={(val) => {
								setValues((oldVal) => {
									const oldCommission = oldVal.globalAssurance || 0;
									return {
										...oldVal,
										globalAssurance: oldCommission + (val === -1 && oldCommission === 0 ? 0 : val),
									};
								});
							}}
							error={errors.globalAssurance ? errors.globalAssurance : undefined}
							id={`globalAssurance`}
							props={getFieldProps(`globalAssurance`) as FieldInputProps<number>}
						/>
					</div>
					<div className="flex justify-between">
						<label className="label" htmlFor="maxDefaultWeight">
							Max Weight of default fees (KG)
						</label>
						<NumberInput
							className="w-40"
							suffix="KG"
							setValues={(val) => {
								setValues((oldVal) => {
									const oldMaxDefault = oldVal.maxDefaultWeight || 0;
									return { ...oldVal, maxDefaultWeight: oldMaxDefault + (val === -1 && oldMaxDefault === 0 ? 0 : val) };
								});
							}}
							error={errors.maxDefaultWeight ? errors.maxDefaultWeight : undefined}
							id={`maxDefaultWeight`}
							props={getFieldProps(`maxDefaultWeight`) as FieldInputProps<number>}
						/>
					</div>

					<button className="btn btn-primary w-full mt-6 flex gap-2 items-center" disabled={!isValid || isSubmitting}>
						{isSubmitting ? <Loading /> : <Save2 className="w-4 h-4" />}
						Save
					</button>
				</Form>
			</div>
		</FormikProvider>
	);
}
