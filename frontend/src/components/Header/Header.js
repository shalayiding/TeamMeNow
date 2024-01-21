import React from "react";
import logo from "./Images/new_logo.png";
import home from "./Images/home.png";
import match from "./Images/match.png";
import discord_icon from "./Images/discord.png";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";

function Header() {

  
  
  return (
    <Navbar>
        
      <NavbarBrand justify="start">
        <Image  className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" src={logo} />

        <p className="font-bold text-inherit">TEAMUP</p>
      </NavbarBrand>
        
      <NavbarContent className="hidden gap-10 sm:flex" justify="center">
        <NavbarItem>
          <NavbarBrand>
            <Link color="foreground" href="#" className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" >
            <Image src={home} className="object-contain object-center w-8 h-8 mr-2 filter invert" />
            Home
            </Link>
          </NavbarBrand>
        </NavbarItem>
        <NavbarItem>
          <NavbarBrand>
            <Link color="foreground" href="#" className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" >
            <Image src={match} className="object-contain object-center w-8 h-8 mr-2 filter invert" />
            Match
            </Link>
          </NavbarBrand>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
       
          <Button as={Link} className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" color="warning" href="#" variant="flat">
          <Image src={discord_icon} className="object-contain object-center w-8 h-8 mr-2 filter invert" />
            Link My Discord
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
