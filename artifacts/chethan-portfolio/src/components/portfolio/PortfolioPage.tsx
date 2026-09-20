import { useState, type FormEvent, type ReactNode } from 'react';
import {
  AlertCircle,
  ArrowDown,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  LoaderCircle,
  MapPin,
  Phone,
  Menu,
  Radio,
  RefreshCw,
  Send,
  School,
  ShieldCheck,
  Terminal,
  Trophy,
  X,
} from 'lucide-react';

type FetchState = 'idle' | 'loading' | 'success' | 'error';
type ApiPayload = { userId: number; id: number; title: string; completed: boolean };

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const skillGroups = [
  {
    number: '01',
    title: 'Web Technologies',
    icon: Braces,
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'Web APIs',
      'DOM Manipulation',
      'Fetch API',
      'Async/Await',
      'JSON',
      'REST APIs',
      'TypeScript',
      'React',
      'Vite',
    ],
    note: 'Client-side foundations for practical interfaces.',
  },
  {
    number: '02',
    title: 'Programming',
    icon: Terminal,
    skills: ['Python', 'C'],
    note: 'Clear logic and dependable foundations.',
  },
  {
    number: '03',
    title: 'Core CS & Machine Learning',
    icon: Database,
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (OOP)',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'Decision Trees',
      'Logistic Regression',
    ],
    note: 'Foundations for solving problems and learning from data.',
  },
  {
    number: '04',
    title: 'Tools & Version Control',
    icon: ShieldCheck,
    skills: ['Git', 'GitHub', 'VS Code'],
    note: 'A reliable loop from idea to delivery.',
  },
];

type Project = {
  index: string;
  category: string;
  title: string;
  description: string;
  stack: string[];
  features: string[];
  achievement?: string;
  github?: string;
  liveDemo?: string;
  accent: 'teal' | 'gold';
};

const projectData: Project[] = [
  {
    index: '01',
    category: 'Full-Stack Architecture / System Design',
    title: 'Elderly Companion System',
    description:
      'Collaborated on a team-based minor project focused on technical solutions and problem-domain analysis for elderly assistance. Contributed to system design, workflow structure and technical presentation.',
    stack: [],
    features: [],
    achievement: 'Top 5 Finalist — Minor Project Competition',
    github: 'https://github.com/chethannayaka/MINOR_ELDERLY_COMPANION',
    accent: 'gold',
  },
  {
    index: '02',
    category: 'Machine Learning',
    title: 'Student Performance Prediction System',
    description:
      'Built an end-to-end machine learning classification workflow to predict student pass/fail outcomes based on attendance and academic indicators.',
    stack: ['Python', 'Pandas', 'Scikit-learn'],
    features: [
      'Data cleaning',
      'Missing value handling',
      'Feature encoding',
      'Machine learning classification',
      'Student pass/fail prediction',
    ],
    accent: 'teal',
  },
  {
    index: '03',
    category: 'Technical Documentation & Architecture',
    title: 'AI-Enabled Smart Public Distribution System',
    description:
      'Authored detailed technical documentation and system specification reports for an IoT-integrated public distribution platform featuring QR-based authentication and weight verification.',
    stack: [],
    features: [],
    accent: 'gold',
  },
  {
    index: '04',
    category: 'Web Development',
    title: 'Responsive Web Application Component',
    description:
      'Developing an interactive client-side web interface applying responsive design principles, DOM manipulation and asynchronous JSON fetching.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Web APIs', 'React', 'TypeScript', 'Vite', 'REST APIs'],
    features: [
      'Reusable React components',
      'REST API integration',
      'Fetch API',
      'JSON handling',
      'Responsive design',
      'Event handling',
    ],
    accent: 'teal',
  },
];

