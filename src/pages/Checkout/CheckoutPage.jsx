import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // Calculate grand total
  const grandTotal = cart.reduce((acc, item) => {
    const unitPrice = Number(item.pricePerUnit || 0);
    const discount = Number(item.discountPercentage || 0);
    return acc + item.quantity * unitPrice * (1 - discount / 100);
  }, 0);

  // Fetch client secret from backend
  useEffect(() => {
    if (grandTotal > 0) {
      axios
        .post("http://localhost:5000/api/payments/create-payment-intent", {
          amount: Number(grandTotal.toFixed(2)), // in dollars
        })
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
          } else {
            toast.error("Failed to get payment intent");
          }
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
          toast.error("Error creating payment intent");
        });
    }
  }, [grandTotal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        const paymentData = cart.map((item) => ({
          transactionId: paymentIntent.id,
          buyerEmail: user?.email || "guest@example.com",
          sellerEmail: item.sellerEmail,
          medicineId: item._id,
          medicineName: item.name,
          amount:
            item.pricePerUnit *
            item.quantity *
            (1 - item.discountPercentage / 100),
          quantity: item.quantity,
          date: new Date(),
          status: "pending",
        }));

        await axios.post("http://localhost:5000/api/payments/record-payment", {
          payments: paymentData,
        });

        toast.success("Payment recorded!");
        const invoiceItems = [...cart]; // backup before clearing
        clearCart();

        navigate("/invoice", {
          state: {
            paymentIntent,
            items: invoiceItems,
          },
        });
      } catch (err) {
        console.error("Recording payment failed:", err);
        toast.error("Payment succeeded but saving failed");
        setProcessing(false);
      }
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20 text-xl text-error font-semibold">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <p className="text-lg mb-6">
        Total to pay:{" "}
        <strong className="text-primary">${grandTotal.toFixed(2)}</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#fa755a" },
            },
          }}
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
