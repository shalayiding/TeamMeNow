import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Textarea,
  Image
} from "@nextui-org/react";

function MatchCard({ gameData }) {
  return (
    <Card className="py-5 w-[68%] rounded-lg">

      <CardHeader className="flex-row items-start justify-between pt-2 pb-2 px-7">
        <p className="text-xl font-bold">{gameData.game_name}</p>
      </CardHeader>
      <div className=" opacity-55 absolute left-[calc(50%-4rem)] top-10 z-1 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
        <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20" style={{ clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" }}></div>
      </div>
      <CardBody className="flex-row items-start justify-between pt-2 pb-2 px-7">

        <div className="flex items-start">

          <Image width={100} src={gameData.game_cover} />

          <div className="flex-col ml-2">
            <div className="flex items-center mb-2">
              <Avatar src={gameData.avatar_uri} />
              <span className="ml-2 text-sm">{gameData.host_name}</span>

            </div>
            <span className="block text-default-500">
              Currently looking for <span className="text-lg font-bold text-white">{gameData.player_count}</span> players
            </span>
            <span className="block text-default-500">GameMode : {gameData.game_mode}</span>
            <span className="block text-default-500">Note : {gameData.description}</span>

          </div>

        </div>


        <div className="flex flex-col justify-end h-full">
          <a href={gameData.discord_join_link}>
            <Button className="max-w-[50px] p-[2px]" size="md">
              Join
            </Button>
          </a>
        </div>




      </CardBody>

    </Card >

  );
}

export default MatchCard;
