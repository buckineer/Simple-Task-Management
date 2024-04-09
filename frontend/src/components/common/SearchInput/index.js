import React, { useState } from 'react';

export const SearchInput = ({onSearch, value, ...props}) => {
  const [inputValue, setInputValue] = useState(value?value:'');

  const handleKeyDown = async (event) => {    
    if (event.key === 'Enter' && onSearch) onSearch(inputValue)
  };
  return (
    <div className="flex items-center mb-4 sm:mb-2">
      <span className="mr-4">
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.16666 3.33268C5.94499 3.33268 3.33332 5.94435 3.33332 9.16602C3.33332 12.3877 5.94499 14.9993 9.16666 14.9993C12.3883 14.9993 15 12.3877 15 9.16602C15 5.94435 12.3883 3.33268 9.16666 3.33268ZM1.66666 9.16602C1.66666 5.02388 5.02452 1.66602 9.16666 1.66602C13.3088 1.66602 16.6667 5.02388 16.6667 9.16602C16.6667 13.3082 13.3088 16.666 9.16666 16.666C5.02452 16.666 1.66666 13.3082 1.66666 9.16602Z"
            fill="#637381"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2857 13.2851C13.6112 12.9597 14.1388 12.9597 14.4642 13.2851L18.0892 16.9101C18.4147 17.2355 18.4147 17.7632 18.0892 18.0886C17.7638 18.414 17.2362 18.414 16.9107 18.0886L13.2857 14.4636C12.9603 14.1382 12.9603 13.6105 13.2857 13.2851Z"
            fill="#637381"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Type to search..."
        className="w-full text-base text-body-color outline-none"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
export default SearchInput