/* eslint-disable react/prop-types -- this codebase does not use prop-types anywhere */

import { useMemo, useState } from 'react';
import './Projects.css';

/**
 * Categories are declared here rather than derived from the projects so the
 * tab order is deliberate: shipped product first, practice work after.
 */
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live Work' },
  { id: 'website', label: 'Websites' },
  { id: 'clone', label: 'Clones' },
  { id: 'mini', label: 'Mini Projects' },
];

const PROJECTS = [
  {
    title: 'NexCard',
    tagline: 'A digital visiting card that holds your contacts, work, services, bookings and payments on one link.',
    category: 'live',
    status: 'live',
    tech: ['React', 'Web App'],
    image: './assets/Projects/thenexcard.webp',
    link: 'https://www.thenexcard.com/',
  },
  {
    title: 'NexConnect',
    tagline: 'The companion Android app for NexCard — share and manage your card from your phone.',
    category: 'live',
    status: 'coming-soon',
    tech: ['Android', 'Play Store'],
    image: null,
    link: null,
  },
  {
    title: 'Headphone Landing Page',
    tagline: 'Product landing page for a headphone brand, built with React and Tailwind.',
    category: 'website',
    status: 'live',
    tech: ['React', 'Tailwind'],
    image: './assets/Projects/headphone.webp',
    link: 'https://headphone-landing-page-murex.vercel.app/',
  },
  {
    title: 'Agency Website',
    tagline: 'Marketing site for a creative agency, with scroll-triggered animations.',
    category: 'website',
    status: 'live',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: './assets/Projects/image.webp',
    link: 'https://agency-website-try.vercel.app/',
  },
  {
    title: 'SaffireTech Redesign',
    tagline: 'A redesign of a WordPress service company site, animated with GSAP.',
    category: 'website',
    status: 'live',
    tech: ['HTML', 'CSS', 'GSAP'],
    image: './assets/Projects/SaffireTech.webp',
    link: 'https://redesign-puce.vercel.app/',
  },
  {
    title: 'Student Enquiry Form',
    tagline: 'A study-abroad admissions enquiry form with a multi-field responsive layout.',
    category: 'website',
    status: 'live',
    tech: ['HTML', 'CSS', 'Flexbox'],
    image: './assets/Projects/Hero.webp',
    link: 'https://flexbox-ebon.vercel.app/',
  },
  {
    title: 'Spotify Clone',
    tagline: 'A recreation of the Spotify player interface, built to practise component layout.',
    category: 'clone',
    status: 'live',
    tech: ['React', 'Tailwind'],
    image: './assets/Projects/Spotify.webp',
    link: 'https://spotify-clone-mauve-eight-16.vercel.app/',
  },
  {
    title: 'Memory Card Game',
    tagline: 'A card-matching game with flip animations and move tracking, in plain JavaScript.',
    category: 'mini',
    status: 'live',
    tech: ['JavaScript', 'CSS'],
    image: './assets/Projects/MemoryCard.webp',
    link: 'https://memory-game-mini.vercel.app/',
  },
];

/** Cards with no screenshot yet fall back to their initials on a tinted tile. */
function Placeholder({ title }) {
  const initials = title.replace(/[^A-Z]/g, '').slice(0, 2) || title.slice(0, 2).toUpperCase();
  return (
    <div className="project-card__placeholder" aria-hidden="true">
      <span>{initials}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  const isComingSoon = project.status === 'coming-soon';

  // A card that has nowhere to go should not pretend to be a link.
  const Tag = isComingSoon ? 'div' : 'a';
  const linkProps = isComingSoon
    ? {}
    : { href: project.link, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <Tag className="project-card" data-status={project.status} {...linkProps}>
      <div className="project-card__media">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="project-card__image"
            width="900"
            height="570"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Placeholder title={project.title} />
        )}

        <span className="project-card__badge">
          {isComingSoon ? 'Coming soon' : 'Live'}
        </span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__tagline">{project.tagline}</p>

        <ul className="project-card__tech">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <span className="project-card__cta">
          {isComingSoon ? 'In development' : 'View project'}
        </span>
      </div>
    </Tag>
  );
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const visible = useMemo(
    () =>
      activeCategory === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  // Counts come from the data so they cannot drift as projects are added.
  const counts = useMemo(
    () => ({
      total: PROJECTS.length,
      live: PROJECTS.filter((p) => p.category === 'live').length,
      practice: PROJECTS.filter((p) => p.category !== 'live').length,
    }),
    []
  );

  // A tab with nothing behind it is a dead end, so only offer real ones.
  const tabs = CATEGORIES.filter(
    (c) => c.id === 'all' || PROJECTS.some((p) => p.category === c.id)
  );

  return (
    <section className="projects_section" id="projects_section">
      <div className="stat-container">
        <div className="stat">
          <div className="header">
            <h1>Project Showcase</h1>
            <p>
              Explore my collection of web development projects, featuring
              modern designs, interactive animations, and cutting-edge
              technologies.
            </p>
          </div>
          <div className="total-stats">
            <h2 className="stat-number">
              {counts.total.toString().padStart(2, '0')}
            </h2>
            <p className="stat-label">Total Projects</p>
          </div>
        </div>

        <div className="stats-grid mx-auto">
          <div className="stat-card">
            <h2 className="stat-number">
              {counts.live.toString().padStart(2, '0')}
            </h2>
            <p className="stat-label">Live Work</p>
          </div>
          <div className="stat-card">
            <h2 className="stat-number">
              {counts.practice.toString().padStart(2, '0')}
            </h2>
            <p className="stat-label">Practice Builds</p>
          </div>
        </div>
      </div>

      <div className="projects-toolbar">
        <div className="projects-tabs" role="tablist" aria-label="Project categories">
          {tabs.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === c.id}
              className="projects-tab"
              data-active={activeCategory === c.id}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.label}
              <span className="projects-tab__count">
                {c.id === 'all'
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === c.id).length}
              </span>
            </button>
          ))}
        </div>

        <a
          href="https://github.com/Vis-halG?tab=stars"
          className="projects-viewall"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all on GitHub
        </a>
      </div>

      <div className="projects-grid">
        {visible.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
