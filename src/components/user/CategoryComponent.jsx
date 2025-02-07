import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"; 
import "../../App.css";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [hoveredSubcategoryId, setHoveredSubcategoryId] = useState(null);
  const [innerSubcategories, setInnerSubcategories] = useState([]);

  const navigate = useNavigate(); // Initialize useNavigate

  const dropDownCategories = [
    "Fashion",
    "Electronics",
    "Home & Furniture",
    "Beauty, Toys & More",
    "Two Wheelers"
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/category/list");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data.slice(0, 9));
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(true);
      }
    };

    fetchCategories();
  }, []);

  const handleMouseEnterCategory = async (categoryId, categoryName) => {
    if (!dropDownCategories.includes(categoryName)) return;

    setHoveredCategoryId(categoryId);
    try {
      const response = await fetch(`http://localhost:4000/category/single/${categoryId}`);
      const data = await response.json();

      if (response.ok) {
        setSubcategories(data.data);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      setSubcategories([]);
      console.error("Error fetching subcategories", error);
    }
  };

  const handleMouseEnterSubcategory = async (subcategoryId) => {
    setHoveredSubcategoryId(subcategoryId);
    try {
      const response = await fetch(`http://localhost:4000/subcategory/single/${subcategoryId}`);
      const data = await response.json();

      if (response.ok) {
        setInnerSubcategories(data.data);
      } else {
        setInnerSubcategories([]);
      }
    } catch (error) {
      setInnerSubcategories([]);
      console.error("Error fetching inner subcategories", error);
    }
  };

  const handleInnerSubcategoryClick = (innerSubcategoryId) => {
    navigate(`/products?innerSubcategoryId=${innerSubcategoryId}`); // Navigate to products page with query param
  };

  return (
    <div className="category-container">
      {error && <p className="error-message">Failed to load categories.</p>} 

      {categories.length === 0 ? (
        <p className="no-data">No categories found.</p>
      ) : (
        <div className="category-horizontal-scroll">
          {categories.map((category) => (
            <div
              key={category._id}
              className="category-card"
              onMouseEnter={() => handleMouseEnterCategory(category._id, category.categoryName)}
              onMouseLeave={() => {
                setHoveredCategoryId(null);
                setSubcategories([]);
                setHoveredSubcategoryId(null);
                setInnerSubcategories([]);
              }}
            >
              <img
                src={`http://localhost:4000/${category.images}`}
                alt={category.categoryName}
                className="category-image"
              />
              <div className="category-info">
                <p className="category-name">
                  {category.categoryName}
                  {dropDownCategories.includes(category.categoryName) && (
                    <MdKeyboardArrowDown className="icon" />
                  )}
                </p>

                {hoveredCategoryId === category._id && subcategories.length > 0 &&
                  dropDownCategories.includes(category.categoryName) && (
                    <div className="subcategory-list">
                      <ul>
                        {subcategories.map((subcategory) => (
                          <li
                            key={subcategory._id}
                            onMouseEnter={() => handleMouseEnterSubcategory(subcategory._id)}
                            className="subcategory-item"
                          >
                            {subcategory.sub_category_name}
                            {innerSubcategories.length > 0 && hoveredSubcategoryId === subcategory._id && (
                              <MdKeyboardArrowRight className="inner-icon" />
                            )}

                            {hoveredSubcategoryId === subcategory._id && innerSubcategories.length > 0 && (
                              <div className="inner-subcategory-list">
                                <ul>
                                  {innerSubcategories.map((innerSubcategory) => (
                                    <li
                                      key={innerSubcategory._id}
                                      onClick={() => handleInnerSubcategoryClick(innerSubcategory._id)}
                                      className="inner-subcategory-item"
                                    >
                                      {innerSubcategory.innerSubCategoryName}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;
