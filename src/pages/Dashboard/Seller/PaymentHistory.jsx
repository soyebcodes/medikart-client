import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Get seller email from token
  const token = localStorage.getItem("access-token");
  const sellerId = token ? jwtDecode(token)?._id : null;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        if (!sellerId) return;

        const res = await axiosSecure.get(`/api/payments/seller/${sellerId}`);
        setPayments(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError("Failed to load payment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [axiosSecure, sellerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-error text-center">{error}</p>;
  }

  if (!payments.length) {
    return <p className="text-center">No payment history found.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Buyer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.medicineId?.itemName || "N/A"}</td>
                <td>{payment.buyerId?.name || "N/A"}</td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>
                  <span
                    className={`badge ${
                      payment.status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
