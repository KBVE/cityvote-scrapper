//!         [Core]
const axios = require('axios');
const puppeteer = require ('puppeteer');

//? Example Code Reference -> https://gist.github.com/nitayneeman/69876fea604aed196ad6cdf4c3e25f97
//? Main Example Function -> https://scrapfly.io/blog/web-scraping-with-puppeteer-and-nodejs/

async function main(){
  // First, we must launch a browser instance
  const browser = await puppeteer.launch({
    // Headless option allows us to disable visible GUI, so the browser runs in the "background"
    // for development lets keep this to true so we can see what's going on but in
    // on a server we must set this to true
    headless: "new",
    // This setting allows us to scrape non-https websites easier
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox'],
})
// then we need to start a browser tab
let page = await browser.newPage();
// and tell it to go to some URL
await page.goto('http://httpbin.org/html', {
    waitUntil: 'domcontentloaded',
});
// print html content of the website
console.log(await page.content());
// close everything
await page.close();
await browser.close();
}

main();