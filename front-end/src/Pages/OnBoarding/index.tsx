import Logo from "@/Components/Logo";
import { ArrowRight, ArrowRight2 } from "iconsax-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
const onBoarding1 = {
		hidden: { x: 0, y: 0 },
		visible: { x: "-85%", y: "80%", rotate: -90 },
	},
	onBoarding2 = {
		hidden: { x: "70%", y: "140%", rotate: 90 },
		visible: { x: 0, y: 0 },
	};
const OnBoarding = () => {
	const [onBoarding, setOnBoarding] = useState("hidden");
	return (
		<div className="h-screen flex flex-col w-full justify-center ">
			<div className="md:card mx-auto max-w-2xl  md:shadow-xl px-4 md:my-20 w-full h-full md:bg-base-100 overflow-x-hidden overflow-y-auto">
				<div className="md:py-24 px-10 flex flex-col text-center justify-center h-full ">
					<Logo />
					<div className="flex flex-col items-center justify-center w-full ">
						<div className={`w-96 h-96 relative`}>
							<motion.img variants={onBoarding1} animate={onBoarding} className="w-96 absolute" src="/login.png" alt="" />
							<motion.img
								variants={onBoarding2}
								animate={onBoarding}
								className="w-80 left-12 absolute"
								src="/3d-business-two-credit-card.png"
								alt=""
							/>
						</div>
						<div className="flex flex-col z-10 gap-8">
							<h1 className="text-3xl font-bold">The Magic Of Smart Banking </h1>
							<p className="text-lg">Manage your finance easily and take control of it. Let’s get started! </p>
							<Link
								className={`btn btn-primary rounded-2xl ${onBoarding === "hidden" ? "mr-auto w-fit" : "w-full"}`}
								to={"/login"}
								onClick={(e) => {
									if (onBoarding === "hidden") {
										setOnBoarding("visible");
										e.stopPropagation();
										e.preventDefault();
									}
								}}
							>
								{onBoarding === "hidden" ? (
									<ArrowRight />
								) : (
									<>
										Get Started! <ArrowRight2 />
									</>
								)}
							</Link>
						</div>
					</div>
				</div>
			</div>
			{/* <Copyright /> */}
		</div>
	);
};

export default OnBoarding;
