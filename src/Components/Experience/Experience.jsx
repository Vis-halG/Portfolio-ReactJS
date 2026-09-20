import React from "react";
import "./Experience.css";

function Experience() {
  return (
    <div className="experience" id="experience_section">
      <h2 className="head-title">Experience</h2>

      {/* First Experience Card */}
      <div className="experience-container">
        <div className="heading">
          <img
            src="https://res.cloudinary.com/dbithmxnp/image/upload/f_auto,q_auto,w_240/v1738544860/magic-bus-logo_tscczx.gif"
            alt="Magic Bus Foundation"
            className="experience-image"
            width="120"
            height="120"
            loading="lazy"
            decoding="async"
          />
          <h2>Magic Bus Foundation</h2>
        </div>
        <div className="experience-content">
          <p className="training">
            <strong>
              Front-end Development &nbsp;{" "}
              <a
                href="https://drive.google.com/file/d/1dAvfP98wkETZHUj7SD3ZkKmFvz5QJrQo/view"
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-link"
              >
               <span>
                View Certificate🔗
              </span>
               
              </a>
            </strong>
          </p>
          <p>
            Completed an intensive offline training program in Web Designing & UX/UI,
            gaining expertise in modern web development skills and industry-relevant tools.
            The curriculum included hands-on experience with: HTML, CSS, JavaScript,
            AngularJS, ReactJS, and Adobe Photoshop.
          </p>
          <p>
            Additional Tools: Advanced web designing tools and technologies essential
            for crafting responsive and user-friendly websites.
          </p>
          <p>
            Worked with a team to create user interfaces with React, using HTML, CSS,
            and JavaScript. Tested features for browser compatibility, staying current
            with front-end trends to enhance skills and deliver optimized solutions.
          </p>
        </div>
      </div>

      {/* Second Experience Card (FreeCodeCamp) */}
      <div className="experience-container">
        <div className="heading">
          <img
            src="https://design-style-guide.freecodecamp.org/img/fcc_secondary_small.svg"
            alt="FreeCodeCamp"
            className="experience-image"
            width="120"
            height="120"
            loading="lazy"
            decoding="async"
          />
          <h2>Free Code Camp</h2>
        </div>
        <div className="experience-content experience-content-two">
          <p className="training">
            <strong>
              Responsive Web Design &nbsp;{" "}
              <a
                href="https://www.freecodecamp.org/certification/vishal-g/responsive-web-design"
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-link"
              ><span>
                 View Certificate🔗
              </span>
               
              </a>
            </strong>
          </p>
          <p>
            I completed the Responsive Web Design Certification from freeCodeCamp.
            This certification required me to complete more than 300 hours of coursework
            and projects, strengthening my expertise in HTML5, CSS3, Flexbox, CSS Grid,
            and mobile-first responsive design.
          </p>
          <p>
            The projects I built — including a Technical Documentation Page, Tribute Page,
            and Product Landing Page — helped me gain practical experience in designing
            clean, accessible, and user-friendly interfaces.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
