import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { PROCESS_STEPS } from '@/data/portfolio';

const ICONS: Record<string, React.ReactNode> = {
  Search: <Search className="w-7 h-7" />,
  PenTool: <PenTool className="w-7 h-7" />,
  Code2: <Code2 className="w-7 h-7" />,
  Rocket: <Rocket className="w-7 h-7" />,
};

export function Process() {
  return (
    <section id="process" className="py-20 sm:py-28 scroll-mt-20">
      <div className="section-padding">
        <SectionHeading
          badge="Process"
          title="How I Build Your Website"
          subtitle="A clear, step-by-step process from idea to deployment."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex absolute top-12 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-500 border-4 border-navy-950 z-10" />

                <div className="glass-card p-6 text-center hover:bg-white/[0.06] hover:border-accent-500/30 transition-all">
                  <div className="text-3xl font-bold text-navy-700 mb-3">{step.number}</div>
                  <div className="w-14 h-14 rounded-2xl bg-accent-500/10 flex items-center justify-center text-accent-400 mx-auto mb-4">
                    {ICONS[step.icon]}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-navy-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
