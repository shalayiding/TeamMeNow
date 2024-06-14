import React, { useEffect, useState } from "react";
import AutoCompleteSearch from "./AutoCompleteSearch";
import { Link, Button } from "@nextui-org/react";
import CreateModal from "./CreateMatchModal";
import { AutocompleteItem } from "@nextui-org/react";

import { getGames } from "../../../services/api";

function MatchSearchForm({ setmatchSearchQuery, setCurrentPage }) {
  const [GameName, getGameName] = useState("");
  // const [TeamSize, getTeamSize] = useState("");
  const handleFindMatchClick = () => {
    setmatchSearchQuery({
      gamename: GameName
      // teamsize: TeamSize,
    });
    setCurrentPage(1);
  };

  const [gameNameSelect, setGameNameSelect] = useState([]);
  useEffect(() => {
    const fetchGameList = async () => {
      try {
        const response = await getGames();
        setGameNameSelect(response.data.games);
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchGameList();
  }, []);

  var items =
    gameNameSelect &&
    gameNameSelect.map((game) => (
      <AutocompleteItem
        key={game.game_name}
        value={game.game_name}
        startContent={
          <img
            alt={game.game_name}
            className="w-20 h-20"
            src={game.cover_url}
          />
        }
      >
        {game.game_name}
      </AutocompleteItem>
    ));

  return (
    <div className="flex items-center justify-center pt-10 pl-10 space-x-4">
      <AutoCompleteSearch
        placeHolder={"Search by game name "}
        label={""}
        autoCompleteItems={items}
        onChange={getGameName}
        isInvalid={false}
      />

      <Button as={Link} color="warning" onClick={handleFindMatchClick}>
        Find Match
      </Button>
      <CreateModal gameNameSelect={gameNameSelect}></CreateModal>
    </div>
  );
}

export default MatchSearchForm;
