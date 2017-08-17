function productReducer(state = [], action) {
  switch (action.type) {
    case "INIT_DATA":
      {
        return action.data.products.map(product => ({
          ...product,
          id: product.name + product.measurement + product.price,
        }));
      }
    default:
      {
        return state;
      }
  }
}

export default productReducer;
