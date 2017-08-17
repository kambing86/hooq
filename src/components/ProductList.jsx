import React from "react";
import PropTypes from "prop-types";
import hash from "object-hash";

import Product from "./Product";

import productValidator from "../validators/productValidator";

const ProductList = ({ products, onAddCart, onRemoveCart }) => {
  const productArray = products.map(product => (
    <Product
      key={hash(product)}
      product={product}
      onAddCart={onAddCart}
      onRemoveCart={onRemoveCart}
    />
  ));
  return (
    <div className="product-list">
      {productArray}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(productValidator).isRequired,
  onAddCart: PropTypes.func.isRequired,
  onRemoveCart: PropTypes.func.isRequired,
};

export default ProductList;
