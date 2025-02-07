import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../../App.css";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const innerSubcategoryId = searchParams.get("innerSubcategoryId");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const limit = 10; // Number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/inner_subcategory/single/${innerSubcategoryId}?page=${page}&limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
        setTotalPages(data.totalPages); // Get total pages from API
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (innerSubcategoryId) {
      fetchProducts();
    }
  }, [innerSubcategoryId, page]); // Fetch when category or page changes

  return (
    <div className="product-page">
      <h2>Products</h2>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : products.length > 0 ? (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card"
                onClick={() => navigate(`/single_product/${product._id}`)}
              >
                <img
                  src={`http://localhost:4000/${product.images}`}
                  alt={product.product_name}
                  className="product-image"
                />
                <div className="product-info">
                  <p className="product-name">{product.product_name}</p>
                  <p className="product-price">₹{product.product_price}</p>
                  <p className="product-discount">{product.discount}</p>
                  <p className="product-size">{product.size}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="pagination-btn"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="pagination-btn-next"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="no-products">No products found.</p>
      )}
    </div>
  );
};

export default ProductPage;
