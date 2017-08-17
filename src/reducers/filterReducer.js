const filterHeaders = {
  brand: "Brands",
  price: "Price",
};

function filterReducer(state = [], action) {
  switch (action.type) {
    case "INIT_DATA":
      {
        return action.data.filters.reduce((arr, filter) =>
          arr.concat(filter.values.map(value => ({
            value,
            header: filterHeaders[filter.name],
            checked: false,
            name: filter.name,
          }))), []);
      }
    case "CHECK_FILTER":
      {
        return state.map((filter) => {
          if (action.name === filter.name && action.value === filter.value) {
            return {
              ...filter,
              checked: !filter.checked,
            };
          }
          return filter;
        });
      }
    case "CLEAR_FILTER":
      {
        return state.map((filter) => {
          if (filter.checked) {
            return {
              ...filter,
              checked: false,
            };
          }
          return filter;
        });
      }
    default:
      {
        return state;
      }
  }
}

export default filterReducer;
