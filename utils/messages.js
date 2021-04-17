const moment = require('moment');

function formatMessage(username, text, word) {
  let score = false;
  if (text === word) {
    score = true;
    text = `${username} guess the word`;
  }
  return {
    username,
    text,
    time: moment().format('h:mm a'),
    score,
  };
}

function guessPoints(user, text, word) {
  if (text == word) {
    user.score++;
    text = `${user.username} guess the word`;
  }
  return {
    username: user.username,
    text,
    time: moment().format('h:mm a'),
  };
}

module.exports = { formatMessage, guessPoints };
