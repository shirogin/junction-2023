import Fallback from "@/Components/Fallback";
import { apiUrl } from "@/app/backend";

import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import Printable from "@/Components/Printable";
import { useLang } from "@/hooks";
import ContentType from "./content/ContentType";
import Error500 from "../Errors/Error500";

function Labels() {
	const [labels, setLabels] = useState<string[]>([]);
	const [labelsSVG, setLabelsSVG] = useState<string[]>([]);

	//const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (labels.length > 0) return;
		// check if window is a popup
		//if (!window.opener) return navigate("/app/");
		const Label_IDS = window.Label_IDS || [];
		const Label_TRACK_IDS = window.Label_TRACK_IDS || [];
		if (Label_IDS.length === 0) window.close();
		else {
			document.title = `Label-${Label_TRACK_IDS[0] || Label_IDS[0]}`;
			setLabels(Label_IDS);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		// fetch labels from apiUrl/shipment/label/:id
		if (labels.length === 0) return;
		const fetchLabels = async () => {
			const res = await Promise.all(
				labels.map((label) =>
					fetch(`${apiUrl}/admin/shipment/label/${label}`, {
						mode: "cors", // no-cors, *cors, same-origin
						cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
						credentials: "include", // include, *same-origin, omit
						headers: {
							"user-kind": "Admin",
							"Content-Type": "image/svg+xml",
						},
						method: "GET",
					})
						.then((r) => {
							if (r.ok) return r.text();
							else return "";
						})
						.catch((e) => {
							console.error(e);
							return "Couldn't load label";
						})
				)
			);
			setLabelsSVG(res);
			setIsLoading(false);
		};
		fetchLabels();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [labels]);

	const [content, setContent] = useState<ContentType | null>(null);
	const { language } = useLang();

	useEffect(() => {
		import("./content/" + language).then((cc) => {
			setContent(cc.default);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);
	if (!content) return <Error500 />;
	if (isLoading) return <Fallback />;
	if (labelsSVG.length === 0) return <div>{content.problem}</div>;
	return (
		<>
			<link
				id="fontPreload"
				href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Open+Sans:wght@600;800&display=swap"
				rel="stylesheet"
			/>

			<Printable
				labels={labelsSVG}
				fonts={[
					{ family: "Inter", weight: "500", style: "normal" },
					{ family: "Open Sans", weight: "600", style: "normal" },
					{ family: "Open Sans", weight: "800", style: "normal" },
				]}
			/>
		</>
	);
}

export default Labels;
