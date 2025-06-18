
import type { LucideIcon } from 'lucide-react';
import { Facebook, Linkedin, Briefcase, MessageSquare, AppWindow, Phone, Mail, Users as UsersIcon, Files, Cloud, Package, Archive, Github, FolderKanban, Server } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  name: string;
  assignee: { name: string; avatarUrl: string; fallback: string };
  status: string;
  startDate: string;
  endDate?: string;
  progress: number;
  priority: Priority;
}

export interface TaskGroup {
  id: string;
  name: string;
  tasks: Task[];
}

export const mockTaskGroups: TaskGroup[] = [
  {
    id: 'group-1',
    name: 'Q4 Campaign Launch',
    tasks: [
      { id: 'task-1', name: 'Draft initial campaign brief', assignee: { name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/40x40.png?text=AW', fallback: 'AW' }, status: 'Done', startDate: '2024-10-01', endDate: '2024-10-15', progress: 100, priority: 'High' },
      { id: 'task-2', name: 'Design ad creatives', assignee: { name: 'Bob The Builder', avatarUrl: 'https://placehold.co/40x40.png?text=BB', fallback: 'BB' }, status: 'In Progress', startDate: '2024-10-16', endDate: '2024-10-25', progress: 60, priority: 'High' },
      { id: 'task-3', name: 'Develop landing page', assignee: { name: 'Carol Danvers', avatarUrl: 'https://placehold.co/40x40.png?text=CD', fallback: 'CD' }, status: 'To Do', startDate: '2024-10-26', endDate: '2024-11-05', progress: 10, priority: 'Medium' },
      { id: 'task-4', name: 'Setup analytics tracking', assignee: { name: 'David Copperfield', avatarUrl: 'https://placehold.co/40x40.png?text=DC', fallback: 'DC' }, status: 'Review', startDate: '2024-10-20', endDate: '2024-10-30', progress: 90, priority: 'Medium' },
    ],
  },
  {
    id: 'group-2',
    name: 'New Feature Development',
    tasks: [
      { id: 'task-5', name: 'User story mapping', assignee: { name: 'Eve Harrington', avatarUrl: 'https://placehold.co/40x40.png?text=EH', fallback: 'EH' }, status: 'Done', startDate: '2024-09-20', endDate: '2024-09-30', progress: 100, priority: 'High' },
      { id: 'task-6', name: 'Backend API implementation', assignee: { name: 'Frankenstein Monster', avatarUrl: 'https://placehold.co/40x40.png?text=FM', fallback: 'FM' }, status: 'In Progress', startDate: '2024-11-01', endDate: '2024-11-15', progress: 45, priority: 'High' },
      { id: 'task-7', name: 'Frontend UI development', assignee: { name: 'Grace Hopper', avatarUrl: 'https://placehold.co/40x40.png?text=GH', fallback: 'GH' }, status: 'To Do', startDate: '2024-11-16', progress: 0, priority: 'Medium' },
    ],
  },
];

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  lastContact: string;
  tags: string[];
  notes?: string;
}

export const mockCustomers: Customer[] = [
  { id: 'cust-1', name: 'Acme Corp', email: 'contact@acme.com', phone: '555-0101', company: 'Acme Corporation', lastContact: '2024-07-15', tags: ['Enterprise', 'Lead'], notes: 'Initial contact made. Interested in Q4 product line. Follow up regarding new AI features.' },
  { id: 'cust-2', name: 'Beta Solutions', email: 'info@betasolutions.com', phone: '555-0102', company: 'Beta Solutions Ltd.', lastContact: '2024-07-20', tags: ['SMB', 'Active'], notes: 'Long-term client. Prefers email communication. Discussed upcoming renewal.' },
  { id: 'cust-3', name: 'Gamma Innovations', email: 'support@gammainnov.com', phone: '555-0103', company: 'Gamma Innovations Inc.', lastContact: '2024-06-30', tags: ['Startup', 'Trial'], notes: 'Trial period ending soon. Monitor usage and offer discount for conversion.' },
  { id: 'cust-4', name: 'Delta Services', email: 'sales@deltaserv.com', phone: '555-0104', company: 'Delta Services LLC', lastContact: '2024-07-22', tags: ['Enterprise', 'Prospect'], notes: 'Sent proposal. Awaiting feedback. Key contact: Sarah Miller.' },
  { id: 'cust-5', name: 'Epsilon Exports', email: 'exports@epsilon.com', phone: '555-0105', company: 'Epsilon Exports Co.', lastContact: '2024-05-10', tags: ['SMB', 'Churn Risk'], notes: 'Low activity recently. Needs outreach.' },
];

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: string;
  connected: boolean;
}

