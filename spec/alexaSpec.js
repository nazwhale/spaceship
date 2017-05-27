describe('buildResponse', function() {

  it('returns a response hash', function() {
    expect(buildResponse('session attributes', 'this is mars')).toEqual({
        version: "1.0",
        sessionAttributes: 'session attributes',
        response: 'this is mars'
    })
  });


});
