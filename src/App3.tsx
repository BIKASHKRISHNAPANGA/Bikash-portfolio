import type React from "react";
import { useState, useEffect, useRef } from "react";
import Bikash from "@/image/bikash-photo.jpg";

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
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const ProjectCard: React.FC<{
    title: string;
    tech: string;
    description: string;
    status?: string;
  }> = ({ title, tech, description, status }) => (
    <div className="border border-gray-600 rounded p-3 mb-2 bg-gray-800/50">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-cyan-400 font-bold">{title}</h3>
        {status && (
          <span className="text-green-400 text-xs px-2 py-1 bg-green-400/20 rounded">
            {status}
          </span>
        )}
      </div>
      <div className="text-yellow-400 text-sm mb-1">{tech}</div>
      <div className="text-gray-300 text-sm">{description}</div>
    </div>
  );

  const SkillBar: React.FC<{ skill: string; level: number }> = ({
    skill,
    level,
  }) => (
    <div className="mb-2">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-cyan-400">{skill}</span>
        <span className="text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );

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
                  <span className="text-green-400">skills</span> - View
                  technical skills
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
          <div className="text-cyan-400 font-bold text-xl mb-4">
            🚀 About Me
          </div>
          <div className="bg-gray-800/50 border border-gray-600 rounded p-4 mb-4">
            <div className="text-green-400 font-bold mb-2">
              Result-Driven Full-Stack Developer
            </div>
            <div className="text-gray-300 mb-4">
              Passionate about building scalable, AI-powered applications that
              solve real-world problems. I thrive in fast-paced environments and
              love turning complex challenges into elegant solutions.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-yellow-400 font-bold">📍 Location</div>
                <div className="text-gray-300">
                  Gopalpur on Sea, Ganjam, Odisha
                </div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold">🎓 Education</div>
                <div className="text-gray-300">B.Tech - 7.9 GPA</div>
                <div className="text-gray-400 text-xs">
                  Gayatri Institute of Engineering
                </div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold">
                  💼 Current Focus
                </div>
                <div className="text-gray-300">
                  BABY.AI - Relationship Wellness Bot
                </div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold">🎯 Status</div>
                <div className="text-green-400">
                  Available for Opportunities
                </div>
              </div>
            </div>
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
          <div className="text-cyan-400 font-bold text-xl mb-4">
            ⚡ Technical Skills
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-600 rounded p-4">
              <div className="text-yellow-400 font-bold mb-3">
                🎨 Frontend Development
              </div>
              <SkillBar skill="React.js / Next.js" level={90} />
              <SkillBar skill="TypeScript" level={85} />
              <SkillBar skill="Tailwind CSS" level={88} />
              <SkillBar skill="UI/UX Design" level={80} />
            </div>
            <div className="bg-gray-800/50 border border-gray-600 rounded p-4">
              <div className="text-yellow-400 font-bold mb-3">
                ⚙️ Backend Development
              </div>
              <SkillBar skill="Node.js / Express" level={82} />
              <SkillBar skill="API Development" level={85} />
              <SkillBar skill="Database Design" level={78} />
              <SkillBar skill="Appwrite (BaaS)" level={80} />
            </div>
          </div>
          <div className="mt-4 bg-gray-800/50 border border-gray-600 rounded p-4">
            <div className="text-yellow-400 font-bold mb-3">
              🛠️ Tools & Technologies
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "Git",
                "GitHub",
                "VS Code",
                "Docker",
                "AWS",
                "Vercel",
                "MongoDB",
                "PostgreSQL",
                "Redis",
                "Socket.io",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            🏆 <strong>Certifications:</strong> Full Stack Developer (Appwrite),
            Complete Web Development Bootcamp
          </div>
        </div>
      ),
    },
    experience: {
      description: "See my work experience",
      category: "portfolio",
      output: () => (
        <div>
          <div className="text-cyan-400 font-bold text-xl mb-4">
            💼 Work Experience
          </div>

          <div className="bg-gray-800/50 border border-gray-600 rounded p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-green-400 font-bold text-lg">
                  Software Developer Intern
                </div>
                <div className="text-yellow-400">MentorsLand</div>
              </div>
              <div className="text-gray-400 text-sm">6 Months</div>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                🏗️ Contributed to core features in production-grade full-stack
                applications
              </div>
              <div>
                🤖 Built 'NineBug' - AI-powered coding interview preparation
                platform
              </div>
              <div>
                ⚡ Achieved 80% faster data response across modules through
                optimization
              </div>
              <div>
                🎯 Solved complex data handling and authentication challenges
              </div>
              <div>
                👥 Collaborated in agile environment with focus on clean code
                practices
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-600 rounded p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-green-400 font-bold text-lg">
                  Personal Project
                </div>
                <div className="text-yellow-400">
                  BABY.AI - Relationship Wellness Bot
                </div>
              </div>
              <div className="text-green-400 text-sm px-2 py-1 bg-green-400/20 rounded">
                In Progress
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <div>
                💝 Self-initiated WhatsApp bot for relationship wellness
              </div>
              <div>
                🔮 Integrates menstrual cycle data with astrology (VedAstro API)
              </div>
              <div>
                🤖 Uses AI to craft personalized daily wellness messages
              </div>
              <div>🔒 Privacy-first design with real-time messaging logic</div>
            </div>
          </div>
        </div>
      ),
    },
    projects: {
      description: "Browse my projects",
      category: "portfolio",
      output: () => (
        <div>
          <div className="text-cyan-400 font-bold text-xl mb-4">
            🚀 Featured Projects
          </div>
          <div className="space-y-4">
            <ProjectCard
              title="Blog App with Rich Editor"
              tech="Next.js • TypeScript • Tiptap • Tailwind"
              description="Full-featured blogging platform with custom rich text editor, tag system, and publishing workflows"
              status="Completed"
            />
            <ProjectCard
              title="YourLogo React Demo"
              tech="React • TypeScript • React Router"
              description="Comprehensive React application showcasing routing, nested layouts, and dynamic page generation"
              status="Live"
            />
            <ProjectCard
              title="Responsive Portfolio Website"
              tech="HTML5 • CSS3 • JavaScript"
              description="Fully responsive personal portfolio with modern design and smooth animations"
              status="Live"
            />
            <ProjectCard
              title="Performance-Optimized Todo App"
              tech="React • Tailwind CSS • Local Storage"
              description="Minimal task manager focusing on performance optimization and clean user experience"
              status="Completed"
            />
            <ProjectCard
              title="Course Marketplace UI"
              tech="React • CSS Modules • Responsive Design"
              description="Clean, modern interface for digital course marketplace with intuitive navigation"
              status="Completed"
            />
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            🔗 Visit my GitHub for complete source code and live demos
          </div>
        </div>
      ),
    },
    contact: {
      description: "Get my contact information",
      category: "portfolio",
      output: () => (
        <div>
          <div className="text-cyan-400 font-bold text-xl mb-4">
            📫 Let's Connect!
          </div>
          <div className="bg-gray-800/50 border border-gray-600 rounded p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">📧</span>
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <div className="text-green-400">
                      pangsbikashkrishna@gmail.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">📱</span>
                  <div>
                    <div className="text-gray-400 text-sm">Phone</div>
                    <div className="text-green-400">+91 9348258150</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">💼</span>
                  <div>
                    <div className="text-gray-400 text-sm">LinkedIn</div>
                    <div className="text-blue-400 hover:underline cursor-pointer">
                      linkedin.com/in/bikash-krishna-panga
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-400">📍</span>
                  <div>
                    <div className="text-gray-400 text-sm">Location</div>
                    <div className="text-green-400">
                      Gopalpur on Sea, Ganjam, Odisha
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-gray-300 mb-2">
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
            My resume contains detailed information about my experience, skills,
            and projects.
          </div>
          <div className="bg-blue-500/20 border border-blue-500 rounded p-3 text-blue-400">
            📥 Resume download would be available in a real implementation
          </div>
        </div>
      ),
    },
    ls: {
      description: "List available sections",
      category: "system",
      output: `about.txt    skills.txt    experience.log    projects.md    contact.info
README.md    portfolio.json    resume.pdf    .gitignore    package.json`,
    },
    clear: {
      description: "Clear the terminal",
      category: "system",
      output: "clear",
    },
  };

  const NeofetchDisplay: React.FC = () => {
    const asciiArt = (
      <img
        src={Bikash}
        alt="Bikash krishna Panga "
        className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
      />
    );

    const systemInfo = [
      { label: "", value: "bikash@portfolio" },
      { label: "", value: "-------------------" },
      { label: "OS", value: "Developer Portfolio LTS 22.04" },
      { label: "Host", value: "Full-Stack Developer Workstation" },
      { label: "Kernel", value: "React-Next.js-6.0.0-enhanced" },
      { label: "Uptime", value: "Available for opportunities 24/7" },
      { label: "Packages", value: "60+ (npm), 25+ (core skills)" },
      { label: "Shell", value: "TypeScript 5.2.21 /w ESLint" },
      { label: "Resolution", value: "Fully Responsive Design" },
      { label: "DE", value: "VS Code Pro 46.0" },
      { label: "WM", value: "Git Workflow Manager" },
      { label: "WM Theme", value: "Clean Code Architecture" },
      { label: "Theme", value: "Modern UI/UX Experience" },
      { label: "Icons", value: "Lucide React + Custom" },
      { label: "Terminal", value: "Enhanced Interactive Terminal" },
      { label: "CPU", value: "Problem Solving @ 3.8GHz Logic" },
      { label: "GPU", value: "Creative Design Thinking RTX" },
      { label: "Memory", value: "7.9 GPA + Continuous Learning Buffer" },
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
      <div className="font-mono text-sm">
        <div className="flex">
          <div className="text-orange-400 mr-8 whitespace-pre leading-tight">
            {asciiArt}
          </div>
          <div className="flex-1 space-y-1">
            {systemInfo.map((info, index) => (
              <div key={index} className="flex">
                {info.label && (
                  <>
                    <span className="text-cyan-400 font-bold w-24">
                      {info.label}
                    </span>
                    <span className="text-white mr-2">:</span>
                  </>
                )}
                <span
                  className={
                    info.label
                      ? "text-white"
                      : index === 0
                      ? "text-cyan-400 font-bold text-lg"
                      : "text-cyan-400"
                  }
                >
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex space-x-1">
          {colors.map((color, index) => (
            <div key={index} className={`w-6 h-4 ${color} rounded-sm`}></div>
          ))}
        </div>
      </div>
    );
  };

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
              <div className="text-blue-400 font-bold mb-1">
                🚀 Quick Start:
              </div>
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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (cmd: string): Promise<void> => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: string | React.ReactNode = "";

    if (trimmedCmd === "") {
      return;
    }

    // Add command to history first
    const newEntry: HistoryEntry = {
      command: cmd,
      output: "",
      timestamp: new Date(),
    };

    if (trimmedCmd === "clear") {
      setHistory([]);
      setShowNeofetch(false);
      return;
    }

    setIsLoading(true);

    // Simulate loading delay for better UX
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 200 + 100)
    );

    if (trimmedCmd === "neofetch") {
      setShowNeofetch(true);
      newEntry.output = "neofetch";
    } else if (commands[trimmedCmd]) {
      const command = commands[trimmedCmd];
      output =
        typeof command.output === "function"
          ? command.output()
          : command.output;
      newEntry.output = output;
      setShowNeofetch(false);
    } else {
      // Enhanced error message with suggestions
      const availableCommands = Object.keys(commands);
      const suggestions = availableCommands
        .filter((cmd) => cmd.includes(trimmedCmd) || trimmedCmd.includes(cmd))
        .slice(0, 3);

      output = (
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
      newEntry.output = output;
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
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter((cmd) =>
        cmd.startsWith(currentInput.toLowerCase())
      );
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      } else if (matches.length > 1) {
        // Show multiple matches
        const matchesOutput = (
          <div>
            <div className="text-yellow-400 mb-1">Multiple matches:</div>
            <div className="text-green-400">{matches.join("  ")}</div>
          </div>
        );
        setHistory((prev) => [
          ...prev,
          {
            command: `${currentInput}<TAB>`,
            output: matchesOutput,
            timestamp: new Date(),
          },
        ]);
      }
    } else if (e.key === "Escape") {
      setCurrentInput("");
      setHistoryIndex(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-green-400">
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
            .typing-cursor {
              animation: blink 1s infinite;
            }
            .terminal-glow {
              animation: glow 3s ease-in-out infinite;
            }
            .terminal-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .terminal-scrollbar::-webkit-scrollbar-track {
              background: #1a1a1a;
            }
            .terminal-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to bottom, #4ade80, #22d3ee);
              border-radius: 4px;
            }
          `,
        }}
      />

      {/* Enhanced Terminal Header */}
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
        <div className="text-gray-400 text-xs flex items-center space-x-4">
          <span>🕒 {currentTime.toLocaleTimeString()}</span>
          <span>Terminal v2.0</span>
        </div>
      </div>

      {/* Enhanced Terminal Content */}
      <div
        ref={terminalRef}
        className="px-6 py-6 font-mono text-sm overflow-y-auto terminal-scrollbar"
        style={{ height: "calc(100vh - 72px)" }}
      >
        {/* Command History */}
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

        {/* Show neofetch on initial load */}
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

        {/* Current Input Line */}
        <div className="flex items-center">
          <span className="text-green-400 font-bold">bikash@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-white ml-2 flex-1 outline-none font-mono placeholder-gray-500"
            placeholder={
              isLoading
                ? "Processing..."
                : "Type 'help' for available commands..."
            }
            autoFocus
            disabled={isLoading}
          />
          <span className="typing-cursor text-white ml-1">_</span>
        </div>

        {/* Command suggestions */}
        {currentInput && !isLoading && (
          <div className="mt-2 text-gray-400 text-xs">
            {Object.keys(commands)
              .filter((cmd) => cmd.startsWith(currentInput.toLowerCase()))
              .slice(0, 5)
              .map((suggestion, index) => (
                <span key={suggestion} className="mr-4">
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

      {/* Enhanced Footer with additional info */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 px-4 py-2 text-xs text-gray-400 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>💻 Portfolio Terminal v2.0</span>
          <span>📦 {Object.keys(commands).length} commands available</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>🔗 Interactive Experience</span>
          <span>⚡ Enhanced & Optimized</span>
        </div>
      </div>
    </div>
  );
};

export default NeofetchPortfolio;
