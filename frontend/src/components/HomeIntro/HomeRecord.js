import React, { useEffect, useState,useCallback  } from "react";
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
        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div
            className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
            aria-hidden="true"
          >
            <div
              className="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            ></div>
          </div>
          <div className="p-6 bg-black rounded-lg ">
            <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl">
              <h2 className="text-base font-semibold leading-8 text-indigo-400">
                TeamMeUp track record
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Developed by player for player.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Creat match with discord bot or website, get match, it is that
                easy.
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
