import React from 'react';
import WebLogin from "../../assets/HomeUsageImages/web_login.png";
import CreateDM from "../../assets/HomeUsageImages/DM_invite.png";
import DmInvLink from "../../assets/HomeUsageImages/invtite_link.png";
import SVInvLink from "../../assets/HomeUsageImages/server_invite.png";
import WebCreateMatch from "../../assets/HomeUsageImages/web_create_match.png";
import logo from "../../assets/Images/teammenow_icon.png"

function HomeUsage() {
    return (

        <div className="mx-auto max-w-7xl" id="HomeUsage">
            <img className="h-11" src={logo} alt="TeamMeNowLogo" />
            <div className="absolute left-[calc(50%-4rem)] top-10 z-1 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
                <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20" style={{ clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" }}></div>
            </div>
            <div className="flex justify-center space-x-8">
                <div className="p-4 text-center rounded-lg">
                    <p className='text-lg leading-8 text-gray-300'>Step 1</p>
                    <p className='text-lg leading-8 text-gray-300'>Log in with your Discord account.</p>
                    <img src={WebLogin} alt="Step 1" className="object-scale-down mx-auto mt-4" />
                </div>
                <div className="p-4 text-center rounded-lg">
                    <p className='text-lg leading-8 text-gray-300'>Step 2</p>
                    <p className='text-lg leading-8 text-gray-300'>Create a direct message or server on the Discord app.</p>
                    <img src={CreateDM} alt="Step 2" className="object-scale-down h-40 mx-auto mt-4" />
                </div>
                <div className="p-4 text-center rounded-lg">
                    <p className='text-lg leading-8 text-gray-300'>Step 3</p>
                    <p className='text-lg leading-8 text-gray-300'>Copy your Discord server invitation link.</p>
                    <img src={SVInvLink} alt="Step 3" className="object-scale-down mx-auto mt-4" />
                    <img src={DmInvLink} alt="Step 3" className="object-scale-down mx-auto mt-4 h-30" />
                </div>
                <div className="p-4 text-center rounded-lg">
                    <p className='text-lg leading-8 text-gray-300'>Step 4</p>
                    <p className='text-lg leading-8 text-gray-300'>Create a match on the Match page in TeamMeNow.</p>
                    <img src={WebCreateMatch} alt="Step 4" className="object-scale-down mx-auto mt-4" />
                </div>
            </div>
        </div>


    );
}

export default HomeUsage;