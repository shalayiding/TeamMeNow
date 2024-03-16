
import React from 'react';
import logo from "../../assets/Images/teammenow_icon.png"
import appScreenShot from "../../assets/Images/home_intro.png"
function HomeIntro() {





  return (

    <div className="relative pb-16 overflow-hidden isolate bg-surface-primary">
      <svg className="absolute inset-0 w-full h-full -z-10 stroke-white/10" aria-hidden="true" maskImage="radial-gradient(100% 100% at top right, white, transparent)">
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
      <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
        <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20" style={{ clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" }}></div>
      </div>
      <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:flex lg:px-8 lg:py-20">
        <div className="flex-shrink-0 max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:pt-8">
          <img className="h-11" src={logo} alt="TeamUpLogo" />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a className="inline-flex space-x-6" href="/">
              <span className="px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 rounded-full bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/20">What's new</span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>AI mathcing searching, creating match with LLMs</span>

              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">Team Me Now</h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">Find Your Perfect Match on Team Me Now: Connect, Play Together!</p>
          <div className="flex items-center mt-10 gap-x-6">
            <a className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400" href="/match">Get started</a>
            <a className="text-sm font-semibold leading-6 text-white" href="/match">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
            <img src={appScreenShot} alt="App screenshots" className="w-[36rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10" />
          </div>
        </div>
      </div>
    </div>



  );
}

export default HomeIntro;