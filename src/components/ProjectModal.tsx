import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function isRealUrl(url: string): boolean {
  return url.startsWith('http');
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-navy-900 border border-white/10 rounded-2xl shadow-2xl"
          >
            {/* Close button */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-navy-800/80 backdrop-blur-sm text-navy-300 hover:text-white hover:bg-navy-700 transition-colors"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Project image */}
            <div className={`relative h-48 sm:h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden rounded-t-2xl`}>
              <img
                src={project.image}
                alt={`${project.name} screenshot`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/40 text-sm font-medium">{project.name}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-medium text-accent-300 bg-accent-500/10 rounded-full mb-3">
                  {project.category}
                </span>
                <h2 id="project-modal-title" className="text-2xl font-bold text-white">
                  {project.name}
                </h2>
              </div>

              <p className="text-navy-300 leading-relaxed">{project.longDescription}</p>

              {/* Features */}
              <div>
                <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-navy-300">
                      <CheckCircle2 className="w-4 h-4 text-accent-400 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium text-navy-200 bg-white/5 border border-white/10 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <ProjectLink
                  href={project.liveUrl}
                  icon={<ExternalLink className="w-4 h-4" />}
                  label="Live Demo"
                  primary
                />
                <ProjectLink
                  href={project.githubUrl}
                  icon={<Github className="w-4 h-4" />}
                  label="GitHub"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectLink({
  href,
  icon,
  label,
  primary,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}) {
  const isPlaceholder = !isRealUrl(href);

  return isPlaceholder ? (
    <span
      className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-navy-500 bg-white/[0.02] border border-white/5 rounded-xl cursor-not-allowed"
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
      className={`flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all ${
        primary
          ? 'text-white bg-gradient-to-r from-accent-600 to-accent-500 hover:shadow-lg hover:shadow-accent-500/30'
          : 'text-navy-200 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
