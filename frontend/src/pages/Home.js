import Header from "../components/Header/Header"
import Footer from '../components/Footer/Footer';
import React from 'react';
import HomeRecord from '../components/HomeIntro/HomeRecord';
import HomeIntro from '../components/HomeIntro/HomeIntro';
import HomeUsage from '../components/HomeIntro/HomeUsage';

function Home() {





  return (

    <div className="Home">

      <Header />
      <div className="flex-1 flex flex-col  pb-[150px] min-h-screen pt-4 px-4 lg:px-8 relative">

        <svg className="absolute inset-0 w-full h-full stroke-white/10" aria-hidden="true" maskImage="radial-gradient(100% 100% at top right, white, transparent)">
          <defs>
            <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none"></path>
            </pattern>
          </defs>
          <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
            <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth="0"></path>
          </svg>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"></rect>
        </svg>

        <HomeIntro></HomeIntro>
        <HomeUsage></HomeUsage>
        <HomeRecord></HomeRecord>
      </div>



      <Footer />

    </div>


  );
}

export default Home;