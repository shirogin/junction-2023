import { useState } from "react";

const accountsTypes = [
	"Investment",
	<div className="flex gap-2">
		<img src="/dollar-coin-hd.png" className="w-6 h-6" />
		Current
	</div>,
	"Savings",
	"Term deposit",
];

const Beneficiary = () => {
	const [currentAccount, setCurrentAccount] = useState(1);

  return (
    <>
    <div className="flex  overflow-x-auto no-scrollbar w-full px-6">
      {accountsTypes.map((account, i) => (
        <a
          key={i}
          href="#"
          onClick={(e) => {
            setCurrentAccount(i);
            // scroll to the current element show fully
            e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
          className={` scroll-mx-6 flex-shrink-0 px-6 py-2  rounded-full transition-all  ${
            currentAccount === i ? "text-black bg-white font-bold" : "text-white"
          }`}
        >
          {account}
        </a>
      ))}
    </div>
    <div className="container"></div>
  </>
  )
}

export default Beneficiary