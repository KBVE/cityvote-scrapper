//?         [SHAC0]
const puppeteer = require("puppeteer");
const _v = require("./log");
//const vm = require('node:vm');


async function clone(__website) {
  _v(`Shaco Cloning ${__website}`);

  const browser = await puppeteer.launch({
    headless: "new",
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
