var request = require("request");

exports.handler = function (event, context) {
  try {
        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }
        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
  } catch (e) {
    context.fail("Exception: " + e);
  }
};

function onSessionStarted(sessionStartedRequest, session) {
}

function onLaunch(launchRequest, session, callback) {
  getWelcomeResponse(callback);
}

function onIntent(intentRequest, session, callback) {

    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;

    if (intentName == 'EarthIntent') {
      handleIntent('earth', session, callback);
    } else if (intentName == 'MarsIntent') {
      handleIntent('mars', session, callback);
    } else {
      throw "Invalid intent";
    }
}

function handleIntent(planet, session, callback) {
  callFirebase(planet, function(speechOutput) {
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, "", true));
  });
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
      callback('this is ' + planet);
    } else {
      callback('lost in space above all drifting');
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
  return "cGL93s8UFlk:APA91bEefgP-CfWzE7UO1wv-ZyNywsUjHgQbkUVLybwPEk2g7cjgblYUqWadUhK8E6Sfcn2bA0wReaz48_j9bRH4vBouVmZjj6sCZHk3fbhbRSEgPlYqR1Mf2srOHZ8g1hNhC8c7dX_T";
}

function getWelcomeResponse(callback) {
  var speechOutput = "welcome aboard";
  var reprompt = "where to captain?";
  var header = "spaceship";
  var shouldEndSession = false;
  var sessionAttributes = {
    "speechOutput" : speechOutput,
    "repromptText" : reprompt
  };

  callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession));

}


// ------- Helper functions to build responses -------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
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

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
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
