import type React from "react";
import { useState, useEffect, useRef } from "react";
import Bikash from "@/image/bikash-photo.jpg";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface HistoryEntry {
  command: string;
  output: string | React.ReactNode;
  timestamp?: Date;
}

interface Command {
  description: string;
  output: string | (() => React.ReactNode);
  category?: string;
}

interface Commands {
  [key: string]: Command;
}

/* -------------------------------------------------------------------------- */
/*  Profile data (single source of truth — mirrors the resume PDF)            */
/* -------------------------------------------------------------------------- */

const PROFILE = {
  name: "Bikash Krishna Panga",
  role: "Web Developer (Full-Stack)",
  email: "developerbikash16@gmail.com",
  phone: "+91 9348258150",
  phoneHref: "tel:+919348258150",
  website: "bikashportfolio.web.app",
  websiteHref: "https://bikashportfolio.web.app",
  linkedin: "linkedin.com/in/bikash-krishna-panga",
  linkedinHref: "https://www.linkedin.com/in/bikash-krishna-panga-254612232/",
  github: "github.com/BIKASHKRISHNAPANGA",
  githubHref: "https://github.com/BIKASHKRISHNAPANGA",
  location: "Gopalpur on Sea, Ganjam, Odisha",
  // Put the PDF in your /public folder with this exact name
  resumeHref: "/Bikash_Krishna_Panga_Resume_Revised.pdf",
  summary:
    "Web Developer with hands-on internship experience across React.js, Node.js, and WordPress. Built a customizable rich-text editor that cut page load time by 76%, and led a student sponsorship initiative that raised ₹4 lakh from 6 sponsors across 31 schools, engaging 3,000+ students.",
};

