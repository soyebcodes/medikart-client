import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import { updateProfile } from "firebase/auth";
import UpdateProfile from "../pages/Dashboard/Shared/UpdateProfile";
import AdminRoute from "../routes/AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageCategories from "../pages/Dashboard/Admin/ManageCategories";
import ManageMedicines from "../pages/Dashboard/Seller/ManageMedicines";
import SellerDashboard from "../pages/Dashboard/Seller/SellerDashboard";
import DashboardRedirect from "../pages/Dashboard/DashboardRedirect";

export const router = createBrowserRouter([
  {
    path: "/",
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
    ],
  },
]);
