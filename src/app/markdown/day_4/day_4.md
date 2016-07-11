## Introduction to [Alexa-App](https://github.com/matt-kruse/alexa-app) 

### Objectives
* Figure out how to use libraries with your code
* Learn the different parts of the Alexa-App library
* Use a boilerplate to setup a skill


```
Alexa-app does the dirty work of interpreting the JSON request from Amazon and building the JSON response. It provides convenience methods to more easily build the response, handle session objects, and add cards. It also makes it easy to run multiple endpoints (apps) on one Node.js server instance.
```


One of the biggest things to keep in mind when developing Alexa skills is that because a skill is essentially 
running in a headless browser you do not directly have access to anything like the typical `debugger;` or `console.log()` 
functions you have in standard javascript for web programming.

To get around this problem we will have to plan out our skills with pseudo code and make a mental map of the skill in our heads before we get into coding.

We also have access to some tools given to us by Amazon. The small testing environment is incredibly useful for testing out a skill.

There are a few other good support libraries that we will be touching on later, but for now our main focus is to explore this library and see how it might be beneficial to use.

The coolest part about the Alexa-App library is that it is well maintained and seems self explanatory (at least to me).


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

The code changes when we use the Alexa-App library. Notice that the intent function `onIntent` doesn't have to hold a reference to ever single intent that we want to run.

```
app.intent('number',
  {
    "slots":{"number":"NUMBER"}
    ,"utterances":[ "say the number {1-100|number}" ]
  },
  function(request,response) {
    var number = request.slot('number');
    response.say("You asked for the number "+number);
  }
);

```

In the intent function your first parameter is the name of the `intent`. 
In the above example `app` is a reference to the instance of the Alexa-App library. 
The next parameter is the javascript object that that we use to pass through to our Intent Schemas and our Sample Utterances, these are optional though 
I usually leave them in to remind myself what the interface will look like for when I'm developing both the Sample Utterances and the Intent Schemas.

### Stand Out Features of the Library

* Most of the work that we have been doing with sessions are handled from behind the scenes. 
* Requests can directly handle saving voice input to the session. This is _crazy beneficial_ because that means that we 
don't have to worry about storing it in the session (unless you want to), it is taken care of behind the scenes.
* Responses have a similar benefit when you use this library. 
* It is slightly easier to manage scope.

### Types of Responses

Alexa can handle a couple of different types of responses. The main response that you will probably be using when developing 
your skills is the `response.say()` this function accepts a string. This string will be converted to speech. 

We also have access to `response.card()` which accepts an object. 
There are a few options that help when developing.

1. The most basic is the `simple` card when will just display text 
``` 
response.card({
  type:    "Simple",
  title:   "My Cool Card",  //this is not required for type Simple
  content: "This is the\ncontent of my card"
});
```

2. We also have access to a `standard` card that allows us to use text as well as images
```
response.card({
  type: "Standard",
  title: "My Cool Card", 
  text:  "Your ride is on the way to 123 Main Street!\nEstimated cost for this ride: $25",
  image: {                //image is optional
    smallImageUrl: "https://carfu.com/resources/card-images/race-car-small.png",  //One must be specified
    largeImageUrl: "https://carfu.com/resources/card-images/race-car-large.png"
  }
});
```
3. As stated above we have the ability to pass strings that we want spoken into the
```
response.say('string');
```

4. One of the most useful response types that we have access to is the `response.linkAccount()`, we will explore this later.

5. Another really important response type that will come in handy is the `response.reprompt()`, just like the say function 

6. Even though, for most use cases you won't have to worry about sessions you can still access session information 

7. `response.clear()` will flush the session of speech input.

8. `response.shouldEndSession()` will take a boolean value to either end the session or continue the session. 
By default the session will end after an intent performs its actions. If you wanted the user to be able to 
continue to use the skill, you will have to send something like `response.shouldEndSession(false)`.

You have access to more response types and they are available for you to use, you can find them listed on the [Alexa-App](https://github.com/matt-kruse/alexa-app)  documentation.


### The plan now is to refactor your code from the last classes to use the Alexa-App Library 
