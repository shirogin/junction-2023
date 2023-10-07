import { useAppDispatch, useAppSelector } from "./redux";
import { setColor } from "../app/context/bgColor";

function useBgColor() {
	const dispatch = useAppDispatch(),
		theme = useAppSelector((state) => state.bgColor),
		set = (theme: "bg-primary" | "bg-gray-200") => {
			dispatch(setColor(theme));
		};

	return { setTheme: set, theme };
}
export default useBgColor;
