import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardLayout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import OrdersPage from "./pages/OrdersPage";

const router = createBrowserRouter([
  {
    // Root layout route with App provider
    Component: App,
    children: [
      {
        // Dashboard layout route
        path: "/",
        Component: DashboardLayout,
        children: [
          {
            path: "/",
            Component: HomePage,
          },
          {
            path: "/dashboard",
            Component: DashboardPage,
          },
          {
            path: "/orders",
            Component: OrdersPage,
          },
        ],
      },
    ],
  },
]);

export default router;