import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";

const SearchInput = ({ widthSearch = "w-48 md:w-72", value, onChange }) => {
  const [query, setQuery] = useState(value);

  // Sync query state with value prop
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleSearchChange = (e) => {
    if (e.key === "Enter") {
      onChange(query);
    }
  };

  return (
    <div className={widthSearch}>
      <TextInput
        id="search"
        name="search"
        type="search"
        value={query}
        className="mt-1 block w-full"
        onKeyDown={handleSearchChange}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <p className="italic text-xs text-gray-400 my-1">
        {" "}
        Press 'enter' to start search{" "}
      </p>
    </div>
  );
};

export default SearchInput;
