import { useEffect, useState } from "react";
import axios from "axios";

const SellerDashboard = ({ sellerId }) => {
  const [revenue, setRevenue] = useState({ paidTotal: 0, pendingTotal: 0 });

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axios.get(`/api/seller/${sellerId}/revenue`);
        setRevenue(res.data);
      } catch (err) {
        console.error("Error fetching revenue:", err);
      }
    };
    fetchRevenue();
  }, [sellerId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-success text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total Paid Revenue</h2>
            <p className="text-2xl">${revenue.paidTotal}</p>
          </div>
        </div>
        <div className="card bg-warning text-white shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Pending Revenue</h2>
            <p className="text-2xl">${revenue.pendingTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
