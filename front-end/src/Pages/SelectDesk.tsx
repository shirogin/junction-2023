import useStoreDesk from "@/hooks/useStoreDesk";
import LandingIntro from "./LogIn/LandingIntro";
import { Copyright } from "@/Components/Copyright";

function SelectDesk() {
	const { setCurrentDesk, desks } = useStoreDesk();
	return (
		<div className="min-h-screen bg-base-200 flex flex-col justify-center w-full">
			<div className="card mx-auto w-full max-w-5xl  md:shadow-xl md:mt-40">
				<div className="grid  md:grid-cols-2 grid-cols-1  md:bg-base-100 rounded-xl">
					<div className="">
						<LandingIntro />
					</div>
					<div className="md:py-24 px-10 flex flex-col items-center">
						<h2 className="text-2xl font-semibold mb-2 text-center">Select a desk</h2>
						<div className="mx-auto w-[70vw] md:mx-0 md:w-full">
							{desks.map((desk) => (
								<button
									key={desk._id}
									type="submit"
									onClick={() => {
										setCurrentDesk(desk._id);
									}}
									className="btn btn-outline mt-2 w-full "
								>
									{desk.name} : {desk.province}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
			<Copyright />
		</div>
	);
}

export default SelectDesk;
