import ShipmentCard from "@/Components/Cards/ShipmentCard";
import Fallback from "@/Components/Fallback";
import InputNew from "@/Components/Input/InputNew";
import { useAssignTransitTaskMutation, useGetDeliveryMenListQuery } from "@/app/backend/export/deliveryMan";
import { useNotification } from "@/hooks";
import useDesks from "@/hooks/useDesks";
import { useModalI } from "@/hooks/useModal";
import useProvinces from "@/hooks/useProvinces";
import useStoreDesk from "@/hooks/useStoreDesk";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

export default function DeskDelivery({ modalData, closeModal }: useModalI<ShipmentI[]>) {
	const { extraObject: shipments } = modalData;
	const { data: deliveryMenResponse, isLoading, isError } = useGetDeliveryMenListQuery();
	const provinces = useProvinces();
	const [AssignTask, { isLoading: isAssigning }] = useAssignTransitTaskMutation();
	const { currentDesk } = useStoreDesk();
	const { Notify, Errofy } = useNotification();
	const formik = useFormik<{ desk: string; province: number; deliveryMan: string }>({
		initialValues: {
			desk: shipments[0].shipTo.ref || "",
			province: shipments[0].shipTo.Address.StateProvinceCode || 16,
			deliveryMan: "",
		},
		validationSchema: Yup.object().shape({
			deliveryMan: Yup.string().required("You have to select a delivery man"),
		}),
		validateOnChange: true,
		onSubmit: (body) => {
			console.log(body, currentDesk);
			Promise.all(
				shipments.map((shipment) =>
					AssignTask({ desk: body.desk, shipmentId: shipment._id, deliveryManId: body.deliveryMan, currentDesk })
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
	const { errors, touched, getFieldProps, handleSubmit, isValid, values } = formik;
	const { desks, isLoading: isLoadingDesks } = useDesks({ province: values.province });
	if (isLoading) return <Fallback />;
	if (isError || !deliveryMenResponse) return <div> Something went wrong </div>;

	return (
		<FormikProvider value={formik}>
			<Form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 ">
				{[
					<InputNew
						key={"Select Province"}
						{...{
							required: true,
							name: "province",
							label: "Province",
							placeholder: "Province",
							type: "select",
							id: "Province",
							autoComplete: "address",
							className: "w-full",
							getFieldProps: getFieldProps,
							errors: {},
							touched: {},
							enums: provinces.map((province) => ({
								label: province.name["EN"],
								value: province.id,
							})),
						}}
					/>,
					isLoadingDesks ? (
						<Fallback key={"loading"} />
					) : (
						[
							<InputNew
								key={"desk-select"}
								{...{
									required: true,
									name: "desk",
									label: "Select a desk to deliver to ?",
									placeholder: "Province",
									type: "select",
									id: "Province",
									autoComplete: "address",
									className: "w-full",
									getFieldProps: getFieldProps,
									errors: {},
									touched: {},
									enums: [
										{
											label: "[Select a desk]",
											value: "",
										},
										...desks.map((shipI) => ({
											label: shipI.AttentionName,
											value: shipI._id || "",
										})),
									],
								}}
							/>,
							<ShipmentCard key={"shipment-card"} shipInfo={desks.find((ship) => ship._id === values.desk) || undefined} />,
						]
					),
				]}
				<InputNew
					type="select"
					errors={errors}
					touched={touched}
					getFieldProps={getFieldProps}
					name="deliveryMan"
					label="Delivery men"
					placeholder="not selected"
					enums={[
						{ label: "Not selected", value: "" },
						...(deliveryMenResponse.data.map((d) => ({ label: d.username, value: d._id })) || []),
					]}
				/>
				<button className="btn btn-primary" type="submit" disabled={!isValid || isAssigning}>
					Assign
				</button>
			</Form>
		</FormikProvider>
	);
}
