importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-messaging.js')

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
