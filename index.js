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
const { default: axios } = require("axios");

const assistResponse = {
  prompt: {
    override: false,
    firstSimple: {
      speech: "Hello World.",
      text: "Hello World",
    },
  },
};

const intentList = [
  "tell me",
  "tell me about",
  "I have a question",
  "I have a query",
  "one query",
  "one question",
  "tell me esg",
  "hey bot",
  "tell me something",
];

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.post("/asked-query", async (req, res) => {
  try {
    let askedQuery = req.body?.intent?.query || "";
    console.log(askedQuery, "--Initial Query--");
    for (let curIntent of intentList) {
      askedQuery.replace(curIntent, "");
      askedQuery.trim();
    }
    console.log(askedQuery, "--Actual Query--");
    let payload = {
      query: askedQuery,
    };
    await axios({
      url: "https://057c-35-196-239-226.ngrok.io/get_response",
      method: "POST",
      data: payload,
    }).then((resp) => {
      let response = resp.data;
      console.log(response, "--Server Response--");
      let answer = response?.result || "Didn't got anything!";
      assistResponse.prompt.firstSimple.speech = answer;
      assistResponse.prompt.firstSimple.text = answer;
      //   return res.json(assistResponse);
    });
  } catch (err) {
    console.log(err);
  }
  return res.json(assistResponse);
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Server up and listening");
});
