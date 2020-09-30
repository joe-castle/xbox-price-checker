const fetch = require('node-fetch')
const Crawler = require('crawler')

const logger = require('./logger')('STOCK')
const checkers = require('./checkers')

const { MAKER_KEY } = process.env

const crawl = new Crawler({
  rotateUA: true,
  userAgent: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
  ]
});

module.exports = () => checkers.forEach((checker) => {
  const { name, uri, isInStock } = checker;

  crawl.queue({
    uri,
    callback: (err, res, done) => {
      if (err) {
        logger.error(err)
      }

      if (isInStock(res.$, res.body)) {
        logger.info(`In stock at ${name}!`)

        checker.inStock = true

        fetch(`https://maker.ifttt.com/trigger/xbox-available/with/key/${MAKER_KEY}`, {
          method: 'POST',
          body: JSON.stringify({ value1: name, value2: uri })
        })
          .then((res) => res.text())
          .then((res) => logger.info(`Sent in-stock notification for ${name}.`))
          .catch((err) => logger.error(err))

      } else {
        logger.info(`Out of stock at ${name}.`)

        checker.inStock = false
      }

      done()
    }
  })

})
