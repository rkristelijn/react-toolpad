import { Dashboard, Home, Inventory, ShoppingCart, People, Business } from '@mui/icons-material';

import type { Navigation } from '@toolpad/core';

export const navigationConfig: Navigation = [
  {
    kind: 'header',
    title: 'Main Menu',
  },
  {
    title: 'Home',
    icon: <Home />,
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCart />,
  },
  {
    segment: 'products',
    title: 'Products',
    icon: <Inventory />,
  },
  {
    segment: 'contacts',
    title: 'Contacts',
    icon: <People />,
  },
  {
    segment: 'accounts',
    title: 'Accounts',
    icon: <Business />,
  },
];

export const brandingConfig = {
  title: 'My Toolpad App',
};
