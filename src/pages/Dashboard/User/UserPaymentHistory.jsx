import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

const UserPaymentHistory = () => {
  const { user } = useAuth(); // gets the logged-in user
  const userEmail = user?.email;

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:5000/api/payments/user/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched payments:", data);
        setPayments(data);
      });
  }, [userEmail]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment History</h2>
      <table className="w-full text-left border">
        <thead className="">
          <tr>
            <th className="p-2">Medicine</th>
            <th className="p-2">Seller Email</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Transaction ID</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pmt) => (
            <tr key={pmt._id} className="border-t">
              <td className="p-2">{pmt.medicineName}</td>
              <td className="p-2">{pmt.sellerEmail}</td>
              <td className="p-2">${pmt.amount.toFixed(2)}</td>
              <td className="p-2">{pmt.transactionId}</td>
              <td className="p-2">
                <span
                  className={`font-semibold ${
                    pmt.status === "paid" ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {pmt.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {payments.length === 0 && (
        <p className="mt-4 text-gray-500">No payment history found.</p>
      )}
    </div>
  );
};

export default UserPaymentHistory;
