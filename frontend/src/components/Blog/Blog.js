import React from "react";
import "./Blog.css"; // Assuming you have a CSS file for styling
import MatchCard from '../MatchCard/MatchCard';
function Blog({gameData}) {
  
  const isGameDataArray = gameData && gameData.status === "success";
  // console.log(gameData.status)
  // console.log(gameData.matches);
  
  console.log(gameData);
  return (
    
    <div className="blog-container ">
      <div className="flex flex-wrap justify-center gap-5 pt-20 pb-20 ">
      {isGameDataArray && (gameData.matches).map((singleGameData, index) => (
          <MatchCard gameData={singleGameData} />
        ))}
      

    </div>
      
    </div>
  );
}

export default Blog;
