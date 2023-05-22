const sdk = require('node-appwrite');

const client = new sdk.Client();

const account = new sdk.Account(client);

client
    .setEndpoint('https://ap.kbve.com/v1') 
    .setProject('5df5acd0d48c2')
;