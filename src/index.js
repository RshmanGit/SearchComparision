const product = require('./schema/Product');

// ====================================================================
// Do not turn this, unless it is the first time you're running it
// ====================================================================
// require('./uploadData');

// ====================================================================
// Entered below are 2 equivalent queries for elasticsearch and mongodb
// . The elastic search does not really work here, but try it on dev
// tool. To make it work here, I was thinking we could directly use the
// elasticsearch API. Much more efficient.

// I think elasticsearch also has a built-in caching mechanism. Because
// The first result does take time to generate but eventually it reduces
// by one exponent. That could also be kibana, but not sure.
// ====================================================================

const searchString = 'dacosamite';

// Elastic results
product.search(
  {
    query_string: {
      query: {
        bool: {
          should: [
            {
              fuzzy: {
                brand: {
                  value: searchString,
                  fuzziness: 'AUTO',
                  max_expansions: 20,
                },
              },
            },
            {
              fuzzy: {
                name: {
                  value: searchString,
                  fuzziness: 'AUTO',
                  max_expansions: 20,
                },
              },
            },
          ],
        },
      },
    },
  },
  (err, res) => {
    if (err) console.log(err);
    else {
      const results = res.hits.hits;
      console.log(results);
    }
  },
);

// ====================================================================
// I did prepare one on my compass but, it did't have fuzzzy search so,
// no effing point doing it.
// ====================================================================
product.aggregate([]);
