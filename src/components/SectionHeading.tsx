import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({ badge, title, subtitle, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="inline-block px-3 py-1 text-xs font-medium text-accent-300 bg-accent-500/10 border border-accent-500/20 rounded-full mb-4"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.2 }}
          className={`mt-4 text-navy-400 text-lg ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
