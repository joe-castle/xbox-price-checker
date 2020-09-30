const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} - [${level}] [${label}]: ${message}`
});

module.exports = (labelName, filename = 'combined.log') =>
  createLogger({
    level: 'info',
    format: combine(
      label({ label: labelName }),
      timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }),
      myFormat
    ),
    transports: [
      new transports.File({ dirname: `${__dirname}/../`, filename: 'error.log', level: 'error' }),
      new transports.File({ dirname: `${__dirname}/../`, filename: filename })
    ]
  })