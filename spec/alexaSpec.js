describe('#eventHandler', function() {

  it('recognises an IntentRequest...', function() {
    spyOn(self, 'getToken');
    eventHandler(planetIntentEvent(), alexaContext());
    expect(self.getToken).toHaveBeenCalled();
  });

  it('recognises a LaunchRequest', function() {
    spyOn(self, 'welcomeOnBoard');
    eventHandler(launchIntentEvent(), alexaContext());
    expect(self.welcomeOnBoard).toHaveBeenCalled();
  });

  it('recognises a RandomRequest', function() {
    spyOn(self, 'getToken');
    eventHandler(randomIntentEvent(), alexaContext());
    expect(self.getToken).toHaveBeenCalled();
  });

});

describe('#welcomeOnBoard', function() {

  it('builds a speechlet response with a welcome message', function() {
    var callback = jasmine.createSpy('callback');
    welcomeOnBoard(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse("welcome aboard", "where to captain?", false));
  });

});

describe('#determineIntent', function() {

  it('recongnises a HelpRequest', function() {
    var callback = jasmine.createSpy("callback");
    determineIntent(helpIntentEvent().request, callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse("You can orbit earth, visit the stratosphere, or go to mars, the sun, or the depths of space.  Or you can ask the spaceship to take you back to earth.", "", true));
  });

  it('recognises a PlanetIntent', function() {
    spyOn(self, 'callFirebaseWithPlanet');
    determineIntent(planetIntentEvent().request, 'callback');
    expect(self.callFirebaseWithPlanet).toHaveBeenCalled();
  });

  it('recognises an AddUfoIntent', function() {
    spyOn(self, 'callFirebaseToAddUfo');
    determineIntent(addUfoIntentEvent().request, 'callback');
    expect(self.callFirebaseToAddUfo).toHaveBeenCalled();
  });

  it('recognises a RemoveUfoIntent', function() {
    spyOn(self, 'callFirebaseToRemoveUfo');
    determineIntent(removeUfoIntentEvent().request, 'callback');
    expect(self.callFirebaseToRemoveUfo).toHaveBeenCalled();
  });

  it('recognises a RandomInent', function() {
    spyOn(self, 'callFirebaseWithPlanet');
    determineIntent(randomIntentEvent().request, 'callback');
    expect(self.callFirebaseWithPlanet).toHaveBeenCalled();
  });

  it('throws an error if handed an invalid intent', function() {
    expect(function() { determineIntent(invalidIntentEvent().request, 'callback'); }).toThrow('Invalid intent');
  });

});

describe('#callFirebaseWithPlanet', function() {
  it('makes an API call to firebase', function() {
    request = jasmine.createSpyObj('request',['post']);
    callFirebaseWithPlanet('mars', 'callback','token');
    expect(request.post).toHaveBeenCalled();
  });
});

describe('#reportPlanetChanged', function() {

  it('correctly adds "the" where necessary', function() {
    var callback = jasmine.createSpy("callback");
    reportPlanetChanged('sun', callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse('this is the sun', '', true));
  });

  it('correctly adds "you are in" where necessary', function() {
    var callback = jasmine.createSpy("callback");
    reportPlanetChanged('orbit', callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse('you are in orbit', '', true));
  });

});

describe('#reportUfoRemoved', function() {

  it('adds "stopped" or "removed" appropriately', function() {
    var callback = jasmine.createSpy("callback");
    reportUfoRemoved('rain', callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse('rain stopped', '', true));
  });

});

describe('#buildOptions', function() {

  it('creates the hash of data to send to firebase', function() {
    expect(buildOptions('123456', 'mars')).toEqual({
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        'Authorization': "key=AAAAaI2ZfFw:APA91bGqDh70rNfC8Gtwdxhut5sKhG7td0okEetwnhjWtzvTSC4jJIOReD2nEXkpT4OqMIciJptTxk7Du8MJmvrcW7jTKhiAh7XJYq2kBG2wIQOiwUerx014rpk7nt1JknAS-jdpUJxB",
        'Content-Type': 'application/json'
      },
      json: {"to": '123456',"priority":"high","notification":{"title": 'mars'}}
    });
  });
});

describe('#buildSpeechResponse', function() {

  it('returns a hash with speech output', function() {
    expect(buildSpeechResponse('this is earth', '', true)).toEqual({
        outputSpeech: {
            type: "PlainText",
            text: 'this is earth'
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: ''
            }
        },
        shouldEndSession: true
    });
  });

});

describe('#buildResponse', function() {

  it('returns a response hash', function() {
    expect(buildResponse('session attributes', 'this is mars')).toEqual({
        version: "1.0",
        sessionAttributes: 'session attributes',
        response: 'this is mars'
    });
  });

});
