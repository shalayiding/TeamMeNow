import Header from "../components/Header/Header"
import Footer from '../components/Footer/Footer';
import React from 'react';
import HomeMain from "../components/HomeIntro/HomeMain";

function Home() {





  return (

    <div className="Home">
      <Header/>
          <HomeMain></HomeMain>
      <Footer />
    </div>


  );
}

export default Home;