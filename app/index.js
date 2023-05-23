//!         [Koa]
const Koa = require("koa");
const parser = require("koa-bodyparser");
const os = require('os');
//*         [LIB]
const router = require("./src/webserver/router");
const _v = require("./log");
//*         [DATA]
const App = new Koa();
const port = 4420;


App.use(parser())
  .use(router.routes())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message,
      };
    }
  })
  .listen(port, () => {
    _v(`Launching at http://127.0.0.1:${port}/ 🚀`);
  });
