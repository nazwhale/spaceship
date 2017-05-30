describe('#changeSky', function() {
  it('changes the 3D view', function() {
    var dummyElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(dummyElement);
    changeSky('#earth');
    expect(dummyElement.getAttribute('src')).toEqual('#earth');
  });
});

describe('#addMonolith', function() {
  it('adds a monolith to the view', function() {
    var dummyElement = document.createElement('div');
    spyOn(document, 'querySelector').and.returnValue(dummyElement);
    addMonolith();
    // expect(dummyElement.innerHTML).toEqual('<a-box id="#monolith" color="#222" width="0.5" height="4" depth="2" position="-5 2 0" scale="0.4 0.4 0.4"></a-box>');
    expect(dummyElement.innerHTML).toContain('id="#monolith"');
  });
});
