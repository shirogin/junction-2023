import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import dynamicImport from "vite-plugin-dynamic-import";
const manifest: Partial<VitePWAOptions> = {
	registerType: "prompt",
	includeAssets: ["Logo.svg", "favicon.ico", "logo16.png", "logo64.png", "logo192.png", "logo512.png"],
	manifest: {
		id: "DiNAR",
		short_name: "DiNAR",
		name: "DiNAR",
		description: "DiNAR app to manage Cash and to spend more reasonably.",
		icons: [
			{
				src: "/Logo.svg",
				sizes: "96x96 128x128 256x256 512x512",
				type: "image/svg+xml",
				purpose: "any maskable",
			},
		],
		start_url: "/",
		scope: "/",
		orientation: "portrait-primary",
		display_override: ["window-control-overlay", "minimal-ui"],
		prefer_related_applications: true,
		display: "standalone",
		theme_color: "#000000",
		background_color: "#ffffff",
	},
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), VitePWA(manifest), dynamicImport()],
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
	},
	server: {
		port: 3130,
	},
	preview: {
		port: 3130,
	},
});
