import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";

async function getProvinces() {
	return (await fetch("/Data/provinces.json", {
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json())) as ProvinceI[];
}
function useProvinces() {
	const [provinces, setProvinces] = useLocalStorage<ProvinceI[]>("provinces", []);
	useEffect(() => {
		if (provinces.length === 0) {
			getProvinces()
				.then((provinces) => {
					setProvinces(provinces);
				})
				.catch(console.error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [provinces]);
	return provinces;
}

export default useProvinces;