const SKILL_GROUPS: { title: string; icon: string; items: string[] }[] = [
  { title: "Languages", icon: "💬", items: ["JavaScript (ES6+)", "TypeScript"] },
  {
    title: "Frontend",
    icon: "🎨",
    items: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  { title: "Mobile", icon: "📱", items: ["React Native"] },
  {
    title: "Backend",
    icon: "⚙️",
    items: ["Node.js", "Express.js", "REST API Development"],
  },
  {
    title: "Libraries",
    icon: "📚",
    items: ["Tiptap.js", "Redux / Context API", "Axios"],
  },
  {
    title: "Database / CMS",
    icon: "🗄️",
    items: ["MongoDB", "Firebase", "WordPress"],
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    items: ["Git", "GitHub", "Vercel", "Netlify", "Postman"],
  },
  {
    title: "Core Concepts",
    icon: "🧠",
    items: [
      "Data Structures & Algorithms",
      "Performance Optimization",
      "SEO Optimization",
      "Cross-Browser Compatibility",
      "Agile Development",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Small presentational components (defined OUTSIDE the main component so    */
/*  they are not re-created on every render)                                  */
/* -------------------------------------------------------------------------- */

const Panel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-gray-800/50 border border-gray-600 rounded p-4 ${className}`}
  >
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-cyan-400 font-bold text-xl mb-4">{children}</div>
);

const Chip: React.FC<{ children: React.ReactNode; tone?: string }> = ({
  children,
  tone = "bg-blue-500/20 text-blue-400",
}) => (
  <span className={`px-2 py-1 rounded text-sm ${tone}`}>{children}</span>
);

const ProjectCard: React.FC<{
  title: string;
  tech: string;
  period: string;
  link?: string;
  points: string[];
  status?: string;
}> = ({ title, tech, period, link, points, status }) => (
  <div className="border border-gray-600 rounded p-4 bg-gray-800/50">
    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
      <h3 className="text-cyan-400 font-bold">{title}</h3>
      {status && (
        <span className="text-green-400 text-xs px-2 py-1 bg-green-400/20 rounded">
          {status}
        </span>
      )}
    </div>
    <div className="text-gray-400 text-xs mb-2">{period}</div>
    <div className="text-yellow-400 text-sm mb-2">{tech}</div>
    <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
      {points.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
    {link && (
      <a
        href={`https://${link}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-blue-400 hover:underline text-sm break-all"
      >
        🔗 {link}
      </a>
    )}
  </div>
);

const ExperienceCard: React.FC<{
  role: string;
  company: string;
  place: string;
  period: string;
  current?: boolean;
  points: string[];
}> = ({ role, company, place, period, current, points }) => (
  <Panel>
    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
      <div>
        <div className="text-green-400 font-bold text-lg">{role}</div>
        <div className="text-yellow-400">
          {company} <span className="text-gray-400">• {place}</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-gray-400 text-sm">{period}</div>
        {current && (
          <span className="text-green-400 text-xs px-2 py-1 bg-green-400/20 rounded">
            Current
          </span>
        )}
      </div>
    </div>
    <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
      {points.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  </Panel>
);

const ContactRow: React.FC<{
  icon: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  tone?: string;
}> = ({ icon, label, value, href, external, tone = "text-green-400" }) => (
  <div className="flex items-start gap-3">
    <span className="text-yellow-400 text-xl">{icon}</span>
    <div className="min-w-0">
      <div className="text-gray-400 text-sm">{label}</div>
      {href ? (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={`${tone} hover:underline break-all`}
        >
          {value}
        </a>
      ) : (
        <div className={tone}>{value}</div>
      )}
    </div>
  </div>
);

const NeofetchDisplay: React.FC = () => {
  const photo = (
    <img
      src={Bikash}
      alt={PROFILE.name}
      className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full bg-slate-700 object-cover mx-auto md:mx-0 shadow-md"
    />
  );

  const systemInfo = [
    { label: "", value: "bikash@portfolio" },
    { label: "", value: "-------------------" },
    { label: "OS", value: "Developer Portfolio LTS 26.04" },
    { label: "Host", value: PROFILE.role },
    { label: "Role", value: "Web Development Intern @ Addensure Media" },
    { label: "Kernel", value: "React-Next.js-Node-6.0.0" },
    { label: "Uptime", value: "Building since 2022 (B.Tech CSE)" },
    { label: "Packages", value: "React, Next.js, Express, Tiptap, Redux" },
    { label: "Shell", value: "TypeScript /w Tailwind CSS" },
    { label: "CMS", value: "WordPress themes & plugins" },
    { label: "Mobile", value: "React Native" },
    { label: "DB", value: "MongoDB • Firebase" },
    { label: "Deploy", value: "Vercel • Netlify" },
    { label: "Impact", value: "76% faster page load (Tiptap editor)" },
    { label: "Events", value: "₹4 lakh raised • 31 schools • 3,000+ students" },
    { label: "Rank", value: "Top 5% of batch" },
    { label: "Award", value: "Runner-up, Ganjam Coding Competition" },
    { label: "Web", value: PROFILE.website },
  ];

  const colors = [
    "bg-gray-800",
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-cyan-500",
    "bg-white",
  ];

  return (
    <div className="font-mono text-sm text-white max-w-screen-xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        <div className="text-orange-400">{photo}</div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1 w-full">
          {systemInfo.map((info, index) => (
            <div key={index} className="flex">
              {info.label && (
                <>
                  <span className="text-cyan-400 font-bold w-24 shrink-0">
                    {info.label}
                  </span>
                  <span className="text-white mr-2">:</span>
                </>
              )}
              <span
                className={
                  info.label
                    ? "text-white break-words min-w-0"
                    : index === 0
                    ? "text-cyan-400 font-bold text-lg col-span-2"
                    : "text-cyan-400"
                }
              >
                {info.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-6 h-4 ${color} rounded-sm shadow-sm`}
          ></div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

const NeofetchPortfolio: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [showNeofetch, setShowNeofetch] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const commands: Commands = {
    help: {
      description: "Show available commands",
      category: "system",
      output: () => (
        <div>
          <div className="text-cyan-400 font-bold text-lg mb-4">
            📋 Available Commands
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-yellow-400 font-bold mb-2">
                🔧 System Commands
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-green-400">help</span> - Show this help
                  message
                </div>
                <div>
                  <span className="text-green-400">neofetch</span> - Display
                  system information
                </div>
                <div>
                  <span className="text-green-400">clear</span> - Clear the
                  terminal
                </div>
                <div>
                  <span className="text-green-400">whoami</span> - Display
                  current user
                </div>
                <div>
                  <span className="text-green-400">date</span> - Show current
                  date and time
                </div>
                <div>
                  <span className="text-green-400">pwd</span> - Print working
                  directory
                </div>
                <div>
                  <span className="text-green-400">ls</span> - List sections
                </div>
              </div>
            </div>
            <div>
              <div className="text-yellow-400 font-bold mb-2">
                👤 Portfolio Commands
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-green-400">about</span> - Learn about me
                </div>
                <div>
                  <span className="text-green-400">skills</span> - Technical
                  skills
                </div>
                <div>
                  <span className="text-green-400">experience</span> - Work
                  experience
                </div>
                <div>
                  <span className="text-green-400">projects</span> - Browse
                  projects
                </div>
                <div>
                  <span className="text-green-400">education</span> - Education
                  details
                </div>
                <div>
                  <span className="text-green-400">achievements</span> -
                  Certifications & awards
                </div>
                <div>
                  <span className="text-green-400">contact</span> - Contact
                  information
                </div>
                <div>
                  <span className="text-green-400">resume</span> - Download
                  resume
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            💡 <strong>Tips:</strong> Use ↑/↓ arrows for command history, Tab
            for autocomplete
          </div>
        </div>
      ),
    },
    neofetch: {
      description: "Display system information",
      category: "system",
      output: "neofetch",
    },
    about: {
      description: "Learn about me",
      category: "portfolio",
      output: () => (
        <div>
          <SectionTitle>🚀 About Me</SectionTitle>
          <Panel className="mb-4">
            <div className="text-green-400 font-bold mb-2">{PROFILE.role}</div>
            <div className="text-gray-300 mb-4">{PROFILE.summary}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-yellow-400 font-bold">📍 Location</div>
                <div className="text-gray-300">{PROFILE.location}</div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold">🎓 Education</div>
                <div className="text-gray-300">
                  B.Tech, Computer Science Engineering (2022 – 2026)
                </div>
                <div className="text-gray-400 text-xs">
                  Gayatri Institute of Engineering and Technology • Top 5% of
                  batch
                </div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold">
                  💼 Current Role
                </div>
                <div className="text-gray-300">
                  Web Development Intern @ Addensure Media LLP
                </div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold">🎯 Status</div>
                <div className="text-green-400">
                  Available for Opportunities
                </div>
              </div>
            </div>
          </Panel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-center">
            <Panel>
              <div className="text-green-400 text-2xl font-bold">76%</div>
              <div className="text-gray-400 text-xs">
                page load time reduction
              </div>
            </Panel>
            <Panel>
              <div className="text-green-400 text-2xl font-bold">₹4 lakh</div>
              <div className="text-gray-400 text-xs">
                raised from 6 sponsors
              </div>
            </Panel>
            <Panel>
              <div className="text-green-400 text-2xl font-bold">3,000+</div>
              <div className="text-gray-400 text-xs">
                students across 31 schools
              </div>
            </Panel>
          </div>
          <div className="text-gray-400 text-sm">
            💡 Type <span className="text-green-400">'skills'</span> to see my
            technical expertise
          </div>
        </div>
      ),
    },
    skills: {
      description: "View my technical skills",
      category: "portfolio",
      output: () => (
        <div>
          <SectionTitle>⚡ Technical Skills</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILL_GROUPS.map((group) => (
              <Panel key={group.title}>
                <div className="text-yellow-400 font-bold mb-3">
                  {group.icon} {group.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
          <Panel className="mt-4">
            <div className="text-yellow-400 font-bold mb-2">
              🤖 AI-Assisted Development
            </div>
            <div className="text-gray-300 text-sm">
              Prompt engineering with Claude, ChatGPT, and GitHub Copilot for
              code generation and debugging.
            </div>
          </Panel>
          <div className="mt-4 text-gray-400 text-sm">
            🏆 Type <span className="text-green-400">'achievements'</span> for
            certifications and awards
          </div>
        </div>
      ),
    },
    experience: {
      description: "See my work experience",
      category: "portfolio",
      output: () => (
        <div>
          <SectionTitle>💼 Work Experience</SectionTitle>
          <div className="space-y-4">
            <ExperienceCard
              role="Web Development Intern"
              company="Addensure Media LLP"
              place="Delhi, India"
              period="March 2026 – Present"
              current
              points={[
                "Designing and implementing modern UI components using React.js for seamless user interaction",
                "Developing and maintaining multiple responsive WordPress websites, improving user experience and site performance",
                "Building and customizing themes and plugins to meet client requirements",
                "Leveraging React Native to develop and optimize mobile application features",
              ]}
            />
            <ExperienceCard
              role="Software Developer Intern"
              company="MentorsLand"
              place="Assam, India"
              period="Mar 5, 2025 – Sep 3, 2025"
              points={[
                "Engineered a customizable rich-text editor using Tiptap.js, enhancing content management capabilities",
                "Optimized frontend performance, achieving a 76% reduction in page load time",
                "Designed and implemented an interactive dashboard with efficient state management and REST API integration",
              ]}
            />
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            💡 Type <span className="text-green-400">'projects'</span> to see
            what I've built
          </div>
        </div>
      ),
    },
    projects: {
      description: "Browse my projects",
      category: "portfolio",
      output: () => (
        <div>
          <SectionTitle>🚀 Featured Projects</SectionTitle>
          <div className="space-y-4">
            <ProjectCard
              title="Bikash Agro Export"
              tech="JavaScript • Intersection Observer API • Responsive Design"
              period="December 2025 – January 2026 • Personal Project"
              link="bikashpanga-agroexports.netlify.app"
              status="Live"
              points={[
                "Fully responsive agricultural export website with dynamic scroll animations",
                "Conversion-focused, mobile-first interface with smooth scrolling navigation",
                "Direct communication features (click-to-call, email, WhatsApp) for lead generation",
                "Optimized DOM handling for faster load times",
              ]}
            />
            <ProjectCard
              title="IOSF — Inter-School Event Platform"
              tech="HTML • CSS • JavaScript • React • Tailwind CSS • REST APIs"
              period="September 5, 2025 – December 2, 2025"
              link="interschoolosf.in"
              status="Live"
              points={[
                "Built and maintained the website with REST APIs for dynamic content rendering",
                "Coordinated event operations engaging 31 schools and 3,000+ student participants",
                "Secured 6 sponsors, raising ₹4 lakh in event funding",
                "Improved performance and usability to support peak registration traffic",
              ]}
            />
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            🔗 Visit my GitHub for more source code:{" "}
            <a
              href={PROFILE.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {PROFILE.github}
            </a>
          </div>
        </div>
      ),
    },
    education: {
      description: "View my education",
      category: "portfolio",
      output: () => (
        <div>
          <SectionTitle>🎓 Education</SectionTitle>
          <div className="space-y-4">
            <Panel>
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div>
                  <div className="text-green-400 font-bold text-lg">
                    B.Tech, Computer Science Engineering
                  </div>
                  <div className="text-yellow-400">
                    Gayatri Institute of Engineering and Technology
                  </div>
                </div>
                <div className="text-gray-400 text-sm">2022 – 2026</div>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
                <li>Ranked among top 5% of batch</li>
                <li>Relevant coursework: Web Development, AI Prompting</li>
              </ul>
            </Panel>
            <Panel>
              <div className="text-green-400 font-bold text-lg">
                De Paul School
              </div>
              <div className="text-yellow-400 mb-2">Brahmapur, India</div>
              <ul className="space-y-1 text-sm text-gray-300 list-disc list-inside">
                <li>Class 12: 80% (2022)</li>
                <li>Class 10: 89% (2020)</li>
              </ul>
            </Panel>
          </div>
        </div>
      ),
    },
    achievements: {
      description: "Certifications & achievements",
      category: "portfolio",
      output: () => (
        <div>
          <SectionTitle>🏆 Certifications & Achievements</SectionTitle>
          <div className="space-y-3">
            <Panel>
              <div className="text-green-400 font-bold">
                The Complete Full-Stack Web Development Bootcamp
              </div>
              <div className="text-gray-400 text-sm">
                Dr. Angela Yu • January 2025
              </div>
            </Panel>
            <Panel>
              <div className="text-green-400 font-bold">
                Runner-up, Ganjam Coding Competition
              </div>
              <div className="text-gray-400 text-sm">
                Problem-Solving & Algorithms
              </div>
            </Panel>
            <Panel>
              <div className="text-green-400 font-bold">
                Led student sponsorship initiative (IOSF)
              </div>
              <div className="text-gray-400 text-sm">
                ₹4 lakh raised • 6 sponsors • 31 schools • 3,000+ students
              </div>
            </Panel>
          </div>
        </div>
      ),
    },
    contact: {
      description: "Get my contact information",
      category: "portfolio",
      output: () => (
        <div>
          <SectionTitle>📫 Let's Connect!</SectionTitle>
          <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <ContactRow
                  icon="📧"
                  label="Email"
                  value={PROFILE.email}
                  href={`mailto:${PROFILE.email}`}
                />
                <ContactRow
                  icon="📱"
                  label="Phone"
                  value={PROFILE.phone}
                  href={PROFILE.phoneHref}
                />
                <ContactRow
                  icon="🌐"
                  label="Portfolio"
                  value={PROFILE.website}
                  href={PROFILE.websiteHref}
                  external
                  tone="text-blue-400"
                />
              </div>
              <div className="space-y-4">
                <ContactRow
                  icon="💼"
                  label="LinkedIn"
                  value={PROFILE.linkedin}
                  href={PROFILE.linkedinHref}
                  external
                  tone="text-blue-400"
                />
                <ContactRow
                  icon="👨🏻‍💻"
                  label="GitHub"
                  value={PROFILE.github}
                  href={PROFILE.githubHref}
                  external
                  tone="text-blue-400"
                />
                <ContactRow
                  icon="📍"
                  label="Location"
                  value={PROFILE.location}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <div className="text-gray-300 text-base mb-2">
              Ready to collaborate on exciting projects! 🚀
            </div>
            <div className="text-gray-400 text-sm">
              Feel free to reach out for opportunities or just to say hi! 👋
            </div>
          </div>
        </div>
      ),
    },
    whoami: {
      description: "Display current user",
      category: "system",
      output: "bikash-krishna-panga",
    },
    pwd: {
      description: "Print working directory",
      category: "system",
      output: "/home/bikash/portfolio",
    },
    date: {
      description: "Show current date and time",
      category: "system",
      output: () => currentTime.toLocaleString(),
    },
    resume: {
      description: "Download resume",
      category: "portfolio",
      output: () => (
        <div>
          <div className="text-cyan-400 font-bold text-lg mb-2">
            📄 Resume Download
          </div>
          <div className="text-gray-300 mb-4">
            My resume covers my experience, skills, projects and education in
            detail.
          </div>
          <a
            href={PROFILE.resumeHref}
            download="Bikash_Krishna_Panga_Resume.pdf"
            className="inline-block bg-blue-500/20 border border-blue-500 rounded px-4 py-2 text-blue-400 hover:bg-blue-500/30 transition-colors"
          >
            📥 Download Resume (PDF)
          </a>
        </div>
      ),
    },
    ls: {
      description: "List available sections",
      category: "system",
      output: `about.txt    skills.txt    experience.log    projects.md    education.txt
achievements.md    contact.info    resume.pdf    README.md    package.json`,
    },
    clear: {
      description: "Clear the terminal",
      category: "system",
      output: "clear",
    },
  };

  /* ------------------------------ Effects --------------------------------- */

  useEffect(() => {
    setHistory([
      {
        command: "",
        output: (
          <div>
            <div className="text-green-400 font-bold text-lg mb-2">
              🎉 Welcome to Bikash Krishna Panga's Interactive Portfolio
              Terminal!
            </div>
            <div className="text-gray-300 mb-4">
              Experience my portfolio in a unique terminal interface. Navigate
              through my skills, projects, and experience using familiar
              command-line tools.
            </div>
            <div className="bg-blue-500/20 border border-blue-500 rounded p-3 mb-4">
              <div className="text-blue-400 font-bold mb-1">🚀 Quick Start:</div>
              <div className="text-sm space-y-1">
                <div>
                  • Type{" "}
                  <span className="text-green-400 font-mono">'neofetch'</span>{" "}
                  to see system information
                </div>
                <div>
                  • Type{" "}
                  <span className="text-green-400 font-mono">'help'</span> to
                  explore all available commands
                </div>
                <div>
                  • Use ↑/↓ arrows for command history, Tab for autocomplete
                </div>
              </div>
            </div>
          </div>
        ),
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Re-focus the input after a command finishes (the input is disabled while loading)
  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  /* ------------------------------ Handlers -------------------------------- */

  const handleCommand = async (cmd: string): Promise<void> => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === "") return;

    const newEntry: HistoryEntry = {
      command: cmd,
      output: "",
      timestamp: new Date(),
    };

    if (trimmedCmd === "clear") {
      setHistory([]);
      setShowNeofetch(false);
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      return;
    }

    setIsLoading(true);

    // Small delay for a more "terminal" feel
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 200 + 100)
    );

    if (trimmedCmd === "neofetch") {
      newEntry.output = "neofetch";
      setShowNeofetch(false);
    } else if (commands[trimmedCmd]) {
      const command = commands[trimmedCmd];
      newEntry.output =
        typeof command.output === "function"
          ? command.output()
          : command.output;
      setShowNeofetch(false);
    } else {
      const availableCommands = Object.keys(commands);
      const suggestions = availableCommands
        .filter((c) => c.includes(trimmedCmd) || trimmedCmd.includes(c))
        .slice(0, 3);

      newEntry.output = (
        <div>
          <div className="text-red-400 mb-2">
            ❌ Command not found:{" "}
            <span className="font-bold">{trimmedCmd}</span>
          </div>
          {suggestions.length > 0 && (
            <div className="text-gray-400">
              💡 Did you mean:{" "}
              {suggestions.map((suggestion, index) => (
                <span key={suggestion}>
                  <span className="text-green-400">{suggestion}</span>
                  {index < suggestions.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          )}
          <div className="text-gray-400 mt-1">
            Type <span className="text-green-400">'help'</span> to see all
            available commands.
          </div>
        </div>
      );
      setShowNeofetch(false);
    }

    setHistory((prev) => [...prev, newEntry]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !isLoading) {
      handleCommand(currentInput);
      setCurrentInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!currentInput) return;
      const matches = Object.keys(commands).filter((c) =>
        c.startsWith(currentInput.toLowerCase())
      );
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          {
            command: `${currentInput}<TAB>`,
            output: (
              <div>
                <div className="text-yellow-400 mb-1">Multiple matches:</div>
                <div className="text-green-400">{matches.join("  ")}</div>
              </div>
            ),
            timestamp: new Date(),
          },
        ]);
      }
    } else if (e.key === "Escape") {
      setCurrentInput("");
      setHistoryIndex(-1);
    }
  };

  /* ------------------------------- Render --------------------------------- */

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-green-400"
      onClick={() => inputRef.current?.focus()}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 0 5px rgba(74, 222, 128, 0.5); }
              50% { box-shadow: 0 0 20px rgba(74, 222, 128, 0.8); }
            }
            .typing-cursor { animation: blink 1s infinite; }
            .terminal-glow { animation: glow 3s ease-in-out infinite; }
            .terminal-scrollbar::-webkit-scrollbar { width: 8px; }
            .terminal-scrollbar::-webkit-scrollbar-track { background: #1a1a1a; }
            .terminal-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #4ade80, #22d3ee);
              border-radius: 4px;
            }
            @media (prefers-reduced-motion: reduce) {
              .typing-cursor, .terminal-glow { animation: none; }
            }
          `,
        }}
      />

      {/* Terminal header */}
      <div className="bg-gray-800/90 backdrop-blur-sm px-4 py-3 border-b border-gray-700 flex items-center justify-between shadow-lg">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg hover:bg-red-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg hover:bg-yellow-400 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg hover:bg-green-400 transition-colors cursor-pointer terminal-glow"></div>
        </div>
        <div className="text-white text-sm font-bold flex items-center space-x-2">
          <span>🖥️ bikash@portfolio: ~</span>
          {isLoading && (
            <span className="text-yellow-400 text-xs">Processing...</span>
          )}
        </div>
        <div className="text-gray-400 text-xs hidden sm:flex items-center space-x-4">
          <span>🕒 {currentTime.toLocaleTimeString()}</span>
          <span>Terminal v2.1</span>
        </div>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="px-4 sm:px-6 py-6 font-mono text-sm overflow-y-auto terminal-scrollbar"
        style={{ height: "calc(100vh - 100px)" }}
      >
        {history.map((entry, index) => (
          <div key={index} className="mb-6">
            {entry.command && (
              <div className="flex items-center mb-2">
                <span className="text-green-400 font-bold">
                  bikash@portfolio:~$
                </span>
                <span className="text-white ml-2">{entry.command}</span>
                {entry.timestamp && (
                  <span className="text-gray-500 text-xs ml-auto">
                    {entry.timestamp.toLocaleTimeString()}
                  </span>
                )}
              </div>
            )}
            {entry.output === "neofetch" ? (
              <div className="mt-3 bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                <NeofetchDisplay />
              </div>
            ) : (
              <div className="mt-2">
                {typeof entry.output === "string" ? (
                  <div className="whitespace-pre-wrap text-green-400">
                    {entry.output}
                  </div>
                ) : (
                  <div className="text-green-400">{entry.output}</div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Neofetch on initial load */}
        {showNeofetch && history.length === 1 && (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-green-400 font-bold">
                bikash@portfolio:~$
              </span>
              <span className="text-white ml-2">neofetch</span>
            </div>
            <div className="mt-3 bg-gray-800/30 rounded-lg p-4 border border-gray-700">
              <NeofetchDisplay />
            </div>
          </div>
        )}

        {/* Current input line */}
        <div className="flex items-center">
          <span className="text-green-400 font-bold shrink-0">
            bikash@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-white ml-2 flex-1 min-w-0 outline-none font-mono placeholder-gray-500"
            placeholder={
              isLoading ? "Processing..." : "Type 'help' for available commands..."
            }
            aria-label="Terminal command input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            autoFocus
            disabled={isLoading}
          />
          <span className="typing-cursor text-white ml-1">_</span>
        </div>

        {/* Command suggestions */}
        {currentInput && !isLoading && (
          <div className="mt-2 text-gray-400 text-xs flex flex-wrap gap-x-4 gap-y-1">
            {Object.keys(commands)
              .filter((c) => c.startsWith(currentInput.toLowerCase()))
              .slice(0, 5)
              .map((suggestion) => (
                <span key={suggestion}>
                  <span className="text-yellow-400">{suggestion}</span>
                  <span className="text-gray-500">
                    {" "}
                    - {commands[suggestion].description}
                  </span>
                </span>
              ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 px-4 py-2 text-xs text-gray-400 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>💻 Portfolio Terminal v2.1</span>
          <span>📦 {Object.keys(commands).length} commands available</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <span>🔗 Interactive Experience</span>
          <span>⚡ Updated from resume</span>
        </div>
      </div>
    </div>
  );
};

export default NeofetchPortfolio;
