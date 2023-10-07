import { useModalI } from "@/hooks/useModal";
import { Link } from "react-router-dom";
// import DZD from "@/utils/Currency";

export default function FaceRecognition({ modalData, closeModal }: useModalI<object>) {
	const { extraObject } = modalData;
	console.log(extraObject);
	return (
		<div className=" flex flex-col  items-center mx-4 mb-4 gap-4">
			<img src="/public/face-id.png" />
			<h1 className="text-xl font-bold">Use Face ID?</h1>
			<p>Would you like to enter your Face ID instead of using your passcode?</p>
			<Link
				to={"/app/auth-verification"}
				className="btn btn-primary w-full"
				onClick={() => {
					closeModal();
				}}
			>
				Yes, enable Face ID
			</Link>
			<button className="btn btn-outline w-full " onClick={closeModal}>
				Not Now
			</button>
		</div>
	);
}
