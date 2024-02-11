import React, { useState } from "react";
import SearchTag from "./SelectionTag";
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
const GameModeSelect = {
  items: [
    { label: "Rank", value: "rank" },
    { label: "ARAM", value: "ARAM" },
    { label: "Normal", value: "Normal" },
  ],
  label: "Game Mode",
  
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
  const [GameMode, getGameMode] = useState("");
  const [TeamSize, getTeamSize] = useState("");
  const handleFindMatchClick = () => {
    setmatchSearchQuery({
      gamename: GameName,
      gamemode: GameMode,
      teamsize: TeamSize,
    });
    setCurrentPage(1);
  };


  return (
    <div className="flex items-center justify-center pt-10 pl-10 space-x-4">
      <SearchTag SearchTagData={GameNameSelect} onChange={getGameName} />
      <SearchTag SearchTagData={GameModeSelect} onChange={getGameMode} />
      <SearchTag SearchTagData={TeamSizeSelect} onChange={getTeamSize} />

      <Button as={Link} color="warning" onClick={handleFindMatchClick}>
        Find Match
      </Button>
      <CreateModal></CreateModal>
    </div>
  );
}

export default MatchSearchForm;
