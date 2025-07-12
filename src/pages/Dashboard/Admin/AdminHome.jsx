import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [paidTotal, setPaidTotal] = useState(0);
  const [pendingTotal, setPendingTotal] = useState(0);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalsAndRecent = async () => {
      try {
        const paidRes = await axios.get(
          "http://localhost:5000/api/payments?status=paid"
        );
        const paidSum = paidRes.data.data.reduce(
          (acc, payment) => acc + payment.amount,
          0
        );
        setPaidTotal(paidSum);

        const pendingRes = await axios.get(
          "http://localhost:5000/api/payments?status=pending"
        );
        const pendingSum = pendingRes.data.data.reduce(
          (acc, payment) => acc + payment.amount,
          0
        );
        setPendingTotal(pendingSum);

        const recentRes = await axios.get(
          "http://localhost:5000/api/payments?limit=10"
        );
        setRecentPayments(recentRes.data.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalsAndRecent();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Manage User, Seller, Sales Report and Manage Advertisement!
      </h1>

      {/* Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="card bg-teal-500 text-white shadow-md">
          <div className="card-body">
            <h2 className="card-title text-xl">Paid Total</h2>
            <p className="text-3xl font-bold">${paidTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="card bg-yellow-400 text-gray-900 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-xl">Pending Total</h2>
            <p className="text-3xl font-bold">${pendingTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-base-100 rounded-lg shadow-md p-4 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Recent Payments</h2>
        {recentPayments.length === 0 ? (
          <p className="text-center text-gray-500">No recent payments found.</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200 text-sm text-base-content">
                <th>Transaction ID</th>
                <th>Buyer Email</th>
                <th>Amount ($)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((p) => (
                <tr key={p._id} className="hover:bg-base-100 text-sm">
                  <td className="break-words max-w-[180px]">
                    {p.transactionId}
                  </td>
                  <td className="break-all max-w-[160px]">{p.buyerEmail}</td>
                  <td>${p.amount.toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.status === "paid" ? "badge-success" : "badge-warning"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>{new Date(p.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
