import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageCategories from "../pages/Dashboard/Admin/ManageCategories";
import ManageMedicines from "../pages/Dashboard/Seller/ManageMedicines";
import SellerDashboard from "../pages/Dashboard/Seller/SellerDashboard";
import DashboardRedirect from "../pages/Dashboard/DashboardRedirect";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import UserHome from "../pages/Dashboard/User/UserHome";

import AdvertisementPage from "../pages/Dashboard/Seller/AdvertisementPage";
import PaymentManagement from "../pages/Dashboard/Admin/PaymentManagement";
import SalesReport from "../pages/Dashboard/Admin/SalesReport";
import ManageAdvertised from "../pages/Dashboard/Admin/ManageAdvertised";

import CategoryDetails from "../pages/Home/Category/CategoryDetails";
import CartPage from "../pages/Home/Cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import InvoicePage from "../pages/Checkout/InvoicePage";
import SellerPaymentHistory from "../pages/PaymentHistory/SellerPaymentHistory";
import UserPaymentHistory from "../pages/PaymentHistory/UserPaymentHistory";
import ShopPage from "../pages/Home/ShopPage";
import ErrorPage from "../pages/Error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "/category/:categoryName",
        Component: CategoryDetails,
      },
      {
        path: "/cart",
        Component: CartPage,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "invoice",
        Component: InvoicePage,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardRedirect,
      },
      {
        path: "admin/home",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-categories",
        element: (
          <AdminRoute>
            <ManageCategories />
          </AdminRoute>
        ),
      },
      {
        path: "admin/payments",
        element: <PaymentManagement />,
      },
      {
        path: "admin/sales-report",
        element: <SalesReport />,
      },
      {
        path: "admin/manage-advertised",
        element: (
          <AdminRoute>
            <ManageAdvertised />
          </AdminRoute>
        ),
      },
      {
        path: "user/home",
        element: (
          <PrivateRoute>
            <UserHome />
          </PrivateRoute>
        ),
      },
      {
        path: "user/payment-history",
        element: (
          <PrivateRoute>
            <UserPaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "seller/home",
        element: (
          <PrivateRoute>
            <SellerDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "seller/manage-medicines",
        element: (
          <PrivateRoute>
            <ManageMedicines />
          </PrivateRoute>
        ),
      },
      {
        path: "seller/payment-history",
        element: (
          <PrivateRoute>
            <SellerPaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "seller/advertisement",
        element: (
          <PrivateRoute>
            <AdvertisementPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