function SectionHeading({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-12 grid gap-5 md:grid-cols-[140px_1fr] md:items-end">
      <div className="eyebrow flex items-center gap-3">
        <span className="text-[0.62rem] text-muted-foreground">{number}</span>
        <span className="h-px w-8 bg-primary" />
        {eyebrow}
      </div>
      <div>
        <h2 className="display-title max-w-3xl text-4xl font-semibold leading-[0.98] text-foreground sm:text-5xl">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

function ButtonLink({
  href,
  children,
  variant = 'primary',
  onClick,
  testId,
}: {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'quiet';
  onClick?: () => void;
  testId: string;
}) {
  const className =
    variant === 'primary'
      ? 'focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-transform hover:-translate-y-0.5'
      : 'focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary';
  if (href) {
    return (
      <a href={href} className={className} data-testid={testId}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className} data-testid={testId}>
      {children}
    </button>
  );
}

function unavailableAction(label: string) {
  window.alert(`${label} is not available yet. The relevant URL or file has not been provided.`);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="section-wrap flex h-[72px] items-center justify-between">
        <a href="#home" className="focus-ring flex items-center gap-3" data-testid="link-home">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary font-display text-sm font-bold text-accent">
            CN
          </span>
          <span className="hidden text-sm font-bold tracking-tight sm:block">Chethan Nayaka K M</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link focus-ring text-xs font-semibold text-muted-foreground hover:text-foreground"
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <ButtonLink href="#contact" variant="quiet" testId="link-header-contact">
            Let&apos;s connect <ArrowUpRight size={15} />
          </ButtonLink>
        </div>
        <button
          type="button"
          className="focus-ring rounded-md p-2 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="section-wrap flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="focus-ring flex items-center justify-between border-b border-border/70 py-3 text-sm font-semibold"
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
              >
                {item.label}
                <ChevronRight size={15} className="text-primary" />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[72px]">
      <div className="portfolio-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="section-wrap relative grid min-h-[680px] items-center gap-16 py-20 lg:grid-cols-[1.12fr_0.88fr] lg:py-28">
        <div>
          <div className="hero-entrance eyebrow mb-6 flex items-center gap-3">
            <span className="status-dot" />
            Available for software engineering opportunities
          </div>
          <h1 className="hero-entrance-delay display-title max-w-4xl text-[clamp(3.5rem,9vw,7.65rem)] font-semibold leading-[0.86] text-foreground">
            <span className="block">Building practical</span>
            <span className="block">
              software with AI <span className="hidden sm:inline">&amp;</span>
            </span>
            <span className="block text-primary">
              <span className="sm:hidden">&amp; </span>
              technology.
            </span>
          </h1>
          <p className="hero-entrance-late mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            I&apos;m Chethan Nayaka K M, a final-year B.E. Computer Science and Engineering (AI &amp; ML) student interested in software development, AI/ML, web technologies and building practical applications.
          </p>
          <div className="hero-entrance-late mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#projects" testId="link-hero-projects">
              View Projects <ArrowDown size={16} />
            </ButtonLink>
            <ButtonLink
              variant="quiet"
              testId="button-hero-download-cv"
              onClick={() => unavailableAction('Download CV')}
            >
              Download CV <Download size={16} />
            </ButtonLink>
          </div>
          <div className="hero-entrance-late mt-14 flex items-center gap-7 text-xs text-muted-foreground">
            <span className="font-mono text-primary">/ student.engineer</span>
            <span className="h-px w-12 bg-border" />
            <span>Graduation: 2027</span>
          </div>
          <div className="hero-entrance-late mt-7 flex flex-wrap gap-5 text-xs font-semibold">
            <a href="https://github.com/chethannayaka" target="_blank" rel="noreferrer" className="focus-ring text-foreground hover:text-primary" data-testid="link-hero-github">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/chethan-nayaka-km-8407713b2" target="_blank" rel="noreferrer" className="focus-ring text-foreground hover:text-primary" data-testid="link-hero-linkedin">
              LinkedIn
            </a>
            <a href="mailto:nayakchethan666@gmail.com" className="focus-ring text-foreground hover:text-primary" data-testid="link-hero-email">
              Email
            </a>
          </div>
        </div>
        <div className="hero-entrance-delay relative lg:justify-self-end">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-primary/25" />
          <div className="absolute -bottom-7 -left-7 h-20 w-20 bg-accent/20" />
          <div className="code-window relative overflow-hidden rounded-2xl border border-secondary/15 bg-secondary text-secondary-foreground">
            <div className="flex items-center justify-between border-b border-secondary-foreground/15 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <span className="font-mono text-[10px] text-secondary-foreground/50">chethan.tsx</span>
            </div>
            <div className="p-6 font-mono text-[11px] leading-7 sm:p-8 sm:text-xs">
              <div><span className="text-accent">const</span> <span className="text-primary-foreground">developer</span> = {'{'}</div>
              <div className="pl-5"><span className="text-secondary-foreground/60">name:</span> <span className="text-accent">&apos;Chethan Nayaka K M&apos;</span>,</div>
              <div className="pl-5"><span className="text-secondary-foreground/60">focus:</span> <span className="text-accent">&apos;useful systems&apos;</span>,</div>
              <div className="pl-5"><span className="text-secondary-foreground/60">mode:</span> <span className="text-accent">&apos;learn → build → refine&apos;</span>,</div>
              <div className="pl-5"><span className="text-secondary-foreground/60">status:</span> <span className="text-primary-foreground">true</span>,</div>
              <div>{'}'};</div>
              <div className="mt-6 flex items-center gap-2 text-primary-foreground/70">
                <span className="text-accent">↳</span> building with intent
                <span className="ml-1 inline-block h-4 w-[1px] animate-pulse bg-accent" />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-secondary-foreground/15 px-5 py-3 font-mono text-[10px] text-secondary-foreground/50">
              <span>BE CSE (AI &amp; ML)</span>
              <span>01 / 01</span>
            </div>
          </div>
        </div>
      </div>
      <div className="section-wrap pb-9">
        <div className="line-rule" />
        <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>Scroll to explore</span>
          <span>Portfolio / 2027</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-wrap scroll-mt-24 py-24 sm:py-32">
      <SectionHeading number="01" eyebrow="The short version" title="I like the part where an idea becomes dependable.">
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          My work sits between a thoughtful user experience and the engineering that makes it reliable.
        </p>
      </SectionHeading>
      <div className="grid gap-10 border-t border-border pt-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-lg leading-8 text-foreground/80">
          <p>
            Final-year B.E. Computer Science and Engineering (AI &amp; ML) student with hands-on experience in web development, machine learning, system design and technical collaboration. Interested in building practical software solutions and applying programming, problem-solving and engineering concepts to real-world problems.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
          {[
            ['01', 'Build for people'],
            ['02', 'Learn by making'],
            ['03', 'Keep it clear'],
            ['04', 'Improve the detail'],
          ].map(([number, label]) => (
            <div key={number} className="rounded-xl border border-border bg-card p-4">
              <div className="font-mono text-xs text-primary">{number}</div>
              <div className="mt-8 text-sm font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-y border-border bg-muted/35 py-24 sm:py-32">
      <div className="section-wrap">
        <SectionHeading number="02" eyebrow="Working toolkit" title="A focused toolkit, used with context.">
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Technologies are useful when they make the next decision clearer. These are the tools and habits I am actively building with.
          </p>
        </SectionHeading>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <article key={group.number} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start justify-between">
                  <Icon size={21} strokeWidth={1.5} className="text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">{group.number}</span>
                </div>
                <h3 className="mt-12 font-display text-xl font-semibold">{group.title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{group.note}</p>
                <ul className="mt-6 space-y-2 border-t border-border pt-4">
                  {group.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const experiences = [
    {
      number: '01',
      title: 'Technical & Mentorship Intern — MTD Community',
      organization: 'NIE Mysore',
      icon: GraduationCap,
      description: [
        'Selected through a competitive skill-development program to collaborate with the core MTD team on technical initiatives.',
        'Assisted in facilitating technical training sessions and workshops for engineering students across semester levels.',
      ],
    },
    {
      number: '02',
      title: 'Technical Volunteer & Maintainer — Smart India Hackathon (SIH)',
      organization: 'College Center',
      icon: Terminal,
      description: [
        'Managed technical infrastructure and network setup for participating teams during campus hackathon rounds.',
        'Troubleshot real-time technical issues to ensure smooth execution of competition sessions.',
      ],
    },
  ];

  return (
    <section id="experience" className="scroll-mt-24 border-b border-border py-24 sm:py-32">
      <div className="section-wrap">
        <SectionHeading number="03" eyebrow="Experience & leadership" title="Technical work with people at the center.">
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Experience shaped by technical collaboration, mentorship and keeping shared systems working when they matter.
          </p>
        </SectionHeading>
        <div className="grid gap-4 lg:grid-cols-2">
          {experiences.map((experience) => {
            const Icon = experience.icon;
            return (
              <article key={experience.number} className="rounded-2xl border border-border bg-card p-7 sm:p-9">
                <div className="flex items-start justify-between gap-5">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={23} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{experience.number}</span>
                </div>
                <h3 className="mt-10 font-display text-2xl font-semibold leading-tight">{experience.title}</h3>
                <p className="mt-3 text-sm font-semibold text-primary">{experience.organization}</p>
                <ul className="mt-7 space-y-4 border-t border-border pt-6">
                  {experience.description.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-wrap scroll-mt-24 py-24 sm:py-32">
      <SectionHeading number="04" eyebrow="Selected work" title="Projects that stay close to the real problem.">
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          A current set of practical software, machine learning, documentation and interface work.
        </p>
      </SectionHeading>
      <div className="space-y-4">
        {projectData.map((project) => (
          <article key={project.index} className="project-card group rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-5">
                <span className={`font-display text-5xl font-semibold leading-none ${project.accent === 'gold' ? 'text-accent' : 'text-primary'}`}>
                  {project.index}
                </span>
                <div>
                  <p className="eyebrow">{project.category}</p>
                  <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight">{project.title}</h3>
                </div>
              </div>
              <ArrowUpRight size={20} className="hidden text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block" />
            </div>
            <div className={`mt-8 grid gap-8 border-t border-border pt-7 ${project.features.length > 0 ? 'lg:grid-cols-[1.1fr_0.9fr]' : ''}`}>
              <div>
                <p className="text-sm leading-7 text-muted-foreground">{project.description}</p>
                {project.achievement && (
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-3 py-2 text-xs font-semibold text-foreground">
                    <Trophy size={14} className="text-accent" />
                    {project.achievement}
                  </div>
                )}
              </div>
              {project.features.length > 0 && (
                <div>
                  <p className="eyebrow">Key features</p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {project.stack.length > 0 && (
              <div className="mt-8 border-t border-border pt-5">
                <p className="eyebrow">Technologies</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(project.github || project.liveDemo) && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                    data-testid={`link-project-${project.index}-github`}
                  >
                    <Github size={14} /> GitHub
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                    data-testid={`link-project-${project.index}-demo`}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-24 bg-secondary py-24 text-secondary-foreground sm:py-32">
      <div className="section-wrap">
        <div className="mb-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-foreground/55">
          <Trophy size={16} className="text-accent" />
          <span>05 / Proof of work</span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <div className="font-display text-[clamp(8rem,22vw,17rem)] font-semibold leading-[0.72] tracking-[-0.1em] text-accent">05</div>
            <p className="mt-10 max-w-xs font-mono text-xs uppercase leading-5 tracking-[0.13em] text-secondary-foreground/55">
              final round placement
              <br />
              minor project competition
            </p>
          </div>
          <div className="border-l border-secondary-foreground/20 pl-7 sm:pl-12">
            <p className="eyebrow text-accent">Achievement</p>
            <h2 className="display-title mt-5 max-w-2xl text-4xl font-semibold leading-[0.98] sm:text-6xl">
              Top 5 Finalist — Minor Project Competition
            </h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-secondary-foreground/65">
              Associated project: Elderly Companion System
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-wrap scroll-mt-24 py-24 sm:py-32">
      <SectionHeading number="06" eyebrow="Where I am learning" title="A computer science foundation with an AI & ML direction." />
      <div className="grid gap-4 md:grid-cols-[1fr_0.42fr]">
        <div className="rounded-2xl border border-border bg-card p-7 sm:p-9">
          <div className="flex items-start justify-between gap-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <GraduationCap size={24} strokeWidth={1.5} />
            </div>
            <span className="font-mono text-xs text-muted-foreground">01 / CURRENT</span>
          </div>
          <h3 className="mt-12 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
            B.E. Computer Science and Engineering (AI &amp; ML)
          </h3>
          <div className="mt-8 space-y-3 border-t border-border pt-5 text-sm">
            <p className="font-semibold">The National Institute of Engineering</p>
            <p className="text-muted-foreground">Mysore, India</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
              <span className="text-muted-foreground">CGPA: 6.63 / 10.00</span>
              <span className="text-muted-foreground">Expected Graduation: 2027</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-muted/40 p-7 sm:p-9">
          <School size={23} className="text-primary" strokeWidth={1.5} />
          <div className="mt-14">
            <p className="eyebrow">Class XII / PUC</p>
            <p className="mt-3 font-display text-2xl font-semibold">Pre-University Education</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Percentage: 90.00%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApiDemo() {
  const [fetchState, setFetchState] = useState<FetchState>('idle');
  const [payload, setPayload] = useState<ApiPayload | null>(null);
  const [error, setError] = useState('');

  const loadSample = async () => {
    setFetchState('loading');
    setPayload(null);
    setError('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      if (!response.ok) throw new Error(`Request failed with status ${response.status}.`);
      const data = (await response.json()) as ApiPayload;
      setPayload(data);
      setFetchState('success');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load the sample response.');
      setFetchState('error');
    }
  };

  return (
    <div className="rounded-2xl border border-secondary/15 bg-secondary p-5 text-secondary-foreground sm:p-7">
      <div className="flex flex-col gap-5 border-b border-secondary-foreground/15 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
            <Radio size={14} /> Live REST API Demonstration
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold">Live REST API Demonstration</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-secondary-foreground/60">
            This section demonstrates asynchronous REST API integration using Fetch API and JSON response handling.
          </p>
        </div>
        <button
          type="button"
          onClick={loadSample}
          disabled={fetchState === 'loading'}
          className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-bold text-secondary transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
          data-testid="button-load-api"
        >
          {fetchState === 'loading' ? <LoaderCircle size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          {fetchState === 'loading' ? 'Requesting…' : 'Load sample JSON'}
        </button>
      </div>
      <div className="mt-5 rounded-xl border border-secondary-foreground/15 bg-secondary-foreground/[0.04] p-4 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-2 text-secondary-foreground/60">
          <span className="rounded bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground">GET</span>
          <span>jsonplaceholder.typicode.com/todos/1</span>
        </div>
        <div className="mt-5 min-h-[112px]">
          {fetchState === 'idle' && (
            <div className="flex min-h-[112px] items-center text-secondary-foreground/45">
              <span className="text-accent">→</span><span className="ml-3">Ready when you are.</span>
            </div>
          )}
          {fetchState === 'loading' && (
            <div className="flex min-h-[112px] items-center gap-3 text-accent" data-testid="status-api-loading">
              <LoaderCircle size={16} className="animate-spin" /> Waiting for response…
            </div>
          )}
          {fetchState === 'error' && (
            <div className="flex min-h-[112px] items-center gap-3 text-destructive" data-testid="status-api-error">
              <AlertCircle size={17} /> {error}
            </div>
          )}
          {fetchState === 'success' && payload && (
            <div className="space-y-1 text-secondary-foreground/80" data-testid="status-api-success">
              <div><span className="text-primary">200</span> OK · parsed JSON response</div>
              <div className="mt-3 pl-4 text-secondary-foreground/65">
                <div><span className="text-accent">&quot;userId&quot;</span>: {payload.userId},</div>
                <div><span className="text-accent">&quot;id&quot;</span>: {payload.id},</div>
                <div><span className="text-accent">&quot;title&quot;</span>: <span className="text-primary-foreground">&quot;{payload.title}&quot;</span>,</div>
                <div><span className="text-accent">&quot;completed&quot;</span>: {String(payload.completed)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!formValues.name.trim()) errors.name = 'Please add your name.';
    if (!formValues.email.trim()) errors.email = 'Please add an email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) errors.email = 'Please use a valid email format.';
    if (!formValues.message.trim()) errors.message = 'Please add a short message.';
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) setSubmitted(true);
  };

  const updateField = (field: keyof typeof formValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
    if (formErrors[field]) setFormErrors((current) => ({ ...current, [field]: '' }));
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-muted/35 py-24 sm:py-32">
      <div className="section-wrap">
        <SectionHeading number="08" eyebrow="Open channel" title="Have a thoughtful problem to work on?">
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            The form is ready for a real conversation. Submission is kept honest: it validates locally, but does not pretend to send without a configured endpoint.
          </p>
        </SectionHeading>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-8">
            <div>
              <p className="eyebrow">Find me here</p>
              <div className="mt-4 space-y-3">
                <a
                  href="mailto:nayakchethan666@gmail.com"
                  className="focus-ring flex w-full items-center justify-between rounded-lg border border-border bg-card p-4 text-left text-sm font-semibold transition-colors hover:border-primary"
                  data-testid="link-email"
                >
                  <span className="flex items-center gap-3"><Send size={18} /> Email <span className="font-mono text-[10px] font-normal text-muted-foreground">nayakchethan666@gmail.com</span></span>
                  <ExternalLink size={15} className="text-muted-foreground" />
                </a>
                <a
                  href="tel:+919380240899"
                  className="focus-ring flex w-full items-center justify-between rounded-lg border border-border bg-card p-4 text-left text-sm font-semibold transition-colors hover:border-primary"
                  data-testid="link-phone"
                >
                  <span className="flex items-center gap-3"><Phone size={18} /> Phone <span className="font-mono text-[10px] font-normal text-muted-foreground">+91 9380240899</span></span>
                  <ExternalLink size={15} className="text-muted-foreground" />
                </a>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 text-sm font-semibold">
                  <MapPin size={18} />
                  <span>Location <span className="ml-2 font-mono text-[10px] font-normal text-muted-foreground">Mysore, Karnataka</span></span>
                </div>
                <a href="https://github.com/chethannayaka" target="_blank" rel="noreferrer" className="focus-ring flex items-center justify-between rounded-lg border border-border bg-card p-4 text-sm font-semibold transition-colors hover:border-primary" data-testid="link-github">
                  <span className="flex items-center gap-3"><Github size={18} /> GitHub <span className="font-mono text-[10px] font-normal text-muted-foreground">chethannayaka</span></span>
                  <ExternalLink size={15} className="text-muted-foreground" />
                </a>
                <a href="https://www.linkedin.com/in/chethan-nayaka-km-8407713b2" target="_blank" rel="noreferrer" className="focus-ring flex items-center justify-between rounded-lg border border-border bg-card p-4 text-sm font-semibold transition-colors hover:border-primary" data-testid="link-linkedin">
                  <span className="flex items-center gap-3"><Linkedin size={18} /> LinkedIn <span className="font-mono text-[10px] font-normal text-muted-foreground">chethan-nayaka-km</span></span>
                  <ExternalLink size={15} className="text-muted-foreground" />
                </a>
              </div>
            </div>
            <div className="border-t border-border pt-7">
              <p className="eyebrow">Curriculum vitae</p>
              <button
                type="button"
                onClick={() => window.alert('A CV file has not been provided yet. No download was started.')}
                className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                data-testid="button-download-cv"
              >
                <Download size={16} /> Download CV <span className="font-mono text-[10px] text-muted-foreground">(not available yet)</span>
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            {submitted ? (
              <div className="flex min-h-[355px] flex-col justify-center">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><Check size={22} /></div>
                <h3 className="mt-7 font-display text-3xl font-semibold">Message prepared.</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                  Your details passed validation and are still on this page. Nothing was sent — a delivery endpoint has not been configured.
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="focus-ring mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline" data-testid="button-edit-message">
                  <RefreshCw size={15} /> Edit message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold">
                    Name
                    <input
                      value={formValues.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      className="form-field mt-2"
                      placeholder="Your name"
                      aria-invalid={Boolean(formErrors.name)}
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                      data-testid="input-contact-name"
                    />
                    {formErrors.name && <span id="name-error" className="mt-1 block text-xs font-normal text-destructive">{formErrors.name}</span>}
                  </label>
                  <label className="text-sm font-semibold">
                    Email
                    <input
                      type="email"
                      value={formValues.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      className="form-field mt-2"
                      placeholder="you@example.com"
                      aria-invalid={Boolean(formErrors.email)}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                      data-testid="input-contact-email"
                    />
                    {formErrors.email && <span id="email-error" className="mt-1 block text-xs font-normal text-destructive">{formErrors.email}</span>}
                  </label>
                </div>
                <label className="mt-5 block text-sm font-semibold">
                  What should we work through?
                  <textarea
                    value={formValues.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    className="form-field mt-2 min-h-36 resize-y"
                    placeholder="A project, an opportunity, a technical question…"
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                    data-testid="input-contact-message"
                  />
                  {formErrors.message && <span id="message-error" className="mt-1 block text-xs font-normal text-destructive">{formErrors.message}</span>}
                </label>
                <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs leading-5 text-muted-foreground">Local validation only · no message will be sent</span>
                  <button type="submit" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="button-submit-contact">
                    Prepare message <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="section-wrap flex flex-col gap-5 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono">© 2027 Chethan Nayaka K M</span>
        <div className="flex flex-wrap items-center gap-4">
          <a href="https://github.com/chethannayaka" target="_blank" rel="noreferrer" className="focus-ring font-semibold text-foreground hover:text-primary" data-testid="link-footer-github">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/chethan-nayaka-km-8407713b2" target="_blank" rel="noreferrer" className="focus-ring font-semibold text-foreground hover:text-primary" data-testid="link-footer-linkedin">
            LinkedIn
          </a>
          <a href="mailto:nayakchethan666@gmail.com" className="focus-ring font-semibold text-foreground hover:text-primary" data-testid="link-footer-email">
            Email
          </a>
          <a href="#home" className="focus-ring inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary" data-testid="link-back-top">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function PortfolioPage() {
  return (
    <div className="portfolio-shell min-h-[100dvh]">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <section className="section-wrap scroll-mt-24 py-16 sm:py-20" aria-labelledby="api-heading">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <p className="eyebrow">07 / Live integration</p>
              <h2 id="api-heading" className="mt-3 font-display text-3xl font-semibold">Show, don&apos;t just say.</h2>
            </div>
            <Code2 className="hidden text-primary sm:block" size={28} strokeWidth={1.5} />
          </div>
          <ApiDemo />
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}