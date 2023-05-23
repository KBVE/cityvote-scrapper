const Router = require("koa-router");
const router = new Router();
const _app = require("../../app");
const _v = require("../../log");
const os = require('os');
//*     [DATA]
let _timeout = 1500000;
let _instances = 0;
let _maxInstances = 5;

router.all("/api/:token", async (ctx, next) => {
  try {
    _v('Why');
    const _renderApp = await _app(ctx.query);
    _v(_renderApp);
    ctx.body = _renderApp;
  } catch (error) {
    ctx.body = {
      status: 500,
      message: error,
    };
  }
});

router.get("/", (ctx, next) => {
  ctx.body = `OS: ${os.hostname().toString()}`;
  //ctx.status = 301;
  //ctx.redirect("https://kbve.com/project/cityvote/");
});

router.post("/login" , async (ctx, next) => {
    
});

module.exports = router;
