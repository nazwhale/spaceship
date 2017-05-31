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

function welcomeOnBoard(callback) {
  callback(buildSpeechResponse("welcome aboard", "where to captain?", false));
}

function helpUser(callback) {
  callback(buildSpeechResponse("You can orbit earth, visit the stratosphere, or go to mars, the sun, or the depths of space.  Or you can ask the spaceship to take you back to earth.", "", true));
}

function getToken(intentRequest, callback) {
  var url = 'https://spaceship-test.firebaseio.com/browserTokens.json?orderBy="timestamp"&limitToLast=1';
  request.get(url, function(error, response, body) {
    var jsonObj = JSON.parse(body);
    for (var firstKey in jsonObj) break;
    determineIntent(intentRequest, callback, jsonObj[firstKey]['token']);
  });
}

function determineIntent(intentRequest, callback, token) {
  var intentName = intentRequest.intent.name;
  var planets = ['earth', 'mars', 'girlfriend', 'space', 'orbit', 'stratosphere', 'sun', 'falcon'];
  if (intentName == 'RandomIntent') {
    planet = planets[Math.floor(Math.random() * planets.length)];
    callFirebaseWithPlanet(planet, callback, token);
  } else if(intentName == 'PlanetIntent') {
    callFirebaseWithPlanet(intentRequest.intent.slots.planet.value, callback, token);
  } else if(intentName == 'AddUfoIntent') {
    callFirebaseToAddUfo(intentRequest.intent.slots.ufo.value, callback, token);
  } else if(intentName == 'RemoveUfoIntent') {
    callFirebaseToRemoveUfo(intentRequest.intent.slots.ufo.value, callback, token);
  } else if (intentName == 'AMAZON.HelpIntent') {
    helpUser(callback);
  } else {
    throw "Invalid intent";
  }
}

function callFirebaseToRemoveUfo(ufo, callback, token) {
  var options = buildOptions(token, 'remove' + ufo);
  request.post(options, function(error, response, body) {
    if(body.success == 1) {
      reportUfoRemoved(ufo, callback);
    } else {
      callback(buildSpeechResponse("lost in space above all drifting", "", true));
    }
  });
}

function reportUfoRemoved(ufo, callback) {
  if(['rain'].includes(ufo)) {
    callback(buildSpeechResponse(ufo + " stopped", "", true));
  } else if(['monolith'].includes(ufo)) {
    callback(buildSpeechResponse(ufo + " removed", "", true));
  }
}

function callFirebaseToAddUfo(ufo, callback, token) {
  var options = buildOptions(token, ufo);
  request.post(options, function(error, response, body) {
    if(body.success == 1) {
      callback(buildSpeechResponse(ufo + " added", "", true));
    } else {
      callback(buildSpeechResponse("lost in space above all drifting", "", true));
    }
  });
}

function callFirebaseWithPlanet(planet, callback, token) {
  var options = buildOptions(token, planet);
  request.post(options, function(error, response, body) {
    if(body.success == 1) {
      reportPlanetChanged(planet, callback);
    } else {
      callback(buildSpeechResponse("lost in space above all drifting", "", true));
    }
  });
}

function reportPlanetChanged(planet, callback) {
  if(['earth', 'mars', 'space'].includes(planet)) {
    callback(buildSpeechResponse("this is " + planet, "", true));
  } else if(['sun', 'stratosphere'].includes(planet)) {
    callback(buildSpeechResponse("this is the " + planet, "", true));
  } else if(['orbit'].includes(planet)) {
    callback(buildSpeechResponse("you are in " + planet, "", true));
  } else if(['girlfriend'].includes(planet)) {
    callback(buildSpeechResponse("this is your " + planet, "", true));
  }
}

function buildOptions(token, title) {
  return {
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      'Authorization': "key=AAAAaI2ZfFw:APA91bGqDh70rNfC8Gtwdxhut5sKhG7td0okEetwnhjWtzvTSC4jJIOReD2nEXkpT4OqMIciJptTxk7Du8MJmvrcW7jTKhiAh7XJYq2kBG2wIQOiwUerx014rpk7nt1JknAS-jdpUJxB",
      'Content-Type': 'application/json'
    },
    json: {"to": token,"priority":"high","notification":{"title": title}}
  };
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
