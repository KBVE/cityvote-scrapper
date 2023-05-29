const puppeteer = require("puppeteer");
const _v = require("../../log");

//?   Minimal Args by Jon

const minimal_args = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
];
class Puppet {
  constructor(__url) {
    //*     [CORE]
    this.url = __url;
    this.browser;
    this.page;
    this.loading = false;
    this.exit = false;
    this.data;
  }

  async _kbveInit() {
    this.loading = true;
    this.browser = await puppeteer.launch({
      headless: false,
      ignoreHTTPSErrors: true,
      args: minimal_args,
    });

    this.page = await this.browser.newPage();
    await this.page.setDefaultTimeout(5000);
    await this.page.setViewport({ width: 1280, height: 720 });

    await this.page.goto(this.url, {
      waitUntil: "domcontentloaded",
    });
    this.loading = false;
  }

  async initialize() {
    if (!this.initializationPromise) {
      this.initializationPromise = this._kbveInit();
    }
    return this.initializationPromise;
  }

  _status() {
    _v(`    => [STATUS] => Loading ${this.loading}
            => [STATUS] => Exit ${this.exit}`);
    return this.loading;
  }

  async _clone() {
    try {
      this.data = await this.page.content();
    } catch (error) {
      this.data = error;
    }
    return this.data;
  }

  async _element(__xpath) {
    try {
      //this.data = await this.page.$x(__xpath);
      const element = await this.page.waitForXPath(__xpath);
      this.data = await this.page.evaluate((el) => el.textContent, element);
    } catch (error) {
      this.data = error;
    }
    return this.data;
  }

  async _process() {
    // Check if data is empty?
    try {
      const responseObject = {
        data: this.data,
      };
      this.data = responseObject;
    } catch (error) {
      _v(error);
    }

    return this.data;
  }

  async _close() {
    this.loading = true;
    this.page.close();
    this.browser.close();
    this.loading = false;
    this.exit = true;
  }
}

async function dataMine(__url) {
  const webSite = new Puppet(__url);
  await webSite.initialize();
  return webSite;
}

module.exports = { dataMine };
