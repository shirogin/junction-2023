import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import { useModal } from "@/hooks";
import { LiaRedoAltSolid } from "react-icons/lia";
import { ShopAdd } from "iconsax-react";

//import { showNotification } from '@/app/context/header'

export const TopSideButtons = ({ refetch }: { refetch: () => void }) => {
	const { openModal } = useModal();

	const openAddNewLeadModal = async () => {
		await openModal({
			title: "Create new desk",
			bodyType: MODAL_BODY_TYPES.ADD_MANAGE_DESK,
			size: "lg",
		});
		refetch();
	};

	return (
		<>
			<button className="btn px-6 btn-sm normal-case btn-secondary" onClick={() => openAddNewLeadModal()}>
				<ShopAdd className="h-4 w-4" /> Add New
			</button>
			<button className="btn px-6 normal-case btn-sm " onClick={() => refetch()}>
				<LiaRedoAltSolid className="h-4 w-4" />
			</button>
		</>
	);
};
