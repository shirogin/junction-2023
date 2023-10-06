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
					primary: "#016862",
					secondary: "#330000",
					accent: "#FFD100",
					neutral: "#242424",
					"base-100": "#ffffff",
					info: "#3abff8",
					success: "#00857D",
					warning: "#fbbd23",
					error: "#C91A13",
				},
			},
		],
	},
};
