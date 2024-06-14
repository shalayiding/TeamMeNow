import React from "react";
import discord_icon from "../../assets/Images/discord.png";

import {
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";

function LoginButton() {

  return (
    <NavbarContent as="div" justify="end">
      <NavbarItem>
        <Button as={Link} className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" color="warning"
          href="https://discord.com/oauth2/authorize?client_id=1195266447006502942&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2Fv1%2Flink%2Fdiscord&scope=identify+guilds+email+guilds.join+connections" variant="flat">
          <Image src={discord_icon} className="object-contain object-center w-8 h-8 mr-2 filter invert" />
          Link My Discord
        </Button>
      </NavbarItem>
    </NavbarContent>
  );
}

export default LoginButton;
