import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  const grandTotal = cart.reduce(
    (acc, item) =>
      acc +
      item.quantity * item.pricePerUnit * (1 - item.discountPercentage / 100),
    0
  );

  useEffect(() => {
    if (grandTotal > 0) {
      axios
        .post("http://localhost:5000/api/payments/create-payment-intent", {
          amount: Math.round(grandTotal * 100), // convert to cents
        })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error(err));
    }
  }, [grandTotal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      toast.error(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        // Store payment info in DB (optional)
        // Navigate to invoice page
        clearCart();
        navigate("/invoice", { state: { payment: result.paymentIntent } });
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-6">
        <p className="text-lg">
          Total to pay: <strong>${grandTotal.toFixed(2)}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{ style: { base: { fontSize: "16px" } } }}
          className="bg-base-100 p-3 rounded border"
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
