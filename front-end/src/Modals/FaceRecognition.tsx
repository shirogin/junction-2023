import { useModalI } from "@/hooks/useModal";
import { Scan } from "iconsax-react";
// import DZD from "@/utils/Currency";


export default function FaceRecognition({ modalData, closeModal }: useModalI<object>) {
	const { extraObject } = modalData;
	console.log(extraObject);
	return <div className=" flex flex-col mb-4 gap-4">
		<Scan />
		<h1>Use Face ID?</h1>
		<p>Would you like to enter your  Face ID instead of using your passcode?</p>
		<button>Yes, enable Face ID</button>
		<button onClick={closeModal}>Not Now</button>

	</div>;
}
