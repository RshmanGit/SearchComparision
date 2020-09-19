/* eslint-disable camelcase */
const csv = require('csv-parser');
const fs = require('fs');

const Product = require('../schema/Product');

fs.createReadStream('src/csvData/products.csv')
  .pipe(csv())
  .on('data', (row) => {
    const { BRAND_NAME: brand, DRUG_NAME: name, FORM_OF_DOSAGE: dosage_form } = row;

    const newProduct = new Product({ brand, name, dosage_form });

    newProduct.save();
    newProduct.on('es-indexed', (err) => {
      if (err) console.log(err);
      else console.log('Product indexed');
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
