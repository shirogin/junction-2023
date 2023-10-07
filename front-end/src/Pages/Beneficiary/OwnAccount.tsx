import { useState } from "react";
import Account from "./Account";
import { useNavigate } from "react-router";

const OwnAccount: React.FC = () => {
  const [step, setStep] = useState(1);
  const [sourceAccount, setSourceAccount] = useState<string | null>(null);
  const [targetAccount, setTargetAccount] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
      setStep(step + 1);
  };
  const handlePrevious = () => {
      setStep(step - 1);
  };
  const handleCancel = () => {
    navigate(-1)
  };

  const handleConfirm = () => {
      if (sourceAccount && targetAccount) {
          setSourceAccount(null);
          setTargetAccount(null);
          // setStep(1);
          navigate("/")
      }
  };

  return (
      <div className="flex flex-col gap-12 h-full">
          <div className="card bg-white text-black rounded-b-none w-full h-full">
              <div className="card-body w-full">
                  {step === 1 && (
                      <Account
                          title={"Transfer from"}
                          subtitle={"Select the account you want to send money from"}
                          next={<button className={"btn btn-primary"} onClick={handleNext}>Next</button>}
                          previous={<button className={"btn btn-outline"} onClick={handleCancel}>Cancel</button>}
                          selectedAccount={sourceAccount}
                          onSelectAccount={(account) => setSourceAccount(account)}
                      />
                  )}
                  {step === 2 && (
                      <Account
                          title={"Transfer to"}
                          subtitle={"Select the account you want to receive money on"}
                          next={<button className={"btn btn-primary"} onClick={handleConfirm}>Confirm</button>}
                          previous={ <button className={"btn btn-outline"} onClick={handlePrevious}>
                          Previous
                      </button>}
                          selectedAccount={targetAccount}
                          onSelectAccount={(account) => setTargetAccount(account)}
                      />
                  )}
              </div>
          </div>
      </div>
  );
};

export default OwnAccount;