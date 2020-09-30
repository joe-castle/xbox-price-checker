module.exports = [
  {
    name: 'Game',
    uri: 'https://www.game.co.uk/en/xbox-series-x-2831406#preorder',
    isInStock: ($) => !$('.outOfStock').text().includes('Sorry, this product is currently out of stock, but might be available in store'),
    inStock: false,
    image: 'data: image/ png; base64, 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'
  },
  {
    name: 'Microsoft',
    uri: 'https://www.microsoft.com/en-gb/p/xbox-series-x/8wj714n3rbtl?icid=Cat-Xbox-Hero1-CTA1-XSX',
    isInStock: ($) => !$('#buttons_ConfigureDeviceButton').text().includes('Out of stock'),
    inStock: false,
    image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2qVsJ?ver=3f74'
  },
  {
    name: 'Smyths Toys',
    uri: 'https://www.smythstoys.com/uk/en-gb/video-games-and-tablets/xbox-series-x/xbox-series-x-consoles/xbox-series-x-1tb-console/p/192012',
    isInStock: ($) => !$('.deliveryType.homeDelivery.js-stockStatus')[1].lastChild.data.includes('Out Of Stock'),
    inStock: false,
    image: 'data:image/png;base64,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'
  },
  {
    name: 'Argos',
    uri: 'https://www.argos.co.uk/list/pre-order-xbox-series-x-and-series-s-and-more?tag=ar:search:m020:xboxseries-preorder',
    isInStock: ($) => $('div[data-product-id=6799030] img[alt="out_of_stock badge"]').length <= 0,
    inStock: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Argos_logo.svg/1200px-Argos_logo.svg.png'
  },
  {
    name: 'Currys',
    uri: 'https://www.currys.co.uk/gbuk/gaming/console-gaming/consoles/microsoft-xbox-series-x-1-tb-10203371-pdt.html',
    isInStock: ($) => $('.nostock').length <= 0,
    inStock: false,
    image: 'data:image/png;base64,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'
  },
  {
    name: 'AO',
    uri: 'https://ao.com/l/search/101/99/?search=xbox%20series%20x',
    isInStock: ($, body) => body.includes('Xbox Series X'),
    inStock: false,
    image: 'https://media.ao.com/Themes/Clients/AOL/AOL/Images/AO-logo-green-exclusion.png'
  },
  {
    name: 'Amazon',
    uri: 'https://www.amazon.co.uk/dp/B08H93GKNJ/ref=twister_B08JHLMGZB?_encoding=UTF8&psc=1',
    isInStock: ($) => !$('#availability span').text().includes('Currently unavailable.'),
    inStock: false,
    image: 'https://www.freelogodesign.org/file/app/blog/20180911090509731amazon_logo_RGB.jpg'
  },
  {
    name: 'Ebuyer',
    uri: 'https://www.ebuyer.com/1125563-xbox-series-x-console-rrt-00007',
    isInStock: ($) => $('img[alt="Coming Soon"]').length <= 0,
    inStock: false,
    image: 'https://image.ebuyer.com/customer/promos/brand_guidelines_2015/ebuyer-black-text-logo-2015.jpg'
  }
]