import { useEffectOnce } from "@/hooks";
import { useParams } from "react-router-dom";

export default function UpsIntegration() {
	const params = useParams();
	console.log(params);
	useEffectOnce(() => {
		window.localStorage.setItem("params", JSON.stringify(params));

		setTimeout(() => {
			window.close();
		}, 4000);
	});
	return <div>UpsIntegration</div>;
}
