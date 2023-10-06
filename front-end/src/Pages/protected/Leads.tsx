import { useEffect } from "react";

import { setPageTitle } from "@/app/context/header";
import Leads from "@/features/leads";
import { useAppDispatch } from "@/hooks";

function InternalPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: "Leads" }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Leads />;
}

export default InternalPage;
