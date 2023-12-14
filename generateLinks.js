const puppeteer = require('puppeteer');
const links = [];

const pageNavigate = async (page) => {

    // Generate product links of a page
    const data = await page.evaluate(() => {
        const hrefs = Array.from(document.querySelector('.box--ujueT').querySelectorAll('#id-a-link')).map(item => item.href);
        const uniqueHrefs = [...new Set(hrefs)];
        return uniqueHrefs;
    })
    links.push(...data);
    try{
        const pagination = await page.waitForSelector('.ant-pagination-next');
        if (pagination) {
            const hasNextPage = await page.evaluate(() => document.querySelector('.ant-pagination-next').ariaDisabled == 'false' ? true : false);
            console.log(hasNextPage);
            if (hasNextPage) {
                const elements = await page.$x('//li[@title="Next Page"]');
                await elements[0].click();
                await pageNavigate(page);
            } else {
    
                return;
            }
        }
    }catch(error){
        console.log(error);
    }
    
}

// Main function
const generateLinks = async (link) => {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(link);
    await page.waitForSelector('#pi-component-container > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2)')
    await page.click('#pi-component-container > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2)');
    await page.waitForSelector('#root > div > div.ant-row.main--pIV2h > div > div > div.ant-col-19.ant-col-push-5.side-right--Tyehf > div.box--ujueT');
    const data = await pageNavigate(page);
    browser.close();
    return links;
};

module.exports = generateLinks;