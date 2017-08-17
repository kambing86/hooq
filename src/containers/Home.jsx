import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TopBar from "./TopBar";
import FilterList from "../components/FilterList";
import ProductList from "../components/ProductList";

import filterValidator from "../validators/filterValidator";
import productValidator from "../validators/productValidator";

import clearFilter from "../actions/clearFilter";
import checkFilter from "../actions/checkFilter";
import addCart from "../actions/addCart";
import removeCart from "../actions/removeCart";

import "./Home.scss";

const Home = ({ state, dispatch }) => {
  const { filters, products } = state;
  return (
    <div className="full-frame flex-col">
      <TopBar className="flex-auto" />
      <div className="flex-row flex-auto">
        <div className="left-panel">
          <FilterList
            filters={filters}
            onClearClick={() => { dispatch(clearFilter()); }}
            onFilterClick={((data) => { dispatch(checkFilter(data)); })}
          />
        </div>
        <div className="main-panel">
          <ProductList
            products={products}
            onAddCart={(product) => { dispatch(addCart(product)); }}
            onRemoveCart={(product) => { dispatch(removeCart(product)); }}
          />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  state: PropTypes.shape({
    filters: PropTypes.arrayOf(filterValidator).isRequired,
    products: PropTypes.arrayOf(productValidator).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function doFilter(filter, product) {
  switch (filter.name) {
    case "brand": {
      return product.brand === filter.value;
    }
    case "price": {
      const priceRange = filter.value.split("-");
      if (priceRange.length === 2) {
        const floatPrice = parseFloat(product.price);
        return (floatPrice >= parseFloat(priceRange[0]) && floatPrice <= parseFloat(priceRange[1]));
      }
      return true;
    }
    default: {
      return true;
    }
  }
}

export default connect((state) => {
  const checkedFilterArray = state.filterReducer.filter(filter => filter.checked);
  const products =
    checkedFilterArray.length === 0
      ? state.productReducer
      : state.productReducer.filter(product =>
        !checkedFilterArray.some(filter => !doFilter(filter, product)));
  const validFilterArray =
    state.filterReducer.filter(filter =>
      products.some(product => doFilter(filter, product)));
  return {
    state: {
      filters: validFilterArray,
      products,
    },
  };
})(Home);
