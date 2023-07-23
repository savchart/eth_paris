// ContractData.tsx
import { useState, useEffect } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

export const ContractData = () => {
  const { address } = useAccount();
  const [depositAmount, setDepositAmount] = useState(0);

  const { data: deposits, isLoading: isDepositsLoading } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "deposits",
    args: [address],
  });

  useEffect(() => {
    if (deposits && !isDepositsLoading) {
      const depositEth = deposits.toString();
      setDepositAmount(depositEth);
    }
  }, [deposits, isDepositsLoading]);

  const startServer = () => {
    fetch('http://localhost:5000/start_server', { method: 'GET' })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex bg-base-300 relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Deposited Amount</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              value={depositAmount}
              className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white uppercase"
              readOnly
            />
            {parseFloat(depositAmount) >= 1000000 ? (
              <div>
                <button onClick={startServer}>Start Server</button>
              </div>
            ) : (
              <div>Warning: Deposit amount is less than 1000000 wei</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
