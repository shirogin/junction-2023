import useLocalStorage from "./useLocalStorage";
import { useEffect } from "react";

async function getCities(provinceId: number) {
	const res = await fetch(`/Data/Cities/${provinceId}.json`);
	const cities = (await res.json()) as ProvinceCityI[];
	return cities;
}
function useCities(provinceId: number) {
	const [cities, setCities] = useLocalStorage<ProvinceCityI[]>("cities-" + provinceId, []);
	useEffect(() => {
		if (cities.length === 0) {
			getCities(provinceId)
				.then((cities) => {
					setCities(cities);
				})
				.catch(console.error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cities]);
	return cities;
}

export default useCities;
