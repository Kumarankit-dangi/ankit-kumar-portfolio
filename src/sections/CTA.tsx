import { motion } from 'framer-motion';
import { ArrowRight, Briefcase } from 'lucide-react';
import { SOCIAL_LINKS } from '@/data/socialLinks';
import { scrollToSection } from '@/utils/scroll';

function isRealUrl(url: string): boolean {
  return url.startsWith('http');
}

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="relative overflow-hidden rounded-3xl glass border-white/15 p-8 sm:p-12 lg:p-16 text-center"
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-accent-600/15 rounded-full blur-[100px]" />

          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Have a Website Idea?
            </h2>
            <p className="text-navy-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Let's turn your idea into a modern, professional website.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-accent-600 to-accent-500 rounded-xl hover:shadow-xl hover:shadow-accent-500/30 transition-all"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </button>

              <CtaLink
                href={SOCIAL_LINKS.fiverr}
                label="View Fiverr"
                icon={<span className="text-sm font-bold">Fi</span>}
              />
              <CtaLink
                href={SOCIAL_LINKS.upwork}
                label="View Upwork"
                icon={<Briefcase className="w-4 h-4" />}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CtaLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  const isPlaceholder = !isRealUrl(href);

  return isPlaceholder ? (
    <span
      className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-navy-500 bg-white/[0.02] border border-white/5 rounded-xl cursor-not-allowed"
      title="Link will be added soon"
    >
      {icon}
      {label}
    </span>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/5 border border-white/15 rounded-xl hover:bg-white/10 transition-all"
    >
      {icon}
      {label}
    </a>
  );
}
