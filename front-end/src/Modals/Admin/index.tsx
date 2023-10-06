import { useModalI } from "@/hooks/useModal";
import CreateAdmin from "./CreateAdmin";
import UpdateAdmin from "./UpdateAdmin";
function isAdmin(admin: AdminI | object): admin is AdminI {
	return "_id" in admin && !!admin._id;
}
export default function AdminModal({ modalData, closeModal }: useModalI<AdminI | object>) {
	const { extraObject } = modalData;
	const admin = isAdmin(extraObject) ? extraObject : null;
	return (
		<div className="flex flex-col max-w-xl mx-auto overflow-y-auto max-h-[80vh] h-full">
			<div className="flex flex-col h-full px-2">
				{admin ? <UpdateAdmin admin={admin} /> : <CreateAdmin closeModal={() => closeModal()} />}
			</div>
		</div>
	);
}
