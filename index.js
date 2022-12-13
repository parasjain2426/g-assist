//request
// {
//   "handler": {
//     "name": "handler_name"
//   },
//   "intent": {
//     "name": "actions.intent.MAIN",
//     "params": {},
//     "query": ""
//   },
//   "scene": {
//     "name": "SceneName",
//     "slotFillingStatus": "UNSPECIFIED",
//     "slots": {}
//   },
//   "session": {
//     "id": "example_session_id",
//     "params": {},
//     "typeOverrides": []
//   },
//   "user": {
//     "locale": "en-US",
//     "params": {
//       "verificationStatus": "VERIFIED"
//     }
//   },
//   "home": {
//     "params": {}
//   },
//   "device": {
//     "capabilities": [
//       "SPEECH",
//       "RICH_RESPONSE",
//       "LONG_FORM_AUDIO"
//     ]
//   }
// }

// response
// {
//   "session": {
//     "id": "example_session_id",
//     "params": {}
//   },
//   "prompt": {
//     "override": false,
//     "firstSimple": {
//       "speech": "Hello World.",
//       "text": ""
//     }
//   },
//   "scene": {
//     "name": "SceneName",
//     "slots": {},
//     "next": {
//       "name": "actions.scene.END_CONVERSATION"
//     }
//   }
// }

"use strict";
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const assistResponse = {
  prompt: {
    override: false,
    firstSimple: {
      speech: "Hello World.",
      text: "Hello World",
    },
  },
};

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.post("/asked-query", (req, res) => {
  try {
    console.log(req.body.intent.query);
  } catch (err) {
    console.log(err);
  }
  return res.json(assistResponse);
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server up and listening");
});
