// import BackButton from "@/Components/Buttons/BackButton";
import { useEffect, useState } from "react";

import { TextFieldProps } from "@/types/Forms";
import { FormikProvider, useFormik, Form } from "formik";

import Input from "@/Components/Input/InputNew";
import { useLang, useNotification } from "@/hooks";

import ContentType from "./content/ContentType";

import { usePackageSchema } from "./usePackageSchema";
import Error500 from "@/Pages/Errors/Error500";
import { useCreateClientProductMutation } from "@/app/backend/export/client";

function NewPackage({ client: { _id: clientId, username }, onSaved }: { client: ClientI; onSaved?: () => void }) {
	const [currentStep, setCurrentStep] = useState(0);
	const [CreateProduct, { isLoading }] = useCreateClientProductMutation();
	const { Errofy, Notify } = useNotification();
	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();
	const validationSchema = usePackageSchema();
	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);
	useEffect(() => {
		if (!clientId) Errofy("New Package", "You have to provide a clientId");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [clientId]);

	const formik = useFormik<BaseProductI>({
		validateOnChange: true,
		initialValues: {
			name: "",
			description: "",
			sku: "",
			type: "",
			price: 100,
			width: 0,
			height: 0,
			length: 0,
			weight: 0,
		},
		validationSchema,
		onSubmit: (body: BaseProductI) => {
			CreateProduct({ clientId, product: body })
				.unwrap()
				.then((res) => {
					Notify("Product created successfully", res.message);
					if (onSaved) onSaved();
				})
				.catch((err) => {
					Errofy("Product failed to be created", err, "Couldn't create a product.");
				})
				.finally(() => {
					setCurrentStep(currentStep + 1);
				});
		},
	});
	const { errors, touched, getFieldProps, handleSubmit } = formik;

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!content || !clientId) return <Error500 />;

	const paymentInputs = [
		{
			name: "price",
			placeholder: content.payment.price.content,
			type: "number",
			label: content?.payment.price.content,
			suffix: content.payment.price.suffix,
		},
	];
	const inputs: TextFieldProps<BaseProductI>[] = [
		{
			name: "sku",
			placeholder: username.replaceAll(" ", "-").toLowerCase() + "-ID",
			type: "text",
			label: content.package.sku.content,
		},
		{
			name: "name",
			placeholder: content.package.name.content,
			type: "text",
			label: content.package.name.content,
		},
		{
			name: "description",
			placeholder: content.package.description.content,
			type: "textarea",
			label: content.package.description.content,
		},
		{
			name: "type",
			placeholder: content.package.type.content,
			type: "text",
			label: content.package.type.content,
		},
		{
			name: "width",
			placeholder: content.package.width.content,
			type: "number",
			label: content.package.width.content,
			className: "w-[calc(50%-1rem)]",
			suffix: content.package.width.suffix,
		},
		{
			name: "height",
			placeholder: content.package.height.content,
			type: "number",
			label: content.package.height.content,
			className: "w-[calc(50%-1rem)]",
			suffix: content.package.height.suffix,
		},
		{
			name: "length",
			placeholder: content.package.length.content,
			type: "number",
			label: content.package.length.content,
			className: "w-[calc(50%-1rem)]",
			suffix: content.package.length.suffix,
		},
		{
			name: "weight",
			placeholder: content.package.weight.content,
			type: "number",
			label: content.package.weight.content,
			className: "w-[calc(50%-1rem)]",
			step: 0.05,
			suffix: content.package.weight.suffix,
		},
	];

	return (
		<div className="w-full bg-base-100 rounded-xl py-2 pr-4 flex flex-col justify-center">
			<FormikProvider value={formik}>
				<Form onSubmit={handleSubmit} noValidate className="flex flex-wrap gap-x-8 gap-y-4">
					<h3 className="text-center text-lg uppercase text-primary font-bold">{content.package.title}</h3>
					{inputs.map(({ name, placeholder, type = "text", label, className = "w-full", ...props }, i) => (
						<Input
							key={i}
							name={name}
							id={name}
							placeholder={placeholder}
							type={type}
							label={label}
							className={className}
							touched={touched}
							errors={errors}
							getFieldProps={getFieldProps}
							{...props}
						/>
					))}
					<h3 className="text-center text-lg uppercase text-primary font-bold">{content.payment.title}</h3>
					{paymentInputs.map(({ name, placeholder, type = "text", label, ...props }, i) => (
						<Input
							key={i}
							name={name}
							id={name}
							placeholder={placeholder}
							type={type}
							label={label}
							className={"w-full"}
							touched={touched}
							errors={errors}
							getFieldProps={getFieldProps}
							{...props}
						/>
					))}
					<button className="btn btn-primary w-full mt-4" disabled={isLoading}>
						{isLoading && <span className="loading loading-spinner"></span>}
						{content.button}
					</button>
				</Form>
			</FormikProvider>
		</div>
	);
}

export default NewPackage;
