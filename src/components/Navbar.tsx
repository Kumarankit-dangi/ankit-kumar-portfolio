import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, ArrowRight } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { scrollToSection } from '@/utils/scroll';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

export function Navbar() {
  const scrolled = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/80 backdrop-blur-lg border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="section-padding flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white font-bold text-lg shadow-lg shadow-accent-500/20 group-hover:shadow-accent-500/40 transition-shadow">
            AK
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNav(item.id)}
                className="px-4 py-2 text-sm font-medium text-navy-200 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/resume/Ankit-Kumar-Resume.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy-200 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
          <button
            onClick={() => handleNav('contact')}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-accent-600 to-accent-500 rounded-xl hover:shadow-lg hover:shadow-accent-500/30 transition-all"
          >
            Let's Work Together
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-navy-950/95 backdrop-blur-lg border-t border-white/10"
          >
            <ul className="section-padding py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-navy-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 space-y-2">
                <a
                  href="/resume/Ankit-Kumar-Resume.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-navy-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
                <button
                  onClick={() => handleNav('contact')}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-accent-600 to-accent-500 rounded-xl"
                >
                  Let's Work Together
                  <ArrowRight className="w-4 h-4" />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
