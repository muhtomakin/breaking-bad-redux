import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Item({ item }) {
  return (
    <div className="quote_item">
      <Link to={`/quotes/${item.quote_id}`}><q>{item.quote}</q></Link> <strong>{item.author}</strong>
    </div>
  );
}

export default Item;