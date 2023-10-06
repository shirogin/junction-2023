//type Props = {};
import InputNew from "@/Components/Input/InputNew";
import { useUpdateClientPaymentMethodMutation } from "@/app/backend/export/client";
import { useNotification } from "@/hooks";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
function PaymentMethod({ client }: { client: ClientI }) {
	console.log(client);
	const [UpdateClientPM, { isLoading }] = useUpdateClientPaymentMethodMutation();
	const { Notify, Errofy } = useNotification();
	const formik = useFormik({
		initialValues: {
			paymentAccount: client.paymentMethod || "",
		},
		validationSchema: Yup.object().shape({
			paymentAccount: Yup.string().required("You have to provide a correct payment Account"),
		}),
		onSubmit: (values) => {
			UpdateClientPM({ clientId: client._id || "", paymentMethod: values.paymentAccount })
				.unwrap()
				.then(() => {
					Notify("Updating Payment Method", "Payment Method updated successfully");
				})
				.catch((err) => {
					Errofy("Updating Payment Method", err, "Couldn't update Payment Method");
				});
		},
	});
	const { getFieldProps, touched, errors, handleSubmit, isValid } = formik;
	return (
		<FormikProvider value={formik}>
			<Form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<InputNew
					touched={touched}
					errors={errors}
					label="Payment Account"
					placeholder="account number"
					type="text"
					name="paymentAccount"
					required={true}
					getFieldProps={getFieldProps}
				/>
				<button className="btn btn-primary" disabled={isLoading || !isValid}>
					{isLoading && <span className="loading loading-spinner"></span>}
					update account
				</button>
			</Form>
		</FormikProvider>
	);
}

export default PaymentMethod;
