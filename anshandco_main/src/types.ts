export interface ClientPartner {
  id: string;
  name: string;
  logoUrl: string;
  fallbackSig: number;
  description: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  mediaType: 'video' | 'image' | 'carousel';
  mediaUrl: string;
  posterUrl: string;
  fallbackSig: number;
  dimensions: string;
  aspectClass: string;
  colSpanClass: string;
  summary: string;
  tags: string[];
  link: string;
  gallery?: string[];
  fullDetails?: {
    deliverables: string[];
    timeline: string;
    impact: string;
  };
}

export interface NewsUpdate {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  fallbackSig: number;
  link: string;
  badge?: string;
  accentBg: string;
  summary: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  iconUrl: string;
  fallbackSig: number;
  tagline: string;
  capabilities: string[];
}

export interface TeamMember {
  id: string;
  number: string;
  name: string;
  role: string;
  creativeRole: string;
  category: string;
  avatarUrl: string;
  tagline: string;
  bio: string;
  expertise: string[];
  expertiseDescriptions?: Record<string, string>;
  isFilled: boolean;
  portfolio: {
    heroStatement: string;
    creativePhilosophy: string;
    stats: { label: string; value: string }[];
    technologies: { category: string; skills: string[] }[];
    featuredWork: {
      id: string;
      title: string;
      category: string;
      description: string;
      impact: string;
      deliverables: string[];
      tags: string[];
      mediaUrl?: string;
      mediaType?: 'image' | 'video';
    }[];
    deliverables: string[];
    quote: string;
  };
}
