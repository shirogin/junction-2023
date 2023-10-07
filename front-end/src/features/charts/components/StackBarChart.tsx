import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.defaults.color = "#ffffff";
ChartJS.defaults.borderColor = "#ffffff29";
function StackBarChart() {
	const options = {
		responsive: true,

		title: {
			color: "white",
		},

		plugins: {
			legend: {
				position: "bottom",
				color: "white",
				useBorderRadius: false,
				labels: {
					// This more specific font property overrides the global property
					color: "#ffffff",
					font: {
						size: 14,
					},
				},
			},
		},
	};

	const labels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

	const data = {
		labels,
		datasets: [
			{
				label: "Expenses",
				data: labels.map(() => {
					return Math.random() * 1000 + 500;
				}),
				backgroundColor: "rgba(11, 28, 63, .7)",
				width: 5,
				borderRadius: 20, // Adjust the value for rounded bars
			},
			{
				label: "Income",
				data: labels.map(() => {
					return Math.random() * 1000 + 500;
				}),
				backgroundColor: "rgba(255, 255, 255, 1)",
				borderRadius: 20, // Adjust the value for rounded bars
			},
		],
	};
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <Bar options={options} data={data} />;
}

export default StackBarChart;
