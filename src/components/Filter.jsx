import React from "react";
import PropTypes from "prop-types";

import filterValidator from "../validators/filterValidator";

const Filter = ({ filter, onClick }) => {
  const { name, value, checked } = filter;
  const id = name + value;
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        readOnly
        onClick={() => {
          onClick({ name, value });
        }}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

Filter.propTypes = {
  filter: filterValidator.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Filter;
