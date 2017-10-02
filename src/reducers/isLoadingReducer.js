function isLoadingReducer(state = false, action) {
  switch (action.type) {
    case "SET_LOADING":
    {
      return action.data;
    }
    default:
    {
      return state;
    }
  }
}

export default isLoadingReducer;
