import { /* useEffect, */ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReceiverInformation from "./ReceiverInformation";
import SenderInformation from "./SenderInformation";
import { initShipTo } from "@/Components/ShipIForm/initShipTo";
import Fallback from "@/Components/Fallback";
import { useLang, useModal, useNotification } from "@/hooks";
import ProductDetails from "./ProductDetails";
import VerificationInformation from "./VerificationInformation";
import ContentType from "./content/ContentType";
import Error500 from "@/Pages/Errors/Error500";
import { useCreateClientShipmentMutation } from "@/app/backend/export/client";
import { useGetProductByIdQuery } from "@/app/backend/export/product";
import useStoreDesk from "@/hooks/useStoreDesk";

const defaultShipTo = initShipTo(true);

const NewDelivery = ({ client, product }: { client: ClientI; product: ProductI }) => {
	const { data: response, isLoading, isError } = useGetProductByIdQuery(product._id);
	const packageInfos = response?.data || null;
	const finalPrice = packageInfos ? packageInfos.price + 200 : 200;
	const [CreateShipment, { isLoading: isShipping }] = useCreateClientShipmentMutation();
	const { closeModal } = useModal();
	const { Notify, Errofy } = useNotification();
	const [valid, setValid] = useState([false, false, true]);
	const { id: productId } = useParams();
	const { currentDesk } = useStoreDesk();

	const initShipmentRequestI: ShipmentRequestPrepI = {
		product: productId as string,
		shipTo: defaultShipTo,
		shipFrom: undefined,
		deliverTo: currentDesk,
	};

	const [currentStep, setCurrentStep] = useState(0);
	const [shipment, setShipment] = useState(initShipmentRequestI);
	const stepsLength = 5;

	function handleNextStep() {
		if (valid[currentStep] && currentStep < stepsLength - 1) setCurrentStep(currentStep + 1);
	}
	function handlePreviousStep() {
		if (currentStep > 0) setCurrentStep(currentStep - 1);
	}

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();

	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	const steps = [{ title: "Sender Information" }, { title: "Receiver information" }, { title: "Verification" }];

	if (isLoading) return <Fallback />;
	if (!content || isError || !packageInfos) return <Error500 />;

	return (
		<div className="flex flex-col">
			<ProductDetails packageInfos={packageInfos} finalPrice={finalPrice} />
			<h1 className="text-3xl font-bold m-8">{content.title}</h1>
			<div className="w-full bg-base-100 rounded-xl p-2 py-10 md:p-16 flex justify-center mt-8 ">
				<div className="stepper flex flex-col items-center gap-12 w-full md:max-w-3xl">
					<ul className="steps steps-vertical lg:steps-horizontal w-full">
						{steps.map((_, index) => (
							<li className={`step ${currentStep >= index ? "step-secondary" : ""}`} key={index}>
								<span className={`px-2 step-label ${currentStep >= index ? "font-bold text-secondary" : ""}`}>
									{content.steps[index]}
								</span>
							</li>
						))}
					</ul>
					<div className="stepper-content w-full ">
						<div className={"w-full " + (currentStep === 0 ? "" : "hidden")}>
							<SenderInformation
								client={client}
								setShipFrom={(shipFrom) => {
									setShipment((shipment) => ({ ...shipment, shipFrom }));
								}}
								shipFrom={shipment.shipFrom}
								setValid={(isValid: boolean) => {
									setValid((validList) => {
										validList[0] = isValid;
										return validList;
									});
								}}
							/>
						</div>
						<div className={currentStep === 1 ? "" : "hidden"}>
							<ReceiverInformation
								client={client}
								setShipTo={(shipTo) => {
									setShipment((shipment) => ({ ...shipment, shipTo }));
								}}
								setValid={(isValid: boolean) => {
									setValid((validList) => {
										validList[1] = isValid;
										return validList;
									});
								}}
							/>
						</div>

						<div className={currentStep === 2 ? "" : "hidden"}>
							<VerificationInformation shipment={shipment} client={client} />
						</div>
					</div>
					<div className="stepper-buttons w-full flex justify-between">
						<button
							disabled={currentStep <= 0}
							type="button"
							className="btn btn-outline rounded-3xl"
							onClick={(e) => {
								e.preventDefault();
								handlePreviousStep();
							}}
						>
							{content.previous}
						</button>

						<button
							disabled={currentStep >= stepsLength - 1 || !valid[currentStep] || isShipping}
							type="button"
							className="btn btn-primary rounded-3xl ml-auto"
							onClick={(e) => {
								e.preventDefault();
								if (currentStep === 2) {
									CreateShipment({
										clientId: client._id,
										shipment: {
											product: product._id,
											shipTo: shipment.shipTo._id ? shipment.shipTo._id : (shipment.shipTo as ShipI),
											shipFrom: shipment.shipFrom?._id
												? shipment.shipFrom._id
												: (shipment.shipFrom as ShipI | undefined),
											deliverTo: currentDesk,
										},
									})
										.unwrap()
										.then((res) => {
											Notify("Creating Shipment", res.message);
											closeModal();
										})
										.catch((err) => {
											Errofy("Creating Shipment", err, "Couldn't create shipment");
										});
								} else handleNextStep();
							}}
						>
							{isShipping && <span className="loading loading-spinner"></span>}
							{currentStep === 2 ? content.create : content.continue}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewDelivery;
