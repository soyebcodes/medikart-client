import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";

const SellerDashboard = () => {
  const { user } = useAuth();

  const { data = [], isLoading } = useQuery({
    queryKey: ["sellerPayments", user?.email],
    queryFn: () =>
      axios
        .get(
          `https://medikart-server-pjna.onrender.com/api/payments/seller/${user.email}`
        )
        .then((res) => res.data.data),
    enabled: !!user?.email,
  });

  const paidTotal = data
    .filter((p) => p.status === "paid")
    .reduce((acc, p) => acc + p.amount, 0);

  const pendingTotal = data
    .filter((p) => p.status === "pending")
    .reduce((acc, p) => acc + p.amount, 0);

  return (
    <>
      <Helmet>
        <title>Seller Dashboard | MediKart</title>
      </Helmet>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          Seller Dashboard
        </h1>

        {/* Revenue Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-base-200 p-6 rounded-lg shadow border border-base-300">
            <h2 className="text-xl font-semibold mb-2 text-success">
              Paid Revenue
            </h2>
            <p className="text-3xl font-bold text-success">
              ${paidTotal.toFixed(2)}
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-lg shadow border border-base-300">
            <h2 className="text-xl font-semibold mb-2 text-warning">
              Pending Revenue
            </h2>
            <p className="text-3xl font-bold text-warning">
              ${pendingTotal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Manage Medicines */}
          <Link
            to="/dashboard/seller/manage-medicines"
            className="bg-base-100 hover:bg-base-300 transition border border-base-300 p-5 rounded-lg shadow cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2 text-primary">
              Manage Medicines
            </h3>
            <p className="text-sm text-base-content">
              View and manage all your added medicines. Add new medicines with
              detailed info.
            </p>
          </Link>

          {/* Payment History */}
          <Link
            to="/dashboard/seller/payment-history"
            className="bg-base-100 hover:bg-base-300 transition border border-base-300 p-5 rounded-lg shadow cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2 text-info">
              Payment History
            </h3>
            <p className="text-sm text-base-content">
              View detailed records of all purchases of your medicines with
              payment status.
            </p>
          </Link>

          {/* Advertise Requests */}
          <Link
            to="/dashboard/seller/advertisement"
            className="bg-base-100 hover:bg-base-300 transition border border-base-300 p-5 rounded-lg shadow cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2 text-accent">
              Ask for Advertisement
            </h3>
            <p className="text-sm text-base-content">
              Submit medicine info for homepage slider ads. Check current ad
              statuses.
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
