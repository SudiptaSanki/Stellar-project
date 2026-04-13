import React, { useState } from "react";
import {
  checkConnection,
  retrievePublicKey,
  getBalance,
  getRequestAccess,
  userInfo,
} from "./Freighter";

const Header = ({ pubKey, setPubKey, darkMode, setDarkMode }) => {
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState("0");

  const connectWallet = async () => {
    try {
      const allowed = await checkConnection();

      if (!allowed) return alert("Permission denied");

      const key = await retrievePublicKey();
      const bal = await getBalance();

      setPubKey(key);
      setBalance(Number(bal).toFixed(2));
      setConnected(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-gray-300 dark:bg-gray-800 h-20 flex flex-wrap justify-between items-center px-10 transition-colors duration-300">
      <div className="text-3xl font-bold dark:text-white">Stellar App</div>

      <div className="flex items-center gap-4 text-gray-900 dark:text-white transition-colors duration-300">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mr-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full font-bold shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
        {pubKey && (
          <>
            <div className="p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border rounded-md">
              {`${pubKey.slice(0, 4)}...${pubKey.slice(-4)}`}
            </div>

            <div className="p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border rounded-md">
              Balance: {balance} XLM
            </div>
          </>
        )}

        <button
          onClick={connectWallet}
          disabled={connected}
          className={`text-xl px-4 h-12 rounded-md font-bold text-white transition-colors ${
            connected
              ? "bg-green-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {connected ? "Connected" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
