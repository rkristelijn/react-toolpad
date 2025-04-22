import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import OrderDetailView from './features/orders/OrderDetailView';
import OrdersListView from './features/orders/OrdersListView';
import ProductDetailView from './features/products/ProductDetailView';
import ProductsListView from './features/products/ProductsListView';
import DashboardLayout from './layouts/Layout';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';

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
            Component: OrdersListView,
          },
          {
            path: '/orders/:orderId',
            Component: OrderDetailView,
          },
          {
            path: '/products',
            Component: ProductsListView,
          },
          {
            path: '/products/:productId',
            Component: ProductDetailView,
          },
        ],
      },
    ],
  },
]);

export default router;
