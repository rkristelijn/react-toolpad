import { Routes, Route } from 'react-router-dom';

import DashboardPage from '../../pages/DashboardPage';
import HomePage from '../../pages/HomePage';
import OrdersPage from '../../pages/OrdersPage';
import ProductsPage from '../../pages/ProductsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/products' element={<ProductsPage />} />
      <Route path='/orders' element={<OrdersPage />} />
    </Routes>
  );
}

export default AppRoutes;
