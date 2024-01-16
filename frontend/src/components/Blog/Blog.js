import React from "react";
import "./Blog.css"; // Assuming you have a CSS file for styling
import MatchCard from '../MatchCard/MatchCard';
function Blog({gameData}) {
  const isGameDataArray = Array.isArray(gameData) && gameData.length > 0;
  console.log(gameData);

  return (
    
    <div className="blog-container ">
      <div className="flex flex-wrap justify-center pt-20 pb-20 gap-5 ">
      {isGameDataArray && gameData.map((singleGameData, index) => (
          <MatchCard gameData={singleGameData} />
        ))}
      

    </div>
      
    </div>
  );
}

export default Blog;
