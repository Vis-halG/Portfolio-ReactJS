import React from 'react';
import Icon from '../Icons/Icon.jsx';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-split">
        <nav className="footer-nav">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#tech-stack">Tech Stack</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact Us</a>
        </nav>

        <div className="footer-social">
          
          <a href="https://github.com/Vis-halG">
           <Icon name="github" label="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/vishalsgupta" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" label="LinkedIn" />
          </a>
          <a href="mailto:vishalsgupta@example.com" aria-label="Email">
            <Icon name="envelope" label="Email" />
          </a>
          <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Icon name="whatsapp" label="WhatsApp" />
          </a>
          <a href="tel:+1234567890" aria-label="Phone">
            <Icon name="phone" label="Phone" />
          </a>
        </div>
        </div>
      
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Vishal S. Gupta. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
