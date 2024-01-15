import React from "react";
import "./Header.css";
import logo from "./Images/new_logo.png";
import lol_icon from "./Images/lol.png";
import apex_icon from "./Images/apex.png";
import valorant_icon from "./Images/valorant.png";
import others_icon from "./Images/other.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";

function Header({fetchData}) {

  
  
  return (
    <Navbar>
        
        <NavbarBrand>
        <Image width={45} src={logo} />

        <p className="font-bold text-inherit">TEAMUP</p>
      </NavbarBrand>
        
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem>
          <NavbarBrand>
            <Link color="foreground" href="#" onClick={() => fetchData('League_of_Legends')}>
            <Image src={lol_icon} className="invert-image uniform-icon-size" />
            League of Legends
            </Link>
          </NavbarBrand>
        </NavbarItem>
        <NavbarItem>
          <NavbarBrand>
            <Link color="foreground" href="#" onClick={() => fetchData('Apex')}>
            <Image src={apex_icon} className="invert-image uniform-icon-size" />
            Apex
            </Link>
          </NavbarBrand>
        </NavbarItem>
        <NavbarItem>
          <NavbarBrand>
            <Link color="foreground" href="#" onClick={() => fetchData('Valorant')}>
            <Image src={valorant_icon} className="uniform-icon-size" />
            Valorant
            </Link>
          </NavbarBrand>
        </NavbarItem>
        <NavbarItem>
          <NavbarBrand>
            <Link color="foreground"  href="#" onClick={() => fetchData('Other_games')}>
            <Image src={others_icon} className="invert-image uniform-icon-size" />
            Other Games
            </Link>
          </NavbarBrand>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Link My Discord
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
