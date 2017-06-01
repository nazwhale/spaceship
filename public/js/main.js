document.addEventListener('DOMContentLoaded', function() {
  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  // // The Firebase SDK is initialized and available here!
  const messaging = firebase.messaging();

  messaging.requestPermission()
  .then(function(){
    console.log('Have Permission');
    return messaging.getToken();
  })
  .then(function(token) {
    captureToken(token);
    console.log(token);
  })
  .catch(function(err){
    console.log('Error occured' + err);
  })

  messaging.onMessage(function(payload){
    console.log('Changing sky...');
    var intent = payload.notification.title

    if (intent == "monolith") {
      addMonolith();
    } else if (intent == "removemonolith") {
      removeMonolith();
      console.log('removeMonolith was run!');
    } else if (intent == "rain") {
      addRain();
    } else if (intent == "removerain") {
      stopRain();
    } else {
      changeSky("#" + intent);
    }
    console.log('Sky changed!');

  });

  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

});
