require('dotenv').config()
const fetch = require('node-fetch')
const Crawler = require('crawler')
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const { MAKER_KEY } = process.env

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
});

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Checking stock' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.File({ dirname: 'services/xbox-price-checker', filename: 'error.log', level: 'error' }),
    new transports.File({ dirname: 'services/xbox-price-checker', filename: 'combined.log' })
  ]
})

const crawl = new Crawler({
  rotateUA: true,
  userAgent: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
  ]
});

[
  {
    name: 'Game',
    uri: 'https://www.game.co.uk/en/xbox-series-x-2831406#preorder',
    inStock: ($) => !$('.outOfStock').text().includes('Sorry, this product is currently out of stock, but might be available in store')
  }, 
  {
    name: 'Microsoft',
    uri: 'https://www.microsoft.com/en-gb/p/xbox-series-x/8wj714n3rbtl?icid=Cat-Xbox-Hero1-CTA1-XSX',
    inStock: ($) => !$('#buttons_ConfigureDeviceButton').text().includes('Out of stock')
  },
  {
    name: 'Smyths Toys',
    uri: 'https://www.smythstoys.com/uk/en-gb/video-games-and-tablets/xbox-series-x/xbox-series-x-consoles/xbox-series-x-1tb-console/p/192012',
    inStock: ($) => !$('.deliveryType.homeDelivery.js-stockStatus')[1].lastChild.data.includes('Out Of Stock')
  },
  {
    name: 'Argos',
    uri: 'https://www.argos.co.uk/list/pre-order-xbox-series-x-and-series-s-and-more?tag=ar:search:m020:xboxseries-preorder',
    inStock: ($) => $('div[data-product-id=6799030] img[alt="out_of_stock badge"]').length <= 0
  },
  {
    name: 'Currys',
    uri: 'https://www.currys.co.uk/gbuk/gaming/console-gaming/consoles/microsoft-xbox-series-x-1-tb-10203371-pdt.html',
    inStock: ($) => $('.nostock').length <= 0
  },
  {
    name: 'AO',
    uri: 'https://ao.com/l/search/101/99/?search=xbox%20series%20x',
    // inStock: ($) => Array.from($('.product-card h2.text-title-sm')).some(x => x.innerText.includes('Xbox Series X'))
    inStock: ($, body) => body.includes('Xbox Series X')
  },
  {
    name: 'Amazon',
    uri: 'https://www.amazon.co.uk/dp/B08H93GKNJ/ref=twister_B08JHLMGZB?_encoding=UTF8&psc=1',
    inStock: ($) => !$('#availability span').text().includes('Currently unavailable.')
  },
  {
    name: 'Ebuyer',
    uri: 'https://www.ebuyer.com/1125563-xbox-series-x-console-rrt-00007',
    inStock: ($) => $('img[alt="Coming Soon"]').length <= 0
  }
].forEach(({ name, uri, inStock }) => {

  crawl.queue({
    uri,
    callback: (err, res, done) => {
      if (err) {
        logger.error(err)
      }

      if (inStock(res.$, res.body)) {
        logger.info(`In stock at ${name}!`)

        fetch(`https://maker.ifttt.com/trigger/speed_dropped/with/key/${MAKER_KEY}`, {
          method: 'POST',
          body: { value1: name, value2: uri }
        })
          .then((res) => res.text())
          .then((res) => logger.info(`Sent in-stock notification for ${name}`))
          .catch((err) => logger.error(err))

      } else {
        logger.info(`Out of stock at ${name}`)
      }

      done()
    }
  })

})
