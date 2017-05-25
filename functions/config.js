// Initialize Firebase
var config = {
  apiKey: "AIzaSyCQMhU6yxjLCsanlSnUHtO4N6I6oCGlTI4",
  authDomain: "spaceship-test.firebaseapp.com",
  databaseURL: "https://spaceship-test.firebaseio.com",
  projectId: "spaceship-test",
  storageBucket: "spaceship-test.appspot.com",
  messagingSenderId: "449052245084"
};
firebase.initializeApp(config);
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
