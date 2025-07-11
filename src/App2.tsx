"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
  Code,
  Briefcase,
  Award,
  User,
  ChevronDown,
  MapPin,
  Download,
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  type: "Professional" | "Personal";
  link?: string;
}

interface Skills {
  [key: string]: string[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

function AnimatedSection({
  children,
  className = "",
  id = "",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [activeSection, setActiveSection] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Track which section is in view
  useEffect(() => {
    const sections = ["about", "skills", "experience", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const id = target.getAttribute("href")?.slice(1);
      if (id) {
        setActiveSection(id);
        setIsMenuOpen(false);
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener("click", handleSmoothScroll));

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleSmoothScroll)
      );
    };
  }, []);

  // Copy email to clipboard
  const copyEmail = () => {
    navigator.clipboard.writeText("pangsbikashkrishna@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const skills: Skills = {
    frontend: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN UI",
      "Chakra UI",
      "Tiptap",
    ],
    backend: [
      "Next.js API Routes",
      "Node.js",
      "Express.js",
      "Appwrite",
      "RESTful APIs",
      "Server Actions",
    ],
    tools: [
      "Git",
      "GitHub",
      "VS Code",
      "REST Clients",
      "Web3.js",
      "AI & Blockchain tools",
    ],
  };

  const projects: Project[] = [
    {
      title: "NineBug - AI Coding Platform",
      description:
        "AI-powered platform for coding interview and DSA preparation with enhanced UI responsiveness and 80% faster data response.",
      tech: ["Next.js", "AI Integration", "TypeScript"],
      type: "Professional",
      link: "https://github.com/BIKASHKRISHNAPANGA/NineBug",
    },
    {
      title: "BABY.AI - Relationship Wellness Bot",
      description:
        "WhatsApp bot delivering personalized suggestions using menstrual cycle data and astrology API.",
      tech: ["Node.js", "WhatsApp API", "VedAstro API"],
      type: "Personal",
      link: "https://github.com/BIKASHKRISHNAPANGA/BABY.AI",
    },
    {
      title: "Blog App",
      description:
        "Custom Tiptap editor with rich content creation, tags, and publishing workflows.",
      tech: ["Next.js", "TypeScript", "Tiptap"],
      type: "Personal",
      link: "https://github.com/BIKASHKRISHNAPANGA/Blog-App",
    },
    {
      title: "YourLogo - React Demo",
      description:
        "React demo app covering routing, nested layout, and dynamic pages.",
      tech: ["React", "React Router", "TypeScript"],
      type: "Personal",
      link: "https://github.com/BIKASHKRISHNAPANGA/YourLogo",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              BKP
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Experience", "Projects", "Contact"].map(
                (item) => {
                  const lowerCaseItem = item.toLowerCase();
                  return (
                    <motion.a
                      key={item}
                      href={`#${lowerCaseItem}`}
                      whileHover={{ scale: 1.1 }}
                      className={`hover:text-purple-400 transition-colors relative ${
                        activeSection === lowerCaseItem
                          ? "text-purple-400 font-medium"
                          : "text-white"
                      }`}
                    >
                      {item}
                      {activeSection === lowerCaseItem && (
                        <motion.span
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400"
                          transition={{
                            type: "spring",
                            bounce: 0.25,
                            duration: 0.5,
                          }}
                        />
                      )}
                    </motion.a>
                  );
                }
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/80 backdrop-blur-md overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                {["About", "Skills", "Experience", "Projects", "Contact"].map(
                  (item) => {
                    const lowerCaseItem = item.toLowerCase();
                    return (
                      <motion.a
                        key={item}
                        href={`#${lowerCaseItem}`}
                        className={`py-2 text-lg ${
                          activeSection === lowerCaseItem
                            ? "text-purple-400 font-medium"
                            : "text-white"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item}
                      </motion.a>
                    );
                  }
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
        </motion.div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent px-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              Bikash Krishna Panga
            </motion.h1>
            <motion.p
  initial={fadeInUp.initial}
  animate={fadeInUp.animate}

  className="text-2xl md:text-3xl mb-8 text-gray-300"
>
  Full-Stack Web Developer
</motion.p>

<motion.p
  initial={fadeInUp.initial}
  animate={fadeInUp.animate}

  className="text-lg mb-12 max-w-2xl mx-auto text-gray-400"
>
  Building scalable, AI-powered, and user-centric applications with modern tech stacks
</motion.p>

<motion.div
  initial={fadeInUp.initial}
  animate={fadeInUp.animate}

  className="flex flex-wrap justify-center gap-4 mb-12"
>
  {/* Buttons remain the same */}
  <Button
    variant="outline"
    size="lg"
    className="bg-white/10 border-white/20 hover:bg-white/20 text-white group relative overflow-hidden"
    onClick={copyEmail}
  >
    <Mail className="mr-2 h-4 w-4" />
    {copiedEmail ? "Copied!" : "Contact Me"}
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: copiedEmail ? "100%" : 0 }}
      className="absolute bottom-0 left-0 h-0.5 bg-purple-400"
      transition={{ duration: 0.3 }}
    />
  </Button>

  <Button
    variant="outline"
    size="lg"
    className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
    asChild
  >
    <a href="/resume.pdf" download="Bikash_Krishna_Panga_Resume.pdf">
      <Download className="mr-2 h-4 w-4" />
      Download CV
    </a>
  </Button>

  <Button
    variant="outline"
    size="lg"
    className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
    asChild
  >
    <a
      href="https://github.com/BIKASHKRISHNAPANGA"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Github className="mr-2 h-4 w-4" />
      GitHub
    </a>
  </Button>
</motion.div>
</motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <a href="#about" className="block">
              <ChevronDown className="h-8 w-8 text-purple-400 hover:text-purple-300 cursor-pointer" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection id="about" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div variants={staggerContainer} animate="animate">
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              <User className="inline mr-4 h-8 w-8" />
              About Me
            </motion.h2>
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                <CardContent className="p-8">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Result-driven Full-Stack Web Developer with hands-on
                    experience in building scalable, AI-powered, and
                    user-centric applications. Adept at solving real-world
                    problems through modern tech stacks and clean code. Strong
                    focus on performance, UI/UX, and API integration. Open to
                    impactful opportunities in fast-paced environments.
                  </p>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <Mail className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                      <p className="text-sm text-gray-400">
                        pangsbikashkrishna@gmail.com
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <Phone className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                      <p className="text-sm text-gray-400">+91 9348258150</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <MapPin className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                      <p className="text-sm text-gray-400">
                        Available Worldwide
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Code className="inline mr-4 h-8 w-8" />
            Technical Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 capitalize text-purple-400">
                      {category
                        .replace("frontend", "Front-End")
                        .replace("backend", "Back-End")
                        .replace("tools", "Dev Tools")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <motion.div
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection id="experience" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Briefcase className="inline mr-4 h-8 w-8" />
            Experience
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-purple-400">
                      Software Developer Intern
                    </h3>
                    <Badge className="bg-purple-500/20 text-purple-300 w-fit">
                      6 Months
                    </Badge>
                  </div>
                  <p className="text-lg text-gray-300 mb-4">MentorsLand</p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      Contributed to the design and development of several core
                      features in a full-stack production-grade app
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      Built 'NineBug' - an AI-powered platform that supports
                      coding interview and DSA preparation
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      Enhanced UI responsiveness and backend API efficiency,
                      achieving 80% faster data response across modules
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      Solved real-world data handling and authentication
                      challenges using modern frameworks
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      Collaborated in a fast-paced, agile environment ensuring
                      pixel-perfect UI and clean code practices
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Code className="inline mr-4 h-8 w-8" />
            Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full hover:shadow-lg hover:shadow-purple-500/10 transition-all group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                      <Badge
                        variant={
                          project.type === "Professional"
                            ? "default"
                            : "secondary"
                        }
                        className="bg-purple-500/20 text-purple-300"
                      >
                        {project.type}
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-purple-500/30 text-purple-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-auto w-fit border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                        asChild
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-3 w-3" />
                          View Project
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Certifications Section */}
      <AnimatedSection className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Award className="inline mr-4 h-8 w-8" />
            Certifications & Achievements
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    Full Stack Developer Course
                  </h3>
                  <p className="text-gray-300 mb-2">
                    HiteshCodeLab (FreeCodeCamp)
                  </p>
                  <p className="text-sm text-gray-400">
                    Appwrite Specialization
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                    asChild
                  >
                    <a
                      href="https://certificate.hiteshchoudhary.com/verify/94362839483294"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Certificate
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    Complete Full-Stack Web Development Bootcamp
                  </h3>
                  <p className="text-gray-300 mb-2">Dr. Angela Yu</p>
                  <p className="text-sm text-gray-400">Udemy</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                    asChild
                  >
                    <a
                      href="https://www.udemy.com/certificate/UC-94362839483294/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Certificate
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            <Mail className="inline mr-4 h-8 w-8" />
            Let's Work Together
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-lg text-gray-300 mb-8">
              Open to internships, freelance roles, and full-time software
              development opportunities.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={copyEmail}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {copiedEmail ? "Email Copied!" : "Copy Email"}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                  asChild
                >
                  <a
                    href="https://linkedin.com/in/bikash-krishna-panga"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-8 bg-black/40 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <motion.a
              href="https://github.com/BIKASHKRISHNAPANGA"
              target="_blank"
              whileHover={{ scale: 1.2, color: "#9333ea" }}
              className="text-gray-400 hover:text-purple-400"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/bikash-krishna-panga"
              target="_blank"
              whileHover={{ scale: 1.2, color: "#9333ea" }}
              className="text-gray-400 hover:text-purple-400"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </motion.a>
            <motion.a
              href="mailto:pangsbikashkrishna@gmail.com"
              whileHover={{ scale: 1.2, color: "#9333ea" }}
              className="text-gray-400 hover:text-purple-400"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </motion.a>
          </div>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Bikash Krishna Panga. Built with
            Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
