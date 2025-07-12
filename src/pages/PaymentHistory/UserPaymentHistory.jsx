import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const UserPaymentHistory = () => {
  const { user } = useAuth(); // get logged in user info

  const { data, isLoading, error } = useQuery({
    queryKey: ["userPayments", user?.email],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/payments/user/${user.email}`)
        .then((res) => res.data),
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading your payments...</p>;
  if (error) return <p>Error loading payments: {error.message}</p>;

  return (
    <div>
      <h2>Your Payment History</h2>
      {data.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Medicine</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p._id}>
                <td>{p.transactionId}</td>
                <td>{p.medicineName}</td>
                <td>${p.amount.toFixed(2)}</td>
                <td>{p.status}</td>
                <td>{new Date(p.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserPaymentHistory;
