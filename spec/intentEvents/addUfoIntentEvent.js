(function(exports) {

  addUfoIntentEvent = function() {
    return {
    "session": {
      "sessionId": "SessionId.44f737f0-cf2b-4bd9-8989-f63b48ab2bc0",
      "application": {
        "applicationId": "amzn1.ask.skill.e50c89e9-4f90-4d67-87a0-e33788902762"
      },
      "attributes": {},
      "user": {
        "userId": "amzn1.ask.account.AGPVM264JJUH3I7A56TT6AF3H5XYCMVNXTGHS3ETGZ5W4MWVL76AOQOWFBTPJL6Z64SJ2H6W6GYXUROZ3BVVK4LR4NKILPZK3C335VNZRGQBL7C524T27DN4EBIEZEOLK3WKDCG3LNHFSCHQJRRKFLXXQKGEFGACCQMUHP6THV3Y7LP2EPUVCT6DNB4HEIQTX4T22QHPYWLYXEQ"
      },
      "new": true
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "EdwRequestId.373bffc8-1217-404c-94cb-dee7fe7707d8",
      "locale": "en-GB",
      "timestamp": "2017-05-31T18:58:48Z",
      "intent": {
        "name": "AddUfoIntent",
        "slots": {
          "ufo": {
            "name": "ufo",
            "value": "monolith"
          }
        }
      }
    },
      "version": "1.0"
    };
  };

  exports.addUfoIntentEvent = addUfoIntentEvent;
})(this);
