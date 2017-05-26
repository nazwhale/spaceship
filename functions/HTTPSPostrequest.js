var request = require('request');

// Firebase auth key
var serverKey = "AAAAaI2ZfFw:APA91bGqDh70rNfC8Gtwdxhut5sKhG7td0okEetwnhjWtzvTSC4jJIOReD2nEXkpT4OqMIciJptTxk7Du8MJmvrcW7jTKhiAh7XJYq2kBG2wIQOiwUerx014rpk7nt1JknAS-jdpUJxB";
var clientToken= "dyqMnAjp6K0:APA91bEE9ZTgqn4Fbu6NdyvX1kz_oYMkBtgYehXuMJSEwDKHMlXkNm2Ia6cxSBcxqV88HMbRsbEGRa1dkOZYIVsoBFjNm6D9JMOkwCMwxz_JpkRvfH5BIEmbIvbNSCHACsldAn7MaEhL"

var options = {
  url: 'https://fcm.googleapis.com/fcm/send',
  headers: {
    'Authorization': 'key=' + serverKey
  },
  json: {"to": clientToken,"priority":"high","notification":{"title": "mars"}}
};
request.post(options, function optionalCallback(err, httpResponse, body) {

  if (err) {
    return console.error('ERROR - FIREBASE POST failed:', err);
  }
  console.log(httpResponse.statusCode);
  // Success

});
