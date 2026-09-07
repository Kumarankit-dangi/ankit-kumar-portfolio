import { Github, Linkedin, Instagram } from 'lucide-react';
import { SOCIAL_LINKS } from '@/data/socialLinks';

function isRealUrl(url: string): boolean {
  return url.startsWith('http');
}

interface SocialLinksProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SocialLinks({ size = 'md', className = '' }: SocialLinksProps) {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  const links = [
    { url: SOCIAL_LINKS.github, label: 'GitHub', icon: <Github className={iconSizes[size]} /> },
    { url: SOCIAL_LINKS.linkedin, label: 'LinkedIn', icon: <Linkedin className={iconSizes[size]} /> },
    { url: SOCIAL_LINKS.instagram, label: 'Instagram', icon: <Instagram className={iconSizes[size]} /> },
    { url: SOCIAL_LINKS.fiverr, label: 'Fiverr', text: 'Fi' },
    { url: SOCIAL_LINKS.upwork, label: 'Upwork', text: 'Up' },
  ];

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {links.map((link) => {
        const isPlaceholder = !isRealUrl(link.url);
        return (
          <a
            key={link.label}
            href={isPlaceholder ? undefined : link.url}
            target={isPlaceholder ? undefined : '_blank'}
            rel={isPlaceholder ? undefined : 'noopener noreferrer'}
            aria-label={link.label}
            title={isPlaceholder ? `${link.label} link will be added soon` : link.label}
            className={`flex items-center justify-center ${sizeClasses[size]} rounded-xl border transition-all ${
              isPlaceholder
                ? 'border-white/10 text-navy-500 cursor-not-allowed'
                : 'border-white/10 text-navy-300 hover:text-white hover:border-accent-500/50 hover:bg-accent-500/10'
            }`}
          >
            {link.icon || <span className="text-sm font-semibold">{link.text}</span>}
          </a>
        );
      })}
    </div>
  );
}
