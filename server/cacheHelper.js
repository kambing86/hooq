const fetch = require("node-fetch");
const LRU = require("lru-cache");

const cache = LRU({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

function getJSONfetch(url) {
  return fetch(url).then(result => result.json()).then((json) => {
    // status_code: 25
    // request count is over the allowed limit of 40
    if (json.status_code === 25) {
      console.error(json);
      return getJSONfetch(url);
    }
    return json;
  });
}

module.exports = {
  fetchJSON(url) {
    let item = cache.get(url);
    if (item === undefined) {
      item = getJSONfetch(url);
      cache.set(url, item);
    }
    return item;
  },
};
