import React, { useEffect, useState } from "react";
import "../../App.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items from API
  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;

      if (!token) {
        console.error("User is not logged in.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:4000/cart/single", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      console.log("Fetched Cart Data:", data);

      setCartItems(
        data.data.product.map((item) => ({
          ...item.product_id,
          quantity: item.quantity,
        }))
      );
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update quantity when clicking "+" or "-"
  const handleUpdateQuantity = async (productId, change) => {
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;

      if (!token) return;

      const updatedCart = cartItems.map((item) => {
        if (item._id === productId) {
          const newQuantity = item.quantity + change;
          return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
        }
        return item;
      });

      setCartItems(updatedCart); // Optimistically update UI

      const response = await fetch("http://localhost:4000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product: {
            product_id: productId,
            quantity: change, // Send only the change (-1 or +1)
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      fetchCartItems(); // Refresh cart items
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove item from cart
  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).token
        : null;

      if (!token) return;

      const response = await fetch(
        `http://localhost:4000/cart/remove/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      setCartItems(cartItems.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>My Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={`http://localhost:4000/${item.images[0]}`}
                  alt={item.product_name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.product_name}</h3>
                  <p className="cart-item-price">₹{item.product_price}</p>
                  <div className="cart-quantity">
                    <button
                      onClick={() => handleUpdateQuantity(item._id, -1)}
                      disabled={item.quantity <= 1} // Prevents going below 1
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item._id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Price Details</h3>
            <div className="summary-details">
              <p>
                Price ({cartItems.length} items):{" "}
                <span>
                  ₹
                  {cartItems.reduce(
                    (total, item) => total + item.product_price * item.quantity,
                    0
                  )}
                </span>
              </p>
              <p>
                Discount: <span className="discount">-₹100</span>
              </p>
              <p>
                Delivery Charges: <span className="free-delivery">Free</span>
              </p>
              <hr />
              <h4>
                Total Amount:{" "}
                <span>
                  ₹
                  {cartItems.reduce(
                    (total, item) => total + item.product_price * item.quantity,
                    0
                  ) - 100}
                </span>
              </h4>
            </div>
            <button className="place-order-button">Place Order</button>
          </div> 
        </div>
      )}
    </div>
  );
};

export default Cart;
