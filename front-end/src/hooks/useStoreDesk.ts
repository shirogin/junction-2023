import { useAppDispatch, useAppSelector } from "./redux";
import { removeDesk, setCurrentDesk, setDesks } from "@/app/context/desk";

function useStoreDesk() {
	const dispatch = useAppDispatch(),
		storeDesk = useAppSelector((state) => state.desk);
	return {
		desks: storeDesk.list,
		currentDesk: storeDesk.current,
		setDesks: (desksList: DeskModelI[]) => {
			dispatch(setDesks(desksList));
		},
		setCurrentDesk: (deskId: string) => {
			dispatch(setCurrentDesk(deskId));
		},
		removeDesk: () => {
			dispatch(removeDesk());
		},
	};
}
export default useStoreDesk;
