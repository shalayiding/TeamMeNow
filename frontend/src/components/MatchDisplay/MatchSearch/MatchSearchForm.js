import React, { useEffect, useState } from "react";
import AutoCompleteSearch from "./AutoCompleteSearch";
import { Link, Button } from "@nextui-org/react";
import CreateModal from "./CreateMatchModal";
import axios from "axios";
import { AutocompleteItem } from "@nextui-org/react";

// const TeamSizeSelect = {
//   items: [
//     { label: "1", value: "1" },
//     { label: "2", value: "2" },
//     { label: "3", value: "3" },
//     { label: "4", value: "4" },
//     { label: "5", value: "5" },
//   ],
//   label: "Player Needed",
// };

function MatchSearchForm({ setmatchSearchQuery, setCurrentPage }) {
  const [GameName, getGameName] = useState("");
  // const [TeamSize, getTeamSize] = useState("");
  const handleFindMatchClick = () => {
    setmatchSearchQuery({
      gamename: GameName,
      // teamsize: TeamSize,
    });
    setCurrentPage(1);
  };

  const [gameNameSelect, setGameNameSelect] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_BACKEND_API_URL;
  useEffect(() => {
    const fetchGameList = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/v1/matchs/game`);
        setGameNameSelect(response.data.games);
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };
    fetchGameList();
  }, [apiBaseUrl]);

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
      />

      <Button as={Link} color="warning" onClick={handleFindMatchClick}>
        Find Match
      </Button>
      <CreateModal></CreateModal>
    </div>
  );
}

export default MatchSearchForm;
