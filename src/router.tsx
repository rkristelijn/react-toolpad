import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import ProductsPage from './features/products/ProductsListPage';
import DashboardLayout from './layouts/Layout';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrdersPage from './pages/OrdersPage';

const router = createBrowserRouter([
  {
    // Root layout route with App provider
    Component: App,
    children: [
      {
        // Dashboard layout route
        path: '/',
        Component: DashboardLayout,
        children: [
          {
            path: '/',
            Component: HomePage,
          },
          {
            path: '/dashboard',
            Component: DashboardPage,
          },
          {
            path: '/orders',
            Component: OrdersPage,
          },
          {
            path: '/orders/:orderId',
            Component: OrderDetailPage,
          },
          {
            path: '/products',
            Component: ProductsPage,
          },
        ],
      },
    ],
  },
]);

export default router;
