import { useAppDispatch, useAppSelector } from "./redux";
import { removeUser, setUser } from "../app/context/user";

function useUser<T extends AdminI | null = AdminI | null>() {
	const dispatch = useAppDispatch(),
		user = useAppSelector((state) => state.user) as T,
		set = (user: AdminI) => {
			dispatch(setUser(user));
		},
		remove = () => {
			dispatch(removeUser());
		};
	return { setUser: set, user, removeUser: remove };
}
export default useUser;
