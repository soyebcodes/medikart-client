import React, { useEffect, useState } from "react";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("/api/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data));
  }, []);

  const handleAcceptPayment = async (id) => {
    const res = await fetch(`/api/payments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "paid" }),
    });

    if (res.ok) {
      setPayments((prev) =>
        prev.map((payment) =>
          payment.id === id ? { ...payment, status: "paid" } : payment
        )
      );
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Management</h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="">
            <th className="p-2">Medicine</th>
            <th className="p-2">Buyer</th>
            <th className="p-2">Seller</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-t">
              <td className="p-2">{payment.medicineName}</td>
              <td className="p-2">{payment.buyerEmail}</td>
              <td className="p-2">{payment.sellerEmail}</td>
              <td className="p-2">${payment.amount}</td>
              <td className="p-2 capitalize">{payment.status}</td>
              <td className="p-2">
                {payment.status === "pending" && (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                    onClick={() => handleAcceptPayment(payment.id)}
                  >
                    Accept Payment
                  </button>
                )}
                {payment.status === "paid" && (
                  <span className="text-green-600 font-semibold">Paid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentManagement;
