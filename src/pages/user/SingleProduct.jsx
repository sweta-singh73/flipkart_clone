import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "../../SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState(""); // Success/Error message

  // Fetch product details
  const fetchProduct = useCallback(async () => {
    try {
      console.log("Fetching product with ID:", id);
      const response = await fetch(`http://localhost:4000/product/single/${id}`);

      if (!response.ok) throw new Error("Failed to fetch product details");

      const data = await response.json();
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
//handle add to cart
const handleAddToCart = async () => {
  try {
    const userData = localStorage.getItem("user"); 
    if (!userData) {
      setCartMessage("❌ Please log in to add items to your cart.");
      return;
    }

    const user = JSON.parse(userData);
    const token = user.token;
    if (!token) {
      setCartMessage("❌ Please log in to add items to your cart.");
      return;
    }

    console.log("Product ID being sent:", id); // Debugging log

    const requestBody = {
      product:{
        product_id: id, // Ensure this matches backend expectation
        quantity: 1,
      }
   
    };
    console.log("Request body:", requestBody); // Debugging log

    const response = await fetch("http://localhost:4000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    console.log("Response from server:", result);

    if (!response.ok) throw new Error(result.message || "Failed to add to cart");

    setCartMessage("✅ Product added to cart successfully!");
  } catch (error) {
    console.error("Error adding to cart:", error);
    setCartMessage("❌ Failed to add product to cart.");
  }

  setTimeout(() => setCartMessage(""), 3000);
};


  if (loading) return <p className="loading-text">Loading...</p>;
  if (!product) return <p className="error-text">Product not found.</p>;

  return (
    <div className="single-product-container">
      <div className="product-image-box">
        <img 
          src={`http://localhost:4000/${product?.images}`} 
          alt={product?.product_name} 
          className="single-product-image" 
        />
      </div>
      <div className="product-details">
        <h2>{product?.product_name}</h2>
        <p className="product-price">₹{product?.product_price}</p>
        <p className="product-discount">Discount: {product?.discount}%</p>
        <p className="product-size">Size: {product?.size}</p>
        <p className="product-description">{product?.description}</p>

        <div className="buttons">
          <button className="add-to-cart" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
          <button className="buy-now">🛍️ Buy Now</button>
        </div>

        {/* Cart message */}
        {cartMessage && <p className="cart-message">{cartMessage}</p>}
      </div>
    </div>
  );
};

export default SingleProduct;
