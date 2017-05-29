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



//curl -X POST --header "Authorization: key=AAAAaI2ZfFw:APA91bGqDh70rNfC8Gtwdxhut5sKhG7td0okEetwnhjWtzvTSC4jJIOReD2nEXkpT4OqMIciJptTxk7Du8MJmvrcW7jTKhiAh7XJYq2kBG2wIQOiwUerx014rpk7nt1JknAS-jdpUJxB" --header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"cRaqDUs6NwM:APA91bHvZhT-qDP79W6XlulZXwweEtWXH41vIRrRRZKaE5j6xiCdqh7suGVBN0WbfTYfmTFBOQ0M3u7-G7XWlPTPDnStjm7g0cXdIQvWBkMveGR5uzFRv2etxn-6O_ArE9rAx9QxHpqj\",\"priority\":\"high\",\"notification\":{\"title\": \"Hello Ruan\"}}"﻿
