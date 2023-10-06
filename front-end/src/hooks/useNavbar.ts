import { setNavbar } from "@/app/context/navbar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";

export default function useNavbar(enable?: boolean) {
	const dispatch = useAppDispatch(),
		isOpen = useAppSelector((state) => state.navbar);
	function setIsOpen(value?: boolean) {
		if (value === undefined) return;
		dispatch(setNavbar(value));
	}
	useEffect(() => {
		setIsOpen(enable);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enable]);
	return {
		isOpen,
		setIsOpen,
	};
}
