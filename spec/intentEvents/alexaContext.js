(function(exports) {

  alexaContext = function() {
    return {
      succeed: function(response) { return response; },
      fail: function(message) { return message; }
    };
  };

  exports.alexaContext = alexaContext;
})(this);
