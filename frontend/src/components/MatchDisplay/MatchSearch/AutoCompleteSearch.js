import React from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

function AutoCompleteSearch({SearchTagData,onChange}) {

  return (
    <Autocomplete
      label={SearchTagData.label}
      placeholder= {SearchTagData.placeholder}
      className="max-w-xs"
      onChange={(e) => onChange(e.target.value)}
      size="sm"
    >
      {(SearchTagData.items).map((Item) => (
        <AutocompleteItem key={Item.value} value={Item.value}>
          {Item.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
    
  );
}

export default AutoCompleteSearch;
