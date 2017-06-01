var request = require("../alexaCode/src/node_modules/request");

function callFirebase(planet, callback) {
  var url = 'https://fcm.googleapis.com/fcm/send';
  var serverKey = "key=AAAAaI2ZfFw:APA91bGqDh70rNfC8Gtwdxhut5sKhG7td0okEetwnhjWtzvTSC4jJIOReD2nEXkpT4OqMIciJptTxk7Du8MJmvrcW7jTKhiAh7XJYq2kBG2wIQOiwUerx014rpk7nt1JknAS-jdpUJxB";
  var clientToken = "dmcS0ffLcCM:APA91bHWZ958Na0pG7cdLqHDPJJtlenkxUPvNSI0nhGgdv_209JcNUzbAAbPAGecUn8sufTbksXowWOUa7Xm--jSdAr2M2r0e1TUKTtp0QApCaevYJyzbHSv-eepkUMTGA_RqCSxwLxv";
  var options = {
    url: url,
    headers: {
      'Authorization': serverKey,
      'Content-Type': 'application/json'
    },
    json: {"to": clientToken,"priority":"high","notification":{"title": planet}}
  };
  request.post(options, function(error, response, body) {
    if(body.success == 1) {
      callback(buildSpeechResponse("this is " + planet, "", true));
    } else {
      callback(buildSpeechResponse("lost in space above all drifting", "", true));
    }
  });
}

function buildSpeechResponse(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function testCall(speechResponse) {
  if(speechResponse.outputSpeech.text == 'this is earth') {
    console.log('test passed!');
  } else {
    console.log('oh dear. there seems to be a problem with your function.');
  }
}

callFirebase('earth', function callback(speechResponse) {
  testCall(speechResponse);
});
