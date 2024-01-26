
import React from 'react';
import HomeRecord from './HomeRecord';
import HomeIntro from './HomeIntro';

function HomeMain() {





  return (

    <div className="flex-1 flex flex-col  pb-[150px] min-h-screen pt-4 px-4 lg:px-8">

      
        <HomeIntro></HomeIntro>
        <HomeRecord></HomeRecord>
    </div>


  );
}

export default HomeMain;



