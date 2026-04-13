import './App.css';
import Header from './components/Header';
import { useState, createContext, useEffect } from 'react';
import RegisterProperty from './components/RegisterProperty';
import FetchProperty from './components/FetchProperty';

const pubKeyData = createContext();

function App() {
  const [pubKey, _setPubKey] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <Header pubKey={pubKey} setPubKey={_setPubKey} darkMode={darkMode} setDarkMode={setDarkMode} />
      <pubKeyData.Provider value={pubKey}>
        <div className="flex flex-col items-center mt-10 w-full px-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <h1 className="text-3xl font-bold mb-8">Land Registry Portal</h1>
          {/** I removed pt-10 from main wrapper, so it fits cleaner **/}
          {pubKey ? (
            <div className="w-full flex-col flex items-center">
              <RegisterProperty userAddress={pubKey} />
              <FetchProperty userAddress={pubKey} />
            </div>
          ) : (
            <div className="text-xl mt-10">Please connect your Freighter wallet to continue.</div>
          )}
        </div>
      </pubKeyData.Provider>
    </div>
  );
}

export default App;
export {pubKeyData};