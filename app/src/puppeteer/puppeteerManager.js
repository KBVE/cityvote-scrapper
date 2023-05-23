//?     Written by Carlos Mucuho from DO
//TODO  Add Custom Logger

const _v = require('../../log');
class PuppeteerManager {
    constructor(args) {
        //*     [CORE]
        this.url = args.url
        this.existingCommands = args.commands
        this.nrOfPages = args.nrOfPages
        //*     [DATA]
        this.allBooks = [];
        this.booksDetails = {}
    }

    async runPuppeteer() {
        const puppeteer = require('puppeteer')
        let commands = []
        if (this.nrOfPages > 1) {
            for (let i = 0; i < this.nrOfPages; i++) {
                if (i < this.nrOfPages - 1) {
                    commands.push(...this.existingCommands)
                } else {
                    commands.push(this.existingCommands[0])
                }
            }
        } else {
            commands = this.existingCommands
        }
        console.log('commands length', commands.length)

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-gpu",
            ]
        });

        let page = await browser.newPage()
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            if (['image'].indexOf(request.resourceType()) !== -1) {
                request.abort();
            } else {
                request.continue();
            }
        });

        await page.on('console', msg => {
            for (let i = 0; i < msg._args.length; ++i) {
                msg._args[i].jsonValue().then(result => {
                    console.log(result);
                })

            }
        });

        await page.goto(this.url);

        let timeout = 6000
        let commandIndex = 0
        while (commandIndex < commands.length) {
            try {
         
                console.log(`command ${(commandIndex + 1)}/${commands.length}`)
                let frames = page.frames()
                await frames[0].waitForSelector(commands[commandIndex].locatorCss, { timeout: timeout })
                await this.executeCommand(frames[0], commands[commandIndex])
                await this.sleep(1000)
            } catch (error) {
                console.log(error)
                break
            }
            commandIndex++
        }
        console.log('done')
        await browser.close();
    }

    async executeCommand(frame, command) {
        await console.log(command.type, command.locatorCss)
        switch (command.type) {
            case "click":
                try {
                    await frame.$eval(command.locatorCss, element => element.click());
                    return true
                } catch (error) {
                    console.log("error", error)
                    return false
                }
            case "getItems":
                try {
                    let books = await frame.evaluate((command) => {
                        function wordToNumber(word) {
                            let number = 0
                            let words = ["zero","one","two","three","four","five"]
                            for(let n=0;n<words.length;words++){
                                if(word == words[n]){
                                    number = n
                                    break
                                }
                            }  
                            return number
                        }

                        try {
                            let parsedItems = [];
                            let items = document.querySelectorAll(command.locatorCss);
                            
                            items.forEach((item) => {
                                let link = 'http://books.toscrape.com/catalogue/' + item.querySelector('div.image_container a').getAttribute('href').replace('catalogue/', '')
                                let starRating = item.querySelector('p.star-rating').getAttribute('class').replace('star-rating ', '').toLowerCase().trim()
                                let title = item.querySelector('h3 a').getAttribute('title')
                                let price = item.querySelector('p.price_color').innerText.replace('£', '').trim()
                                let book = {
                                    title: title,
                                    price: parseInt(price),
                                    rating: wordToNumber(starRating),
                                    url: link
                                }
                                parsedItems.push(book)
                            })
                            return parsedItems;
                        } catch (error) {
                            console.log(error)
                        }
                    }, command).then(result => {
                        this.allBooks.push.apply(this.allBooks, result)
                        console.log('allBooks length ', this.allBooks.length)
                    })
                    return true
                } catch (error) {
                    console.log("error", error)
                    return false
                }
            case "getItemDetails":
                try {
                    this.booksDetails = JSON.parse(JSON.stringify(await frame.evaluate((command) => {
                        try {
                            let item = document.querySelector(command.locatorCss);
                            let description = item.querySelector('.product_page > p:nth-child(3)').innerText.trim()
                            let upc = item.querySelector('.table > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)')
                                .innerText.trim()
                            let nrOfReviews = item.querySelector('.table > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(2)')
                                .innerText.trim()
                            let availability = item.querySelector('.table > tbody:nth-child(1) > tr:nth-child(6) > td:nth-child(2)')
                                .innerText.replace('In stock (', '').replace(' available)', '')
                            let details = {
                                description: description,
                                upc: upc,
                                nrOfReviews: parseInt(nrOfReviews),
                                availability: parseInt(availability)
                            }
                            return details;
                        } catch (error) {
                            console.log(error)
                            return error
                        }

                    }, command))) 
                    console.log(this.booksDetails)
                    return true
                } catch (error) {
                    console.log("error", error)
                    return false
                }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async getAllBooks() {
        await this.runPuppeteer()
        return this.allBooks
    }

    async getBooksDetails() {
        await this.runPuppeteer()
        return this.booksDetails
    }
}

module.exports = { PuppeteerManager }