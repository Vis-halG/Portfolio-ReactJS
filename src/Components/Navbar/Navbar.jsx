import React, { useState, useEffect } from "react";
import "./Navbar.css";
import PortfolioImg from "../../assets/images/Portfolio.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // 🔹 NEW
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // 🔹 Function to update active link
  const handleSetActive = (section) => {
    setActiveSection(section);
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div>
        <img src={PortfolioImg} alt="Portfolio" />
      </div>

      <div
        className={`menu-toggle ${isMobileMenuOpen ? "close" : ""}`}
        id="mobile-menu"
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav ${isMobileMenuOpen ? "nav-mobile-open" : ""}`}>
        <span className="close-btn" onClick={closeMobileMenu}>
          &times;
        </span>

        <div className="nav-items">
          <li
            className={`nav-item ${activeSection === "home" ? "active" : ""}`}
          >
            <a href="#" onClick={() => handleSetActive("home")}>
              Home
            </a>
          </li>
          <li
            className={`nav-item ${
              activeSection === "projects" ? "active" : ""
            }`}
          >
            <a href="#projects_section" onClick={() => handleSetActive("projects")}>
              Projects
            </a>
          </li>
          <li
            className={`nav-item ${
              activeSection === "skills" ? "active" : ""
            }`}
          >
            <a href="#skills_section" onClick={() => handleSetActive("skills")}>
              Tech Stack
            </a>
          </li>
          <li
            className={`nav-item ${
              activeSection === "experience" ? "active" : ""
            }`}
          >
            <a
              href="#experience_section"
              onClick={() => handleSetActive("experience")}
            >
              Experience
            </a>
          </li>
          <li
            className={`nav-item ${
              activeSection === "contact" ? "active" : ""
            }`}
          >
            <a
              href="#contact_section"
              onClick={() => handleSetActive("contact")}
            >
              Contact Us
            </a>
          </li>
        </div>

        <div className="ThemeCV-mb">
          <button
            className="DownloadCV"
            onClick={() => {
              window.open(
                "https://drive.google.com/file/d/1KjdmbPTSeBpldy3wANhDCniIQA_VRnAU/view?usp=sharing",
                "_blank"
              );
            }}
          >
            View CV!
          </button>
        </div>
      </ul>

      <div className="ThemeCV">
        <button
          className="DownloadCV"
          onClick={() => {
            window.open(
              "https://drive.google.com/file/d/1KjdmbPTSeBpldy3wANhDCniIQA_VRnAU/view?usp=sharing",
              "_blank"
            );
          }}
        >
          View CV!
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
