import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import Input from "@/Components/Input/InputNew";
import { useCheckAvailableEmailMutation, useUpdateClientMutation } from "@/app/backend/export/client";
import { useNotification } from "@/hooks";
import { useState } from "react";

const inputs: InputRequiredFields<ClientI>[] = [
	{
		required: true,
		type: "text",
		id: "firstName",
		label: "First Name",
		placeholder: "Lamin",
		name: "firstName",
		autoComplete: "firstName",
	},
	{
		required: true,
		type: "text",
		id: "lastName",
		label: "Last Name",
		placeholder: "LAOUFI",
		name: "lastName",
		autoComplete: "lastName",
	},
	{
		required: true,
		type: "tel",
		id: "phone",
		label: "Phone number",
		placeholder: "phone",
		name: "phone",
		autoComplete: "phone",
	},
	{
		required: true,
		type: "email",
		id: "email",
		label: "Email",
		placeholder: "email",
		name: "email",
		autoComplete: "email",
	},
];

export default function UpdateProfile({ client: { _id, ...data } }: { client: ClientI }) {
	const [CreateClient, { isLoading }] = useUpdateClientMutation();
	const [CheckAvailableEmail] = useCheckAvailableEmailMutation();
	const { Notify, Errofy } = useNotification();
	const [prevEmail, setPrevEmail] = useState({ value: "", validation: true });

	const formik = useFormik<Partial<ClientI>>({
		initialValues: {
			...data,
		},
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email()
				.required("You have to provide a password")
				.test({
					message: () => "Email already exists",
					test: async (values) => {
						if (data.email === values) return true;
						if (prevEmail.value === values) return prevEmail.validation;
						if (values) {
							try {
								const response = await CheckAvailableEmail(values).unwrap();
								setPrevEmail({ value: values, validation: !response.data });
								return !response.data;
							} catch (error) {
								Errofy("Checking email", error);
								return false;
							}
						}
						return true;
					},
				}),
			phone: Yup.string().required("You have to provide a phone"),
			firstName: Yup.string().required("You have to provide a firstName"),
			lastName: Yup.string().required("You have to provide a lastName"),
		}),
		validateOnChange: true,
		onSubmit: (body) => {
			CreateClient({ clientId: _id, data: body })
				.unwrap()
				.then((response) => {
					const user = response.data;
					if (user && user.kind === "Client") {
						Notify("Updating Client", response.message);
					} else {
						Errofy("Updating Client", { message: "Something went wrong" });
					}
				})
				.catch((error) => {
					Errofy("Updating Client", error);
				});
		},
	});
	const { errors, touched, getFieldProps, handleSubmit, isValid } = formik;
	return (
		<FormikProvider value={formik}>
			<Form onSubmit={handleSubmit} className="w-full flex flex-col break-words">
				{inputs.map(({ name, type = "text", ...props }, i) => (
					<Input key={i} type={type} name={name} getFieldProps={getFieldProps} {...props} errors={errors} touched={touched} />
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
