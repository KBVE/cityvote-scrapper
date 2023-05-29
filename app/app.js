//!         [App]
const shaco = require('./src/puppeteer/shaco');
const _v = require('./log');


function voidError(message) {
  _v(`[error]: ${message}`);
  var error = {
    status: 500,
    json: message,
  };
 return JSON.stringify(error);
}

async function app(__data) {
  _v('Running Application');
  //var __html = undefined;
  var httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (__data == null)
    return voidError('Missing data')

  const { __website , __xpath, __action } = __data;


  if (__website == null || !httpRegex.test(__website))
    return voidError('Website variable missing or has errors')

  if (__website && __action == 'clone') //? Shadow Clone - Grabs HTML
    return shaco.clone(__website)
  
  if(__website && __action == 'screenshot') //? ScreenshotScreenshotScreenshotScreenshotScreenshotScreenshotScreenshotScreenshotScreenshot
    return shaco.screenshot(__website) //? This is a random comment from fud

  if(__website && __action == 'shiv')
    return shaco.shiv(__website, __xpath)
  
  if (__website && __xpath && __action == 'box')
    return shaco.box(__website, __xpath)


}

module.exports = app;
