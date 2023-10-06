import { useModalI } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import CreateDesk from "./CreateDesk";
import UpdateDesk from "./UpdateDesk";

function isDesk(desk: DeskBaseI | object): desk is DeskBaseI {
	return "_id" in desk && !!desk._id;
}

export default function DeskModal({ modalData /*, closeModal */ }: useModalI<DeskBaseI | object>) {
	const { extraObject } = modalData;
	const [desk, setDesk] = useState(isDesk(extraObject) ? extraObject : null);

	useEffect(() => {
		setDesk(isDesk(extraObject) ? extraObject : null);
	}, [extraObject]);
	return desk ? <UpdateDesk desk={desk} /> : <CreateDesk />;
}
