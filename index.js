const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const generateLinks = require('./generateLinks');
const productData = require('./productData');

// const url = 'https://www.daraz.com.bd/shop/wphw3yn4/';
const url = 'https://www.daraz.com.bd/shop/dream-islam/';
// const url = 'https://www.daraz.com.bd/shop/kohinoor-shop-bd/?spm=a2a0e.pdp.seller.1.303c5606FKsiiN&itemId=296662097&channelSource=pdp/'

/**
 * Main function to fetch links, generate product data, and write to a CSV file.
 */
const main = async () => {
    try {
        // Generate links
        const links = await generateLinks(url);
        // Generate product data
        console.log(links.length);
        const data = await productData(links);
        console.log(data);
        await writeCsvFile('scrappingData.csv', data);
    } catch (error) {
        console.log(error);
    }
};

/**
 * Writes data to a CSV file.
 *
 * @param {string} filename - The name of the CSV file.
 * @param {Array} data - The data to be written to the CSV file.
 */
const writeCsvFile = async (filename, data) => {
    /**
     * Create a CSV writer with specified options.
     *
     * @type {CsvWriter}
     */
    const csvWriter = createCsvWriter({
        path: filename,
        header: Object.keys(data[0]).map(key => ({ id: key, title: key })),
    });

    // Write records to the CSV file
    await csvWriter.writeRecords(data);
    console.log(`CSV file "${filename}" written successfully.`);
};

// Execute the main function
main();
