import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, FolderOpen } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ProjectModal } from '@/components/ProjectModal';
import { PROJECTS, PROJECT_FILTERS } from '@/data/portfolio';
import type { Project } from '@/types';

function isRealUrl(url: string): boolean {
  return url.startsWith('http');
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 sm:py-28 scroll-mt-20 bg-navy-900/30">
      <div className="section-padding">
        <SectionHeading
          badge="Projects"
          title="Featured Projects"
          subtitle="Real projects I've built using modern web technologies."
        />

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PROJECT_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                activeFilter === filter
                  ? 'text-white bg-gradient-to-r from-accent-600 to-accent-500 shadow-lg shadow-accent-500/20'
                  : 'text-navy-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="glass-card overflow-hidden cursor-pointer hover:border-accent-500/30 hover:bg-white/[0.06] transition-all group"
              >
                {/* Browser window mockup */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 px-4 py-2.5 bg-navy-950/40 backdrop-blur-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <div className="flex-1 ml-2">
                      <div className="px-2 py-0.5 text-[10px] text-navy-400 bg-navy-800/50 rounded text-center truncate">
                        {project.name}
                      </div>
                    </div>
                  </div>
                  <img
                    src={project.image}
                    alt={`${project.name} screenshot`}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/50 text-sm font-medium">{project.name}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-navy-400 text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium text-navy-200 bg-white/5 border border-white/10 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                    <ProjectLink
                      href={project.liveUrl}
                      icon={<ExternalLink className="w-4 h-4" />}
                      label="Live Demo"
                    />
                    <ProjectLink
                      href={project.githubUrl}
                      icon={<Github className="w-4 h-4" />}
                      label="GitHub"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FolderOpen className="w-12 h-12 text-navy-600 mb-4" />
            <p className="text-navy-400">No projects in this category yet.</p>
          </div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

function ProjectLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const isPlaceholder = !isRealUrl(href);

  return isPlaceholder ? (
    <span
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy-500 bg-white/[0.02] border border-white/5 rounded-lg cursor-not-allowed"
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
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy-200 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
    >
      {icon}
      {label}
    </a>
  );
}
