function pad(num) {
  return num <= 9 ? '0' + num : num
}

module.exports.formatDate = (dateTime = new Date()) =>
  `${pad(dateTime.getDate())}/${pad(dateTime.getMonth() + 1)}/${pad(dateTime.getFullYear())} ${pad(dateTime.getHours())}:${pad(dateTime.getMinutes())}`
