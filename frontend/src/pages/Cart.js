import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} from "../store/cartSlice";
import displayINRCurrency from "../helpers/displayCurrency";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const cartItems = useSelector((state) => state.cart.items);

  function formatNumber(number) {
    return new Intl.NumberFormat("vi-VN").format(number);
  }

  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.sellingPrice,
    0
  );

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleIncreaseQty = (itemId) => {
    dispatch(increaseQty(itemId));
  };

  const handleDecreaseQty = (itemId) => {
    dispatch(decreaseQty(itemId));
  };

  const handlePayment = async () => {
    try {
      const formattedProducts = cartItems.map(item => ({
        _id: item._id,
        quantity: item.quantity,
        sellingPrice: item.sellingPrice,
      }));

      const response = await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice,
          userId: user._id,
          products: formattedProducts,
        }),
      });

      const data = await response.json();
      if (data.payUrl) {
        window.location.href = data.payUrl;
      } else {
        console.error("Payment initiation failed", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl lg:text-4xl font-medium mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productImage[0]}
                    alt={item.productName}
                    className="h-20 w-20 object-scale-down"
                  />
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-slate-600">
                      {formatNumber(item.sellingPrice)} x {item.quantity}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() => handleDecreaseQty(item._id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                        onClick={() => handleIncreaseQty(item._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="border-2 border-red-600 rounded px-3 py-1 text-red-600 font-medium hover:bg-red-600 hover:text-white"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p>Total Quantity: {totalQty}</p>
              <p>Total Price: {formatNumber(totalPrice)}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="border-2 border-red-600 rounded px-3 py-1 text-red-600 font-medium hover:bg-red-600 hover:text-white"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <button
                className="border-2 border-red-600 rounded px-3 py-1 text-white bg-red-600 font-medium hover:text-red-600 hover:bg-white"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                id="payButton"
                className="border-2 border-red-600 rounded px-3 py-1 text-white bg-red-600 font-medium hover:text-red-600 hover:bg-white"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
