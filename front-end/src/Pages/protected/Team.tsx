import { useEffect } from "react";

import { setPageTitle } from "@/app/context/header";
import Team from "@/features/settings/team";
import { useAppDispatch } from "@/hooks";

function InternalPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: "Team Members" }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Team />;
}

export default InternalPage;
