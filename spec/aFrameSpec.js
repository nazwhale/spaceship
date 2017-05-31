describe('#changeSky', function() {
  it('changes the 3D view', function() {
    var dummyElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(dummyElement);
    changeSky('earth');
    expect(dummyElement.getAttribute('src')).toEqual('earth');
  });
});

describe('#Monolith', function() {

  it('adds a monolith to the view', function() {
    var dummyElement = document.createElement('div');
    spyOn(document, 'querySelector').and.returnValue(dummyElement);
    addMonolith();
    expect(dummyElement.innerHTML).toContain('id="monolith"');
  });

  it('removes a monolith to the view', function() {
    // DON'T KNOW HOW TO BLOODY PASS THIS TEST
    dummyElement = document.createElement('div');
    dummyChild = document.createElement('div');
    dummyElement.appendChild(dummyChild);
    spyOn(document, 'getElementById').and.returnValue(dummyChild);
    dummyChild.setAttribute('id', 'monolith');
    removeMonolith();
    expect(dummyElement.innerHTML).not.toContain("id='monolith'");
  });

});

describe('#Rain', function() {

  it('add a nice refreshing rain to the view', function() {
    dummyElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(dummyElement);
    dummyElement.setAttribute('id', 'scene');
    addRain();
    expect(document.getElementById("scene").hasAttribute("rain")).toBeTruthy();
  });

  it('makes the rain stop in the view', function() {
    dummyElement = document.createElement('div');
    dummyChild = document.createElement('div');
    dummyElement.appendChild(dummyChild);
    spyOn(document, 'getElementById').and.returnValue(dummyChild);
    dummyChild.setAttribute('id', 'scene');
    addRain();
    stopRain();
    expect(document.getElementById("scene").hasAttribute("rain")).toBeFalsy();
  });

});
