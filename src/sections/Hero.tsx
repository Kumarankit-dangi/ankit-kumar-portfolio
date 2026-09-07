import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Sparkles, Code2, Terminal } from 'lucide-react';
import { scrollToSection } from '@/utils/scroll';
import { SocialLinks } from '@/components/SocialLinks';

const TECH_BADGES = ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'MySQL'];

const CODE_LINES = [
  { text: 'const developer = {', indent: 0 },
  { text: 'name: "Ankit Kumar",', indent: 1 },
  { text: 'role: "Full-Stack Developer",', indent: 1 },
  { text: 'location: "India",', indent: 1 },
  { text: 'skills: ["React", "Node", "TS"],', indent: 1 },
  { text: 'available: true,', indent: 1 },
  { text: '};', indent: 0 },
  { text: '', indent: 0 },
  { text: 'function buildWebsite(idea) {', indent: 0 },
  { text: 'return design(idea) + develop();', indent: 1 },
  { text: '}', indent: 0 },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[100px]" />

      <div className="section-padding relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - text */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-accent-300 bg-accent-500/10 border border-accent-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400"></span>
                </span>
                AVAILABLE FOR FREELANCE PROJECTS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
            >
              Hi, I'm Ankit Kumar.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text leading-tight"
            >
              I Build Modern Websites That Help Businesses Grow.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-navy-300 text-lg max-w-xl leading-relaxed"
            >
              Full-Stack Web Developer focused on building modern, responsive and user-friendly
              websites and web applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-accent-600 to-accent-500 rounded-xl hover:shadow-xl hover:shadow-accent-500/30 transition-all"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/5 border border-white/15 rounded-xl hover:bg-white/10 transition-all"
              >
                <Briefcase className="w-4 h-4" />
                Start a Project
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-2"
            >
              <SocialLinks />
            </motion.div>
          </div>

          {/* Right side - code editor visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Browser window mockup */}
            <div className="glass rounded-2xl overflow-hidden shadow-2xl">
              {/* Window header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-navy-900/50">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="px-3 py-1 text-xs text-navy-400 bg-navy-800/50 rounded-md text-center">
                    developer.ts
                  </div>
                </div>
                <Terminal className="w-4 h-4 text-navy-500" />
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                {CODE_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.08, duration: 0.3 }}
                    className="flex"
                  >
                    <span className="text-navy-600 select-none w-8 text-right pr-3">
                      {i + 1}
                    </span>
                    <span
                      className="text-navy-300"
                      style={{ paddingLeft: `${line.indent * 20}px` }}
                    >
                      {line.text === '' ? '\u00A0' : line.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating tech badges */}
            <div className="absolute -top-4 -right-2 sm:-right-4 flex flex-wrap gap-2 max-w-[180px] justify-end">
              {TECH_BADGES.slice(0, 3).map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="px-3 py-1.5 text-xs font-medium text-accent-300 bg-accent-500/10 border border-accent-500/20 rounded-lg backdrop-blur-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <div className="absolute -bottom-4 -left-2 sm:-left-4 flex flex-wrap gap-2">
              {TECH_BADGES.slice(3).map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="px-3 py-1.5 text-xs font-medium text-navy-200 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Floating icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -left-6 hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-lg shadow-accent-500/30"
            >
              <Code2 className="w-7 h-7 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
