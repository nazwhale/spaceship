describe('#eventHandler', function() {

  it('recognises an IntentRequest...', function() {
    spyOn(self, 'sortIntents');
    eventHandler(marsIntentEvent(), alexaContext());
    expect(self.sortIntents).toHaveBeenCalled();
  });

  it('...and sets off a chain of events resulting in a call to Firebase', function() {
    spyOn(self, 'callFirebase');
    eventHandler(marsIntentEvent(), alexaContext());
    expect(self.callFirebase).toHaveBeenCalled();
  });

  it('recognises a LaunchRequest', function() {
    spyOn(self, 'welcomeOnBoard');
    eventHandler(launchIntentEvent(), alexaContext());
    expect(self.welcomeOnBoard).toHaveBeenCalled();
  });

  it('recognises a RandomRequest', function() {
    eventHandler(randomIntentEvent(), alexaContext());
    expect(self.intentName).not.toEqual('RandomIntent');
  });

});


describe('#welcomeOnBoard', function() {

  it('builds a speechlet response with a welcome message', function() {
    var callback = jasmine.createSpy('callback');
    welcomeOnBoard(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechResponse("welcome aboard", "where to captain?", false));
  });

});

describe('#sortIntents', function() {

  it('recognises a MarsIntent', function() {
    spyOn(self, 'callFirebase');
    sortIntents(marsIntentEvent().request, 'callback');
    expect(self.callFirebase).toHaveBeenCalledWith('mars', 'callback');
  });

  it('recognises an EarthIntent', function() {
    spyOn(self, 'callFirebase');
    sortIntents(earthIntentEvent().request, 'callback');
    expect(self.callFirebase).toHaveBeenCalledWith('earth', 'callback');
  });

  it('throws an error if handed an invalid intent', function() {
    expect(function() { sortIntents(invalidIntentEvent().request, 'callback'); }).toThrow('Invalid intent');
  });

});

describe('#callFirebase', function() {
  it('makes an API call to firebase', function() {
    request = jasmine.createSpyObj('request',['post']);
    callFirebase('mars', 'callback');
    expect(request.post).toHaveBeenCalled();
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
