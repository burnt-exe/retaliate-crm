
import type { LucideIcon } from 'lucide-react';
import { Facebook, Linkedin, Briefcase, MessageSquare, AppWindow, Phone, Mail, Users as UsersIcon } from 'lucide-react';

export interface Task {
  id: string;
  name: string;
  assignee: { name: string; avatarUrl: string; fallback: string };
  status: 'To Do' | 'In Progress' | 'Review' | 'Done';
  dueDate: string;
  progress: number;
  priority: 'Low' | 'Medium' | 'High';
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
      { id: 'task-1', name: 'Draft initial campaign brief', assignee: { name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/40x40.png?text=AW', fallback: 'AW' }, status: 'Done', dueDate: '2024-10-15', progress: 100, priority: 'High' },
      { id: 'task-2', name: 'Design ad creatives', assignee: { name: 'Bob The Builder', avatarUrl: 'https://placehold.co/40x40.png?text=BB', fallback: 'BB' }, status: 'In Progress', dueDate: '2024-10-25', progress: 60, priority: 'High' },
      { id: 'task-3', name: 'Develop landing page', assignee: { name: 'Carol Danvers', avatarUrl: 'https://placehold.co/40x40.png?text=CD', fallback: 'CD' }, status: 'To Do', dueDate: '2024-11-05', progress: 10, priority: 'Medium' },
      { id: 'task-4', name: 'Setup analytics tracking', assignee: { name: 'David Copperfield', avatarUrl: 'https://placehold.co/40x40.png?text=DC', fallback: 'DC' }, status: 'Review', dueDate: '2024-10-30', progress: 90, priority: 'Medium' },
    ],
  },
  {
    id: 'group-2',
    name: 'New Feature Development',
    tasks: [
      { id: 'task-5', name: 'User story mapping', assignee: { name: 'Eve Harrington', avatarUrl: 'https://placehold.co/40x40.png?text=EH', fallback: 'EH' }, status: 'Done', dueDate: '2024-09-30', progress: 100, priority: 'High' },
      { id: 'task-6', name: 'Backend API implementation', assignee: { name: 'Frankenstein Monster', avatarUrl: 'https://placehold.co/40x40.png?text=FM', fallback: 'FM' }, status: 'In Progress', dueDate: '2024-11-15', progress: 45, priority: 'High' },
      { id: 'task-7', name: 'Frontend UI development', assignee: { name: 'Grace Hopper', avatarUrl: 'https://placehold.co/40x40.png?text=GH', fallback: 'GH' }, status: 'To Do', dueDate: '2024-11-20', progress: 0, priority: 'Medium' },
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
}

export const mockCustomers: Customer[] = [
  { id: 'cust-1', name: 'Acme Corp', email: 'contact@acme.com', phone: '555-0101', company: 'Acme Corporation', lastContact: '2024-07-15', tags: ['Enterprise', 'Lead'] },
  { id: 'cust-2', name: 'Beta Solutions', email: 'info@betasolutions.com', phone: '555-0102', company: 'Beta Solutions Ltd.', lastContact: '2024-07-20', tags: ['SMB', 'Active'] },
  { id: 'cust-3', name: 'Gamma Innovations', email: 'support@gammainnov.com', phone: '555-0103', company: 'Gamma Innovations Inc.', lastContact: '2024-06-30', tags: ['Startup', 'Trial'] },
  { id: 'cust-4', name: 'Delta Services', email: 'sales@deltaserv.com', phone: '555-0104', company: 'Delta Services LLC', lastContact: '2024-07-22', tags: ['Enterprise', 'Prospect'] },
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
    id: 'integ-softphone',
    name: 'Softphone (VoIP/SIP)',
    description: 'Integrate your VoIP/SIP softphone for direct client calls and internal team communication.',
    icon: Phone,
    category: 'Communication',
    connected: false,
  },
  {
    id: 'integ-bulkmail',
    name: 'Bulk Email (Microsoft 365)',
    description: 'Send bulk emails using your Microsoft 365 tenant for marketing campaigns.',
    icon: Mail,
    category: 'Marketing',
    connected: false,
  },
];

export const statuses: Task['status'][] = ['To Do', 'In Progress', 'Review', 'Done'];
export const priorities: Task['priority'][] = ['Low', 'Medium', 'High'];
export const assignees = [
  { name: 'Alice Wonderland', avatarUrl: 'https://placehold.co/40x40.png?text=AW', fallback: 'AW' },
  { name: 'Bob The Builder', avatarUrl: 'https://placehold.co/40x40.png?text=BB', fallback: 'BB' },
  { name: 'Carol Danvers', avatarUrl: 'https://placehold.co/40x40.png?text=CD', fallback: 'CD' },
  { name: 'David Copperfield', avatarUrl: 'https://placehold.co/40x40.png?text=DC', fallback: 'DC' },
  { name: 'Eve Harrington', avatarUrl: 'https://placehold.co/40x40.png?text=EH', fallback: 'EH' },
];
