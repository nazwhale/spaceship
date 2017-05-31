(function(exports) {

  function changeSky(location) {
    var sky = document.getElementById("image-360");
    sky.setAttribute('src', location);
  }
  exports.changeSky = changeSky
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
