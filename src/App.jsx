import React, { useState, useEffect } from "react";
import Home from "./Components/Home/Home.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Projects from "./Components/Projects/Projects.jsx";
import Skills from "./Components/Skills/Skills.jsx";
import Experience from "./Components/Experience/Experience.jsx";
import ContactUs from "./Components/ContactUs/ContactUs.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import CursorFollower from "./Components/CursorFollower/CursorFollower.jsx";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen.jsx";
import "./App.css";

// The splash used to run on a fixed 2s timer, which meant a fast connection
// waited just as long as a slow one. It now tracks the hero image instead:
// the floor stops it strobing on an instant load, the ceiling stops a slow
// image from stranding it.
const MIN_VISIBLE_MS = 250;
const MAX_VISIBLE_MS = 1500;
const FADE_MS = 400; // keep in sync with the transition on .loading

function App() {
  const [isFading, setIsFading] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // The inline splash in index.html covered the gap before this bundle ran.
    document.getElementById("boot")?.remove();

    const startedAt = performance.now();
    const timers = [];
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;

      const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt));
      timers.push(setTimeout(() => setIsFading(true), remaining));
      timers.push(setTimeout(() => setShowLoader(false), remaining + FADE_MS));
    };

    const hero = document.querySelector("img[data-hero]");
    if (!hero || hero.complete) {
      dismiss();
    } else {
      hero.addEventListener("load", dismiss, { once: true });
      hero.addEventListener("error", dismiss, { once: true });
    }
    timers.push(setTimeout(dismiss, MAX_VISIBLE_MS));

    return () => {
      timers.forEach(clearTimeout);
      hero?.removeEventListener("load", dismiss);
      hero?.removeEventListener("error", dismiss);
    };
  }, []);

  return (
    <div>
      {showLoader && <LoadingScreen isFading={isFading} />}

      <CursorFollower />
      <Navbar />
      <Home />
      <Projects />
      <Skills />
      <Experience />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default App;
