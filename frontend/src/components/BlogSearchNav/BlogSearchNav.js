import React,{useState} from "react";
import SearchTag from "./SearchTag/SearchTag";
import {
  Link,
  Button
} from "@nextui-org/react";


function BlogSearchNav({fetchGameData}) {

  const GameNameSelect = {
    items:[{ label: "League of Legends", value: "League of Legends" },
    { label: "Apex", value: "Apex"},{label: "Valorent", value: "Valorent" },{label: "Other", value: "Other" }],
    label:"Game Name",
    placeholder:"All"
  }
  const GameModeSelect = {
    items:[{ label: "Rank", value: "rank" },
    { label: "ARAM", value: "ARAM"},{label: "Normal", value: "Normal" }],
    label:"Game Mode",
    placeholder:"None"
  }
  const TeamSizeSelect = {
    items:[{ label: "1", value: "1" },
    { label: "2", value: "2"},{label: "3", value: "3" },
    {label: "4", value: "4" },{label: "5", value: "5" }],
    label:"Player Needed",
    placeholder:"1"
  }

  const [GameName, getGameName] = useState("");
  const [GameMode, getGameMode] = useState("");
  const [TeamSize, getTeamSize] = useState("");
  const handleFindMatchClick = () => {
    fetchGameData({ gamename: GameName, gamemode: GameMode, teamsize: TeamSize });
  };

  return (
    <div className="flex items-center justify-center pt-10 pl-10 space-x-4">
    <SearchTag SearchTagData={GameNameSelect} onChange = {getGameName}/> 
    <SearchTag SearchTagData={GameModeSelect} onChange = {getGameMode}/>   
    <SearchTag SearchTagData={TeamSizeSelect} onChange = {getTeamSize}/> 

    <Button as={Link} color="warning" href="#" onClick={handleFindMatchClick}>
      Find Match
    </Button>
    
    </div>
    

  );
}

export default BlogSearchNav;
