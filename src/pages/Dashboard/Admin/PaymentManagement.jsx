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
    queryFn: async () => {
      const res = await axiosSecure.get("/api/payments?status=pending");
      return res.data.data;
    },
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-4">
        Error loading payments:{" "}
        {error?.response?.data?.message || error.message || "Unknown error"}
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🧾 Pending Payments</h2>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No pending payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
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
                  <td className="break-all">{payment.transactionId}</td>
                  <td>{payment.buyerEmail}</td>
                  <td>{payment.medicineName}</td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>{new Date(payment.date).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => approveMutation.mutate(payment._id)}
                      className="btn btn-sm btn-success"
                      disabled={approveMutation.isLoading}
                    >
                      {approveMutation.isLoading ? "Approving..." : "Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;
