import React from "react";
import { useCartStore } from "../../../store/cartStore";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCartStore();

  const grandTotal = cart.reduce(
    (acc, item) =>
      acc +
      item.quantity *
        (item.pricePerUnit || 0) *
        (1 - (item.discountPercentage || 0) / 100),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (per unit)</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const price = Number(item.pricePerUnit || 0);
              const discount = Number(item.discountPercentage || 0);
              const subtotal = item.quantity * price * (1 - discount / 100);

              return (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${price.toFixed(2)}</td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button
                        className="btn btn-sm"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{discount > 0 ? `${discount}%` : "None"}</td>
                  <td>${subtotal.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button className="btn btn-warning" onClick={clearCart}>
          Clear Cart
        </button>

        <div className="text-xl font-semibold">
          Grand Total: ${grandTotal.toFixed(2)}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => alert("Checkout flow coming soon!")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
