import {React,useState} from "react";
import "./Blog.css"; // Assuming you have a CSS file for styling
import MatchCard from '../MatchCard/MatchCard';
import BlogSearchNav from "../BlogSearchNav/BlogSearchNav";

function Blog() {
 
  
  const [gameDataDetail,getGameData] = useState(null)
  const isGameDataArray = gameDataDetail && gameDataDetail.status === "success" ;


  const fetchGameData = (MatchQuery) => {
    fetch(`http://localhost:5000/v1/matchs?gamename=${MatchQuery.gamename}&${MatchQuery.gamemode}&${MatchQuery.teamsize}`)
      .then(response => response.json())
      .then(data => {
        getGameData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  return (
    
    <div className="blog-container ">
      <BlogSearchNav fetchGameData = {fetchGameData} />
      <div className="flex flex-wrap justify-center gap-5 pt-20 pb-20 ">
      {isGameDataArray && JSON.parse(gameDataDetail.matches).map(singleGameData => (
        
          <MatchCard gameData={singleGameData} key= {singleGameData._id.$oid} />
        ))}
      

    </div>
      
    </div>
  );
}

export default Blog;
