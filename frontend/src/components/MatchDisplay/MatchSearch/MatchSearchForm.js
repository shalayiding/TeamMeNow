import React, { useState } from "react";
import AutoCompleteSearch from "./AutoCompleteSearch";
import { Link, Button } from "@nextui-org/react";
import CreateModal from "./CreateMatchModal";

const GameNameSelect = {
  items: [
    { label: "League of Legends", value: "League of Legends" },
    { label: "Apex Legends", value: "Apex Legends" },
    { label: "Valorant", value: "Valorant" },
    { label: "Other", value: "Other" },
  ],
  label: "Game Name",
  
};
const TeamSizeSelect = {
  items: [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ],
  label: "Player Needed",
};



function MatchSearchForm({ setmatchSearchQuery , setCurrentPage}) {


  const [GameName, getGameName] = useState("");
  const [TeamSize, getTeamSize] = useState("");
  const handleFindMatchClick = () => {
    setmatchSearchQuery({
      gamename: GameName,
      teamsize: TeamSize,
    });
    setCurrentPage(1);
  };


  return (
    <div className="flex items-center justify-center pt-10 pl-10 space-x-4">
      <AutoCompleteSearch SearchTagData={GameNameSelect} onChange={getGameName} />
      <AutoCompleteSearch SearchTagData={TeamSizeSelect} onChange={getTeamSize} />

      <Button as={Link} color="warning" onClick={handleFindMatchClick}>
        Find Match
      </Button>
      <CreateModal></CreateModal>
    </div>
  );
}

export default MatchSearchForm;
