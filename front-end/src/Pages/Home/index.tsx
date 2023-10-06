import React, { useState } from "react";

const accountsTypes = ["Investment", "Current", "Savings", "Term deposit"];
export default function Home() {
	const [currentAccount, setCurrentAccount] = useState(1);
	return (
		<>
			<div className="flex scroll-mx-6 overflow-x-auto no-scrollbar">
				{accountsTypes.map((account, i) => (
					<a
						href="#"
						onClick={() => {
							setCurrentAccount(i);
						}}
						className={`text-white flex-shrink-0 px-6 py-2  rounded-full transition-all ${
							currentAccount === i ? "text-black bg-white " : ""
						}`}
					>
						{account}
					</a>
				))}
			</div>
			<div className="container"></div>
		</>
	);
}
