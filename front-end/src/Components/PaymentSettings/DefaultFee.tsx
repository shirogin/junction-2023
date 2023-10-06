import NumberInput from "@/Components/NumberInput";
import { FieldInputProps, Form, FormikProvider, useFormik } from "formik";
import { Save2 } from "iconsax-react";
import { useEffect } from "react";
import * as Yup from "yup";
import Loading from "../Loading";
export default function DefaultFee({
	defaultFee,
	onSubmit,
}: {
	defaultFee: PaymentFeeI;
	onSubmit: (defaultFee: PaymentFeeI) => Promise<unknown>;
}) {
	const formik = useFormik<{ defaultFee: PaymentFeeI }>({
		initialValues: { defaultFee },
		validationSchema: Yup.object().shape({
			defaultFee: Yup.object().shape({
				desk: Yup.number().min(100, "The zone need to be at least 100").required("You have to provide a fee for desk zone"),
				door: Yup.number().min(100, "The zone need to be at least 100").required("You have to provide a fee for door zone"),
			}),
		}),
		validateOnChange: true,
		onSubmit: async (values) => onSubmit(values.defaultFee),
	});

	const { handleSubmit, getFieldProps, setValues, isValid, errors, isSubmitting } = formik;
	useEffect(() => {
		setValues({ defaultFee });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultFee]);
	return (
		<FormikProvider value={formik}>
			<div className="card-body">
				<h2 className="card-title">Default Zones Fees</h2>
				<p className="mb-4">Set the default fee (minimum fee) in case you haven't define the fees list.</p>
			</div>
			<div className="overflow-auto w-full">
				<Form onSubmit={handleSubmit} className="flex flex-col w-full px-8">
					<div className="flex justify-between">
						<label className="label" htmlFor="defaultFee-desk">
							Default fee for stop desk
						</label>
						<NumberInput
							className="w-40"
							setValues={(val) => {
								setValues((oldVal) => {
									const oldFees = oldVal.defaultFee;
									oldFees.desk += val === -1 && oldFees.desk === 1 ? 0 : val;
									return { /* ...oldFees, */ defaultFee: oldFees };
								});
							}}
							error={errors.defaultFee ? (errors.defaultFee as unknown as PaymentFeeI<string>)?.desk : undefined}
							id={`defaultFee-desk`}
							props={getFieldProps(`defaultFee.desk`) as FieldInputProps<number>}
						/>
					</div>
					<div className="flex justify-between">
						<label className="label" htmlFor="defaultFee-door">
							Default fee for stop door
						</label>
						<NumberInput
							className="w-40"
							setValues={(val) => {
								setValues((oldVal) => {
									const oldFees = oldVal.defaultFee;
									oldFees.door += val === -1 && oldFees.door === 1 ? 0 : val;
									return { /* ...oldFees, */ defaultFee: oldFees };
								});
							}}
							error={errors.defaultFee ? (errors.defaultFee as unknown as PaymentFeeI<string>)?.door : undefined}
							id={`defaultFee-door`}
							props={getFieldProps(`defaultFee.door`) as FieldInputProps<number>}
						/>
					</div>
					<button className="btn btn-primary w-full flex gap-2 items-center" disabled={!isValid || isSubmitting}>
						{isSubmitting ? <Loading /> : <Save2 className="w-4 h-4" />}
						Save
					</button>
				</Form>
			</div>
		</FormikProvider>
	);
}
