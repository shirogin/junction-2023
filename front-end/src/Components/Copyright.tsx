export function Copyright() {
	return (
		<div className="mx-auto text-center mt-auto">
			<p className=" mt-10 mb-4">
				{"Made with ❤️ ©"}
				<a color="inherit" href="https://in-verse.com/">
					Inverse
				</a>{" "}
				{new Date().getFullYear()}
				{"."}
			</p>
		</div>
	);
}
