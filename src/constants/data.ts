import { NavItem } from '@/types';

export type VisaApplication = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Applications',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['a', 'a'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Applications Board',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  }
];

export interface RecentApplication {
  id: number;
  partnerName: string;
  applicationNumber: string;
  status: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentApplicationsData: RecentApplication[] = [
  {
    id: 1,
    partnerName: 'Travel Hub India',
    applicationNumber: 'VISA-A8F3K2M1',
    status: 'visa-ready',
    amount: 'AED 250.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'TH'
  },
  {
    id: 2,
    partnerName: 'Global Tours Ltd',
    applicationNumber: 'VISA-B9G4L3N2',
    status: 'ops-processing',
    amount: 'AED 150.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'GT'
  },
  {
    id: 3,
    partnerName: 'Desert Adventures',
    applicationNumber: 'VISA-C0H5M4O3',
    status: 'qc-pending',
    amount: 'AED 300.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'DA'
  },
  {
    id: 4,
    partnerName: 'Emirates Travel Co',
    applicationNumber: 'VISA-D1I6N5P4',
    status: 'payment-pending',
    amount: 'AED 200.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'ET'
  },
  {
    id: 5,
    partnerName: 'Arabian Journeys',
    applicationNumber: 'VISA-E2J7O6Q5',
    status: 'completed',
    amount: 'AED 180.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'AJ'
  }
];

// Legacy export for backward compatibility
export const recentSalesData = recentApplicationsData;
