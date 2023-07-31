"use client";

import React from "react";
import { useState } from "react";

const Search = ({ setCity, city }) => {
  const [localCity, setLocalCity] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCity(localCity);
      // console.log("searched");
      setLocalCity("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={localCity}
        placeholder="Search for cities"
        onChange={(e) => setLocalCity(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-4 py-2 border focus:outline-none focus:none bg-gray-200 rounded-lg w-full"
      />
    </div>
  );
};

export default Search;
