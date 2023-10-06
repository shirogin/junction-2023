import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "@/Components/Input";

import { useNotification } from "@/hooks";
import { useChangeAdminPasswordMutation } from "@/app/backend/export/admin";

type formI = { password: UserBaseI["password"]; confirmPassword: UserBaseI["confirmPassword"] };
const inputs: InputRequiredFields<formI>[] = [
	{
		required: true,
		name: "password",
		label: "Password",
		placeholder: "password",
		type: "password",
		id: "client-password",
	},
	{
		required: true,
		name: "confirmPassword",
		label: "Confirm Password",
		placeholder: "confirm password",
		type: "password",
		id: "confirmPassword",
	},
];

export default function UpdatePassword({ adminId }: { adminId: string }) {
	const [UpdatePassword, { isLoading }] = useChangeAdminPasswordMutation();
	const { Notify, Errofy } = useNotification();

	const formik = useFormik<{ password: UserBaseI["password"]; confirmPassword: UserBaseI["confirmPassword"] }>({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object().shape({
			password: Yup.string().required("You have to provide a password"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("password")], "Passwords must match")
				.required("You have to confirm the password"),
		}),
		validateOnChange: true,
		onSubmit: (body) => {
			UpdatePassword({ adminId, password: body.password })
				.unwrap()
				.then((response) => {
					Notify("Updating Client password", response.message);
				})
				.catch((error) => {
					Errofy("Updating Client password", error);
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
