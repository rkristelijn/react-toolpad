import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import OrderDetailView from './features/orders/OrderDetailView';
import OrderViewController from './features/orders/OrderViewController';
import ProductDetailView from './features/products/ProductDetailView';
import ProductsListView from './features/products/ProductsListView';
import AccountsPage from './pages/AccountsPage';
import ContactsPage from './pages/ContactsPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import MainLayout from './shared/layouts/MainLayout';

const router = createBrowserRouter([
  {
    // Root layout route with App provider
    Component: App,
    children: [
      {
        // Dashboard layout route
        path: '/',
        Component: MainLayout,
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
            Component: OrderViewController,
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
          {
            path: '/contacts',
            Component: ContactsPage,
          },
          {
            path: '/accounts',
            Component: AccountsPage,
          },
        ],
      },
    ],
  },
]);

export default router;
