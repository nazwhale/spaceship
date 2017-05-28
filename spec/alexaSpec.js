describe('#eventHandler', function() {

  it('recognises an IntentRequest', function() {
    spyOn(self, 'onIntent');
    eventHandler(marsIntentEvent(), alexaContext());
    expect(self.onIntent).toHaveBeenCalled();
  });

  it('recognises a LaunchRequest', function() {
    spyOn(self, 'welcomeOnBoard');
    eventHandler(launchIntentEvent(), alexaContext());
    expect(self.welcomeOnBoard).toHaveBeenCalled();
  });

});


describe('#welcomeOnBoard', function() {

  it('builds a speechlet response with a welcome message', function() {
    var callback = jasmine.createSpy('callback');
    welcomeOnBoard(callback);
    expect(callback).toHaveBeenCalledWith(buildSpeechletResponse("welcome aboard", "where to captain?", false));
  });

});

describe('#onIntent', function() {

  it('recognises a MarsIntent', function() {
    spyOn(self, 'callFirebase');
    onIntent(marsIntentEvent().request, 'callback');
    expect(self.callFirebase).toHaveBeenCalledWith('mars', 'callback');
  });

  it('recognises an EarthIntent', function() {
    spyOn(self, 'callFirebase');
    onIntent(earthIntentEvent().request, 'callback');
    expect(self.callFirebase).toHaveBeenCalledWith('earth', 'callback');
  });

});

describe('#callFirebase', function() {
  it('makes an API call to firebase', function() {
    request = jasmine.createSpyObj('request',['post']);
    callFirebase('mars', 'callback');
    expect(request.post).toHaveBeenCalled();
  });
});

describe('#buildSpeechletResponse', function() {

  it('returns a hash with speech output', function() {
    expect(buildSpeechletResponse('this is earth', '', true)).toEqual({
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
