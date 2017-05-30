(function(exports) {
  
  function changeSky(location) {
    var sky = document.getElementById("image-360");
    sky.setAttribute('src', location);
  }

  function addMonolith() {
    var box = document.createElement('a-box');
    document.querySelector('a-scene').appendChild(box);
    box.setAttribute('id', '#monolith');
    box.setAttribute('color', '#222');
    box.setAttribute('width', '0.5');
    box.setAttribute('height', '4');
    box.setAttribute('depth', '2');
    box.setAttribute('position', '-5 2 0');
    box.setAttribute('scale', '0.4 0.4 0.4');
  }

  exports.addMonolith = addMonolith;
  exports.changeSky = changeSky;
})(this);
