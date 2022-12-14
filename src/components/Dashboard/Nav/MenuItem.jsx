import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MenuItem = ({ path, page }) => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    // If item path is equal to the current page path 
    // add 'active' class to add a blue background to the item 
    <li 
      className={location.pathname === path ? "active" : null}
      onClick={() => navigate(path)}
    >
      {page}
    </li>
  );
};

export default MenuItem;
