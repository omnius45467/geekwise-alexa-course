## Introduction to [Alexa-App](https://github.com/matt-kruse/alexa-app) 

```
Alexa-app does the dirty work of interpreting the JSON request from Amazon and building the JSON response. It provides convenience methods to more easily build the response, handle session objects, and add cards. It also makes it easy to run multiple endpoints (apps) on one Node.js server instance.
```


One of the biggest things to keep in mind when developing Alexa skills is that because a skill is essentially 
running in a headless browser you do not directly have access to anything like the typical `debugger;` or `console.log()` 
functions you have in standard javascript for web programming.

To get around this problem we will have to plan out our skills with pseudo code and make a mental map of the skill in our heads before we get into coding.

We also have access to some tools given to us by Amazon. The small testing environment is incredibly useful for testing out a skill.


### Simplifying Your Skills

The reason I'm introducing the [Alexa-App](https://github.com/matt-kruse/alexa-app) is because it is a good library, and a good way to 
construct skills once you understand the fundamentals of what is going on behind the scenes. 
Just like the quote above mentions this library makes it easier to handle requests without having to a full response.

#### Check it!
This is an example of what an intent would look like written in node without the help of the Alexa-App library, remember this example from the previous day? 
Notice that I'm just pulling out some of the important sections from that example. 

```
/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
        ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if ("MyColorIsIntent" === intentName) {
        setColorInSession(intent, session, callback);
    } else if ("WhatsMyColorIntent" === intentName) {
        getColorFromSession(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.StopIntent" === intentName || "AMAZON.CancelIntent" === intentName) {
        handleSessionEndRequest(callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Sets the color in the session and prepares the speech to reply to the user.
 */
function setColorInSession(intent, session, callback) {
    var cardTitle = intent.name;
    var favoriteColorSlot = intent.slots.Color;
    var repromptText = "";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";

    if (favoriteColorSlot) {
        var favoriteColor = favoriteColorSlot.value;
        sessionAttributes = createFavoriteColorAttributes(favoriteColor);
        speechOutput = "I now know your favorite color is " + favoriteColor + ". You can ask me " +
            "your favorite color by saying, what's my favorite color?";
        repromptText = "You can ask me your favorite color by saying, what's my favorite color?";
    } else {
        speechOutput = "I'm not sure what your favorite color is. Please try again";
        repromptText = "I'm not sure what your favorite color is. You can tell me your " +
            "favorite color by saying, my favorite color is red";
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function createFavoriteColorAttributes(favoriteColor) {
    return {
        favoriteColor: favoriteColor
    };
}

function getColorFromSession(intent, session, callback) {
    var favoriteColor;
    var repromptText = null;
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";

    if (session.attributes) {
        favoriteColor = session.attributes.favoriteColor;
    }

    if (favoriteColor) {
        speechOutput = "Your favorite color is " + favoriteColor + ". Goodbye.";
        shouldEndSession = true;
    } else {
        speechOutput = "I'm not sure what your favorite color is, you can say, my favorite color " +
            " is red";
    }

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}
```

The code changes when we use the Alexa-App library. 

```

```
