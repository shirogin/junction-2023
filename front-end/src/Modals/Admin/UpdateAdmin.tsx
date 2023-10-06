import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/Components/Input";
import { useNotification } from "@/hooks";
import { useUpdateAdminMutation } from "@/app/backend/export/admin";

const inputs: InputRequiredFields<AdminI>[] = [
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

export default function UpdateAdmin({ admin: { _id, ...data } }: { admin: AdminI }) {
	const [UpdateAdmin, { isLoading }] = useUpdateAdminMutation();
	const { Notify, Errofy } = useNotification();

	const formik = useFormik<Partial<AdminI>>({
		initialValues: {
			...data,
			/* password: "",
			confirmPassword: "", */
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email().required("You have to provide a password"),
			phone: Yup.string().required("You have to provide a phone"),
			firstName: Yup.string().required("You have to provide a firstName"),
			lastName: Yup.string().required("You have to provide a lastName"),
		}),
		validateOnChange: true,
		onSubmit: (body) => {
			UpdateAdmin({ adminId: _id, data: body })
				.unwrap()
				.then((response) => {
					const user = response.data;
					if (user && user.kind === "Admin") {
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
	const { errors, touched, getFieldProps, handleSubmit } = formik;
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

				<button type="submit" className="btn btn-primary mt-2 w-full " disabled={isLoading}>
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
