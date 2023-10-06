import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useGetDesksListMutation } from "@/app/backend/export/desk";

type Props = { province: number };
const aDay = 86400000;

type TimedShipInformation = {
	list: ShipI[];
	createdAt: number;
};
function useDesks({ province }: Props) {
	const [GetDesksList, { isLoading }] = useGetDesksListMutation();

	const [timedList, setTimedList] = useLocalStorage<TimedShipInformation>("timedShipInformation-" + province, {
		list: [],
		createdAt: 0,
	});
	useEffect(() => {
		if (timedList.createdAt + aDay < Date.now()) {
			GetDesksList({ province: province })
				.unwrap()
				.then((res) => {
					setTimedList({ list: res.data, createdAt: Date.now() });
				})
				.catch(console.error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timedList]);
	return { desks: timedList.list, isLoading };
}

export default useDesks;
