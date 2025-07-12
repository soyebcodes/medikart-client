import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const SellerPaymentHistory = () => {
  const { user } = useAuth();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sellerPayments", user?.email],
    enabled: !!user?.email, // Prevents running before user is available
    queryFn: async () => {
      const res = await axios.get(
        `https://medikart-server-pjna.onrender.com/api/payments/seller/${user.email}`
      );
      console.log("Payment history response:", res.data);
      return res.data.data;
    },
  });

  if (isLoading) return <div>Loading payment history...</div>;
  if (error) return <div>Error fetching payments: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Sales Payment History</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Medicine</th>
            <th>Amount ($)</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">
                No payments found
              </td>
            </tr>
          )}
          {data.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.transactionId}</td>
              <td>{payment.medicineName}</td>
              <td>{payment.amount.toFixed(2)}</td>
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
              <td>{new Date(payment.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPaymentHistory;
