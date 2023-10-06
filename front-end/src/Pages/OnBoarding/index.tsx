import Logo from "@/Components/Logo";
import { ArrowRight } from "iconsax-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const onBoarding1 = {
		hidden: { x: 100, y: 0 },
		visible: { x: 0, y: 0 },
	},
	onBoarding2 = {
		hidden: { x: 0, y: 0 },
		visible: { x: 0, y: 0 },
	};
const OnBoarding = () => {
	return (
		<div className="min-h-screen bg-base-200 flex flex-col w-full justify-center">
			<div className="md:card mx-auto max-w-2xl  md:shadow-xl px-4 md:my-20 w-full h-full md:bg-base-100 ">
				<div className="md:py-24 px-10 flex flex-col text-center justify-center h-full">
					<Logo />
					<div className="flex flex-col items-center justify-center gap-8 w-full ">
						<div className={`w-96 h-96 relative`}>
							<motion.img variants={onBoarding1} initial={"hidden"} className="w-96 absolute" src="/login.png" alt="" />
							<motion.img variants={onBoarding2} className="w-96 absolute" src="/3d-business-two-credit-card.png" alt="" />
						</div>
						<div className="flex flex-col z-10 gap-8">
							<h1 className="text-3xl font-bold">The Magic Of Smart Banking </h1>
							<p className="text-lg">Manage your finance easily and take control of it. Let’s get started! </p>
							<Link className="btn btn-primary w-fit rounded-2xl mr-auto" to={"/onboarding/2"}>
								<ArrowRight />
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
