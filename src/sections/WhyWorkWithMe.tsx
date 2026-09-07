import { motion } from 'framer-motion';
import { Sparkles, Smartphone, Briefcase, MessageSquare, TrendingUp } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { WHY_WORK_WITH_ME } from '@/data/portfolio';

const ICONS: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  MessageSquare: <MessageSquare className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
};

export function WhyWorkWithMe() {
  return (
    <section className="py-20 sm:py-28 bg-navy-900/30">
      <div className="section-padding">
        <SectionHeading
          badge="Why Me"
          title="Why Work With Me"
          subtitle="What sets me apart as a freelance web developer."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_WORK_WITH_ME.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="glass-card p-6 hover:bg-white/[0.06] hover:border-white/15 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400 mb-4 group-hover:scale-110 transition-transform">
                {ICONS[item.icon]}
              </div>
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-navy-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
