import favouriteCache from "../helpers/favouriteCache";

function favouriteReducer(state = [], action) {
  switch (action.type) {
    case "INIT_FAV":
      {
        return action.data;
      }
    case "ADD_FAV":
      {
        const newState = state.concat(action.data);
        favouriteCache.set(newState);
        return newState;
      }
    case "DEL_FAV":
      {
        const newState = state.filter(fav => fav.id !== action.data.id);
        favouriteCache.set(newState);
        return newState;
      }
    default:
      {
        return state;
      }
  }
}

export default favouriteReducer;
