const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const mongoosastic = require('mongoosastic');

const mongoHost = process.env.MONGODB_HOST;
const mongoDB = process.env.MONGODB_DB;
const esHost = process.env.ES_HOST;
const esURL = esHost.split(':')[0];
const esPort = esHost.split(':')[1];

mongoose.connect(`mongodb://${mongoHost}/${mongoDB}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('[Mongodb]:: Connected');
});

const productSchema = new Schema({
  brand: { type: String, required: true, es_indexed: true },
  name: { type: String, required: true, es_indexed: true },
  dosage_form: { type: String, required: true },
});

productSchema.index({
  brand: 'text',
  name: 'text',
  dosage_form: 'text',
}, {
  name: 'productIndex',
  weights: {
    brand: 5,
    name: 10,
    dosage_form: 1,
  },
});

productSchema.plugin(mongoosastic, {
  host: esURL,
  port: esPort,
  protocol: 'http',
});

module.exports = model('Product', productSchema);
