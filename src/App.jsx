import { useEffect, useState } from "react";
import InputBox from "./assets/Components/InputBox";
import useCurrencyInfo from "./CustomHooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  // Custom Hook to get currency info
  const currencyInfo = useCurrencyInfo(from);

  // extract all keys from currentInfo object
  const options = Object.keys(currencyInfo);
  //  add swap functionality
  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };
  // convert amount
  const convert = () => setConvertedAmount(amount * currencyInfo[to]);

  return (
    <div
      className="w-full h-screen flex 
    flex-wrap justify-center items-center gap-2 "
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vbmV5fGVufDB8fDB8fHwww`,
      }}
    >
      <div className="w-full">
        <div
          className="w-full max-w-md mx-auto border
         border-gray-60 rounded-lg p-5 backdrop-blur-sm
          bg-white/30"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              {
                if (amount === 0 || amount === "")
                  alert("Enter a valid Amount!");
              }
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 
                        -translate-y-1/2 border-2 border-white rounded-md 
                        bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 
                text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
