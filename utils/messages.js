const moment = require('moment');

function formatMessage(username, text ,word) {
  let score = false;
  if(text === word){
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

module.exports = formatMessage;
