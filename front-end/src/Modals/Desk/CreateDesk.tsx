import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

//import { Input } from "@/Components/Input";

import { useNotification } from "@/hooks";
import { useCreateDeskMutation } from "@/app/backend/export/desk";
import InputNew from "@/Components/Input/InputNew";
import useProvinces from "@/hooks/useProvinces";
import { TextFieldProps } from "@/types/Forms";
import { Add, Call, Location } from "iconsax-react";
import useCities from "@/hooks/useCities";
import { useState } from "react";

export default function CreateDesk() {
	const [CreateDesk, { isLoading }] = useCreateDeskMutation();
	const { Notify, Errofy } = useNotification();
	const provinces = useProvinces();

	const formik = useFormik<FlatDesk>({
		initialValues: {
			lat: 0,
			lng: 0,
			url: "",
			description: "",
			Phone: "",
			AddressLine1: "",
			AddressLine2: "",
			AddressLine3: "",
			City: "",
			StateProvinceCode: 16,
			PostalCode: 16000,
			Name: "",
		},
		validationSchema: Yup.object().shape({
			lat: Yup.number().required("You have to provide a latitude"),
			lng: Yup.number().required("You have to provide a longitude"),
			url: Yup.string().required("You have to provide a location url"),
			description: Yup.string().required("You have to provide a description"),
			City: Yup.string().required("You have to provide a City"),
			AddressLine1: Yup.string().required("You have to provide at least one AddressLine"),
			AddressLine2: Yup.string(),
			AddressLine3: Yup.string(),
			PostalCode: Yup.number().required("You have to provide a PostalCode"),
			StateProvinceCode: Yup.number().required("You have to provide a StateProvinceCode"),
			Name: Yup.string().required("You have to provide a Name"),
			Phone: Yup.string().required("You have to provide a Number"),
		}),
		validateOnChange: true,
		onSubmit: (body: FlatDesk) => {
			console.log(body);
			const desk: DeskBaseI = {
				information: {
					Name: body.Name,
					Phone: {
						Number: body.Phone,
					},
					AttentionName: body.Name,
					Address: {
						AddressLine: [body.AddressLine1, body.AddressLine2, body.AddressLine3],
						City: body.City,
						StateProvinceCode: body.StateProvinceCode,
						PostalCode: body.PostalCode,
					},
				},
				name: body.Name,
				province: body.StateProvinceCode,
				description: body.description,
				geo_location: {
					lat: body.lat,
					lng: body.lng,
					url: body.url,
				},
			};
			CreateDesk(desk)
				.unwrap()
				.then((response) => {
					//const desk = response.data;
					Notify("Creating Desk", response.message);
				})
				.catch((error) => {
					Errofy("Creating Desk", error);
				});
		},
	});

	const { errors, touched, getFieldProps, handleSubmit, values, setFieldValue, isValid } = formik;
	const cities = useCities(values.StateProvinceCode);
	const [addressNumber, setAddressNumber] = useState(0);
	const inputs: TextFieldProps<FlatDesk>[] = [
			{
				required: true,
				type: "text",
				id: "shipI-name",
				label: "Name",
				placeholder: "Desk name",
				name: "Name",
				autoComplete: "name",
				autoFocus: true,
				className: "w-full",
			},

			{
				required: true,
				name: "Phone",
				label: "Phone number",
				placeholder: "Phone number",
				type: "tel",
				id: "shipI-Phone",
				autoComplete: "phone-number",
				className: "w-full",
				prefix: (
					<>
						<Call className="w-4 h-4" />
						+213
					</>
				),
			},
		],
		addressInputs: TextFieldProps<FlatDesk>[] = [
			{
				required: true,
				name: "AddressLine1",
				label: "Address 1",
				placeholder: "Address 1",
				type: "text",
				id: "AddressLine-0",
				autoComplete: "address",
				className: "w-full",
			},
			{
				required: true,
				name: "AddressLine2",
				label: "Address 2",
				placeholder: "Address 2",
				type: "text",
				id: "AddressLine-0",
				autoComplete: "address",
				className: "w-full",
			},
			{
				required: true,
				name: "AddressLine3",
				label: "Address 3",
				placeholder: "Address 3",
				type: "text",
				id: "AddressLine-0",
				autoComplete: "address",
				className: "w-full",
			},
		],
		moreAddressInputs: TextFieldProps<FlatDesk>[] = [
			{
				required: true,
				name: "StateProvinceCode",
				label: "Provinces",
				placeholder: "Provinces",
				type: "select",
				id: "Province",
				className: "w-full",
				enums: provinces.map((province) => ({
					label: province.name["EN"],
					value: province.id,
				})),
			},
			{
				required: true,
				name: "City",
				label: "City",
				placeholder: "City",
				type: "select",
				id: "City",
				className: "w-[calc(50%-1rem)]",
				enums: cities
					.map((city) => ({
						label: city.name["EN"],
						value: city.id,
					}))
					.sort((a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" }))
					// remove repetitive labels
					.filter((city, index, array) => array.findIndex((c) => c.label === city.label) === index),
			},
			{
				required: true,
				name: "PostalCode",
				label: "Postal code",
				placeholder: "Postal code",
				type: "select",
				id: "Postal-code",
				className: "w-[calc(50%-1rem)]",
				/* disabled: true, */
				enums: cities
					.map((city) => ({ label: city.post_code, value: city.post_code }))
					// sort by value
					.sort((a, b) => Number(a.value) - Number(b.value)),
			},
		],
		additionalInputs: TextFieldProps<FlatDesk>[] = [
			{
				required: true,
				type: "text",
				id: "desk-description",
				label: "Description",
				placeholder: "Desk name",
				name: "description",
				autoComplete: "name",
				autoFocus: true,
				className: "w-full",
			},
			{
				required: true,
				name: "url",
				label: "Desk Location Url",
				placeholder: "Phone number",
				type: "text",
				id: "location-url",
				className: "w-full",
				prefix: <Location className="w-4 h-4" />,
			},
			{
				required: true,
				name: "lat",
				label: "Desk Location latitude",
				placeholder: "1",
				type: "number",
				id: "location-lat",
				className: "w-[calc(50%-1rem)]",
				prefix: <Location className="w-4 h-4" />,
			},
			{
				required: true,
				name: "lng",
				label: "Desk Location longitude",
				placeholder: "33",
				type: "number",
				id: "location-lng",
				className: "w-[calc(50%-1rem)]",
				prefix: <Location className="w-4 h-4" />,
			},
		];
	return (
		<div className="flex flex-col">
			<FormikProvider value={formik}>
				<Form onSubmit={handleSubmit} className="flex flex-wrap gap-x-8">
					{inputs.map((inputProps) => (
						<InputNew key={inputProps.name} touched={touched} errors={errors} getFieldProps={getFieldProps} {...inputProps} />
					))}
					{moreAddressInputs.map((inputProps) => (
						<InputNew key={inputProps.name} touched={touched} errors={errors} getFieldProps={getFieldProps} {...inputProps} />
					))}
					{addressInputs.map((inputProps, i) => (
						<div className="flex w-full" key={inputProps.name}>
							{i <= addressNumber && (
								<div className="flex w-full">
									<InputNew touched={touched} errors={errors} getFieldProps={getFieldProps} {...inputProps} />
									{i > 0 && addressNumber === i && (
										<button
											className="btn btn-secondary mt-9 ml-2"
											type="button"
											onClick={() => {
												if (addressNumber > 0) {
													setAddressNumber(addressNumber - 1);
													setFieldValue(`AddressLine${i + 1}`, "");
												}
											}}
										>
											<Add className={"w-6 h-6 rotate-45"} />
										</button>
									)}
									{addressNumber === i && addressNumber < 2 && (
										<button
											className="btn btn-secondary mt-9 ml-2"
											type="button"
											onClick={() => {
												if (addressNumber + 1 < 3) setAddressNumber(addressNumber + 1);
											}}
										>
											<Add className={"w-6 h-6"} />
										</button>
									)}
								</div>
							)}
						</div>
					))}
					{additionalInputs.map((inputProps) => (
						<InputNew key={inputProps.name} touched={touched} errors={errors} getFieldProps={getFieldProps} {...inputProps} />
					))}
					<button type="submit" className="btn btn-primary mt-6 w-full " disabled={isLoading || !isValid}>
						{isLoading ? (
							<>
								<span className="loading loading-spinner"></span>Creating
							</>
						) : (
							"Create new desk"
						)}
					</button>
				</Form>
			</FormikProvider>
		</div>
	);
}
