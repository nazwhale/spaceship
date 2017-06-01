(function(exports) {

  planetIntentEvent = function() {
    return {
    "session": {
      "sessionId": "SessionId.87f1c91e-f52a-467c-abaf-90c012c302b9",
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
      "requestId": "EdwRequestId.87c557d4-d500-492c-ad4d-e5952977cec3",
      "locale": "en-GB",
      "timestamp": "2017-05-31T18:55:15Z",
      "intent": {
        "name": "PlanetIntent",
        "slots": {
          "planet": {
            "name": "planet",
            "value": "earth"
          }
        }
      }
    },
     "version": "1.0"
    };
  };

  exports.planetIntentEvent = planetIntentEvent;
})(this);
