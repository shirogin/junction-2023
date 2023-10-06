import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "@/Components/Input";
import { useSetUpPinCodeAccountMutation } from "@/app/backend/export/client";
import { useNotification } from "@/hooks";

type formI = { pinCode: string; confirmPinCode: string };
const inputs: InputRequiredFields<formI>[] = [
	{
		required: true,
		name: "pinCode",
		label: "Pin code",
		placeholder: "****",
		type: "password",
		id: "client-pinCode",
	},
	{
		required: true,
		name: "confirmPinCode",
		label: "Confirm pin code",
		placeholder: "****",
		type: "password",
		id: "confirmPinCode",
	},
];

export default function UpdatePin({ clientId }: { clientId: string }) {
	const [SetupPinCode, { isLoading }] = useSetUpPinCodeAccountMutation();
	const { Notify, Errofy } = useNotification();
	const formik = useFormik<formI>({
		initialValues: {
			pinCode: "",
			confirmPinCode: "",
		},
		validationSchema: Yup.object().shape({
			pinCode: Yup.string()
				.matches(/^\d{4}$/, "You have to provide a correct pin code composed of 4 digits")
				.required(),
			confirmPinCode: Yup.string()
				.oneOf([Yup.ref("pinCode")], "Must match Pin code")
				.required("You have to confirm the pin code"),
		}),
		onSubmit: (values) => {
			SetupPinCode({ clientId, pinCode: values.pinCode })
				.unwrap()
				.then((res) => {
					Notify("Setting up client administration", res.message);
				})
				.catch((err) => {
					Errofy("Setting up client administration", err, "Error setting up client administration");
				});
		},
	});
	const { errors, touched, getFieldProps, handleSubmit, isValid } = formik;
	return (
		<FormikProvider value={formik}>
			<Form onSubmit={handleSubmit} className="w-full flex flex-col break-words">
				{inputs.map(({ name, type = "text", ...props }, i) => (
					<Input
						key={i}
						type={type}
						props={getFieldProps(name)}
						{...props}
						error={touched[name] && errors[name] ? errors[name] : undefined}
					/>
				))}

				<button type="submit" className="btn btn-primary mt-2 w-full " disabled={isLoading || !isValid}>
					{isLoading ? (
						<>
							<span className="loading loading-spinner"></span>Updating
						</>
					) : (
						"Update"
					)}
				</button>
			</Form>
		</FormikProvider>
	);
}
