import { React, useState, useEffect,useCallback} from "react";
import MatchCard from "../MatchCard/MatchCard";
import MatchSearchForm from "./MatchSearch/MatchSearchForm";
import MatchPagination from "./MatchSearch/MatchPagination";

import axios from "axios";

function MatchDisplay() {
  // set the current page for the match pagination defualt value 1
  const [currentPage, setCurrentPage] = useState(1);
  const [TotalPage,setTotalPage] = useState(1);
  //extract all the data of the maching card
  const [gameDataDetail, getGameData] = useState(null);

  // get the searching query for the match user wants
  const [matchSearchQuery,setmatchSearchQuery] = useState({})
  
  const apiBaseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const MaxItem = 10;

  const fetchGameData = useCallback(() => {
    let queryParams = [];
    if (matchSearchQuery && matchSearchQuery.gamename) {
      queryParams.push(`gamename=${encodeURIComponent(matchSearchQuery.gamename)}`);
    }
    if (matchSearchQuery && matchSearchQuery.gamemode) {
      queryParams.push(`gamemode=${encodeURIComponent(matchSearchQuery.gamemode)}`);
    }
    if (matchSearchQuery && matchSearchQuery.teamsize) {
      queryParams.push(`teamsize=${encodeURIComponent(matchSearchQuery.teamsize)}`);
    }
    queryParams.push(`offset=${encodeURIComponent((currentPage-1)*MaxItem)}`)
    queryParams.push(`limit=${encodeURIComponent(MaxItem)}`)

    const queryString = queryParams.join("&");
    axios
      .get(`${apiBaseUrl}/v1/matchs?${queryString}`)
      .then((response) => {
        getGameData(response.data);
        setTotalPage(response.data.totalPage);
        
      })
      .catch((error) => console.error("Error fetching data:", error));
      
  },[currentPage, matchSearchQuery, apiBaseUrl]);

  // fetchGamedata when the compoennt is render
  useEffect(() => {
    fetchGameData(matchSearchQuery);
  }, [fetchGameData, matchSearchQuery]); //

  return (
    <div className="relative min-h-screen pb-16 overflow-hidden isolate bg-surface-primary">
      <svg
        className="absolute inset-0 w-full h-full -z-10 stroke-white/10 "
        aria-hidden="true"
        maskimage="radial-gradient(100% 100% at top right, white, transparent)"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          ></path>
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        ></rect>
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        ></div>
      </div>

      <div className="gap-5 pt-3 pb-10">
        <MatchSearchForm setmatchSearchQuery = { setmatchSearchQuery} setCurrentPage={setCurrentPage}/>

        <div className="flex flex-wrap justify-center gap-5 pt-10 pb-20 pl-7 pr-7">
          {gameDataDetail &&
            gameDataDetail.matches.map((singleGameData) => (
              <MatchCard
                gameData={singleGameData}
                key={singleGameData._id.$oid}
              />
            ))}
        </div>

        <MatchPagination
          totalPage={TotalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></MatchPagination>
      </div>
    </div>
  );
}

export default MatchDisplay;
