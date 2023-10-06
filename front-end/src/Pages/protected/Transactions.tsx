import { useEffect } from "react";

import { setPageTitle } from "@/app/context/header";
import Transactions from "@/features/transactions";
import { useAppDispatch } from "@/hooks";

function InternalPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: "Transactions" }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Transactions />;
}

export default InternalPage;
