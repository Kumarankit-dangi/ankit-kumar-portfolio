import { scrollToSection } from '@/utils/scroll';
import { SocialLinks } from '@/components/SocialLinks';

const QUICK_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10">
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-white font-bold text-lg shadow-lg shadow-accent-500/20">
                AK
              </span>
              <div>
                <p className="text-white font-semibold text-lg">Ankit Kumar</p>
                <p className="text-navy-400 text-sm">Full-Stack Web Developer</p>
              </div>
            </div>
            <p className="text-navy-400 text-sm max-w-xs leading-relaxed">
              Building modern, responsive websites and web applications that help businesses grow.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-navy-400 hover:text-accent-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Connect
            </h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-navy-500 text-sm">
            © 2026 Ankit Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
