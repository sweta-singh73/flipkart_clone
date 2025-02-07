import React from "react";
import "../../App.css"
import { useParams } from "react-router-dom";

const TopInnerSubcategory = ({ innerSubcategories }) => {
  const [searchParams] = useParams({});
  
  const [sucategory, setSubcategory] = useState([])
  // Ensure we only take the top 7 inner subcategories
  const topInnerSubcategories = innerSubcategories.slice(0, 7);

  return (
    <div className="top-inner-subcategories-container">
      {topInnerSubcategories.map((subcategory) => (
        <div key={subcategory.id} className="subcategory-item">
          <img src={subcategory.image} alt={subcategory.name} className="subcategory-image" />
          <p className="subcategory-name">{subcategory.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TopInnerSubcategory;
