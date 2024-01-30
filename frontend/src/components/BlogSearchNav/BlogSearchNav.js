import React,{useState} from "react";
import SearchTag from "./SearchTag/SearchTag";
import {
  Link,
  Button,
  Textarea
} from "@nextui-org/react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,Input} from "@nextui-org/react";



function BlogSearchNav({fetchGameData}) {

  const GameNameSelect = {
    items:[{ label: "League of Legends", value: "League of Legends" },
    { label: "Apex Legends", value: "Apex Legends"},{label: "Valorant", value: "Valorant" },{label: "Other", value: "Other" }],
    label:"Game Name",
    placeholder:"All"
  }
  const GameModeSelect = {
    items:[{ label: "Rank", value: "rank" },
    { label: "ARAM", value: "ARAM"},{label: "Normal", value: "Normal" }],
    label:"Game Mode",
    placeholder:"None"
  }
  const TeamSizeSelect = {
    items:[{ label: "1", value: "1" },
    { label: "2", value: "2"},{label: "3", value: "3" },
    {label: "4", value: "4" },{label: "5", value: "5" }],
    label:"Player Needed",
    placeholder:"1"
  }

  const [GameName, getGameName] = useState("");
  const [GameMode, getGameMode] = useState("");
  const [TeamSize, getTeamSize] = useState("");
  const handleFindMatchClick = () => {
    fetchGameData({ gamename: GameName, gamemode: GameMode, teamsize: TeamSize });
  };

  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  return (
    <div className="flex items-center justify-center pt-10 pl-10 space-x-4">
    <SearchTag SearchTagData={GameNameSelect} onChange = {getGameName}/> 
    <SearchTag SearchTagData={GameModeSelect} onChange = {getGameMode}/>   
    <SearchTag SearchTagData={TeamSizeSelect} onChange = {getTeamSize}/> 

    <Button as={Link} color="warning" href="#" onClick={handleFindMatchClick}>
      Find Match
    </Button>
    <Button as={Link} color = "warning" href="#" onPress={onOpen}>
      Create Match
    </Button>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Match</ModalHeader>
              
              <ModalBody>
              <Input isRequired type="email" variant="bordered" label="Email" />
              <Input isRequired type="email" variant="bordered" label="Email" />
              
              <Textarea
                isRequired
                label="Description"
                variant="bordered"
                placeholder="Enter your description"
                disableAnimation
                disableAutosize
                classNames={{
                  base: "max-w-xs",
                  input: "resize-y min-h-[40px]",
                }}
              />


              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>






    </div>
    

  );
}

export default BlogSearchNav;
