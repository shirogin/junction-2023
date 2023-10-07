import { createSlice } from "@reduxjs/toolkit";

const initial: "bg-primary" | "bg-gray-200" = "bg-primary";

const bgColor = createSlice({
	name: "bgColor",
	initialState: initial,
	reducers: {
		setColor: (state, action) => {

			state = action.payload ?? "bg-primary";
			return state;
		},
	},
});

export const { setColor } = bgColor.actions;

export default bgColor.reducer;
