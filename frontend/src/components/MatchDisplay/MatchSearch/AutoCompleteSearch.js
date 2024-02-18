import React from "react";
import { Autocomplete } from "@nextui-org/react";

function AutoCompleteSearch({
  autoCompleteItems,
  placeHolder,
  label,
  onChange,
}) {
  return (
    <Autocomplete
      aria-label="Search for a game"
      label={label}
      placeholder={placeHolder}
      classNames={{
        base: "max-w-md",
        listboxWrapper: "max-h-[450px]",
        selectorButton: "text-default-500",
      }}
      onChange={(e) => onChange(e.target.value)}
      size="lg"
      variant="bordered"
      startContent={
        <svg
          aria-hidden="true"
          fill="none"
          focusable="false"
          height="20"
          role="presentation"
          viewBox="0 0 24 24"
          width="20"
          className="text-default-400"
          strokeWidth="2.5"
        >
          <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          ></path>
          <path
            d="M22 22L20 20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          ></path>
        </svg>
      }
    >
      ${autoCompleteItems}
    </Autocomplete>
    
  );
}

export default AutoCompleteSearch;
