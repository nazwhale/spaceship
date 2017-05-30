describe('#changeSky', function() {
  it('changes the 3D view', function() {
    var dummyElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(dummyElement);
    changeSky('#earth');
    expect(dummyElement.getAttribute('src')).toEqual('#earth');
  });
});