export const mockIntegrations: Integration[] = [
  { id: 'integ-fb', name: 'Facebook', description: 'Connect your Facebook Pages for ads and insights.', icon: Facebook, category: 'Social Media', connected: true },
  { id: 'integ-li', name: 'LinkedIn', description: 'Sync LinkedIn contacts and company data.', icon: Linkedin, category: 'Social Media', connected: false },
  { id: 'integ-sage', name: 'Sage Accounting', description: 'Integrate customer data with Sage for billing.', icon: Briefcase, category: 'Accounting', connected: false },
  { id: 'integ-teams', name: 'Microsoft Teams', description: 'Get notifications and collaborate in Teams.', icon: MessageSquare, category: 'Collaboration', connected: true },
  {
    id: 'integ-m365',
    name: 'Microsoft 365 Suite',
    description: 'Connect with Word, Excel, PowerPoint, Outlook and more for seamless productivity.',
    icon: AppWindow,
    category: 'Productivity',
    connected: false,
  },
  {
    id: 'integ-gws',
    name: 'Google Workspace',
    description: 'Integrate with Gmail, Calendar, Drive, Docs, Sheets, and Meet for team collaboration.',
    icon: UsersIcon, 
    category: 'Productivity',
    connected: false,
  },
  {
    id: 'integ-softphone',
    name: 'Softphone (VoIP/SIP)',
    description: 'Integrate your VoIP/SIP softphone for direct client calls and internal team communication.',
    icon: Phone,
    category: 'Communication',
    connected: false,
  },
  {
    id: 'integ-bulkmail-m365', 
    name: 'Bulk Email (MS Exchange Online)',
    description: 'Send bulk emails using your Microsoft 365 Exchange Online tenant for marketing campaigns.',
    icon: Mail,
    category: 'Marketing',
    connected: false,
  },
];

export interface StorageService {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: "Cloud Storage" | "Code Repositories" | "Network & Local";
  connected: boolean;
}

export const mockStorageServices: StorageService[] = [
  { id: 'storage-gdrive', name: 'Google Drive', description: 'Sync files and documents from your Google Drive.', icon: Files, category: 'Cloud Storage', connected: true },
  { id: 'storage-onedrive', name: 'Microsoft OneDrive', description: 'Access your OneDrive files directly within the CRM.', icon: Cloud, category: 'Cloud Storage', connected: false },
  { id: 'storage-dropbox', name: 'Dropbox', description: 'Connect your Dropbox account to manage shared files.', icon: Package, category: 'Cloud Storage', connected: false },
  { id: 'storage-box', name: 'Box', description: 'Integrate with Box for secure enterprise file sharing.', icon: Archive, category: 'Cloud Storage', connected: true },
  { id: 'storage-github', name: 'GitHub', description: 'Link GitHub repositories for project-related files.', icon: Github, category: 'Code Repositories', connected: false },
  { id: 'storage-workfolders', name: 'Work Folders / Network Share', description: 'Access shared folders from your local network.', icon: FolderKanban, category: 'Network & Local', connected: true },
  { id: 'storage-ftp', name: 'FTP Server', description: 'Connect to an FTP server for file transfers.', icon: Server, category: 'Network & Local', connected: false },
];

