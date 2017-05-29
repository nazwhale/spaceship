(function(exports) {

  marsIntentEvent = function() {
    return {
      "session": {
        "sessionId": "SessionId.d85cd57b-d8fa-41c7-beae-7a8a7869efdb",
        "application": {
          "applicationId": "amzn1.ask.skill.10ad7f9b-caa5-4a40-8506-3870b8d9372d"
        },
        "attributes": {},
        "user": {
          "userId": "amzn1.ask.account.AHW7MZUTINI7XIKQTC3TVM5IU6XSH4CBWYRXNFQORGV5R2DGNZKW3K7ZQAEFI3FJ3FTOEGUMKEJS4CCCBBTCF4LGEDADTARCDV2JHRZUS6ZICEJGR6YLTCV6G5OMQK4BTVVWUQVGLKT2OK2JWQWGFLHTX6MFLEZ24T7JLFNMEKMLMZA2ASFKIFBLMYHSQE4PHALP6KVZ5BCLPSY"
        },
        "new": true
      },
      "request": {
        "type": "IntentRequest",
        "requestId": "EdwRequestId.a6ef7c90-bd2c-4903-9f94-6fc23ad39b42",
        "locale": "en-GB",
        "timestamp": "2017-05-25T22:55:54Z",
        "intent": {
          "name": "MarsIntent",
          "slots": {}
        }
      },
      "version": "1.0"
    };
  };

  exports.marsIntentEvent = marsIntentEvent;
})(this);
