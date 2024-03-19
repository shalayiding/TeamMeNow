import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling
import logo from "../../assets/Images/teammenow_icon.png"
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <p>Team Me Now</p>
                    <small>© {new Date().getFullYear()} Your Company. All Rights Reserved.</small>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://discord.gg/DZvCts8n5b">Discord</a></li>
                        <li><a href="https://github.com/shalayiding/TeamMeUp">Github</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;