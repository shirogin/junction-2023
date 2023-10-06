import { UserPlusIcon } from "@heroicons/react/24/solid";
import { LiaRedoAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

//import { showNotification } from '@/app/context/header'

export const TopSideButtons = ({ refetch }: { refetch: () => void }) => {
	return (
		<>
			<Link className="btn px-6 btn-sm normal-case btn-secondary" to={"/app/clients/create"}>
				<UserPlusIcon className="h-4 w-4" /> Add New
			</Link>
			<button className="btn px-6 normal-case btn-sm " onClick={() => refetch()}>
				<LiaRedoAltSolid className="h-4 w-4" />
			</button>
		</>
	);
};
