import { Add } from "iconsax-react";

export function ClientsRow({ Clients, add = true }: { Clients: { name: string }[]; add?: boolean }) {
	return (
		<div className="flex overflow-x-auto no-scrollbar w-full px-6 flex-shrink-0">
			{add && (
				<a href="#" className={`flex flex-col text-xs scroll-mx-6 flex-shrink-0 w-16 text-center py-2 rounded-full transition-all`}>
					<div className="w-12 h-12 flex items-center justify-center bg-base-200 rounded-full mx-auto">
						<Add className="w-8 h-8" />
					</div>
					Add new
				</a>
			)}
			{Clients.map((account, i) => (
				<a
					key={i}
					href="#"
					className={`flex flex-col text-xs scroll-mx-2 flex-shrink-0 w-16 text-center py-2 rounded-full transition-all`}
				>
					<div className="avatar mx-auto">
						<div className="w-12 rounded-full">
							<img src={`https://reqres.in/img/faces/${i + 1}-image.jpg`} />
						</div>
					</div>
					{account.name}
				</a>
			))}
		</div>
	);
}
