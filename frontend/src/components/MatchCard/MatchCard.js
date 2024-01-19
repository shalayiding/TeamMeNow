import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Button,
  Textarea,
} from "@nextui-org/react";

function MatchCard({gameData}) {

  console.log(gameData);

  return (
    <Card className="py-5 w-[350px] rounded-lg shadow">
      <CardHeader className="flex-col items-start px-4 pt-2 pb-4">
        
        <div className="flex items-center mb-2">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <p className="ml-2 text-lg font-bold uppercase">{gameData.game_name}</p>
        </div>
        <small className="text-default-500">Current Looking for {gameData.max_player - gameData.current_player} Player</small>
      </CardHeader>
      <CardBody className="py-2">
        <h5 className="font-bold">Detail</h5>

        
        <div className="flex items-center mt-2 bottom-2 left-2">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <span className="ml-2 text-sm">{gameData.host_name}</span>
        </div>
        <Textarea
          isReadOnly
          label="Description"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter your description"
          defaultValue={gameData.description}
          className="max-w-xs"
        />
        <div className="flex items-center justify-between w-full mt-5">
          {" "}
          <Button className="max-w-[50px] p-[2px]" size="md">
            Join
          </Button>
          <div className="flex items-center">
            <span>{gameData.current_player}/{gameData.max_player}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default MatchCard;
