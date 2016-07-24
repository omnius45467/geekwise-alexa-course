## Your First Skill

### Objectives
* Understand the Anatomy of a Skill and how it relates to AWS Lambda
* You will learn the different moving parts of a Skill
* You will learn how to host your own Skill
* You will be able to test your skill on your loaned device
* You will brainstorm something you want to build

### Understanding AWS Lambda

AWS is the de facto choice for hosting skills. Alexa Skills, when hosted from AWS Lambda can only be hosted on U.S. East, or N. Virginia. 
There is also a storage limit of 15.1MB  meaning if your skill is going to be larger you might want to look into hosting the skill on [S3](https://aws.amazon.com/s3/) or another Amazon Service.

### Anatomy of a Skill

Like we learned on the previous day, the family of Echo Devices are essentially headless browsers with the ability to make web requests.
Unlike other forms of web programming where in most cases you want to break down function into separate modules and sub processes, 
in Skill development this shoudln't be your first reaction. In most cases, when hosting on AWS Lambda, 
you will want to keep everything in as few files as possible. This is because on AWS Lambda you are charged for the amount of space 
that you use and the size of your Lambda function.

#### Key Components of a Skill
- Card - A card is what will display in the users Alexa App on their smartphone or tablet.
- Response - These are typically used for the device to tell you the results of a query or perform some specific action.
- Request - When you ask Alexa something a `request` is sent to the Amazon servers that are carrying your data or your sentences.

#### High Level Overview

Form a high level perspective the skills that we write are just small scripts that are stored in AWS Lambda. 
When you make a request to your skill Lambda is fired up and the skill is initiated. 
Depending on how you wrote your skill you might be presented with some type of question or prompt that will ask you for input, 
in most cases this is considered the `LaunchIntent` or the intent that is triggered when the skill is launched. 
From your input you will probably be taken to another `Intent` or possibly even some sort of `EndSessionIntent`.

In order to actually use custom skills, you will need to send a Application ID along with every request to the servers.
Down below we will see that every time a function is called it is passed through a `handler`. This Application ID is placed in the session.

A skill is essentially a set of callbacks that send json back and forth between a server and the Alexa enabled device.

From a high level perspective your requests and responses will be passed through a callback which will look similar to this

```
function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: "SessionSpeechlet - " + title,
            content: "SessionSpeechlet - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

```

#### Example Skill from AWS Lambda

```
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
        }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
        ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
        ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

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
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
        ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to the Alexa Skills Kit sample. " +
        "Please tell me your favorite color by saying, my favorite color is red";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Please tell me your favorite color by saying, " +
        "my favorite color is red";
    var shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    var cardTitle = "Session Ended";
    var speechOutput = "Thank you for trying the Alexa Skills Kit sample. Have a nice day!";
    // Setting this to true ends the session and exits the skill.
    var shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
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

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: "SessionSpeechlet - " + title,
            content: "SessionSpeechlet - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
```

#### Step by Step

1. To start developing a skill you will need to log into your AWS account that you created on the first day. 
2. Click on the lambda section on the homepage.
3. On the nxt screen create a Lambda function.
4. On the next screen you will be able to pick which type of boilerplate you want to start with. For the majority of the skills we make in this course we will be using the Alexa Node boilerplate.
5. You will see a big blob of nodejs code that you can edit.
6. If there are any changes you want to make, you can make them now in the code editor window.
7. To be able to proceed you will have to set a `Role` for the function. you can select just the default `Basic execution role`. If you were hosting on S3 you would need to select the S3 option.
8. On the next screen you will just need to hit `Create Function`.
##### Now this is where the fun starts
9. Log into your [Amazon Developer Portal Account](https://developer.amazon.com/) and click on the Alexa Button
10. You will be presented with 2 options, for now click on the `Alexa Skills Kit` button.
11. You will need to click `Add a New SKill` button in the top right corner. This will walk you through the process of setting up the skill you created in Lambda.
12. Give the skill a name
13. Give the skill an Invocation Name, this has to be less than 3 words with no special characters. Remember you have to be able to call this Invocation Name to start the skill.
14. You can think of the Intent Schema as what maps Skill functions to your interaction models, and database slots.
##### Basic setup looks like this
        {
          "intents": [
            {
              "intent": "GetHoroscope",
              "slots": [
                {
                  "name": "Sign",
                  "type": "LIST_OF_SIGNS"
                },
                {
                  "name": "Date",
                  "type": "AMAZON.DATE"
                }
              ]
            },
            {
              "intent": "GetLuckyNumbers"
            }
          ]
        }
15. Next you will add a Custom Slot, a Custom Slot is just a list of loose inputs that will be used within the skill to store data, or match data.
In some cases you want a wide variety because they will allow more flexibility within the skill.
        LIST_OF_SIGNS
            Aries
            Monkey
            Pizza
            Signless
16. The next major piece of information that needs to be inserted is the `Sample Utterances`. This is basically the sentences that the user will be able to say to interact with the Skill intents.
        SampleIntent            what should I say?
        GetInformationIntent    what is the {Sign}
Notice in the above box that we can say the sentence `what should I say?` which will be handled by the SampleIntent, please note that these Intents are just meant for demonstration.
You can also note that the `GetInformationIntent` has a sentence which is followed by `{Sign}` which is a placeholder for the slot. This will refer to anything that is in the Custom Slots section.
17. The next major step and close to the last step is to configure the skill to point to where our code is being hosted on AWS Lambda. Do this by first selecting `Lambda ARN`. 
You will need to select your `ARN` which is available from the AWS Lambda portal where you setup your code. It will be in the top right corner.
18. The next option on the screen is titled `Account Linking`. For now just click the `No` option.
19. Now you can test in the next screen, or try it out on your device!

### Brainstorming
* What functionality would you like to add to Alexa?
* What tools will you need to make that possible?


### The Next Steps

I'd encourage you to practice the work flow above a few times. 

What we need to do now is create a Alexa-Skills in the same location where you cloned the vagrant box repo. 
This is where you will keep the skills that you are working on.

Create another folder inside the Alexa-SKills folder and name it something related to the skills you want to make.

Our workflow here will change slightly. Instead of using the web interface on AWS we will be pushing directly to 
AWS form the command line.

Write your skill following the same outline like the boilerpalte given from the Alexa AWS interface.

#### Zipping the Skill

Create a bash file called `zipper.sh` in your project directory, add the following ot the file
```
#!/bin/bash
pushd skill
zip -r ../skill.zip *
popd
```

Save it and type the command `source ./zipper.sh`

#### Deploy It
```
sudo aws lambda update-function-code --function-name Skill --zip-file fileb://skill.zip!
```

#### Pushing the file to S3

```
sudo aws s3 cp skill.zip s3://skill-bucket/
sudo aws lambda update-function-code --function-name Skill --s3-bucket skill-bucket --s3-key skill.zip
```


