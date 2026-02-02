export interface ProposalInput {
  // Client Info
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  
  // Project Details
  projectName: string;
  projectType: 'website' | 'landing-page' | 'ecommerce' | 'redesign' | 'custom';
  projectDescription: string;
  
  // Scope & Deliverables
  deliverables: string[];
  
  // Timeline
  estimatedDuration: string;
  startDate: string;
  
  // Pricing
  pricingType: 'fixed' | 'hourly' | 'retainer';
  totalPrice: number;
  depositRequired: number;
  paymentTerms: string;
  
  // Your Info
  yourName: string;
  yourCompany: string;
  yourEmail: string;
  yourPhone?: string;
}

export interface GeneratedProposal {
  id: string;
  input: ProposalInput;
  
  // AI Generated Content
  executiveSummary: string;
  scopeOfWork: string;
  deliverablesList: string[];
  timeline: string;
  investmentSection: string;
  termsAndConditions: string;
  nextSteps: string;
  
  // Meta
  createdAt: Date;
  status: 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined';
}

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
}

export const DEFAULT_DELIVERABLES = [
  'Homepage design',
  'Responsive mobile design',
  'Up to 5 inner pages',
  'Contact form integration',
  'Basic SEO setup',
  'Content migration',
  'Browser testing',
  'Launch support',
];

export const PROJECT_TYPES = [
  { value: 'website', label: 'Website Design & Development' },
  { value: 'landing-page', label: 'Landing Page' },
  { value: 'ecommerce', label: 'E-Commerce Store' },
  { value: 'redesign', label: 'Website Redesign' },
  { value: 'custom', label: 'Custom Project' },
];
