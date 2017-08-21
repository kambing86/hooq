import localForage from "localforage";

const key = "FAVOURITE";

export default {
  get() {
    return localForage.getItem(key);
  },
  set(value) {
    localForage.setItem(key, value);
  },
};
