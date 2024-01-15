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

  return (
    <Card className="py-5 w-[350px] rounded-lg shadow">
      <CardHeader className="pb-4 pt-2 px-4 flex-col items-start">
        
        <div className="flex items-center mb-2">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <p className="text-lg uppercase font-bold ml-2">{gameData.game_name}</p>
        </div>
        <small className="text-default-500">Current Looking for {gameData.max_player - gameData.current_player} Player</small>
      </CardHeader>
      <CardBody className="py-2">
        <h5 className="font-bold">Detail</h5>

        
        <div className="mt-2 bottom-2 left-2 flex items-center">
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
        <div className="mt-5 flex justify-between items-center w-full">
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