export const statuses: string[] = ['To Do', 'In Progress', 'Review', 'Done'];
export const priorities: Priority[] = ['Low', 'Medium', 'High'];

export interface Assignee {
  name:string,
  avatarUrl: string,
  fallback: string
}
export const assignees = [
  { name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/40x40.png?text=AW', fallback: 'AW' },
  { name: 'Bob The Builder', avatarUrl: 'https://placehold.co/40x40.png?text=BB', fallback: 'BB' },
  { name: 'Carol Danvers', avatarUrl: 'https://placehold.co/40x40.png?text=CD', fallback: 'CD' },
  { name: 'David Copperfield', avatarUrl: 'https://placehold.co/40x40.png?text=DC', fallback: 'DC' },
  { name: 'Eve Harrington', avatarUrl: 'https://placehold.co/40x40.png?text=EH', fallback: 'EH' },
];

export const getAllUniqueCustomerTags = (customers: Customer[]): string[] => {
  const allTags = customers.reduce((acc, customer) => {
    customer.tags.forEach(tag => acc.add(tag));
    return acc;
  }, new Set<string>());
  return Array.from(allTags);
};

// --- Tenders & RFQs ---
export type TenderStatus = "New Alert" | "Processing" | "Response Submitted" | "Awarded" | "Lost" | "Archived";

export interface Tender {
  id: string;
  title: string;
  issuer: string;
  reference?: string;
  deadline: string; // ISO date string
  status: TenderStatus;
  description: string;
  value?: number;
  currency?: string;
  assignedTo?: string; // User ID or name
  submissionDate?: string; // ISO date string
  lastUpdated: string; // ISO date string
}

export const mockTenders: Tender[] = [
  {
    id: "tender-001",
    title: "Supply of IT Equipment for Gov Department X",
    issuer: "Government Department X",
    reference: "GDX/IT/2024/001",
    deadline: "2024-08-15",
    status: "Processing",
    description: "Request for quotation for the supply and delivery of 50 laptops, 20 printers, and related accessories. Detailed specifications available on the portal.",
    value: 75000,
    currency: "USD",
    assignedTo: "Alice Wonderland",
    lastUpdated: "2024-07-20T10:00:00Z",
  },
  {
    id: "tender-002",
    title: "Consultancy Services for Digital Transformation Strategy",
    issuer: "MegaCorp Inc.",
    reference: "MGC/CONS/DT/2024/S2",
    deadline: "2024-07-30",
    status: "New Alert",
    description: "MegaCorp Inc. seeks proposals from qualified consultancy firms to develop a comprehensive digital transformation strategy. Focus areas include AI integration, cloud migration, and data analytics.",
    assignedTo: "Bob The Builder",
    lastUpdated: "2024-07-22T14:30:00Z",
  },
  {
    id: "tender-003",
    title: "Office Cleaning Services - 3 Year Contract",
    issuer: "City Council of Anytown",
    reference: "CCA/CS/2024/78B",
    deadline: "2024-07-25",
    status: "Response Submitted",
    description: "Provision of daily office cleaning services for 5 municipal buildings. Site visit mandatory. Submission via e-portal.",
    value: 120000,
    currency: "USD",
    assignedTo: "Carol Danvers",
    submissionDate: "2024-07-20",
    lastUpdated: "2024-07-21T09:15:00Z",
  },
  {
    id: "tender-004",
    title: "Development of Mobile Application for Tourism",
    issuer: "Regional Tourism Board",
    reference: "RTB/APP/2024/01",
    deadline: "2024-09-01",
    status: "New Alert",
    description: "Design, development, and deployment of a cross-platform mobile application to promote regional tourism. Features to include maps, event listings, and booking integrations.",
    lastUpdated: "2024-07-23T11:00:00Z",
  },
];

export const tenderStatuses: TenderStatus[] = ["New Alert", "Processing", "Response Submitted", "Awarded", "Lost", "Archived"];
