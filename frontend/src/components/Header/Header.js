import React, { useState, useEffect, useCallback } from "react";
import logo from "../../assets/Images/teammenow_icon.png";
import home from "../../assets/Images/home.png";
import match from "../../assets/Images/match.png";
import LoginButton from "./LoginButton";
import UserCenter from "./UserCenter";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Image,
} from "@nextui-org/react";


import { fetchUserData } from "../../services/api"; // Update the path as necessary


function Header() {

  const [userDataDetail, setUserDataDetail] = useState(null)
  const isUserDataValid = !!userDataDetail && !!userDataDetail.data;

  const fetchData = useCallback(() => {
    fetchUserData()
      .then(response => {
        setUserDataDetail(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  return (
    <Navbar>

      <NavbarBrand className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" justify="start">
        <Link color="foreground" href="/" className="flex items-center mr-2 text-lg italic font-semibold hover:scale-95 active:scale-95" >
          <Image className="object-contain object-center w-12 h-12" src={logo} />
          <p className="font-bold text-inherit">Team Me Now</p>
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
      {isUserDataValid ? <UserCenter data={userDataDetail}></UserCenter> : (<LoginButton></LoginButton>)}


    </Navbar>
  );
}

export default Header;
