import React, { useState, useEffect, useRef } from "react";
import Bikash from "@/image/bikash-photo.jpg"
interface HistoryEntry {
  command: string;
  output: string;
}

interface Command {
  description: string;
  output: string;
}

interface Commands {
  [key: string]: Command;
}

const TerminalPortfolio: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Commands = {
    help: {
      description: "Show available commands",
      output: `
Available commands:
  help          - Show this help message
  about         - Learn about me
  skills        - View my technical skills
  experience    - See my work experience
  projects      - Browse my projects
  contact       - Get my contact information
  clear         - Clear the terminal
  whoami        - Display current user
  ls            - List available sections
  cat <file>    - Display file contents (e.g., cat about.txt)
  
Type any command to get started!`,
    },
    about: {
      description: "Learn about me",
      output: `
╔═══════════════════════════════════════════════════════════════╗
║                          ABOUT ME                             ║
╚═══════════════════════════════════════════════════════════════╝

Result-driven Full-Stack Web Developer with hands-on experience 
in building scalable, AI-powered, and user-centric applications.

Adept at solving real-world problems through modern tech stacks 
and clean code. Strong focus on performance, UI/UX, and API 
integration.

Open to impactful opportunities in fast-paced environments.

📍 Location: Gopalpur on Sea, Ganjam, Odisha
🎓 Education: B.Tech - 7.9 GPA from Gayatri Institute of Engineering and Technology
💼 Currently working on: BABY.AI - A relationship wellness bot`,
    },
    skills: {
      description: "View my technical skills",
      output: `
╔═══════════════════════════════════════════════════════════════╗
║                       TECHNICAL SKILLS                        ║
╚═══════════════════════════════════════════════════════════════╝

Frontend:
  • Next.js, React.js, TypeScript
  • Tailwind CSS, ShadCN UI, Chakra UI
  • Tiptap (Rich Text Editor)

Backend:
  • Next.js API Routes, Node.js, Express.js
  • Appwrite (BaaS), RESTful APIs
  • Server Actions

Dev Tools:
  • Git, GitHub, VS Code
  • REST Clients, Web3.js
  • AI & Blockchain tools

Certifications:
  • Full Stack Developer Course (Appwrite) - HiteshCodeLab (FreeCodeCamp)
  • The Complete Full-Stack Web Development Bootcamp - Dr. Angela Yu (Udemy)`,
    },
    experience: {
      description: "See my work experience",
      output: `
╔═══════════════════════════════════════════════════════════════╗
║                      WORK EXPERIENCE                          ║
╚═══════════════════════════════════════════════════════════════╝

MentorsLand - Software Developer Intern (6 Months)
  • Contributed to the design and development of several core 
    features in a full-stack production-grade app
  • Built 'NineBug' - an AI-powered platform that supports 
    coding interview and DSA preparation
  • Enhanced UI responsiveness and backend API efficiency, 
    achieving 80% faster data response across modules
  • Solved real-world data handling and authentication challenges 
    using modern frameworks
  • Collaborated in a fast-paced, agile environment ensuring 
    pixel-perfect UI and clean code practices

Personal Project - BABY.AI (In Progress)
  • A self-initiated relationship wellness bot that delivers 
    personalized suggestions to WhatsApp users
  • Uses menstrual cycle data, astrology (VedAstro API), and AI 
    prompts to craft meaningful daily messages
  • Focused on real-time messaging logic, user flow, and 
    privacy-first design
  • Tackling real-life use cases with creativity and real-time 
    data handling`,
    },
    projects: {
      description: "Browse my projects",
      output: `
╔═══════════════════════════════════════════════════════════════╗
║                          PROJECTS                             ║
╚═══════════════════════════════════════════════════════════════╝

1. Blog App (Next.js + TypeScript)
   Custom Tiptap editor, rich content creation, tags, publishing workflows

2. YourLogo (React Application)
   React demo app covering routing, nested layout, dynamic pages
   (React Router + TypeScript)

3. Portfolio Website
   Personal portfolio built with HTML, CSS, JavaScript (fully responsive)

4. To-Do App
   Minimal task manager using Tailwind CSS & local storage (performance-focused)

5. Course Selling Website
   Marketplace design for digital course listing with clean UI/UX`,
    },
    contact: {
      description: "Get my contact information",
      output: `
╔═══════════════════════════════════════════════════════════════╗
║                      CONTACT INFORMATION                      ║
╚═══════════════════════════════════════════════════════════════╝

📧 Email: pangsbikashkrishna@gmail.com
📱 Phone: +91 9348258150
💼 LinkedIn: linkedin.com/in/bikash-krishna-panga
📍 Location: Gopalpur on Sea, Ganjam, Odisha

Ready to collaborate on exciting projects!
Feel free to reach out for opportunities or just to say hi! 👋`,
    },
    whoami: {
      description: "Display current user",
      output: "bikash-krishna-panga",
    },
    ls: {
      description: "List available sections",
      output: `
about.txt    skills.txt    experience.log    projects.md    contact.info
README.md    portfolio.json    resume.pdf`,
    },
    clear: {
      description: "Clear the terminal",
      output: "clear",
    },
  };

  const catCommands: { [key: string]: string } = {
    "about.txt": commands.about.output,
    "skills.txt": commands.skills.output,
    "experience.log": commands.experience.output,
    "projects.md": commands.projects.output,
    "contact.info": commands.contact.output,
    "README.md": `
# Bikash Krishna Panga - Portfolio

Welcome to my terminal-based portfolio!

This interactive terminal showcases my skills, experience, and projects.
Type 'help' to see available commands.

## Quick Start:
- about: Learn about me
- skills: View technical skills
- experience: See work experience
- projects: Browse projects
- contact: Get contact info`,
    "portfolio.json": `
{
  "name": "Bikash Krishna Panga",
  "role": "Full-Stack Web Developer",
  "location": "Gopalpur on Sea, Ganjam, Odisha",
  "email": "pangsbikashkrishna@gmail.com",
  "phone": "+91 9348258150",
  "linkedin": "linkedin.com/in/bikash-krishna-panga",
  "education": {
    "degree": "B.Tech",
    "gpa": "7.9",
    "institution": "Gayatri Institute of Engineering and Technology"
  },
  "status": "Open to opportunities"
}`,
    "resume.pdf":
      "This is a text representation of my resume. For the full PDF version, please contact me!",
  };

  useEffect(() => {
    setHistory([
      {
        command: "",
        output: `
Welcome to Bikash Krishna Panga's Portfolio Terminal!

Type 'help' to see available commands.
Type 'about' to learn more about me.

╔═══════════════════════════════════════════════════════════════╗
║  Ready to explore? Start typing commands below!               ║
╚═══════════════════════════════════════════════════════════════╝`,
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

  const handleCommand = (cmd: string): void => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const [mainCmd, ...args] = trimmedCmd.split(" ");

    let output = "";

    if (trimmedCmd === "") {
      return;
    }

    if (mainCmd === "clear") {
      setHistory([]);
      return;
    }

    if (mainCmd === "cat" && args.length > 0) {
      const filename = args[0];
      if (catCommands[filename]) {
        output = catCommands[filename];
      } else {
        output = `cat: ${filename}: No such file or directory`;
      }
    } else if (commands[mainCmd]) {
      output = commands[mainCmd].output;
    } else {
      output = `Command not found: ${mainCmd}`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
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
      }
    }
  };

  const FloatingOrbs: React.FC = () => {
    const orbs = Array.from({ length: 6 }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
        style={{
          background: `linear-gradient(${
            45 + i * 60
          }deg, #8B5CF6, #06B6D4, #10B981)`,
          width: `${120 + i * 20}px`,
          height: `${120 + i * 20}px`,
          left: `${10 + i * 15}%`,
          top: `${10 + i * 12}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${3 + i * 0.5}s`,
        }}
      />
    ));
    return <>{orbs}</>;
  };

  const CodeMatrix: React.FC = () => {
    const matrixChars = [
      "0",
      "1",
      "{",
      "}",
      "<",
      ">",
      "/",
      "\\",
      "|",
      "-",
      "+",
      "=",
    ];
    const matrix = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute text-sky-400 opacity-20 text-xs font-mono"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
        }}
      >
        {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
      </div>
    ));
    return <>{matrix}</>;
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row">
      <style
        dangerouslySetInnerHTML={{
          __html: `
    @keyframes float {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(180deg);
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(-100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes fadeInUp {
      from {
        transform: translateY(30px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes blink {
      0%, 50% {
        opacity: 1;
      }
      51%, 100% {
        opacity: 0;
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    .slide-in {
      animation: slideIn 0.8s ease-out;
    }

    .fade-in-up {
      animation: fadeInUp 0.6s ease-out;
    }

    .typing-cursor {
      animation: blink 1s infinite;
    }

    .pulse-animation {
      animation: pulse 2s ease-in-out infinite;
    }

    .terminal-scrollbar::-webkit-scrollbar {
      width: 8px;
    }

    .terminal-scrollbar::-webkit-scrollbar-track {
      background: #1a1a1a;
    }

    .terminal-scrollbar::-webkit-scrollbar-thumb {
      background: #4ecdc4;
      border-radius: 4px;
    }

    .glass-effect {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  `,
        }}
      />

      {/* Left Section - Professional Profile */}
      <div className="w-full md:w-2/5 relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingOrbs />
          <CodeMatrix />
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
          {/* Profile Image Container */}
          <div className="slide-in mb-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full glass-effect p-1 pulse-animation">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                  {/* Your image will go here */}
                  <div>
                    <img
                      src={Bikash}
                      alt="Bikash krishna Panga "
                      className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600"
                    />
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="fade-in-up text-center space-y-4">
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Bikash Krishna Panga
              </span>
            </h1>

            <div className="glass-effect rounded-lg p-4 space-y-3">
              <p className="text-xl text-cyan-300 font-semibold">
                Full-Stack Web Developer
              </p>
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm">Available for opportunities</span>
              </div>
            </div>

            {/* Skills Highlight */}
            <div className="glass-effect rounded-lg p-4 mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["React", "TypeScript", "Next.js", "Node.js", "Tailwind"].map(
                  (skill, index) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs rounded-full font-medium"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-6">
              <div className="glass-effect rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-sky-400">7.9</div>
                <div className="text-xs text-gray-400">GPA</div>
              </div>
              <div className="glass-effect rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">6+</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-600"></div>
      </div>

      {/* Right Section - Terminal */}
      <div className="w-full md:w-3/5 bg-gray-900 flex flex-col">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-white text-sm font-bold">
            bikash@portfolio:~$
          </div>
          <div className="text-gray-400 text-xs">Terminal v1.0</div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="flex-1 px-3 py-2 sm:px-4 sm:py-4 text-lime-400 font-mono text-sm overflow-y-auto terminal-scrollbar"
          style={{ maxHeight: "calc(100vh - 60px)" }}
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-4">
              {entry.command && (
                <div className="flex">
                  <span className="text-sky-400 font-bold">
                    bikash@portfolio:~$
                  </span>
                  <span className="text-amber-300  ml-2">{entry.command}</span>
                </div>
              )}
              <div className="whitespace-pre-wrap text-lime-400 mt-1">
                {entry.output}
              </div>
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center">
            <span className="text-sky-400 font-bold">bikash@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-amber-300  ml-2 flex-1 outline-none font-mono"
              placeholder="Type 'help' for commands..."
              autoFocus
            />
            <span className="typing-cursor text-amber-300 ">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPortfolio;