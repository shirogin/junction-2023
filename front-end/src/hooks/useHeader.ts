import { useAppSelector } from ".";

export default function useHeader() {
	const header = useAppSelector((state) => state.header);

	return {
		header,
	};
}
