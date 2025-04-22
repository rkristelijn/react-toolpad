import { Dashboard, Home, Inventory, ShoppingCart } from '@mui/icons-material';

import type { Navigation } from '@toolpad/core';

export const NAVIGATION: Navigation = [
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
];

export const BRANDING = {
  title: 'My Toolpad App',
};
