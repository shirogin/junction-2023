// Stepper.tsx
import React, { useState } from "react";

interface StepperProps {
	state: string;
	steps: {
		title: string;
		subtitle?: string;
	}[];
	components?: React.ReactNode[];
}

const Stepper: React.FC<StepperProps> = ({ state, steps, components }) => {
	const [currentStep, setCurrentStep] = useState(0);

	const handleNextStep = () => {
		if (components && currentStep < components.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<div className="stepper flex flex-col items-center gap-12 ">
			<ul className="steps w-full">
				{steps.map((step, index) => (
					<li className={`step ${currentStep >= index ? "step-" + state : ""}`} key={index}>
						<span className={`step-label ${currentStep >= index ? "font-bold text-" + state : ""}`}>{step.title}</span>
						{step.subtitle && <span className="step-subtitle text-zinc-400">{step.subtitle}</span>}
					</li>
				))}
			</ul>
			{components && components.length > 0 && <div className="stepper-content">{components[currentStep]}</div>}
			<div className="stepper-buttons w-full flex justify-between">
				{currentStep > 0 && (
					<button className="btn btn-ghost rounded-3xl" onClick={handlePrevStep}>
						Previous
					</button>
				)}
				{components && currentStep < (components.length || 1) - 1 && (
					<button className="btn btn-primary rounded-3xl ml-auto" onClick={handleNextStep}>
						Continue
					</button>
				)}
			</div>
		</div>
	);
};

export default Stepper;
