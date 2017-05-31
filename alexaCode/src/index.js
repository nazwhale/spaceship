var request = require("request");

exports.handler = function(event, context) { eventHandler(event, context); };

function eventHandler(event, context) {
  try { if (event.request.type === "LaunchRequest") {
          welcomeOnBoard(function callback(speechResponse) {
            context.succeed(buildResponse(event.session.attributes, speechResponse));
          });
        } else if (event.request.type === "IntentRequest") {
            getToken(event.request, function callback(speechResponse) {
              context.succeed(buildResponse(event.session.attributes, speechResponse));
            });
        }
  } catch (e) {
    context.fail("Exception: " + e);
  }
}

function getToken(intentRequest, callback) {
  var url = 'https://spaceship-test.firebaseio.com/browserTokens.json?orderBy="timestamp"&limitToLast=1';
  request.get(url, function(error, response, body) {
    var jsonObj = JSON.parse(body);
    for (var firstKey in jsonObj) break;
    determineIntent(intentRequest, callback, jsonObj[firstKey]['token']);
  });
}


function welcomeOnBoard(callback) {
  callback(buildSpeechResponse("welcome aboard", "where to captain?", false));
}

function determineIntent(intentRequest, callback, token) {
  var intentName = intentRequest.intent.name;
  var planets = ['earth', 'mars', 'girlfriend', 'space', 'orbit', 'stratosphere', 'sun', 'falcon'];
  if (intentName == 'RandomIntent') {
    planet = planets[Math.floor(Math.random() * planets.length)];
    callFirebase(planet, callback, token);
  } else if(intentName == 'PlanetIntent') {
    callFirebase(intentRequest.intent.slots.planet.value, callback, token);
  } else if (intentName == 'AMAZON.HelpIntent') {
    helpUser(callback);
  } else {
    throw "Invalid intent";
  }
}

function helpUser(callback) {
  callback(buildSpeechResponse("You can go to Mars, Earth or even to the depths of the universe", "Where would you like to go?", true));
}

function callFirebase(planet, callback, token) {
  var url = 'https://fcm.googleapis.com/fcm/send';
  var serverKey = "key=AAAAaI2ZfFw:APA91bGqDh70rNfC8Gtwdxhut5sKhG7td0okEetwnhjWtzvTSC4jJIOReD2nEXkpT4OqMIciJptTxk7Du8MJmvrcW7jTKhiAh7XJYq2kBG2wIQOiwUerx014rpk7nt1JknAS-jdpUJxB";
  var clientToken = token;
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

function buildResponse(sessionAttributes, speechResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechResponse
    };
}
