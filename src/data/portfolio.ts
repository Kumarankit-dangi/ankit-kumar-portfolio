import type { Project, Service, SkillCategory } from '@/types';

/**
 * Projects — replace the LIVE_URL and GITHUB_URL placeholders with your real links.
 * Replace the `image` field with real screenshots placed in /public/projects/.
 */
export const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Medical Shop / Pharmacy Website',
    category: 'Business',
    description:
      'A modern pharmacy website designed to present products and services while making it easy for customers to contact the business.',
    longDescription:
      'A modern pharmacy website built to present products and services clearly while making it easy for customers to reach out. The site features a clean product catalog, service highlights, and a contact section that helps customers connect with the pharmacy quickly.',
    features: [
      'Product catalog with categories',
      'Service highlights section',
      'Contact form for customer enquiries',
      'Responsive design for all devices',
      'Clean, professional UI',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'MEDICAL_SHOP_LIVE_URL',
    githubUrl: 'MEDICAL_SHOP_GITHUB_URL',
    image: '/projects/medical-shop.svg',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 2,
    name: 'Vidya Classes Promotional Website',
    category: 'React',
    description:
      'A modern promotional website for an educational institute, designed to present courses, achievements, admission information and contact options.',
    longDescription:
      'A promotional website for an educational institute that showcases courses, student achievements, admission details, and contact options. The design is clean and professional, helping the institute build trust with prospective students and parents.',
    features: [
      'Course catalog with details',
      'Achievements and stats section',
      'Admission information page',
      'Contact and enquiry form',
      'Fully responsive layout',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'VIDYA_CLASSES_LIVE_URL',
    githubUrl: 'VIDYA_CLASSES_GITHUB_URL',
    image: '/projects/vidya-classes.svg',
    gradient: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    id: 3,
    name: 'ChhatSong.com',
    category: 'Frontend',
    description:
      'ChhatSong.com is a music-focused website created to provide users with an easy way to explore and enjoy Chhath Puja songs and related music content.',
    longDescription:
      'A music-focused website designed around Chhath Puja songs and music discovery. ChhatSong.com provides users with an easy way to explore and enjoy Chhath Puja songs and related music content, with a clean and responsive interface that works across all devices.',
    features: [
      'Chhath Puja song collection',
      'Music content discovery',
      'Responsive design for all devices',
      'Clean and intuitive UI',
      'Fast and lightweight frontend',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Web Design'],
    liveUrl: 'CHATSONG_LIVE_URL',
    githubUrl: 'CHATSONG_GITHUB_URL',
    image: '/projects/chhatsong.svg',
    gradient: 'from-amber-500/20 to-red-500/20',
  },
  {
    id: 4,
    name: 'Toy Shop Website',
    category: 'Frontend',
    description:
      'A responsive toy store website with modern UI, product sections and customer-friendly navigation.',
    longDescription:
      'A responsive toy store website with a modern, playful UI. It features product sections, category navigation, and a customer-friendly layout that makes browsing products simple and enjoyable.',
    features: [
      'Product showcase sections',
      'Category-based navigation',
      'Responsive grid layout',
      'Interactive UI elements',
      'Clean and playful design',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'TOY_SHOP_LIVE_URL',
    githubUrl: 'TOY_SHOP_GITHUB_URL',
    image: '/projects/toy-shop.svg',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    id: 5,
    name: 'Job Portal & Resume Builder',
    category: 'Full Stack',
    description:
      'A job portal concept where users can search and apply for jobs and create professional ATS-friendly resumes.',
    longDescription:
      'A full-stack job portal concept that lets users search and apply for jobs and build professional, ATS-friendly resumes. The application combines a React frontend with a Node.js backend and a MySQL database to manage job listings, applications, and resume data.',
    features: [
      'Job search and filtering',
      'Job application system',
      'ATS-friendly resume builder',
      'User authentication',
      'Backend API with database integration',
    ],
    technologies: ['React', 'Node.js', 'MySQL', 'JavaScript'],
    liveUrl: 'JOB_PORTAL_LIVE_URL',
    githubUrl: 'JOB_PORTAL_GITHUB_URL',
    image: '/projects/job-portal.svg',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 6,
    name: 'Smart Village Portal — Gram Sahayak',
    category: 'Full Stack',
    description:
      'A digital village portal concept providing village information, government schemes, complaints, notices and emergency contacts.',
    longDescription:
      'A digital village portal concept that provides village information, government schemes, a complaint system, public notices, and emergency contacts. The portal is designed to bridge the digital divide by making village services and information accessible online.',
    features: [
      'Village information dashboard',
      'Government schemes directory',
      'Complaint submission system',
      'Public notices board',
      'Emergency contacts directory',
    ],
    technologies: ['React', 'Node.js', 'MySQL'],
    liveUrl: 'https://inquisitive-chimera-6459a0.netlify.app/',
    githubUrl: 'https://github.com/Kumarankit-dangi/gram-sahayak',
    image: '/projects/gram-sahayak.svg',
    gradient: 'from-green-500/20 to-lime-500/20',
  },
];

export const PROJECT_FILTERS = ['All', 'Business', 'React', 'Full Stack', 'Frontend'] as const;

export const SERVICES: Service[] = [
  {
    id: 'business-website',
    icon: 'Building2',
    title: 'Business Websites',
    description:
      'Modern responsive websites designed to give businesses a professional online presence.',
  },
  {
    id: 'landing-page',
    icon: 'LayoutTemplate',
    title: 'Landing Pages',
    description:
      'High-quality landing pages for products, services, campaigns and businesses.',
  },
  {
    id: 'react-website',
    icon: 'Atom',
    title: 'React Websites',
    description:
      'Modern interactive React applications with clean component architecture.',
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingCart',
    title: 'E-Commerce Websites',
    description:
      'Customer-friendly online stores with product showcases and shopping experiences.',
  },
  {
    id: 'website-fix',
    icon: 'Wrench',
    title: 'Website Fixes & Improvements',
    description:
      'Fix responsiveness, UI problems, JavaScript issues and website bugs.',
  },
  {
    id: 'deployment',
    icon: 'Rocket',
    title: 'Deployment & Setup',
    description:
      'Deploy websites through GitHub and Vercel and help configure domains.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'Monitor',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: 'Server',
    skills: ['Node.js', 'Express.js'],
  },
  {
    title: 'Programming',
    icon: 'Code2',
    skills: ['Python', 'Java', 'C++'],
  },
  {
    title: 'Database',
    icon: 'Database',
    skills: ['MySQL', 'SQL', 'PostgreSQL'],
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel'],
  },
];

export const FOCUS_AREAS = [
  'Frontend Development',
  'Backend Development',
  'Database Integration',
  'Responsive Web Design',
  'Business Websites',
  'Web Applications',
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business, target audience and requirements.',
    icon: 'Search',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Create a clean and user-friendly interface.',
    icon: 'PenTool',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Build the website using modern technologies.',
    icon: 'Code2',
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'Test, optimize and deploy the final website.',
    icon: 'Rocket',
  },
];

export const WHY_WORK_WITH_ME = [
  {
    icon: 'Sparkles',
    title: 'Clean Design',
    description: 'Responsive and professional interfaces.',
  },
  {
    icon: 'Smartphone',
    title: 'Responsive Development',
    description: 'Works across mobile, tablet and desktop.',
  },
  {
    icon: 'Briefcase',
    title: 'Business-Focused',
    description: 'Focus on solving real business needs.',
  },
  {
    icon: 'MessageSquare',
    title: 'Clear Communication',
    description: 'Simple and transparent communication.',
  },
  {
    icon: 'TrendingUp',
    title: 'Continuous Improvement',
    description: 'Always improving development skills and technology knowledge.',
  },
];

export const TRUST_CARDS = [
  {
    icon: 'Palette',
    title: 'Modern Design',
    description: 'Professional and user-friendly interfaces.',
  },
  {
    icon: 'Smartphone',
    title: 'Responsive',
    description: 'Works across mobile, tablet and desktop.',
  },
  {
    icon: 'Briefcase',
    title: 'Business Focused',
    description: 'Designed around real business requirements.',
  },
  {
    icon: 'Layers',
    title: 'Full-Stack',
    description: 'Frontend, backend and database integration.',
  },
];

/**
 * Maps a service card's label to the matching Project Type option in the contact form.
 */
export const SERVICE_TO_PROJECT_TYPE: Record<string, string> = {
  'Business Websites': 'Business Website',
  'Landing Pages': 'Landing Page',
  'React Websites': 'React Website',
  'E-Commerce Websites': 'E-Commerce',
  'Website Fixes & Improvements': 'Website Fix',
  'Deployment & Setup': 'Other',
};
