import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const UserPaymentHistory = () => {
  const { user } = useAuth();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userPayments", user?.email],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/payments/user/${user.email}`)
        .then((res) => res.data.data),
    enabled: !!user?.email,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-error max-w-xl mx-auto my-6">
        <span>Error loading payments: {error.message}</span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
        Your Payment History
      </h2>

      {data.length === 0 ? (
        <div className="text-center text-gray-500">No payments found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-base-300">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>Transaction ID</th>
                <th>Medicine</th>
                <th>Amount ($)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p._id}>
                  <td className="font-mono text-sm text-primary">
                    {p.transactionId}
                  </td>
                  <td>{p.medicineName}</td>
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
        </div>
      )}
    </div>
  );
};

export default UserPaymentHistory;
