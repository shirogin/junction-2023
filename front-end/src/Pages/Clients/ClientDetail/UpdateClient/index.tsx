import UpdatePassword from "./UpdatePassword";
import UpdatePin from "./UpdatePin";
import UpdateProfile from "./UpdateProfile";

export default function UpdateClient({ client }: { client: ClientI }) {
	return (
		<div className="flex flex-col gap-8">
			<div>
				<h1 className="text-2xl font-black text-center">Update profile</h1>
				<UpdateProfile client={client} />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<h1 className="text-2xl font-black text-center">Update password</h1>
					<UpdatePassword clientId={client._id} />
				</div>
				<div>
					<h1 className="text-2xl font-black text-center">Update pin code</h1>
					<UpdatePin clientId={client._id} />
				</div>
			</div>
		</div>
	);
}
