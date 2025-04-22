import { Outlet } from 'react-router-dom';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import type { Navigation } from '@toolpad/core';
import { Home, Dashboard, ShoppingCart } from '@mui/icons-material';
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
