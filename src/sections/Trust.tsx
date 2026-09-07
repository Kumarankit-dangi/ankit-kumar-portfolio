import { motion } from 'framer-motion';
import { Palette, Smartphone, Briefcase, Layers } from 'lucide-react';
import { TRUST_CARDS } from '@/data/portfolio';

const ICONS: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

export function Trust() {
  return (
    <section className="py-16 sm:py-20 border-t border-white/5">
      <div className="section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 hover:bg-white/[0.06] hover:border-white/15 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400 mb-4 group-hover:scale-110 transition-transform">
                {ICONS[card.icon]}
              </div>
              <h3 className="text-white font-semibold mb-2">{card.title}</h3>
              <p className="text-navy-400 text-sm leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
