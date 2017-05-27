describe('#buildResponse', function() {

  it('returns a response hash', function() {
    expect(buildResponse('session attributes', 'this is mars')).toEqual({
        version: "1.0",
        sessionAttributes: 'session attributes',
        response: 'this is mars'
    });
  });
});

describe('#buildSpeechletResponse', function() {

  it('returns a hash with speech output and a card', function() {
    expect(buildSpeechletResponse('spaceship', 'this is mars', '', true)).toEqual({
        outputSpeech: {
            type: "PlainText",
            text: 'this is mars'
        },
        card: {
            type: "Simple",
            title: 'spaceship',
            content: 'this is mars'
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

describe('#buildSpeechletResponseWithoutCard', function() {

  it('returns a hash with speech output', function() {
    expect(buildSpeechletResponseWithoutCard('this is earth', '', true)).toEqual({
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
