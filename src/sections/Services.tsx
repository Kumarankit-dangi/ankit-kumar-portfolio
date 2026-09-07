import { motion } from 'framer-motion';
import {
  Building2,
  LayoutTemplate,
  Atom,
  ShoppingCart,
  Wrench,
  Rocket,
  ArrowRight,
} from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { SERVICES, SERVICE_TO_PROJECT_TYPE } from '@/data/portfolio';
import { scrollToSection } from '@/utils/scroll';

const ICONS: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6" />,
  LayoutTemplate: <LayoutTemplate className="w-6 h-6" />,
  Atom: <Atom className="w-6 h-6" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
};

interface ServicesProps {
  onSelectService: (projectType: string) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  const handleDiscuss = (serviceTitle: string) => {
    const projectType = SERVICE_TO_PROJECT_TYPE[serviceTitle] || 'Other';
    onSelectService(projectType);
    scrollToSection('contact');
  };

  return (
    <section id="services" className="py-20 sm:py-28 scroll-mt-20">
      <div className="section-padding">
        <SectionHeading
          badge="Services"
          title="What I Can Build For You"
          subtitle="Professional web development services tailored to your business needs."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="glass-card p-6 flex flex-col hover:bg-white/[0.06] hover:border-accent-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-400 mb-5 group-hover:scale-110 transition-transform">
                {ICONS[service.icon]}
              </div>

              <h3 className="text-white font-semibold text-lg mb-3">{service.title}</h3>
              <p className="text-navy-400 text-sm leading-relaxed mb-6 flex-1">
                {service.description}
              </p>

              <button
                onClick={() => handleDiscuss(service.title)}
                className="flex items-center gap-2 text-sm font-medium text-accent-400 hover:text-accent-300 transition-colors group/btn"
              >
                Discuss Project
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
