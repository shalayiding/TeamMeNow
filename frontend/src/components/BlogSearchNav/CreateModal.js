import React, { useState,useEffect } from "react";
import { Link, Button, Textarea } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  SelectItem,
  Select,
} from "@nextui-org/react";
import axios from 'axios';

const GameNameSelect = {
    items: [
      { label: "League of Legends", value: "League of Legends" },
      { label: "Apex Legends", value: "Apex Legends" },
      { label: "Valorant", value: "Valorant" },
      { label: "Other", value: "Other" },
    ],
    label: "Game Name",
    
  };
  const GameModeSelect = {
    items: [
      { label: "Rank", value: "rank" },
      { label: "ARAM", value: "ARAM" },
      { label: "Normal", value: "Normal" },
    ],
    label: "Game Mode",
    
  };
  const TeamSizeSelect = {
    items: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
    ],
    label: "Player Needed",
  };
  

function CreateModal(){

    const [modalGameName,setModalGameName] = useState("")
    const [modalGameMode,setModalGameMode] = useState("")
    const [modalTeamSize,setModalTeamSize] = useState("")
    const [modalDescription,setModalDescription] = useState("")
    
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    // reseting values when it open
    useEffect(() => {
        if (isOpen) {
          setModalGameName("");
          setModalGameMode("");
          setModalTeamSize("");
          setModalDescription("");
        }
    }, [isOpen]);
    

    const apiBaseUrl = process.env.REACT_APP_BACKEND_API_URL;

    function sendDataToServer(data) {
        axios
          .post(`${apiBaseUrl}/v1/matchs`, data)
          .then((response) => {
            console.log("Success:", response.data);
            
          })
          .catch((error) => console.error("Error:", error));
      }

    const handleCreate = async() =>{
         // make sure when create the submission is not empty
        if (!modalGameName || !modalGameMode || !modalTeamSize) {
            alert('All fields are required.');
            return;
        }

        try {
            
            const userinfo = await axios.get(`${apiBaseUrl}/v1/user/me`,{
                withCredentials:true
            });
            console.log(userinfo.data.data);
            
            // If successful, construct your payload
            const payload = {
            // Populate your payload based on your requirements
            "host_name": userinfo.data.data.dc_global_name,
            "host_id": userinfo.data.data.dc_id,
            "game_name": modalGameName,
            "game_mode":modalGameMode,
            "max_player":5,
            "current_player":0,
            "player_count":modalTeamSize,
            "description":modalDescription,
            "avatar_uri":userinfo.data.data.dc_avatar_uri,
            "expire_time":6300
            // other fields if necessary
            };
            console.log(payload);
            // Then perform a POST request to create the match
            // console.log(apiBaseUrl);
            // const response = await axios.post(`${apiBaseUrl}/v1/matches`, payload);
            
            sendDataToServer(payload);


            // console.log('Match created:', response.data);
            // Handle success (close modal, show message, etc.)
        } catch (error) {
            console.error('Error:', error);
            // Handle error (show error message, etc.)
        }

    };


    

    return (
        <div>
          <Button as={Link} color="warning" href="#" onPress={onOpen}>
            Create Match
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Create Match
                  </ModalHeader>
    
                  <ModalBody>
                    <Select
                      label={GameNameSelect.label}
                      placeholder={GameNameSelect.placeholder}
                      className="max-w-xs"
                      isRequired
                      variant="underlined"
                      onChange={(e) => setModalGameName(e.target.value)}
                    >
                      {GameNameSelect.items.map((Item) => (
                        <SelectItem key={Item.value} value={Item.value}>
                          {Item.label}
                        </SelectItem>
                      ))}
                    </Select>
    
                    <Select
                      label={GameModeSelect.label}
                      placeholder={GameModeSelect.placeholder}
                      className="max-w-xs"
                      isRequired
                      variant="underlined"
                      onChange={(e) => setModalGameMode(e.target.value)}
                    >
                      {GameModeSelect.items.map((Item) => (
                        <SelectItem key={Item.value} value={Item.value}>
                          {Item.label}
                        </SelectItem>
                      ))}
                    </Select>
    
                    <Select
                      label={TeamSizeSelect.label}
                      placeholder={TeamSizeSelect.placeholder}
                      className="max-w-xs"
                      isRequired
                      variant="underlined"
                      onChange={(e) => setModalTeamSize(e.target.value)}
                    >
                      {TeamSizeSelect.items.map((Item) => (
                        <SelectItem key={Item.value} value={Item.value}>
                          {Item.label}
                        </SelectItem>
                      ))}
                    </Select>
    
                    <Textarea
                      label="Description"
                      variant="bordered"
                      placeholder="Enter your description"
                      disableAnimation
                      disableAutosize
                      classNames={{
                        base: "max-w-xs",
                        input: "resize-y min-h-[40px]",
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

