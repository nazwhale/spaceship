(function(exports) {

  function changeSky(location) {
    var sky = document.getElementById("image-360");
    sky.setAttribute('src', location);
  }
  exports.changeSky = changeSky
})(this);
