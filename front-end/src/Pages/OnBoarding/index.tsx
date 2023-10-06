import Logo from "@/Components/Logo";
import { ArrowRight } from "iconsax-react";

const OnBoarding = () => {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col w-full justify-center">
            <div className="md:card mx-auto max-w-2xl  md:shadow-xl px-4 md:my-20 w-full h-full md:bg-base-100 ">
                    <div className="md:py-24 px-10 flex flex-col text-center">
                        <Logo />
                        <div className="flex flex-col items-center mt-12 gap-8 w-full">
                            <img className="w-96" src="/public/login.png" alt="" />
                            <h1 className="text-3xl font-bold">The Magic Of Smart Banking </h1>
                            <p className="text-lg">
                                Manage your finance easily and take control of it. Let’s get
                                started!{" "}
                            </p>
                            <button className="btn btn-primary w-fit rounded-2xl mr-auto ">
                                <ArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            {/* <Copyright /> */}
        </div>
    );
};

export default OnBoarding;
