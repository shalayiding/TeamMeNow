import React, { useEffect, useState, useCallback } from "react";
import { visitorCollect } from "../../services/api";

function HomeRecord() {
  const [serverResponse, setServerResponse] = useState(null);
  const getUserInfo = useCallback(() => {
    const userInfo = {
      device: navigator.userAgent,
      referrer: document.referrer,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
    };
    return userInfo;
  }, []); // getUserInfo doesn't depend on external variables, so the dependency array is empty


  const sendDataToServer = useCallback((data) => {
    visitorCollect(data)
      .then(response => {
        setServerResponse(response.data);
      })
      .catch(error => console.error("Error:", error));
  }, []); // apiBaseUrl is used as a dependency

  useEffect(() => {
    const userInfo = getUserInfo();
    sendDataToServer(userInfo);
  }, [sendDataToServer, getUserInfo]);

  return (
    <div className="mb-20 rounded text-content-base">


      <div className="relative py-24 overflow-hidden isolate bg-surface-primary sm:py-32">
        <div className="absolute left-[calc(50%-4rem)] top-10 z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-[calc(50%-20rem)] lg:top-[calc(50%-25rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
          <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20" style={{ clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" }}></div>
        </div>
        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div className="p-6 bg-black rounded-lg">
            <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl">
              <h2 className="text-base font-semibold leading-8 text-indigo-400">
                Team Me Now track record
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Developed by player for player.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Creat match with discord bot or website, find match base on your game.
              </p>
            </div>

            <dl className="grid max-w-2xl grid-cols-1 mx-auto mt-16 text-white gap-x-8 gap-y-10 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              <div className="flex flex-col pl-6 border-l gap-y-3 border-white/10">
                <dt className="text-sm leading-6">TeamUp User</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  {serverResponse &&
                    serverResponse.data &&
                    serverResponse.data.user_count}
                </dd>
              </div>

              <div className="flex flex-col pl-6 border-l gap-y-3 border-white/10">
                <dt className="text-sm leading-6">Total Match</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  {serverResponse &&
                    serverResponse.data &&
                    serverResponse.data.match_count}
                </dd>
              </div>
              <div className="flex flex-col pl-6 border-l gap-y-3 border-white/10">
                <dt className="text-sm leading-6">Website Visit</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  {serverResponse &&
                    serverResponse.data &&
                    serverResponse.data.visitor_count}
                </dd>
              </div>

              <div className="flex flex-col pl-6 border-l gap-y-3 border-white/10">
                <dt className="text-sm leading-6">Discord Link</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  {serverResponse &&
                    serverResponse.data &&
                    serverResponse.data.bot_count}
                </dd>
              </div>
            </dl>
          </div>

        </div>
      </div>

    </div>
  );
}

export default HomeRecord;
