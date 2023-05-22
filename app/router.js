const Router = require("koa-router");
const router = new Router();
const _app = require("./app");
const _v = require("./log");

router.all("/api/:token", async (ctx, next) => {
  const _renderApp = await _app(ctx.query);
  if (_renderApp) {
    _v(_renderApp);
    ctx.body = _renderApp;
  } else
    ctx.body = {
      status: 500,
      message: "Invalid Memes",
    };
});

router.get("/", (ctx, next) => {
  ctx.status = 301;
  ctx.redirect("https://kbve.com/project/cityvote/");
});

router.post("/login" , async (ctx, next) => {
    
});

module.exports = router;
