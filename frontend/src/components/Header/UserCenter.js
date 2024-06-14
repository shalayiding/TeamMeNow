import React from "react";

import {
  NavbarContent,
  
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Avatar,
  DropdownItem,
} from "@nextui-org/react";

import { handleLogout } from "../../services/api"; 

function UserCenter({data}) {
  const userData = data.data;
  const logoutUser = ()=>{
    handleLogout()
      .then(response => {
        window.location.reload();
      })
      .catch(error => console.error('Error fetching data:', error));
    
  };




  return (
    <NavbarContent as="div" justify="end">
        
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <div className="flex items-center mr-4 space-x-4 text-lg italic font-semibold">
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="green"
          size="md"
          src={userData.dc_avatar_uri}
        />
        <p>{userData.dc_global_name}</p>
        </div>
        
        
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="gap-2 h-14">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{userData.dc_global_name}</p>
        </DropdownItem>
        
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={logoutUser}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </NavbarContent>
  );
}

export default UserCenter;
