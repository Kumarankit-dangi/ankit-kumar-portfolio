import { motion } from 'framer-motion';
import { Monitor, Server, Code2, Database, Wrench } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { SKILL_CATEGORIES } from '@/data/portfolio';

const ICONS: Record<string, React.ReactNode> = {
  Monitor: <Monitor className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
};

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28 scroll-mt-20 bg-navy-900/30">
      <div className="section-padding">
        <SectionHeading
          badge="Skills"
          title="Technical Skills"
          subtitle="Technologies and tools I work with across the full stack."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:bg-white/[0.06] hover:border-white/15 transition-all group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400 group-hover:scale-110 transition-transform">
                  {ICONS[category.icon]}
                </div>
                <h3 className="text-white font-semibold text-lg">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium text-navy-200 bg-white/5 border border-white/10 rounded-lg hover:border-accent-500/30 hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
