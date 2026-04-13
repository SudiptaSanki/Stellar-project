import React, { useState, useEffect } from "react";
import { registerProperty } from "./LandRegistryService";

const LOCATIONS = [
  "Delhi, Plot 10",
  "Mumbai, Block B",
  "Chennai, Sector 4",
  "NYC, Manhattan",
  "London, Westminster",
  "Tokyo, Shibuya",
  "Kolkata, Salt Lake",
];

function RegisterProperty({ userAddress }) {
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [status, setStatus] = useState("");

  const [placeholderText, setPlaceholderText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typeSpeed = isDeleting ? 50 : 100;

    const currentWord = LOCATIONS[wordIndex];

    if (!isDeleting && placeholderText === currentWord) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    } else if (isDeleting && placeholderText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % LOCATIONS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setPlaceholderText((prev) => {
        return isDeleting
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1);
      });
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [placeholderText, isDeleting, wordIndex]);

  const handleRegister = async () => {
    if (!location || !area) {
      setStatus("Please provide both location and area.");
      return;
    }

    setStatus("Sending transaction to register property...");
    try {
      const propId = await registerProperty(userAddress, location, Number(area));
      setStatus(`Success! Property registered with ID: ${propId}`);
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div className="p-4 border dark:border-gray-700 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-md mx-auto mb-4 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Register New Property</h2>
      <input
        type="text"
        className="border dark:border-gray-600 p-2 w-full mb-3 rounded dark:bg-gray-700 dark:text-white"
        placeholder={`Location (e.g. ${placeholderText}|)`}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        className="border dark:border-gray-600 p-2 w-full mb-3 rounded dark:bg-gray-700 dark:text-white"
        placeholder="Area in sq. meters (e.g. 1500)"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
      >
        Register
      </button>
      {status && <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 font-semibold">{status}</p>}
    </div>
  );
}

export default RegisterProperty;
