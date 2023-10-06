import { useEffect } from "react";

import { setPageTitle } from "@/app/context/header";

import DocumentIcon from "@heroicons/react/24/solid/DocumentIcon";
import { useAppDispatch } from "@/hooks";

function InternalPage() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(setPageTitle({ title: "Page Title" }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="hero h-4/5 bg-base-200">
			<div className="hero-content text-accent text-center">
				<div className="max-w-md">
					<DocumentIcon className="h-48 w-48 inline-block" />
					<h1 className="text-5xl mt-2 font-bold">Blank Page</h1>
				</div>
			</div>
		</div>
	);
}

export default InternalPage;
