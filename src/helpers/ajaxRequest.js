function get(address) {
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener("load", () => {
      if (xmlhttp.status === 200) {
        resolve(xmlhttp.responseText);
      } else {
        reject(new Error(xmlhttp.responseText));
      }
    });
    xmlhttp.addEventListener("error", () => {
      reject(new Error("error"));
    });
    xmlhttp.open("GET", address, true);
    xmlhttp.send();
  });
}

export default {
  get,
};
