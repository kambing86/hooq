function cartReducer(state = [], action) {
  switch (action.type) {
    case "ADD_CART":
      {
        const getProduct = state.find(product => product.id === action.product.id);
        if (getProduct) {
          return state.map((product) => {
            if (product.id === action.product.id) {
              return {
                ...product,
                count: product.count + 1,
              };
            }
            return product;
          });
        }
        return state.concat({
          ...(action.product),
          count: 1,
        });
      }
    case "REMOVE_CART":
      {
        const getProduct = state.find(product => product.id === action.product.id);
        if (getProduct && getProduct.count === 1) {
          return state.filter(product => product.id !== action.product.id);
        }
        return state.map((product) => {
          if (product.id === action.product.id) {
            return {
              ...product,
              count: product.count - 1,
            };
          }
          return product;
        });
      }
    default:
      {
        return state;
      }
  }
}
export default cartReducer;
