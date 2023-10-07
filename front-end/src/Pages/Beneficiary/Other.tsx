import { ClientsRow } from "@/Components/ClientsRow";
import NumberPad from "@/Components/PinCode/NumberPad";
import useKeypad from "@/hooks/useKeyPad";
import DZD from "@/utils/Currency";
import { useState } from "react";
import { motion } from "framer-motion";

const RecentSenders = [
    {
        name: "Flen",
    },
    {
        name: "Flana",
    },
    {
        name: "Ghafour",
    },
    {
        name: "Youcef",
    },
    {
        name: "Wassim",
    },
    {
        name: "Fatima",
    },
    {
        name: "maria",
    },
];

const Other = () => {
    const { reset } = useKeypad();
    const [amount, setAmount] = useState<string>("");
    const [showTransaction, setShowTransaction] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(150250);


    const handleKeyPress = (keyValue: number) => {
        if (keyValue >= 0 && keyValue <= 9) {
            setAmount((prevAmount) => prevAmount + keyValue.toString());
        }
    };

    const handleReset = () => {
        setAmount("");
        reset(); // Appeler la fonction reset du hook useKeypad
    };

    const handleSend = () => {
      const amountValue = parseInt(amount);
      if (!isNaN(amountValue) && amountValue <= balance) {
          setBalance(prevBalance => prevBalance - amountValue);
          setShowTransaction(true);
          setTimeout(() => {
              setShowTransaction(false);
              setAmount(''); // Réinitialisation de la valeur d'amount
          }, 5000);
      }
  };
    return (
        <div className="flexx flex-col gap-12 h-full">
            {showTransaction ? (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="flex justify-between -mb-4 px-8 pt-4 pb-6 w-full bg-primary rounded-2xl">
                        🎉 Your account has been debited by {DZD.EN.format(parseInt(amount))} !
                    </p>
                </motion.div>
            ) : (
                <ClientsRow Clients={RecentSenders} />
            )}
            <div className="card bg-white text-black rounded-b-none w-full h-full">
                <div className="card-body w-full">
                    <div className="text-3xl p-2 mb-2 rounded-md text-center">
                        {amount ? DZD.EN.format(parseInt(amount)) : DZD.EN.format(0)}
                    </div>
                    <p className="flex-grow-0 mb-8 text-center">
                        Your balance : {DZD.EN.format(balance)}
                    </p>
                    <NumberPad pressKey={handleKeyPress} reset={handleReset} />
                    <button onClick={handleSend} className="btn btn-primary w-full mt-8">
                        Send {amount ? DZD.EN.format(parseInt(amount)) : DZD.EN.format(0)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Other;
