import { useModal } from "@/hooks";
import { MODAL_BODY_TYPES } from "@/utils/globalConstantUtil";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { LiaRedoAltSolid } from "react-icons/lia";

//import { showNotification } from '@/app/context/header'
export const TopSideButtons = ({ Refetch }: { Refetch: () => void }) => {
	const { openModal } = useModal();
	const openAddNewLeadModal = () => {
		openModal({
			title: "Create new Delivery man",
			bodyType: MODAL_BODY_TYPES.ADD_MANAGE_DELIVERYMAN,
		}).then(() => {
			Refetch();
		});
	};

	return (
		<>
			<button className="btn px-6 btn-sm normal-case btn-secondary" onClick={() => openAddNewLeadModal()}>
				<UserPlusIcon className="h-4 w-4" /> Add New
			</button>
			<button className="btn px-6 normal-case btn-sm " onClick={() => Refetch()}>
				<LiaRedoAltSolid className="h-4 w-4" />
			</button>
		</>
	);
};
