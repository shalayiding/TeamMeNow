import React, { useState, useEffect } from "react";
import AutoCompleteSearch from "./AutoCompleteSearch";

import { Link, Button, Textarea, AutocompleteItem } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Slider,
} from "@nextui-org/react";

import { createMatch, fetchUserData } from "../../../services/api";
import ErrorModal from "../../ErrorModal/ErrorModal";


function CreateModal({ gameNameSelect }) {
  const [modalGameName, setModalGameName] = useState("");
  const [modalGameCover,setModalGameCover] = useState("");
  const [modalGameMode, setModalGameMode] = useState("");
  const [modalTeamSize, setModalTeamSize] = useState("2");
  const [modalDescription, setModalDescription] = useState("");
  const [modalDiscordInvLink,setmodalDiscordInvLink] = useState("");
  
  const [modalValidGameName,setmodalValidGameName] = useState(false);
  const [modalValidGameMode,setmodalValidGameMode] = useState(false);
  const [modalValidDiscordInvLink,setmodalValidDiscordInvLink] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  
  // send match create request to the server
  function sendDataToServer(data) {
    createMatch()
      .then((response) => {
        ErrorModal("You got message",response);
      })
      .catch((error) => 
      ErrorModal("You got error message",error));
  }

  useEffect(() => {
    if (isOpen) {
      setmodalValidGameName(false);
      setmodalValidGameMode(false);
      setmodalValidDiscordInvLink(false);
      setModalGameCover("");
    }
  }, [isOpen]);





  //activate when the create botton in modal is clicked
  const handleCreate = async () => {
    // make sure when create the submission is not empty
    if (!modalGameName || !modalGameMode || !modalTeamSize || !modalDiscordInvLink) {
      setmodalValidGameName(!modalGameName);
      setmodalValidGameMode(!modalGameMode);
      setmodalValidDiscordInvLink(!modalDiscordInvLink);
      return;
    }

    try {
      const userinfo = await fetchUserData();

      // If successful, construct your payload
      const payload = {
        // Populate your payload based on your requirements
        host_name: userinfo.data.data.dc_global_name,
        host_id: userinfo.data.data.dc_id,
        game_name: modalGameName,
        game_mode: modalGameMode,
        player_count: modalTeamSize,
        description: modalDescription,
        avatar_uri: userinfo.data.data.dc_avatar_uri,
        expire_time: 6300,
        discord_join_link: modalDiscordInvLink,
        // other fields if necessary
      };
      console.log(payload);

      sendDataToServer(payload);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //get image cover image using game name and change the variable modalgamename
  const handleGameNameSelect = (selectedGameName) => {
    setModalGameName(selectedGameName);
    // Find the cover_url corresponding to the selected game name
    const selectedGame = gameNameSelect.find(game => game.game_name === selectedGameName);
    if (selectedGame) {
      setModalGameCover(selectedGame.cover_url);
    }
  };



  var gameNameItems =
    gameNameSelect &&
    gameNameSelect.map((game) => (
      <AutocompleteItem key={game.game_name} value={game.game_name}>
        {game.game_name}
      </AutocompleteItem>
    ));

  return (
    <div>
      <Button as={Link} color="warning" onPress={onOpen}>
        Create Match
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-full max-w-lg">
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Match Details
              </ModalHeader>

              <ModalBody className="flex gap-4">
              {modalGameCover!=="" && <img
                alt={modalGameName}
                className="w-20 h-35"
                src={modalGameCover}
              />}
                <AutoCompleteSearch  
                  placeHolder={"Search by game name "}
                  label={""}
                  autoCompleteItems={gameNameItems}
                  onChange={handleGameNameSelect}
                  isInvalid={modalValidGameName}
                />

                <Input
                  isRequired
                  label="Game Mode"
                  variant="bordered"
                  placeholder="Enter Game Mode"
                  defaultValue={modalGameMode}
                  onValueChange={setModalGameMode}
                  className="max-w-xs"
                  isInvalid={modalValidGameMode}
                />
                
                <Slider   
                  size="sm"
                  step={1}
                  color="foreground"
                  label="Required Number of Players:"
                  showSteps={true} 
                  maxValue={10} 
                  minValue={1} 
                  defaultValue={modalTeamSize}
                  className="max-w-xs"
                  onChange={setModalTeamSize} 
                />



                <Input
                  isRequired
                  label="Discord Invitation Link"
                  variant="bordered"
                  placeholder="Enter Invitation Link"
                  defaultValue={modalDiscordInvLink}
                  onValueChange={setmodalDiscordInvLink}
                  className="max-w-lg"
                  isInvalid={modalValidDiscordInvLink}
                />



                <Textarea
                  label="Description"
                  variant="bordered"
                  placeholder="Enter your description"
                  disableAnimation
                  disableAutosize
                  classNames={{
                    base: "max-w-xs",
                    input: "resize-y",
                  }}
                  onChange={(e) => setModalDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={handleCreate}>
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
export default CreateModal;
