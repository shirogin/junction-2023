import Page from "@/Components/Page";
import PinCode from "@/Components/PinCode";
import { useEffectOnce, useModal } from "@/hooks";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";

const Auth = () => {
	const { openModal } = useModal();

	useEffectOnce(() => {
		openModal({
			bodyType: MODAL_BODY_TYPES.FACE_RECOGNITION,
			title: "",
		});
		// .then(() => {
		// Refetch();
		// });
	});
	return (
		<Page title="Set up PIN Code" subtitle="Enter the PIN Code to secure your account" icon="/public/3d-fluency-padlock 1.png">
			<div className={``}>
				<PinCode targetCode="1234" />
			</div>
		</Page>
	);
};

export default Auth;
