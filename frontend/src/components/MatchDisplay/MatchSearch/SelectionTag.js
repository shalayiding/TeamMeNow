import React from "react";
import {Select, SelectItem} from "@nextui-org/react";


function SearchTag({SearchTagData,onChange}) {

  return (
    <Select
      label={SearchTagData.label}
      placeholder= {SearchTagData.placeholder}
      className="max-w-xs"
      onChange={(e) => onChange(e.target.value)}
      size="sm"
    >
      {(SearchTagData.items).map((Item) => (
        <SelectItem key={Item.value} value={Item.value}>
          {Item.label}
        </SelectItem>
      ))}
    </Select>
    
  );
}

export default SearchTag;
