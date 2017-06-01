(function(exports) {

  removeUfoIntentEvent = function() {
    return {
    "session": {
      "sessionId": "SessionId.40f0e4ed-6579-4246-9067-c82284de1d24",
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
      "requestId": "EdwRequestId.5e354bcd-0938-4e44-9d8c-6066c19d53eb",
      "locale": "en-GB",
      "timestamp": "2017-05-31T19:04:03Z",
      "intent": {
        "name": "RemoveUfoIntent",
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

exports.removeUfoIntentEvent = removeUfoIntentEvent;
})(this);
