// React and React Router

// Third-party libraries
import { Dashboard, Home, ShoppingCart } from '@mui/icons-material';

// Internal imports
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router-dom';

import type { Navigation } from '@toolpad/core';

// Define navigation
const NAVIGATION: Navigation = [
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
];

const BRANDING = {
  title: 'My Toolpad App',
};

export default function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  );
}
