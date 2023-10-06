import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "@/Components/Input";
import { useNotification } from "@/hooks";
import { useCheckAvailableDeliveryManMutation, useCreateDeliveryManMutation } from "@/app/backend/export/deliveryMan";
import useStoreDesk from "@/hooks/useStoreDesk";

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
		id: "password",
		autoComplete: "current-password",
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

export default function CreateDeliveryMan({ closeModal }: { closeModal: () => void }) {
	const [DeliveryMan, { isLoading }] = useCreateDeliveryManMutation();
	const { Notify, Errofy } = useNotification();
	const { currentDesk } = useStoreDesk();
	const [CheckAvailable] = useCheckAvailableDeliveryManMutation();
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
						// TODO: execute CheckAvailable when the user stop typing for 500ms
						if (values) {
							try {
								await CheckAvailable(values).unwrap();
								return true;
							} catch (error) {
								console.log(error);
								return false;
							}
						} else return true;
					},
				}),
			firstName: Yup.string().required("You have to provide a firstName"),
			lastName: Yup.string().required("You have to provide a lastName"),
			password: Yup.string().required("You have to provide a password"),
			email: Yup.string().email().required("You have to provide a password"),
			phone: Yup.string().required("You have to provide a phone"),
			confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
		}),
		validateOnChange: true,
		onSubmit: (body: UserBaseI) => {
			DeliveryMan({ ...body, desks: [currentDesk] })
				.unwrap()
				.then((response) => {
					const user = response.data;
					if (user && user.kind === "DeliveryMan") {
						Notify("Creating a Delivery Man", response.message);
						closeModal();
					} else {
						Errofy("Creating a Delivery Man", { message: "Something went wrong" });
					}
				})
				.catch((error) => {
					Errofy("Creating a Delivery Man", error);
				});
		},
	});
	const { errors, touched, getFieldProps, handleSubmit } = formik;
	return (
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
						"Register"
					)}
				</button>
			</Form>
		</FormikProvider>
	);
}
