// Stepper.tsx
import React from "react";

interface StepperProps {
	steps: {
		title: string;
		subtitle?: string;
		state: string;
	}[];
	currentStep?: number;
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
	return (
		<div className="stepper  flex flex-col items-center gap-12 ">
			<div className="overflow-x-auto w-full">
				<ul className="steps steps-vertical lg:steps-horizontal w-full">
					{steps.map((step, index) => (
						<li className={`step ${"step-" + step.state}`} key={index}>
							<p className="flex flex-col w-full">
								<span className={`step-label ${"font-bold text-" + step.state}`}>{step.title}</span>
								{step.subtitle && <span className="step-subtitle text-zinc-400">{step.subtitle}</span>}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Stepper;
