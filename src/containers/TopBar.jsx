import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import productValidator from "../validators/productValidator";

import "./TopBar.scss";

const TopBar = ({ state: productsInCarts }) => {
  let totalCount = 0;
  productsInCarts.forEach((product) => {
    totalCount += product.count;
  });
  let cartBubble = null;
  if (totalCount > 0) {
    cartBubble = (
      <div className="cart-bubble text-center">
        {totalCount}
      </div>
    );
  }
  return (
    <div className="col-100 text-right top-bar">
      <Link to="/" className="link">Browse</Link>
      <Link to="/cart" className="link cart-button">Cart{cartBubble}</Link>
    </div>
  );
};

TopBar.propTypes = {
  state: PropTypes.arrayOf(productValidator).isRequired,
};

export default connect(state => ({
  state: state.cartReducer,
}))(TopBar);
