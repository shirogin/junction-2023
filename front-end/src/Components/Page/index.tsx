import Logo from "@/Components/Logo";

type Props = {
	title: string;
	icon: string;
	subtitle: string;
	intro?: React.ReactNode;
	children: React.ReactNode;
};
const Page: React.FC<Props> = ({ title, icon, subtitle, intro, children }) => {
	return (
		<div className="md:card mx-auto w-full max-w-5xl  md:shadow-xl md:mt-40 px-12 h-full ">
			<div className="grid  md:grid-cols-2 grid-cols-1  md:bg-base-100 rounded-xl h-full ">
				<div className="hidden md:block">{intro}</div>
				<div className="md:py-24  flex flex-col gap-6 h-full justify-center mt-12">
					<Logo />
					<div className="flex mt-12 gap-4">
						<h1 className="text-2xl font-bold">{title} </h1>
						<div>
							<img src={`${icon}`} />
						</div>
					</div>

					<p className="">{subtitle}</p>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Page;
