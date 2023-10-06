import { useEffect } from "react";

import { setPageTitle } from "@/app/context/header";
import Integration from "@/features/integration";
import { useAppDispatch } from "@/hooks";

function InternalPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: "Integrations" }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Integration />;
}

export default InternalPage;
