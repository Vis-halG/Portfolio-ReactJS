import { ArrowUpRight } from 'lucide-react';
import './Experience.css';

const EXPERIENCES = [
  {
    company: 'Thinkinno Technologies',
    companyFull: 'Thinkinno Technologies Pvt. Ltd.',
    type: 'Work experience',
    role: 'UI/UX Designer & Frontend Developer Intern',
    period: 'Feb 2025 — Present',
    logo: '/assets/experience/thinkinno.png',
    logoWidth: 475,
    logoHeight: 122,
    current: true,
    highlights: [
      'Migrated the company website from WordPress to Next.js and Tailwind CSS, improving performance, SEO, and scalability.',
      'Migrated LeadVictor from its legacy technology to React.js.',
      'Designed the complete TrakPay mobile payment experience in Figma, including onboarding, dashboard, transactions, and wallet screens.',
      'Created dashboard interfaces and improved user flows to strengthen usability and visual consistency across the product.',
      'Improved UI/UX across web applications with a focus on clean design and usability.',
    ],
    links: [
      { label: 'Live website', href: 'https://thinkinno.com/' },
      { label: 'WordPress version', href: 'https://thinkinno.com/wordpress' },
    ],
  },
  {
    company: 'Magic Bus Foundation',
    companyFull: 'Magic Bus Foundation',
    type: 'Professional training',
    role: 'Front-end Development',
    period: 'Web Designing & UI/UX',
    logo: 'https://res.cloudinary.com/dbithmxnp/image/upload/f_auto,q_auto,w_240/v1738544860/magic-bus-logo_tscczx.gif',
    logoWidth: 120,
    logoHeight: 120,
    highlights: [
      'Completed intensive offline training in HTML, CSS, JavaScript, AngularJS, ReactJS, and Adobe Photoshop.',
      'Built responsive, accessible interfaces using modern web-design tools and practical development workflows.',
      'Collaborated on React interfaces, tested browser compatibility, and applied current front-end best practices.',
    ],
    links: [
      {
        label: 'View certificate',
        href: 'https://drive.google.com/file/d/1dAvfP98wkETZHUj7SD3ZkKmFvz5QJrQo/view',
      },
    ],
  },
  {
    company: 'freeCodeCamp',
    companyFull: 'freeCodeCamp',
    type: 'Certifications',
    role: 'Responsive Web Design & Programming',
    period: 'Self-paced curriculum',
    logo: 'https://design-style-guide.freecodecamp.org/img/fcc_secondary_small.svg',
    logoWidth: 120,
    logoHeight: 120,
    highlights: [
      'Completed more than 300 hours of coursework and project-based learning.',
      'Strengthened practical skills in responsive design, CSS Grid, Flexbox, JavaScript, and Python.',
      'Built certification projects focused on clean, accessible, and user-friendly interfaces.',
    ],
    links: [
      {
        label: 'Responsive Web Design',
        href: 'https://www.freecodecamp.org/certification/vishal-g/responsive-web-design',
      },
      {
        label: 'JavaScript',
        href: 'https://www.freecodecamp.org/certification/vishal-g/javascript-v9',
      },
      {
        label: 'Python',
        href: 'https://www.freecodecamp.org/certification/vishal-g/python-v9',
      },
    ],
  },
];

function Experience() {
  return (
    <section className="experience" id="experience_section" aria-labelledby="experience-title">
      <header className="experience-header">
        <div>
          <p className="experience-eyebrow">Career &amp; learning</p>
          <h2 id="experience-title">Experience</h2>
        </div>
        <p className="experience-intro">
          Building real products, sharpening the craft, and continuously learning.
        </p>
      </header>

      <div className="experience-timeline">
        {EXPERIENCES.map((item, index) => (
          <article className={`experience-card${item.current ? ' experience-card--current' : ''}`} key={item.company}>
            <span className="experience-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>

            <div className="experience-company">
              <div className="experience-logo-wrap">
                <img
                  src={item.logo}
                  alt={`${item.company} logo`}
                  className="experience-logo"
                  width={item.logoWidth}
                  height={item.logoHeight}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p className="experience-type">{item.type}</p>
                <h3>{item.company}</h3>
                <p className="experience-company-name">{item.companyFull}</p>
              </div>
            </div>

            <div className="experience-details">
              <div className="experience-role-row">
                <div>
                  <p className="experience-period">{item.period}</p>
                  <h4>{item.role}</h4>
                </div>
                {item.current && <span className="experience-current"><i /> Current</span>}
              </div>

              <ul className="experience-highlights">
                {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
              </ul>

              <div className="experience-links" aria-label={`${item.company} links`}>
                {item.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}<ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
