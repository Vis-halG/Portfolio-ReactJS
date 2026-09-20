import React, { useEffect, useState, useRef } from "react";
import "./Skills.css";

const skills = [
  
    { name: "HTML", image: "html.webp" },
    { name: "CSS", image: "css.webp" },
    { name: "JavaScript", image: "javascript.webp" },
    { name: "React", image: "react.webp" },
    { name: "Figma", image: "figma.webp" },
    { name: "Git", image: "git.webp" },
    { name: "GitHub", image: "github.webp" },
    {name: "bootstrap", image: "bootstrap.webp"},
    { name: "Tailwind", image: "tailwind.webp" },
    { name: "TypeScript", image: "typescript.webp" },
    { name: "Photoshop", image: "adobe-photoshop.webp" },
    { name: "SQL", image: "sql.webp" },
   
];

function Skills() {
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                setIsVisible(entries[0].isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => {
            if (skillsRef.current) {
                observer.unobserve(skillsRef.current);
            }
        };
    }, []);

    return (
        <div ref={skillsRef} className="skills_section" id="skills_section">
            <h1>Tech Stack</h1>
            <div className="skills_grid">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className={`skill_card ${isVisible ? "pop-move" : "pop-down"}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <img
                            src={`/assets/skills/${skill.image}`}
                            alt={skill.name}
                            width="80"
                            height="80"
                            loading="lazy"
                            decoding="async"
                        />
                        <p>{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Skills;
