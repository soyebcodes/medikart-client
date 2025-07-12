import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef();

  const { paymentIntent, items } = location.state || {};

  useEffect(() => {
    if (!paymentIntent || !items) {
      navigate("/invoice"); // Redirect if invoice data not present
    }
  }, [paymentIntent, items, navigate]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice-${paymentIntent?.id}`,
  });

  const total = items?.reduce(
    (acc, item) =>
      acc +
      item.quantity * item.pricePerUnit * (1 - item.discountPercentage / 100),
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div ref={componentRef} className="bg-base-200 p-8 rounded shadow">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">MediKart</h1>
          <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Buyer Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Buyer Information</h2>
          <p>Email: {paymentIntent?.receipt_email || "user@example.com"}</p>
          <p>Transaction ID: {paymentIntent?.id}</p>
          <p>
            Status:{" "}
            <span className="text-success font-medium capitalize">
              {paymentIntent?.status}
            </span>
          </p>
        </div>

        {/* Item Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-300">
                <th>Name</th>
                <th>Company</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Discount %</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.quantity}</td>
                  <td>${item.pricePerUnit.toFixed(2)}</td>
                  <td>{item.discountPercentage || 0}%</td>
                  <td>
                    $
                    {(
                      item.quantity *
                      item.pricePerUnit *
                      (1 - item.discountPercentage / 100)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="font-bold text-right">
                <td colSpan={5}>Grand Total:</td>
                <td>${total?.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Button */}
      <div className="text-center mt-6">
        <button onClick={handlePrint} className="btn btn-primary">
          Download PDF / Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
