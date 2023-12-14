const puppeteer = require('puppeteer');

const getProductData = async (links) => {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
    const data = [];

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });

        for (let i = 0; i < links.length; i++) {
            try {
                await page.goto(links[i]);
                await page.waitForSelector('.pdp-mod-product-badge-title');

                const title = await page.$eval('.pdp-mod-product-badge-title', (element) => element.innerText);
                const image = await page.$eval('.gallery-preview-panel__image', (element) => element.src);
                const price = await page.$eval('.pdp-price', (element) => element.innerText);

                data.push({ title, image, price });
            } catch (error) {
                console.error(error);
            }
        }

        await page.close();
    } catch (error) {
        console.error(error);
    } finally {
        await browser.close();
    }

    return data;
};

module.exports = getProductData;
