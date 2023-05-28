//?         [SHAC0]
const puppeteer = require("puppeteer");
const _v = require("../../log");
//const vm = require('node:vm');


//?   Minimal Args by Jon
const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];


async function load() {
  
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  
}


async function clone(__website) {
  _v(`Shaco Cloning ${__website}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox"],
  });

  let page = await browser.newPage();

  await page.goto(__website, {
    waitUntil: "domcontentloaded",
  });

  let __html = await page.content();
  await page.close();
  await browser.close();
  return __html;
}

async function shiv(__website, __xpath) {
  _v(`Shaco Shiv ${__website}`);
  const browser = await puppeteer.launch({
    headless: "new",
    ignoreHTTPSErrors: true,
    args: ["--no-sandbox"],
  });

  let page = await browser.newPage();

  await page.goto(__website, {
    waitUntil: "domcontentloaded",
  });

  let element = await page.$x(__xpath);
  let __html = await page.evaluate((el) => el.textContent, element[0]);
  await page.close();
  await browser.close();
  return __html;
}


async function box(__website, __xpath) {
    _v(`Shaco Box ${__website}`);
    const browser = await puppeteer.launch({
      headless: "new",
      ignoreHTTPSErrors: true,
      args: ["--no-sandbox"],
    });
  
    let page = await browser.newPage();
  
    await page.goto(__website, {
      waitUntil: "domcontentloaded",
    });
  
    let [element] = await page.$x(__xpath);
    let __html = await page.evaluate((el) => el.textContent, element);
    await page.close();
    await browser.close();
    return __html;
  }
  

module.exports = { clone, box, shiv };
