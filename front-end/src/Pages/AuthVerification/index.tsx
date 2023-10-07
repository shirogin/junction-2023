import Page from "@/Components/Page";
import FaceScan from "@/Components/FaceScan";
import VerificationProgressBar from "@/Components/VerificationProgressBar";
import useNavbar from "@/hooks/useNavbar";
import useNavigation from "@/hooks/useNavigation";
import { useEffect } from "react";

const AuthVerification = () => {
	const { setIsOpen } = useNavbar();
	const { setIsOpen: setIsNavigation } = useNavigation();
	useEffect(() => {
		setIsOpen(false);
		setIsNavigation(false);
	}, []);
	return (
		// <div className="w-full h-full flex flex-col items-center gap-[4rem]">
		//   <div className="text-red bg-red-500 mt-8"> Dinar </div>
		//   <div className="w-full pl-4">
		//     <div className="w-full flex  items-center gap-3">
		//       <h1 className="text-2xl font-bold ">Scanning face</h1>
		//       <img src="/public/3d-casual-life-face-scan 1.png" alt="scanimage" />
		//     </div>
		//     <p className="text-sm text-[#0B1C3F]">
		//       Scan your face by position it right in <br /> the face frames
		//     </p>
		//   </div>
		// </div>
		<Page
			icon="/3d-casual-life-face-scan 1.png"
			title="Scanning face"
			subtitle="Scan your face by position it right in the face frames"
		>
			<div className="w-full h-[40%]">
				<FaceScan />
				<VerificationProgressBar />
			</div>
		</Page>
	);
};

export default AuthVerification;
