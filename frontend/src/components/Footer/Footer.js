import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <img src="path-to-your-logo.png" alt="Logo" className="footer-logo" />
                    <p>Your Company Name</p>
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