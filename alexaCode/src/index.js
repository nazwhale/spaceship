var request = require("request");

exports.handler = function(event, context) { eventHandler(event, context); };

function eventHandler(event, context) {
  try { if (event.request.type === "LaunchRequest") {
          welcomeOnBoard(function callback(speechletResponse) {
            context.succeed(buildResponse(event.session.attributes, speechletResponse));
          });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request, function callback(speechletResponse) {
              context.succeed(buildResponse(event.session.attributes, speechletResponse));
            });
        }
  } catch (e) {
    context.fail("Exception: " + e);
  }
}

function welcomeOnBoard(callback) {
  callback(buildSpeechletResponse("welcome aboard", "where to captain?", false));
}

function onIntent(intentRequest, callback) {
    var intentName = intentRequest.intent.name;
    if (intentName == 'EarthIntent') {
      callFirebase('earth', callback);
    } else if (intentName == 'MarsIntent') {
      callFirebase('mars', callback);
    } else {
      throw "Invalid intent";
    }
}

function callFirebase(planet, callback) {
  var options = {
    url: url(),
    headers: {
      'Authorization': serverKey(),
      'Content-Type': 'application/json'
    },
    json: {"to": clientToken(),"priority":"high","notification":{"title": planet}}
  };
  request.post(options, function(error, response, body) {
    if(body.success == 1) {
      callback(buildSpeechletResponse("this is " + planet, "", true));
    } else {
      callback(buildSpeechletResponse("lost in space above all drifting", "", true));
    }
  });
}

function url() {
  return 'https://fcm.googleapis.com/fcm/send';
}

function serverKey() {
  return "key=AAAAaI2ZfFw:APA91bGqDh70rNfC8Gtwdxhut5sKhG7td0okEetwnhjWtzvTSC4jJIOReD2nEXkpT4OqMIciJptTxk7Du8MJmvrcW7jTKhiAh7XJYq2kBG2wIQOiwUerx014rpk7nt1JknAS-jdpUJxB";
}

function clientToken() {
  return "c5XSLkXGQ7Q:APA91bH3vNz7I8kUgykq7P8CDEGb-udfb7mY3nXNuEk6b4ifIK3e_7aT2nkuJx7Tdso4V41kGkuz6ziCfOGb0du7YiXioEHkxm54uy5uy2-9Fk4qyYwownBaOaVnAR_PdUobme3rpaGJ";
}


function buildSpeechletResponse(output, repromptText, shouldEndSession) {
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

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
