import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "@/Components/Input";
import { useCheckAvailableEmailMutation, useCheckAvailableMutation, useCreateClientMutation } from "@/app/backend/export/client";
import { useNotification } from "@/hooks";
import useStoreDesk from "@/hooks/useStoreDesk";
import { useNavigate } from "react-router-dom";
import TitleCard from "@/Components/Cards/TitleCard";
import { useState } from "react";

const inputs: InputRequiredFields<UserBaseI>[] = [
	{
		required: true,
		type: "text",
		id: "username",
		label: "Username",
		placeholder: "username",
		name: "username",
		autoComplete: "username",
		autoFocus: true,
	},
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

	{
		required: true,
		name: "password",
		label: "Password",
		placeholder: "password",
		type: "password",
		id: "client-password",
		autoComplete: "client-password",
	},
	{
		required: true,
		name: "confirmPassword",
		label: "Confirm Password",
		placeholder: "confirm password",
		type: "password",
		id: "confirmPassword",
		autoComplete: "client-password",
	},
];

export default function CreateClient() {
	const [CreateClient, { isLoading }] = useCreateClientMutation();
	const { Notify, Errofy } = useNotification();
	const { currentDesk } = useStoreDesk();
	const [CheckAvailable] = useCheckAvailableMutation();
	const [CheckAvailableEmail] = useCheckAvailableEmailMutation();
	const [prevEmail, setPrevEmail] = useState({ value: "", validation: true });
	const [prevUserName, setUserName] = useState({ value: "", validation: true });

	const navigate = useNavigate();
	const formik = useFormik<UserBaseI>({
		initialValues: {
			firstName: "",
			lastName: "",
			username: "",
			phone: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object().shape({
			username: Yup.string()
				.min(6, "You have to provide a username with at least 6 characters")
				.required("You have to provide a username")
				.test({
					message: () => "Username already exists",
					test: async (values) => {
						if (prevUserName.value === values) return prevUserName.validation;
						else if (values) {
							try {
								const response = await CheckAvailable(values).unwrap();
								setUserName({ value: values, validation: !response.data });
								return !response.data;
							} catch (error) {
								Errofy("Checking username", error);
								return false;
							}
						} else return true;
					},
				}),
			firstName: Yup.string().required("You have to provide a firstName"),
			lastName: Yup.string().required("You have to provide a lastName"),
			password: Yup.string().required("You have to provide a password"),
			email: Yup.string()
				.email()
				.required("You have to provide a password")
				.test({
					message: () => "Email already exists",
					test: async (values) => {
						if (prevEmail.value === values) return prevEmail.validation;
						else if (values) {
							try {
								const response = await CheckAvailableEmail(values).unwrap();
								setPrevEmail({ value: values, validation: !response.data });
								return !response.data;
							} catch (error) {
								Errofy("Checking email", error);
								return false;
							}
						} else return true;
					},
				}),
			phone: Yup.string().required("You have to provide a phone"),
			confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
		}),
		validateOnChange: true,
		onSubmit: (body: UserBaseI) => {
			CreateClient({ ...body, desks: [currentDesk] })
				.unwrap()
				.then((response) => {
					const user = response.data;
					if (user && user.kind === "Client") {
						Notify("Creating Client", response.message);
						navigate("/app/clients/" + user._id);
					} else {
						Errofy("Creating Client", { message: "Something went wrong" });
					}
				})
				.catch((error) => {
					Errofy("Creating Client", error);
				});
		},
	});
	const { errors, touched, getFieldProps, handleSubmit } = formik;
	return (
		<TitleCard title={"Create a new client"} topMargin="mt-2">
			<FormikProvider value={formik}>
				<Form onSubmit={handleSubmit} className="flex flex-col break-words ">
					{inputs.map(({ name, type = "text", ...props }, i) => (
						<Input
							key={i}
							type={type}
							props={getFieldProps(name)}
							{...props}
							error={touched[name] && errors[name] ? errors[name] : undefined}
						/>
					))}

					<button type="submit" className="btn btn-primary mt-2 w-full " disabled={isLoading}>
						{isLoading ? (
							<>
								<span className="loading loading-spinner"></span>Creating
							</>
						) : (
							"Create"
						)}
					</button>
				</Form>
			</FormikProvider>
		</TitleCard>
	);
}
