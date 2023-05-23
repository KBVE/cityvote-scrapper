const Router = require("koa-router");
const router = new Router();
const _app = require("../../app");
const _v = require("../../log");
const os = require("os");
//*     [DATA]
let _timeout = 1500000;
let _instances = 0;
let _maxInstances = 5;

router.all("/api/:token", async (ctx, next) => {
  try {
    _v(`{r} -> api -> token ${ctx.params.token}`);
    const _renderApp = await _app(ctx.query);
    if (_renderApp) {
      ctx.body = _renderApp;
    }
  } catch (error) {
    _v(error);
    ctx.body = {
      status: 500,
      message: error,
    };
  }
});

router.all("/blueprint/:token", async (ctx, next) => {
  try {
    _v(`{r} -> blueprint -> token ${ctx.params.token}`);
  } catch (error) {
    _v(error);
  }
});

router.get("/", (ctx, next) => {
  ctx.body = `OS: ${os.hostname().toString()}`;
});

router.get("/docs", (ctx, next) => {
  ctx.status = 301; //?   301 To Documents
  ctx.redirect("https://kbve.com/project/cityvote/");
});

//TODO Auth & Login for the Router
router.get("/login", async (ctx, next) => {});

module.exports = router;
