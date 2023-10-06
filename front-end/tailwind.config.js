import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";
import typography from "@tailwindcss/typography";
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
	darkMode: ["class", '[data-theme="luxury"]'],
	plugins: [typography, daisyui],
	daisyui: {
		themes: [
			{
				"junction-theme": {
					...themes["[data-theme=acid]"],
					primary: "#0F1336",
					secondary: "#5126E6",
				},
			},
		],
	},
};
