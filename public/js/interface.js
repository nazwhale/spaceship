(function(exports) {

  function changeSky(location) {
    var sky = document.getElementById("image-360");
    sky.setAttribute('src', location);
  }

  function addMonolith() {
    var box = document.createElement('a-box');
    document.querySelector('a-scene').appendChild(box);
    box.setAttribute('id', 'monolith');
    box.setAttribute('color', '#222');
    box.setAttribute('width', '0.5');
    box.setAttribute('height', '4');
    box.setAttribute('depth', '2');
    box.setAttribute('position', '-5 2 0');
    box.setAttribute('scale', '0.4 0.4 0.4');
  }

  function removeMonolith() {
    var element = document.getElementById('monolith');
    element.parentNode.removeChild(element);
  }

  function addRain() {
    var element = document.getElementById('scene')
    console.log(element)
    element.setAttribute('rain', '');
  }

  function stopRain() {
    var element = document.getElementById('scene')
    element.removeAttribute('rain', '');
  }

  exports.addRain = addRain;
  exports.stopRain = stopRain;
  exports.addMonolith = addMonolith;
  exports.removeMonolith = removeMonolith;
  exports.changeSky = changeSky;
})(this);


(function(exports) {

  function captureToken(token) {
    var database = firebase.database();
    var browserTokens = database.ref('browserTokens')
    var data = {
      timestamp: Date.now(),
      token: token
    };
    browserTokens.push(data, finished)
  };

  function finished(error) {
    if (error) {
      console.log('Did not save to DB' + error);
    } else {
      console.log('Browser token saved to DB');
    }
  }
  exports.captureToken = captureToken
})(this);
