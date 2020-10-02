require('dotenv').config()
const express = require('express')
const cron = require('node-cron')

const stockChecker = require('./src/stock-checker')
const checkers = require('./src/checkers')

const cronLogger = require('./src/logger')('CRON')
const htmlLogger = require('./src/logger')('HTML')

const { PORT, CRON } = process.env

stockChecker()

cron.schedule(CRON, () => {
  cronLogger.info('Executing cron job for stock checker.')
  stockChecker()
})

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
  htmlLogger.info('GET request received, returning in-stock data in HTML.')
  res.render('index', { checkers })
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))