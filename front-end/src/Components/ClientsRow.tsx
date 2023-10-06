export function ClientsRow({ Clients, add = true }: { Clients: { name: string }[]; add?: boolean }) {
	return (
		<div className="flex overflow-x-auto no-scrollbar w-full px-6">
			{add && (
				<a
					href="#"
					className={`flex flex-col text-xs scroll-mx-6 flex-shrink-0 w-16 text-center py-2 rounded-full transition-all `}
				></a>
			)}
			{Clients.map((account, i) => (
				<a
					key={i}
					href="#"
					className={`flex flex-col text-xs scroll-mx-6 flex-shrink-0 w-16 text-center py-2 rounded-full transition-all `}
				>
					<div className="avatar">
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
