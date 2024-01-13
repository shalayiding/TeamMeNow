

import './Header.css';
import logo from './Images/logo.png';
import lol_icon from './Images/lol.jpg';
import discord_icon from './Images/discord.png';
import apex_icon from './Images/apex.png';
import valorant_icon from './Images/valorant.webp';
import others_icon from './Images/other.png'



function Header() {
    return (
      <div className="div">
        <span className="span">
          <img
            loading="lazy"
            src={logo}
            className="img"
          />
          <div className="div-2">TEAMUP</div>
        </span>
        <div className="div-3">
          <span className="span-2">
            <img
              loading="lazy"
              src = {lol_icon}
              className="img-2"
            />
            <div className="div-4">League of Legends</div>
          </span>
          <span className="span-3">
            <img
              loading="lazy"
              src = {apex_icon}
              className="img-3"
            />
            <div className="div-5">Apex</div>
          </span>
          <div className="div-6">
            <img
              loading="lazy"
              src = {others_icon}
              className="img-4"
            />
          </div>
          <span className="span-4">
            <img
              loading="lazy"
              srcSet="..."
              className="img-5"
            />
            <div className="div-7">Others</div>
          </span>
          <span className="span-5">
            <img
              loading="lazy"
              srcSet="..."
              className="img-6"
            />
            <div className="div-8">Link My Discord</div>
          </span>
        </div>
      </div>);

}

export default Header;
