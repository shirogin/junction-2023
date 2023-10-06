import NumberInput from "@/Components/NumberInput";
import { FieldInputProps, Form, FormikProvider, useFormik } from "formik";
import { Save2 } from "iconsax-react";
import { useEffect } from "react";
import * as Yup from "yup";
import Loading from "../Loading";
export default function DefaultWeightFee({
	defaultFee,
	onSubmit,
}: {
	defaultFee: number;
	onSubmit: (defaultFee: number) => Promise<unknown>;
}) {
	const formik = useFormik<{ defaultFee: number }>({
		initialValues: { defaultFee },
		validationSchema: Yup.object().shape({
			defaultFee: Yup.number().min(1, "The zone need to be at least 1 DZD").required("You have to provide a fee for desk zone"),
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
				<p className="mb-4">Set the default fee (minimum fee) in case you haven't define the weight fees list.</p>
			</div>
			<div className="overflow-auto w-full">
				<Form onSubmit={handleSubmit} className="flex flex-col w-full px-8">
					<div className="flex justify-between">
						<label className="label" htmlFor="defaultFee-weight">
							Default fee for additional kg per zone
						</label>
						<NumberInput
							className="w-40"
							setValues={(val) => {
								setValues((oldVal) => {
									return { defaultFee: oldVal.defaultFee + (val === -1 && oldVal.defaultFee === 1 ? 0 : val) };
								});
							}}
							error={errors.defaultFee ? errors.defaultFee : undefined}
							id={`defaultFee-weight`}
							props={getFieldProps(`defaultFee`) as FieldInputProps<number>}
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
