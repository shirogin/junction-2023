import Fallback from "@/Components/Fallback";
import InputNew from "@/Components/Input/InputNew";
import { useAssignTaskMutation, useGetDeliveryMenListQuery } from "@/app/backend/export/deliveryMan";
import { useNotification } from "@/hooks";
import { useModalI } from "@/hooks/useModal";
import useStoreDesk from "@/hooks/useStoreDesk";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
export default function HomeDelivery({ modalData, closeModal }: useModalI<ShipmentI[]>) {
	const { extraObject: shipments } = modalData;
	const { data, isLoading, isError } = useGetDeliveryMenListQuery();
	const [AssignTask, { isLoading: isAssigning }] = useAssignTaskMutation();
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	const formik = useFormik<{ deliveryMan: string }>({
		initialValues: {
			deliveryMan: "",
		},
		validationSchema: Yup.object().shape({
			deliveryMan: Yup.string().required("You have to select a delivery man"),
		}),
		validateOnChange: true,
		onSubmit: (body) => {
			Promise.all(
				shipments.map((shipment) =>
					AssignTask({ shipmentId: shipment._id, deliveryManId: body.deliveryMan, currentDesk })
						.unwrap()
						.then((res) => {
							Notify("Assigning tasks", res.message);
						})
						.catch((err) => {
							Errofy("Assigning tasks", err);
						})
				)
			).then(() => closeModal());
		},
	});
	const { errors, touched, getFieldProps, handleSubmit, isValid } = formik;
	if (isError) return <div> Something went wrong </div>;
	if (isLoading) return <Fallback />;

	return (
		<FormikProvider value={formik}>
			<Form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
				<InputNew
					type="select"
					errors={errors}
					touched={touched}
					getFieldProps={getFieldProps}
					name="deliveryMan"
					label="Delivery men"
					placeholder="not selected"
					enums={[{ label: "Not selected", value: "" }, ...(data?.data.map((d) => ({ label: d.username, value: d._id })) || [])]}
				/>
				<button className="btn btn-primary" type="submit" disabled={!isValid || isAssigning}>
					Assign
				</button>
			</Form>
		</FormikProvider>
	);
}
