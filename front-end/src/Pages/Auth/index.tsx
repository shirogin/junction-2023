import Page from "@/Components/Page";
import PinCode from "@/Components/PinCode";
import { useModal } from "@/hooks";
import useNavbar from "@/hooks/useNavbar";
import useNavigation from "@/hooks/useNavigation";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import { useEffect } from "react";

const Auth = () => {
	const { openModal } = useModal();
	const { setIsOpen } = useNavbar();
	const { setIsOpen: setIsNavigation } = useNavigation();
	useEffect(() => {
		openModal({
			bodyType: MODAL_BODY_TYPES.FACE_RECOGNITION,
			title: "",
		});
		setIsOpen(false);
		setIsNavigation(false);
	}, []);

	return (
		<Page title="Set up PIN Code" subtitle="Enter the PIN Code to secure your account" icon="/public/3d-fluency-padlock 1.png">
			<div className={``}>
				<PinCode targetCode="1234" />
			</div>
		</Page>
	);
};

export default Auth;
