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
        
      <NavbarBrand  className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" justify="start">
      <Link color="foreground" href="/" className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" >
        <Image  className="object-contain object-center w-12 h-12" src={logo} />
        <p className="font-bold text-inherit">TEAMUP</p>
        </Link>
      </NavbarBrand>
        
      <NavbarContent className="hidden gap-10 sm:flex" justify="center">
        <NavbarItem>
          <NavbarBrand>
            <Link color="foreground" href="/" className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" >
            <Image src={home} className="object-contain object-center w-8 h-8 mr-2 filter invert" />
            Home
            </Link>
          </NavbarBrand>
        </NavbarItem>
        <NavbarItem>
          <NavbarBrand>
            <Link color="foreground" href="/match" className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" >
            <Image src={match} className="object-contain object-center w-8 h-8 mr-2 filter invert" />
            Match
            </Link>
          </NavbarBrand>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
       
          <Button as={Link} className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" color="warning" 
          href="https://discord.com/api/oauth2/authorize?client_id=1195266447006502942&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%2Fv1%2Flink%2Fdiscord&scope=identify+guilds+guilds.join+email+connections" variant="flat">
          <Image src={discord_icon} className="object-contain object-center w-8 h-8 mr-2 filter invert" />
            Link My Discord
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
