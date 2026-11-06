export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  categoryLabel: string;
  year: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  badgeWord?: string;
  tagline?: string;
  videoPreview?: string;
  tools: string[];
  metrics?: string;
  liveUrl?: string;
  githubUrl?: string;
  isSample: boolean;
  featured: boolean;
}

export interface SkillItem {
  title: string;
  role: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface JourneyItem {
  year: string;
  projectName: string;
  role: string;
  description: string;
  tag: string;
  isSample?: boolean;
}

export interface MilestoneItem {
  number: string;
  title: string;
  description: string;
  metric?: string;
  isSample?: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  isSample?: boolean;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    brandName: string;
    profession: string;
    professionShort: string;
    location: string;
    facebook: string;
    instagram: string;
    youtube: string;
    github: string;
    githubUsername: string;
    linkedin: string;
    email: string;
    whatsapp: string;
    whatsappFormatted: string;
    handle: string;
    heroGreeting: string;
    heroHeadline: string;
    heroBio: string;
    quoteText: string;
  };
  media: {
    portrait: string;
    editorPreview?: string;
    showreelVideo: string;
    showreelPoster: string;
    rawImage: string;
    realImage: string;
    ogImage: string;
  };
  stats: {
    label1: string;
    value1: number;
    suffix1: string;
    isSample1: boolean;
    label2: string;
    value2: number;
    suffix2: string;
    isSample2: boolean;
  };
  projects: ProjectItem[];
  toolsMarquee: Array<{
    name: string;
    category: string;
  }>;
  skills: SkillItem[];
  creativeToolkit?: string[];
  processTimeline: ProcessStep[];
  journey: JourneyItem[];
  milestones: MilestoneItem[];
  manualRepos: GitHubRepo[];
}
