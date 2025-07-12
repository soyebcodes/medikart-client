import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payments", "pending"],
    queryFn: () =>
      axiosSecure.get("/api/payments?status=pending").then((res) => res.data),
  });

  const approveMutation = useMutation({
    mutationFn: (paymentId) =>
      axiosSecure.patch(`/api/payments/${paymentId}/approve`),
    onSuccess: () => {
      toast.success("Payment approved");
      queryClient.invalidateQueries(["payments", "pending"]);
    },
    onError: () => {
      toast.error("Failed to approve payment");
    },
  });

  if (isLoading) return <p>Loading payments...</p>;
  if (error)
    return (
      <p>
        Error loading payments:{" "}
        {error?.response?.data?.message || error.message || "Unknown error"}
      </p>
    );

  return (
    <div>
      <h2>Pending Payments</h2>
      {data.length === 0 ? (
        <p>No pending payments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Buyer</th>
              <th>Medicine</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {data.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.transactionId}</td>
                <td>{payment.buyerEmail}</td>
                <td>{payment.medicineName}</td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>{new Date(payment.date).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => approveMutation.mutate(payment._id)}
                    className="btn btn-success"
                    disabled={approveMutation.isLoading}
                  >
                    {approveMutation.isLoading ? "Approving..." : "Approve"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentManagement;
