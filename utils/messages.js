const moment = require('moment');

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().add(6, 'hours').subtract(30, 'minutes').format('hh:mm a'),
  };
}

module.exports = formatMessage;
