import React, { useState } from "react";
import { fetchProperty } from "./LandRegistryService";

function FetchProperty({ userAddress }) {
  const [propId, setPropId] = useState("");
  const [propertyInfo, setPropertyInfo] = useState(null);
  const [status, setStatus] = useState("");

  const handleFetch = async () => {
    if (!propId) {
      setStatus("Please enter a property ID.");
      return;
    }

    setStatus("Fetching property details...");
    setPropertyInfo(null);
    try {
      const details = await fetchProperty(userAddress, Number(propId));
      setPropertyInfo(details);
      setStatus("Property details fetched successfully.");
    } catch (e) {
      setStatus(`Error: Could not retrieve property details.`);
    }
  };

  return (
    <div className="p-4 border dark:border-gray-700 bg-white dark:bg-gray-800 rounded shadow-md w-full max-w-md mx-auto mb-4 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Lookup Property</h2>
      <input
        type="number"
        className="border dark:border-gray-600 p-2 w-full mb-3 rounded dark:bg-gray-700 dark:text-white"
        placeholder="Property ID"
        value={propId}
        onChange={(e) => setPropId(e.target.value)}
      />
      <button
        onClick={handleFetch}
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 mb-3 transition-colors"
      >
        Fetch
      </button>

      {status && <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{status}</p>}

      {propertyInfo && (
        <div className="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 p-3 rounded text-left transition-colors">
          <p><strong>Property ID:</strong> {propertyInfo.prop_id}</p>
          <p><strong>Location:</strong> {propertyInfo.location}</p>
          <p><strong>Area:</strong> {propertyInfo.area} sq m</p>
          <p className="truncate" title={propertyInfo.owner}><strong>Owner:</strong> {propertyInfo.owner}</p>
        </div>
      )}
    </div>
  );
}

export default FetchProperty;
