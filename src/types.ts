export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  bgGradient: string;
  client: string;
  year: string;
  metrics?: string;
  fullDetails: string;
  tags: string[];
  features: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarBg?: string;
}

export interface ServiceItem {
  num: string;
  title: string;
  description: string;
  gradient: string;
  accentColor: string;
  deliverables: string[];
}

export interface StatItem {
  number: string;
  label: string;
}
