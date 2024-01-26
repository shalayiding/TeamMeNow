import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling
import logo from "../Header/Images/new_logo.png"
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <img src={logo} alt="Logo" className="footer-logo" />
                    <p>TeamMeUp</p>
                    <small>© {new Date().getFullYear()} Your Company. All Rights Reserved.</small>
                </div>
                <div className="footer-section">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/settings">Settings</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><a href="https://discord.example.com">Discord</a></li>
                        <li><a href="https://github.example.com">Github</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;