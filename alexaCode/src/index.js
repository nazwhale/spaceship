var request = require("request");
var intents = ['EarthIntent',
               'MarsIntent',
               'GirlfriendIntent',
               'SpaceIntent',
               'OrbitIntent',
               'StratosphereIntent',
               'SunIntent',
               'FalconIntent'];

exports.handler = function(event, context) { eventHandler(event, context); };

function eventHandler(event, context) {
  try { if (event.request.type === "LaunchRequest") {
          welcomeOnBoard(function callback(speechResponse) {
            context.succeed(buildResponse(event.session.attributes, speechResponse));
          });
        } else if (event.request.type === "IntentRequest") {
            sortIntents(event.request, function callback(speechResponse) {
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

function sortIntents(intentRequest, callback) {
    var intentName = intentRequest.intent.name;
    if (intentName == 'RandomIntent') {
      intentName = intents[Math.floor(Math.random() * intents.length)];
    }
    if (intentName == 'EarthIntent') {
      callFirebase('earth', callback);
    } else if (intentName == 'MarsIntent') {
      callFirebase('mars', callback);
    } else if (intentName == 'GirlfriendIntent') {
      callFirebase('girlfriend', callback);
    } else if (intentName == 'SpaceIntent') {
      callFirebase('space', callback);
    } else if (intentName == 'OrbitIntent') {
      callFirebase('orbit', callback);
    } else if (intentName == 'StratosphereIntent') {
      callFirebase('stratosphere', callback);
    } else if (intentName == 'SunIntent') {
      callFirebase('sun', callback);
    } else if (intentName == 'FalconIntent') {
      callFirebase('falcon', callback);
    } else {
      throw "Invalid intent";
    }
}

function callFirebase(planet, callback) {
  var url = 'https://fcm.googleapis.com/fcm/send';
  var serverKey = "key=AAAAaI2ZfFw:APA91bGqDh70rNfC8Gtwdxhut5sKhG7td0okEetwnhjWtzvTSC4jJIOReD2nEXkpT4OqMIciJptTxk7Du8MJmvrcW7jTKhiAh7XJYq2kBG2wIQOiwUerx014rpk7nt1JknAS-jdpUJxB";
  var clientToken = "ekG7UmwtUzo:APA91bHdZYVy_sjfNwRzJmlsH9tfIKVn2_kXu1rl5eFmSw6HjNAwY-oyXQCyTHr_2sYcmk7ZP-nJgVpOIhFywyhR4EVGYzSqwpIOFHTHItzC9fVDHwAx6riOWa74nkAM_18Ti_R6AKLV";
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
