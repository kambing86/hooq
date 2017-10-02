const autoprefixer = require("autoprefixer");
const cleancss = require("postcss-clean");

module.exports =
  () => ({
    plugins:
    [
      autoprefixer(),
      cleancss(),
    ],
  });
// (ctx) => {
// console.log(ctx);
// console.log(ctx.webpack.resourcePath);
// }
