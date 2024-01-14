import React from 'react';
import './Header.css';
import logo from './Images/logo.png';
import lol_icon from './Images/lol.jpg';
import discord_icon from './Images/discord.png';
import apex_icon from './Images/apex.png';
import valorant_icon from './Images/valorant.png';
import others_icon from './Images/other.png';

function Header() {


    // create urls bank for the tags 
    const end_url = "http://localhost:80"
    const urls_bank = {
        'League of Legends' :  end_url+"/public/game/LeagueofLegends"
    }

    async function fetchData(name) {
        const url = urls_bank[name];
        if (!url) {
            console.error("URL not found for name:", name);
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Fetching error:', error);
        }
    }

    return (
        <div className="App_header">
            <div className = "logo-container" onClick={() => fetchData('TeamUp Logo')}>
                <img src={logo} alt="Logo" className="logo" />
                <p> TEAMUP</p>
            </div>
                
            <ul className="icons-container">
                <li className="icon-box" onClick={() => fetchData('League of Legends')}>
                    <img src={lol_icon} alt="LoL" />
                    <p>League of Legends</p>
                </li>
                <li className="icon-box" onClick={() => fetchData('Apex')}>
                    <img src={apex_icon} alt="Apex" />
                    <p>Apex</p>
                </li>
                <li className="icon-box" onClick={() => fetchData('Valorant')}>
                    <img src={valorant_icon} alt="Valorant" />
                    <p>Valorant</p>
                </li>
                <li className="icon-box" onClick={() => fetchData('Others')}>
                    <img src={others_icon} alt="Others" />
                    <p>Others</p>
                </li>
                <li className="icon-box user-login" onClick={() => fetchData('Link My Discord')}>
                    <img src={discord_icon} alt="Discord" />
                    <p>Link My Discord</p>
                </li>
            </ul>
        </div>
    );
}

export default Header;