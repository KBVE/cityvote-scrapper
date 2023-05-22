//!         [Core]
const puppeteer = require ('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
//?         [OPT]
const axios = require('axios');


//? Example Code Reference -> https://gist.github.com/nitayneeman/69876fea604aed196ad6cdf4c3e25f97
//? Main Example Function -> https://scrapfly.io/blog/web-scraping-with-puppeteer-and-nodejs/

async function manURL( url, xpath, click = false ){
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
await page.goto(url, {
    waitUntil: 'domcontentloaded',
});
// print html content of the website
//console.log(await page.content());
return await page.content();
// close everything
await page.close();
await browser.close();
}

let application = express();
application.use(bodyParser.urlencoded({ extended: false}));
application.use(bodyParser.json());


application.get('/', async function(req, res)
{
  res.send('Hello!');
});

application.get('/url', async function(req, res)
{
    console.log('You hit URL');
    var website = req.query['id'];
    var xpath = req.query['xpath'];
    var click = req.query['click'] || false;
    console.log(website);
    console.log(xpath);
    if ( website != null && xpath != null)
    {
    let html = await manURL(website, xpath, click);
    res.send(html);  
  }
    
});

application.listen(4420, function() {
  console.log('Launched');
})

//* main(); migrate this into application