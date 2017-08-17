import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import TopBar from "./TopBar";

import productValidator from "../validators/productValidator";
import historyValidator from "../validators/historyValidator";

import "./ProductDetails.scss";

const ProductDetails = ({ state: product, dispatch, history }) => {
  let productInfo = null;
  if (product) {
    productInfo = (
      <div className="product-details flex-row flex-auto">
        <div className="image-column">
          <div>{product.name}</div>
          <img src={`/images/${product.image}`} alt={product.name} />
        </div>
        <div>
          <div>{product.measurement}</div>
          <div><b>${product.price}</b></div>
          <div className="product-desc">{product.desc}</div>
          <button
            className="btn-add-cart"
            onClick={(event) => {
              event.preventDefault();
              dispatch({ type: "ADD_CART", product });
              history.push("/cart");
            }}
          >Add To Cart</button>
        </div>
      </div>
    );
  }
  return (
    <div className="full-frame flex-col">
      <TopBar className="flex-auto" />
      {productInfo}
    </div>
  );
};

ProductDetails.propTypes = {
  state: productValidator.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: historyValidator.isRequired,
};

export default withRouter(connect((state, ownProps) => ({
  state: state.productReducer.find(product => product.id === ownProps.match.params.id),
}))(ProductDetails));
