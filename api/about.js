// sample api

let aboutMessage = 'PhotoApp API Version 1.0';

function setAboutMessage(_, { message }) { /* underscore = ignorethis parameter */
  aboutMessage = message;
  return aboutMessage;
}
function getMessage() {
  return aboutMessage;
}

module.exports = { setAboutMessage, getMessage };
