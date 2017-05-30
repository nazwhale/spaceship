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
    expect(dummyElement.innerHTML).toContain('id="#monolith"');
  });
});
