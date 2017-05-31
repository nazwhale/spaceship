var request = require("request");

exports.handler = function(event, context) { eventHandler(event, context); };

function eventHandler(event, context) {
  try { if (event.request.type === "LaunchRequest") {
          welcomeOnBoard(function callback(speechResponse) {
            context.succeed(buildResponse(event.session.attributes, speechResponse));
          });
        } else if (event.request.type === "IntentRequest") {
            determineIntent(event.request, function callback(speechResponse) {
              context.succeed(buildResponse(event.session.attributes, speechResponse));
            });
        }
  } catch (e) {
    context.fail("Exception: " + e);
  }
}


function welcomeOnBoard(callback) {
  callback(buildSpeechResponse("welcome aboard", "where to captain?", false));
}

function determineIntent(intentRequest, callback) {
  var intentName = intentRequest.intent.name;
  var planets = ['earth', 'mars', 'girlfriend', 'space', 'orbit', 'stratosphere', 'sun', 'falcon'];
  if (intentName == 'RandomIntent') {
    planet = planets[Math.floor(Math.random() * planets.length)];
    getToken(planet, callback);
  } else if(intentName == 'PlanetIntent') {
    console.log('Planet intent recognised!');
    console.log('this is the planet...' + intentRequest.intent.slots.planet.name);
    getToken(intentRequest.intent.slots.planet.name, callback);
  } else if (intentName == 'AMAZON.HelpIntent') {
    helpUser(callback) ;
  } else if (intentName in intentsMapping) {
    getToken(intentsMapping[intentName], callback);
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

function getToken(planet, callback) {
  var url = 'https://spaceship-test.firebaseio.com/browserTokens.json?orderBy="timestamp"&limitToLast=1';
  request.get(url, function(error, response, body) {
    var jsonObj = JSON.parse(body);
    for (var firstKey in jsonObj) break;
    callFirebase(planet, callback, jsonObj[firstKey]['token']);
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
