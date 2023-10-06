import UpdatePassword from "./UpdatePassword";

import UpdateProfile from "./UpdateProfile";

export default function UpdateAdmin({ admin }: { admin: AdminI }) {
	return (
		<div className="card w-full bg-base-100">
			<div className="card-body">
				<div className="flex flex-col gap-8">
					<div>
						<h1 className="text-2xl font-black text-center">Update profile</h1>
						<UpdateProfile admin={admin} />
					</div>
					<div className="grid grid-cols-1  gap-4">
						<div>
							<h1 className="text-2xl font-black text-center">Update password</h1>
							<UpdatePassword adminId={admin._id} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
