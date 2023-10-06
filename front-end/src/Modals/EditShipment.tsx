import InputNew from "@/Components/Input/InputNew";
import { useUpdateWeightShipmentMutation } from "@/app/backend/export/shipments";
import { useNotification } from "@/hooks";
import { useModalI } from "@/hooks/useModal";
import { Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function EditShipment({ modalData /*, closeModal */ }: useModalI<ShipmentI>) {
	const { extraObject } = modalData;
	const [UpdateWeight] = useUpdateWeightShipmentMutation();
	const [shipment, setShipment] = useState(extraObject);
	const { Notify, Errofy } = useNotification();
	const formik = useFormik<{ weight: number }>({
		initialValues: {
			weight: shipment.weight || shipment.product.weight,
		},
		validationSchema: Yup.object().shape({
			weight: Yup.number()
				.min(shipment.weight || shipment.product.weight, "You can't put a lower weight")
				.required("You have to provide a username"),
		}),
		validateOnChange: true,
		onSubmit: (body) => {
			UpdateWeight({ shipmentId: shipment._id, weight: body.weight })
				.unwrap()
				.then((res) => {
					Notify("Updating weight", res.message);
					setShipment({ ...shipment, weight: formik.values.weight });
				})
				.catch((err) => {
					Errofy("Updating weight", err);
				});
		},
	});
	const { errors, touched, getFieldProps, handleSubmit } = formik;
	return (
		<FormikProvider value={formik}>
			<Form onSubmit={handleSubmit} className="flex flex-col max-w-xl mx-auto overflow-y-hidden max-h-[80vh] h-full px-2">
				<InputNew
					type="number"
					placeholder="Weight"
					label="Weight"
					className="w-full"
					errors={errors}
					touched={touched}
					getFieldProps={getFieldProps}
					name="weight"
				/>
				<div className="flex mt-4">
					<button className="btn btn-primary w-full ml-auto shrink" type="submit">
						Update
					</button>
				</div>
			</Form>
		</FormikProvider>
	);
}
