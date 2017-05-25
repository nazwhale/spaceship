var functions = require('firebase-functions');

// var functions = require('./interface');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const messaging = firebase.messaging();
console.log('RUN MEEEEE')
messaging.requestPermission()
.then(function(){
  console.log('Have Permission');
  return messaging.getToken();
})
.then(function(token) {
  console.log(token);
})
.catch(function(err){
  console.log('Error occured');
})
