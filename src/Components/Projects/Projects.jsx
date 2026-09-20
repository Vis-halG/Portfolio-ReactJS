/* eslint-disable react/prop-types -- this codebase does not use prop-types anywhere */

import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './Projects.css';

const CATEGORIES = [
  { id: 'all', label: 'All work' },
  { id: 'live', label: 'Products' },
  { id: 'website', label: 'Websites' },
  { id: 'clone', label: 'Clones' },
  { id: 'mini', label: 'Experiments' },
];

const PROJECTS = [
  {
    title: 'NexCard',
    tagline: 'A digital visiting card that brings contacts, work, services, bookings and payments together on one shareable link.',
    category: 'live',
    categoryLabel: 'Digital product',
    status: 'live',
    tech: ['React', 'Product design', 'Web app'],
    image: './assets/Projects/thenexcard.webp',
    link: 'https://www.thenexcard.com/',
  },
  {
    title: 'NexConnect',
    tagline: 'The companion Android experience for sharing and managing a NexCard straight from your phone.',
    category: 'live',
    categoryLabel: 'Mobile product',
    status: 'coming-soon',
    tech: ['Android', 'Mobile UI', 'Play Store'],
    image: null,
    link: null,
  },
  {
    title: 'Headphone Landing Page',
    tagline: 'A focused product story with a bold visual system, responsive layouts and clear conversion moments.',
    category: 'website',
    categoryLabel: 'E-commerce concept',
    status: 'live',
    tech: ['React', 'Tailwind'],
    image: './assets/Projects/headphone.webp',
    link: 'https://headphone-landing-page-murex.vercel.app/',
  },
  {
    title: 'Agency Website',
    tagline: 'An expressive marketing site that pairs editorial layouts with smooth, scroll-led interactions.',
    category: 'website',
    categoryLabel: 'Creative development',
    status: 'live',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: './assets/Projects/image.webp',
    link: 'https://agency-website-try.vercel.app/',
  },
  {
    title: 'SaffireTech Redesign',
    tagline: 'A modern rework of a technology services website, with stronger hierarchy and GSAP motion.',
    category: 'website',
    categoryLabel: 'Website redesign',
    status: 'live',
    tech: ['HTML', 'CSS', 'GSAP'],
    image: './assets/Projects/SaffireTech.webp',
    link: 'https://redesign-puce.vercel.app/',
  },
  {
    title: 'Student Enquiry Form',
    tagline: 'A responsive admissions journey that organises a detailed form into a clear, approachable flow.',
    category: 'website',
    categoryLabel: 'Responsive interface',
    status: 'live',
    tech: ['HTML', 'CSS', 'Flexbox'],
    image: './assets/Projects/Hero.webp',
    link: 'https://flexbox-ebon.vercel.app/',
  },
  {
    title: 'Spotify Clone',
    tagline: 'A faithful recreation of the music player experience, built to explore reusable React layouts.',
    category: 'clone',
    categoryLabel: 'Interface study',
    status: 'live',
    tech: ['React', 'Tailwind'],
    image: './assets/Projects/Spotify.webp',
    link: 'https://spotify-clone-mauve-eight-16.vercel.app/',
  },
  {
    title: 'Memory Card Game',
    tagline: 'A fast card-matching game with tactile flip animations, move tracking and a responsive board.',
    category: 'mini',
    categoryLabel: 'Interactive experiment',
    status: 'live',
    tech: ['JavaScript', 'CSS'],
    image: './assets/Projects/MemoryCard.webp',
    link: 'https://memory-game-mini.vercel.app/',
  },
];

function Placeholder({ title }) {
  const initials = title.replace(/[^A-Z]/g, '').slice(0, 2) || title.slice(0, 2).toUpperCase();

  return (
    <div className="project-card__placeholder" aria-hidden="true">
      <span className="project-card__orb project-card__orb--one" />
      <span className="project-card__orb project-card__orb--two" />
      <span className="project-card__monogram">{initials}</span>
      <span className="project-card__placeholder-label">In the lab</span>
    </div>
  );
}

function ProjectCard({ project, index, featured = false }) {
  const isComingSoon = project.status === 'coming-soon';
  const Tag = isComingSoon ? 'article' : 'a';
  const linkProps = isComingSoon
    ? {}
    : {
        href: project.link,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `View ${project.title} live project (opens in a new tab)`,
      };

  return (
    <Tag className={`project-card${featured ? ' project-card--featured' : ''}`} data-status={project.status} {...linkProps}>
      <div className="project-card__media">
        <div className="project-card__browser" aria-hidden="true">
          <span /><span /><span />
          <p>{project.link ? project.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : 'Building something new'}</p>
        </div>

        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} website preview`}
            className="project-card__image"
            width="900"
            height="570"
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
          />
        ) : (
          <Placeholder title={project.title} />
        )}

        <span className="project-card__status">
          <span className="project-card__status-dot" />
          {isComingSoon ? 'Coming soon' : 'Live project'}
        </span>
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <span>{project.categoryLabel}</span>
        </div>

        <div className="project-card__copy">
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__tagline">{project.tagline}</p>
        </div>

        <div className="project-card__footer">
          <ul className="project-card__tech" aria-label="Technologies used">
            {project.tech.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>

          <span className="project-card__cta" aria-hidden="true">
            {isComingSoon ? 'In development' : 'Explore project'}
            {!isComingSoon && <ArrowRight aria-hidden="true" />}
          </span>
        </div>
      </div>
    </Tag>
  );
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const visible = useMemo(
    () => activeCategory === 'all' ? PROJECTS : PROJECTS.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  const tabs = CATEGORIES.filter(
    (category) => category.id === 'all' || PROJECTS.some((project) => project.category === category.id)
  );

  return (
    <section className="projects_section" id="projects_section" aria-labelledby="projects-title">
      <div className="projects-intro">
        <div className="projects-intro__copy">
          <p className="projects-eyebrow"><span /> Selected work · 2024—2026</p>
          <h2 id="projects-title">Ideas, shaped into <em>digital experiences.</em></h2>
          <p className="projects-intro__lede">
            A selection of products and interfaces where thoughtful design meets clean, responsive development.
          </p>
        </div>

        <div className="projects-intro__aside" aria-label="Project summary">
          <p>From concept to launch</p>
          <div className="projects-intro__stats">
            <span><strong>{String(PROJECTS.length).padStart(2, '0')}</strong> projects</span>
            <span><strong>04</strong> disciplines</span>
          </div>
        </div>
      </div>

      <div className="projects-toolbar">
        <div className="projects-tabs" role="tablist" aria-label="Filter projects">
          {tabs.map((category) => {
            const count = category.id === 'all' ? PROJECTS.length : PROJECTS.filter((project) => project.category === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                className="projects-tab"
                data-active={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}<sup>{count}</sup>
              </button>
            );
          })}
        </div>

        <a href="https://github.com/Vis-halG?tab=repositories" className="projects-viewall" target="_blank" rel="noopener noreferrer">
          GitHub archive <ArrowRight aria-hidden="true" />
        </a>
      </div>

      <div className="projects-grid" role="tabpanel" aria-live="polite" key={activeCategory}>
        {visible.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={PROJECTS.indexOf(project)} featured={index === 0} />
        ))}
      </div>

      <div className="projects-capabilities" aria-label="Core capabilities">
        <span>Product thinking</span><i aria-hidden="true" />
        <span>Responsive design</span><i aria-hidden="true" />
        <span>Creative development</span><i aria-hidden="true" />
        <span>Motion &amp; interaction</span>
      </div>
    </section>
  );
};

export default Projects;
