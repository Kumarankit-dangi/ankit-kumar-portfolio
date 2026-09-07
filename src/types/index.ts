export interface Project {
  id: number;
  name: string;
  category: 'Business' | 'React' | 'Full Stack' | 'Frontend';
  description: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  gradient: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface ProjectEnquiry {
  id: string;
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
  status: 'New' | 'Contacted' | 'Completed' | 'Archived';
  created_at: string;
}

export interface ProjectEnquiryInput {
  name: string;
  email: string;
  project_type: string;
  budget: string;
  message: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Completed' | 'Archived';

export const ENQUIRY_STATUSES: EnquiryStatus[] = ['New', 'Contacted', 'Completed', 'Archived'];

export const PROJECT_TYPES = [
  'Business Website',
  'Landing Page',
  'React Website',
  'E-Commerce',
  'Website Fix',
  'Other',
] as const;

export const BUDGET_OPTIONS = [
  'Under ₹5,000',
  '₹5,000 – ₹10,000',
  '₹10,000 – ₹20,000',
  '₹20,000+',
  'Not Sure',
] as const;
