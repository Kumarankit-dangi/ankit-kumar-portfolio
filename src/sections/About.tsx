import { motion } from 'framer-motion';
import { ArrowRight, Code2, GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { FOCUS_AREAS } from '@/data/portfolio';
import { scrollToSection } from '@/utils/scroll';

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28 scroll-mt-20">
      <div className="section-padding">
        <SectionHeading badge="About Me" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-accent-400">
              <GraduationCap className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Computer Science Student
              </span>
            </div>

            <p className="text-navy-200 text-lg leading-relaxed">
              I'm a Computer Science student and aspiring Full-Stack Web Developer focused on
              building modern websites and practical web applications.
            </p>

            <p className="text-navy-400 leading-relaxed">
              Currently focused on improving my skills in full-stack development, Python, DSA and
              modern web technologies. I believe in building websites that not only look great but
              also solve real business problems and help businesses grow online.
            </p>

            <div>
              <button
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-accent-600 to-accent-500 rounded-xl hover:shadow-lg hover:shadow-accent-500/30 transition-all"
              >
                View My Projects
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right - focus areas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-accent-400" />
              My Focus Areas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FOCUS_AREAS.map((area, i) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-4 hover:bg-white/[0.06] hover:border-accent-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent-400 shrink-0" />
                    <span className="text-navy-200 text-sm font-medium">{area}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
