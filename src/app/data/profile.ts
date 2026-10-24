/**
 * Everything shown on the portfolio lives here, so updating the site means editing this file only.
 * The wording is copied from the current live portfolio.
 */
import type { IconName } from '../icon';

/** A line on the experience timeline. The detail lives in the matching project. */
export interface Job {
  company: string;
  current?: boolean;
  dates: string;
  role: string;
  summary: string;
  projectId: string;
}

/** A piece of work, told by what it is and what I did. Every line comes from the original portfolio. */
export interface Project {
  id: string;
  kicker: string;
  title: string;
  summary: string;
  role: string;
  icon: IconName;
  points: string[];
  tech: string[];
  links: { label: string; url: string }[];
  /** Screenshots of live work. Each one opens the real site. */
  shots?: Shot[];
}

export interface Shot {
  src: string;
  alt: string;
  label: string;
  url: string;
}

export interface SkillGroup {
  title: string;
  icon: IconName;
  items: string[];
}

export const SITE_URL = 'https://anihani.github.io/my-portfolio/';

export const PROFILE = {
  name: 'Anilkumar H J',
  initials: 'AK',
  eyebrow: 'Front-end · UI · Web Applications',
  titlePrefix: 'Senior Software Engineer · ',
  /** Words the headline types out in turn. */
  typedWords: ['Angular', 'TypeScript', 'Responsive UI', 'Accessibility', 'i18n', 'AI-assisted dev'],
  location: 'Mysuru, India',
  company: 'Certinal Software',
  /** Shown in the hero. Kept to one sentence so the buttons stay in view on a phone. */
  lead: 'Front-end developer building complex web applications since 2018, currently working on an Angular-based digital-signature platform.',
  /** The second half of the original intro, now the opening line of the Skills section. */
  principles: 'I care about responsive, accessible, multi-language interfaces and work closely with design and back-end teams to get the details right.',
  availability: 'Open to conversations',
  signature: { role: 'UI / Front-end Developer', since: '2018-07' },
  stats: [
    { value: 8, suffix: '+', label: 'years building for the web' },
    { value: 3, suffix: '', label: 'companies' },
    { value: 3, suffix: '×', label: 'employee awards' },
  ],
  /** Profile links. A link only appears on the page once it has an address, so leave '' until you have one. */
  links: {
    github: 'https://github.com/anihani',
    linkedin: 'https://www.linkedin.com/in/anilkumar-h-j-09986b114/',
    resume: 'files/Anil_Kumar_HJ_Senior_Angular_Developer.pdf', // the file in public/files; swap the PDF there to update it
  },
  /** The message that is ready and waiting when someone taps the WhatsApp button. */
  whatsappMessage: 'Hi Anilkumar, I found your portfolio and would like to talk.',
  email: 'anilkumarhj07@gmail.com',
  phone: '+91 99457 03127',
  phoneTel: '+919945703127',
  basedIn: 'Mysuru, Karnataka',
  footerLine: 'UI / Front-end Developer · Mysuru',
};

export interface ProfileLink {
  label: string;
  url: string;
  icon: IconName;
  /** Opens in a new tab. */
  external: boolean;
  /** Saved to disk instead of opened. */
  download: boolean;
}

/** The links under the hero buttons and in the contact card. A link only appears once it has an address. */
export function profileLinks(): ProfileLink[] {
  const { github, linkedin, resume } = PROFILE.links;
  const links: ProfileLink[] = [];
  // The résumé comes first: it is the thing recruiters look for.
  if (resume) links.push({ label: 'Résumé', url: resume, icon: 'download', external: false, download: true });
  if (linkedin) links.push({ label: 'LinkedIn', url: linkedin, icon: 'external', external: true, download: false });
  if (github) links.push({ label: 'GitHub', url: github, icon: 'external', external: true, download: false });
  return links;
}

