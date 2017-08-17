import React from "react";
import PropTypes from "prop-types";

import Filter from "./Filter";

import filterValidator from "../validators/filterValidator";

import "./FilterList.scss";

class FilterList extends React.Component {
  render() {
    const { filters, onClearClick, onFilterClick } = this.props;
    const headerArray = filters.reduce((acc, filter) => {
      if (!acc.includes(filter.header)) {
        return acc.concat(filter.header);
      }
      return acc;
    }, []);
    const filterCategoryArray = headerArray.map((header) => {
      const valueArray =
        filters.filter(filter => filter.header === header)
          .map(filter => (
            <Filter key={`${header}_${filter.value}`} filter={filter} onClick={onFilterClick} />
          ));
      return (
        <div key={header}>
          <h3>{header}</h3>
          {valueArray}
        </div>
      );
    });
    return (
      <div className="col-100">
        {filterCategoryArray}
        <button
          className="btn-clear"
          onClick={() => {
            onClearClick();
          }}
        >Clear All</button>
      </div>
    );
  }
}

FilterList.propTypes = {
  filters: PropTypes.arrayOf(filterValidator).isRequired,
  onClearClick: PropTypes.func.isRequired,
  onFilterClick: PropTypes.func.isRequired,
};

export default FilterList;
