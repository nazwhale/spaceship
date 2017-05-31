// var functions = require('firebase-functions');

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
    console.log(payload.notification.title)
    if (intent == "monolith") {
      addMonolith();
    } else if (intent == "removeMonolith") {
      removeMonolith();
    } else if (intent == "rain") {
      addRain();
    } else if (intent == "stopRain") {
      stopRain();
    } else {
      changeSky("#" + intent);
    }
    console.log('Sky changed!');

  })

  // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

  try {
    let app = firebase.app();
    let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    document.getElementsByTagName('body').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
  } catch (e) {
    console.error(e);
    document.getElementsByTagName('body').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }
});
