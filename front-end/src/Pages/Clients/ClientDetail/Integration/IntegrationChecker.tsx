import Card from "@/Components/Card";
import { useCallbackIntegrationMutation, useRequestUPSIntegrationMutation } from "@/app/backend/export/integration";
import { useNotification } from "@/hooks";
import { useState } from "react";

export default function IntegrationChecker({ client }: { client: ClientI }) {
	const [RequestIntegration] = useRequestUPSIntegrationMutation();
	const [CallbackIntegration] = useCallbackIntegrationMutation();
	const { Errofy, Notify } = useNotification();
	const [integrating, setIntegrating] = useState(false);
	const [integrated, setIntegrated] = useState<boolean>(client.upsIntegrationSet || false);

	function IntegrateUps() {
		if (!client) return Errofy("UPS Integration", { message: "No client provided" });
		if (!integrated)
			return RequestIntegration()
				.unwrap()
				.then((response) => {
					// URL of the page you want to open in the popup
					const url = response.data.authorizationLink;
					console.log({ url });
					Notify("Opening UPS Integration popup", "Please make sure you allow popups for this website");
					// Options for the popup window
					const options = "width=500,height=600,resizable=yes";

					// Open the popup window
					const popup = window.open(url, "UPS Integration", options);
					if (!popup)
						return Errofy("Opening UPS Integration popup", {
							message: "Popup couldn't be opened, please allow popups for this website",
						});
					setIntegrating(true);
					// Start the popup close timer
					const timer = setInterval(async function () {
						// Popup closed?
						if (popup.closed) {
							clearInterval(timer);
							// Popup window has been closed by user
							const code = new URLSearchParams(popup.location.search).get("code");

							if (!code)
								Errofy("Opening UPS Integration popup", {
									message: "Popup couldn't be opened, please allow popups for this website",
								});
							else {
								// Send code to backend to get access token
								await CallbackIntegration({ code, clientId: client._id })
									.unwrap()
									.then((response) => {
										Notify("UPS Integration", response.message);
										setIntegrated(true);
									})
									.catch((err) => {
										Errofy("UPS Integration", err);
									});
							}
							setIntegrating(false);
						}
					}, 1000);
				})
				.catch((err) => {
					Errofy("Requesting UPS Integration", err);
				});
	}
	return (
		<div>
			<Card
				title="Integration"
				description={
					integrated
						? "It seems the client has already integrated UPS API."
						: "It seems the client hasn't integrated UPS API yet."
				}
				buttonProps={integrated ? undefined : { text: "Integrate", onClick: () => IntegrateUps(), isLoading: integrating }}
			/>
		</div>
	);
}
