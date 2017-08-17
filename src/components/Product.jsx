import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import productValidator from "../validators/productValidator";
import historyValidator from "../validators/historyValidator";

import "./Product.scss";

const Product = ({ product, history, onAddCart, onRemoveCart }) => {
  const link = `/details/${encodeURIComponent(product.id)}`;
  const { count = 0 } = product;
  let controlComponents = null;
  if (count === 0) {
    controlComponents = (
      <button
        className="btn-add-cart"
        onClick={(event) => {
          event.preventDefault();
          onAddCart(product);
          history.push("/cart");
        }}
      >
        Add To Cart
        </button>
    );
  } else {
    controlComponents = (
      <div>
        <button
          className="btn-product"
          onClick={(event) => {
            event.preventDefault();
            onRemoveCart(product);
          }}
        >-</button>
        <div className="product-count text-center">{count}</div>
        <button
          className="btn-product"
          onClick={(event) => {
            event.preventDefault();
            onAddCart(product);
          }}
        >+</button>
      </div>
    );
  }
  return (
    <Link to={link}>
      <div className="product-container text-center">
        <img src={`/images/${product.image}`} alt={product.name} />
        <div className="product-title">
          <div>{product.name}</div>
          <div>{product.measurement}</div>
        </div>
        <div><b>${product.price}</b></div>
        {controlComponents}
      </div>
    </Link>
  );
};

Product.propTypes = {
  product: productValidator.isRequired,
  history: historyValidator.isRequired,
  onAddCart: PropTypes.func.isRequired,
  onRemoveCart: PropTypes.func.isRequired,
};

export default withRouter(Product);
