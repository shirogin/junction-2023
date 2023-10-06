import { useEffect, useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import { initShipTo } from "./initShipTo";
import Input from "@/Components/Input/InputNew";
import { TextFieldProps } from "@/types/Forms";

import { Additem, ArchiveAdd, BagCross, Call } from "iconsax-react";
import { useLang, useNotification } from "@/hooks";
import useProvinces from "@/hooks/useProvinces";
import useCities from "@/hooks/useCities";
import ContentType from "./content/ContentType";

function ShipIForm({
	SaveAddress,
	isLoading,
	onSaved,
}: {
	onSaved?: () => void;
	SaveAddress: (ship: ShipI) => Promise<ResponseI>;
	isLoading: boolean;
}) {
	const initShip = initShipTo(true);

	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();
	const { Notify, Errofy } = useNotification();
	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	const formik = useFormik<ShipI>({
		initialValues: initShip,
		validationSchema: yup.object().shape({
			Name: yup.string().required(content?.inputs.name.error),
			Phone: yup.object().shape({
				Number: yup
					.string()
					.matches(/^(0)((2|3|4)[0-9]{7}|(5|6|7)[0-9]{8})$/, content?.inputs.phone.error[0])
					.required(content?.inputs.phone.error[1]),
			}),
			AttentionName: yup.string().required(content?.inputs.AttentionName.error),
			Address: yup
				.object()
				.shape({
					AddressLine: yup.array().of(yup.string()).min(1),
					City: yup.string().required(content?.inputs.City.error),
					StateProvinceCode: yup.number().required(content?.inputs.Province.error),
					PostalCode: yup.string().required(content?.inputs.PostalCode.error),
					CountryCode: yup.string().required(content?.inputs.CountryCode.error),
				})
				.required(content?.inputs.Address.error),
		}),
		validateOnChange: true,
		onSubmit: (values) => {
			values.Address.City = cities[Number(values.Address.City)]?.name["EN"];

			SaveAddress(values)
				.then((res) => {
					Notify("Creating new Address", res.message);
					if (onSaved) onSaved();
				})
				.catch((err) => {
					Errofy("Creating new Address", err, "Couldn't create new Address");
				});
		},
	});
	const { errors, touched, getFieldProps, handleSubmit, setFieldValue, values, isValid } = formik;
	const provinces = useProvinces();
	const [addressNumber, setAddressNumber] = useState(0);

	const cities = useCities(values.Address.StateProvinceCode);
	useEffect(() => {
		const cityIndex = Number(values.Address.City);
		if (cities[cityIndex]) setFieldValue("Address.PostalCode", cities[cityIndex].post_code);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values.Address.City]);

	if (!content) return;

	const inputs: TextFieldProps[] = [
			{
				required: true,
				type: "text",
				id: "shipI-name",
				label: content.inputs.name.content,
				placeholder: content.inputs.name.content,
				name: "Name",
				autoComplete: "name",
				autoFocus: true,
				className: "w-full",
			},

			{
				required: true,
				name: "Phone.Number",
				label: content.inputs.phone.content,
				placeholder: content.inputs.phone.placeholder,
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
		businessInputs: TextFieldProps[] = [
			{
				required: true,
				name: "AttentionName",
				label: content.inputs.AttentionName.content,
				placeholder: content.inputs.AttentionName.placeholder,
				type: "text",
				id: "shipI-AttentionName",
				autoComplete: "business-name",
				className: "w-full",
			},
		],
		addressInputs: TextFieldProps[] = [
			{
				required: true,
				name: "Address.AddressLine[0]",
				label: content.inputs.AddressLine.content[0],
				placeholder: content.inputs.AddressLine.content[0],
				type: "text",
				id: "AddressLine-0",
				autoComplete: "address",
				className: "w-full",
			},
			{
				required: true,
				name: "Address.AddressLine[1]",
				label: content.inputs.AddressLine.content[1],
				placeholder: content.inputs.AddressLine.content[1],
				type: "text",
				id: "AddressLine-0",
				autoComplete: "address",
				className: "w-full",
			},
			{
				required: true,
				name: "Address.AddressLine[2]",
				label: content.inputs.AddressLine.content[2],
				placeholder: content.inputs.AddressLine.content[2],
				type: "text",
				id: "AddressLine-0",
				autoComplete: "address",
				className: "w-full",
			},
		];

	const moreAddressInputs: TextFieldProps[] = [
		{
			required: true,
			name: "Address.StateProvinceCode",
			label: content.inputs.Province.content,
			placeholder: content.inputs.Province.content,
			type: "select",
			id: "Province",
			className: "w-full",
			enums: provinces.map((province) => ({
				label: province.name[language] || province.name["EN"],
				value: province.id,
			})),
		},
		{
			required: true,
			name: "Address.City",
			label: content.inputs.City.content,
			placeholder: "City",
			type: "select",
			id: "City",
			className: "w-[calc(50%-1rem)]",
			enums: cities
				.map((city) => ({
					label: (city.name[language] || city.name["EN"]) as string,
					value: city.id,
				}))
				.sort((a, b) => a.label.localeCompare(b.label, language.toLowerCase(), { sensitivity: "base" }))
				// remove repetitive labels
				.filter((city, index, array) => array.findIndex((c) => c.label === city.label) === index),
		},
		{
			required: true,
			name: "Address.PostalCode",
			label: content.inputs.PostalCode.content,
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
	];

	return (
		<FormikProvider value={formik}>
			<Form className="flex flex-wrap mt-6  gap-x-8 " onSubmit={handleSubmit}>
				{inputs.map((inputProps) => (
					<Input key={inputProps.name} touched={touched} errors={errors} getFieldProps={getFieldProps} {...inputProps} />
				))}

				{[
					[...businessInputs, ...moreAddressInputs].map((inputProps) => (
						<Input key={inputProps.name} touched={touched} errors={errors} getFieldProps={getFieldProps} {...inputProps} />
					)),
					addressInputs.map((inputProps, i) => (
						<div className="flex w-full" key={inputProps.name}>
							{i <= addressNumber && (
								<>
									<Input touched={touched} errors={errors} getFieldProps={getFieldProps} {...inputProps} />
									{i > 0 && addressNumber === i && (
										<button
											className="btn btn-secondary mt-9 ml-2"
											type="button"
											onClick={() => {
												if (addressNumber > 0) {
													setAddressNumber(addressNumber - 1);
													setFieldValue(`shipTo.Address.AddressLine[${i}]`, "");
												}
											}}
										>
											<BagCross className={"w-4 h-4"} />
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
											<Additem className={"w-4 h-4"} />
										</button>
									)}
								</>
							)}
						</div>
					)),
				]}

				<button
					type="submit"
					className="w-full mx-auto btn btn-primary mt-4 "
					disabled={isLoading || !isValid || !cities[Number(values.Address.City)]}
				>
					{isLoading ? <span className="loading loading-spinner"></span> : <ArchiveAdd className="w-5 h-5 " />}
					{content.save}
				</button>
			</Form>
		</FormikProvider>
	);
}

export default ShipIForm;