export const SKILLS: SkillGroup[] = [
  { title: 'Languages', icon: 'code', items: ['TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'SCSS'] },
  { title: 'Frameworks & UI', icon: 'grid', items: ['Angular', 'Angular Material', 'Ionic', 'Bootstrap', 'jQuery'] },
  { title: 'AI-assisted development', icon: 'sparkles', items: ['Claude Code', 'Cursor', 'Codex', 'AI code review', 'CodeRabbit'] },
  { title: 'Tooling', icon: 'wrench', items: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'npm', 'Webpack', 'Babel', 'VS Code'] },
  { title: 'Design', icon: 'design', items: ['Figma', 'Adobe XD', 'Photoshop'] },
  { title: 'Practices', icon: 'check-circle', items: ['REST APIs', 'Responsive design', 'i18n', 'CMS', 'FTP', 'Agile / Scrum'] },
];

export const JOBS: Job[] = [
  {
    company: 'Certinal Software',
    current: true,
    dates: 'Jul 2022 — Present',
    role: 'Senior Software Engineer',
    summary: 'Angular web applications for a digital-signature (eSignature) product.',
    projectId: 'esign',
  },
  {
    company: 'Long Tail Sourcing India',
    dates: 'Jul 2021 — Jul 2022',
    role: 'Front-End Developer',
    summary: 'Ionic and Angular commerce apps, including the Konnectbox Android app.',
    projectId: 'konnectbox',
  },
  {
    company: 'Your Practice Online',
    dates: 'Jul 2018 — Jul 2021',
    role: 'Software Engineer',
    summary: 'Healthcare websites for clinics and medical-device companies.',
    projectId: 'healthcare',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'esign',
    kicker: 'Product · Certinal · 2022 – present',
    title: 'eSignature web application',
    summary: 'Angular interfaces for a digital-signature product, built to be responsive, accessible and multi-language.',
    role: 'Senior Software Engineer',
    icon: 'file-check',
    points: [
      'Develop and maintain Angular web applications for a digital-signature (eSignature) product.',
      'Build responsive, accessible interfaces with international and multi-language support.',
      'Integrate RESTful APIs for reliable data exchange with back-end services.',
      'Use modern front-end tooling to improve performance and design quality.',
      'Work with cross-functional teams to ship high-quality software.',
    ],
    tech: ['Angular', 'TypeScript', 'Material', 'Bootstrap', 'SCSS'],
    links: [{ label: 'certinal.com', url: 'https://www.certinal.com/' }],
  },
  {
    id: 'konnectbox',
    kicker: 'Mobile app · Long Tail Sourcing · 2021 – 2022',
    title: 'Konnectbox',
    summary: 'A B2B e-commerce Android app, alongside a bulk-buying commerce app, built in Ionic and Angular.',
    role: 'Front-End Developer',
    icon: 'smartphone',
    points: [
      'Built a bulk-buying commerce app in Ionic and Angular.',
      'Shipped Konnectbox, a B2B e-commerce Android app.',
      'Styled with Bootstrap, Material and SCSS for a modern, responsive UI.',
      'Integrated REST APIs and tuned mobile performance and UX.',
    ],
    tech: ['Ionic', 'Angular', 'JavaScript', 'SCSS'],
    links: [{ label: 'Konnectbox on Google Play', url: 'https://play.google.com/store/apps/details?id=io.konnectbox.starter' }],
  },
  {
    id: 'healthcare',
    kicker: 'Websites · Your Practice Online · 2018 – 2021',
    title: 'Healthcare websites',
    summary: 'Responsive, mobile-friendly sites for clinics and medical-device companies.',
    role: 'Software Engineer',
    icon: 'heart',
    points: [
      'Designed and built healthcare websites for clinics and medical-device companies.',
      'Delivered responsive, mobile-friendly sites on jQuery and content-management systems.',
      'Turned Photoshop designs into production UI with cross-browser compatibility.',
      'Managed site content and worked with designers and back-end developers.',
    ],
    tech: ['HTML', 'CSS', 'jQuery', 'CMS', 'Photoshop'],
    links: [
      { label: 'BPL Medical Technologies', url: 'https://www.bplmedicaltechnologies.com/' },
      { label: 'OSSI Virginia', url: 'https://www.ossi-virginia.com/' },
      { label: 'Zachary Zimmer MD', url: 'https://www.zacharyzimmermd.com/' },
      { label: 'Lombardi Spine', url: 'https://www.lombardispine.com/' },
    ],
    shots: [
      { src: 'images/work/bpl-medical.jpg', alt: 'Home page of the BPL Medical Technologies website', label: 'BPL Medical Technologies', url: 'https://www.bplmedicaltechnologies.com/' },
      { src: 'images/work/ossi-virginia.jpg', alt: 'Home page of the Orthopaedic & Spine Surgery Institute website', label: 'OSSI Virginia', url: 'https://www.ossi-virginia.com/' },
      { src: 'images/work/lombardi-spine.jpg', alt: 'Home page of the Lombardi Spine website', label: 'Lombardi Spine', url: 'https://www.lombardispine.com/' },
    ],
  },
];

/** Skills named in the current role (its description and stack), so they can be marked as in daily use. */
export const CURRENT_ROLE_SKILLS = new Set(['Angular', 'TypeScript', 'Angular Material', 'Bootstrap', 'SCSS', 'REST APIs', 'Responsive design', 'i18n']);

export const AWARDS: { icon: IconName; kicker: string; title: string; text: string }[] = [
  { icon: 'medal', kicker: '2019 · Your Practice Online', title: 'Best Employee of the Year', text: 'For outstanding performance and significant contributions to the team.' },
  { icon: 'trophy', kicker: 'Twice · Certinal Software', title: 'Best Employee of the Month', text: 'For exceptional performance and dedication to project success.' },
];

export const CERTIFICATIONS: { title: string; issuer: string; url?: string }[] = [
  {
    title: 'Angular - The Complete Guide',
    issuer: 'Udemy · 2026',
    url: 'https://www.udemy.com/certificate/UC-dc342cb0-7176-454a-91de-5acadbb6294f/',
  },
  {
    title: 'CSS (Basic)',
    issuer: 'HackerRank · 2024',
    url: 'https://www.hackerrank.com/certificates/9b8ff02cc248',
  },
  { title: 'SPFx Web Part Solutions', issuer: 'Udemy' },
  { title: 'Skill Assessment', issuer: 'LinkedIn' },
];

export const EDUCATION: { title: string; place: string; score: string }[] = [
  { title: 'B.E. Computer Science', place: 'SJCE, Mysuru · 2014–2018', score: '7.1 CGPA' },
  { title: 'PUC', place: 'Bharathi PU College, Maddur · 2012–2014', score: '84.33%' },
  { title: 'SSLC', place: 'Govt High School, Maddur · 2011–2012', score: '79.68%' },
];

export const LANGUAGES_SPOKEN = ['English', 'Kannada', 'Telugu'];

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'background', label: 'Background' },
];
