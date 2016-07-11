## Building Custom Examples
 
Today we are going to be building a custom example to perform basic search with Alexa.

### Objectives
* Build a simple skill to demonstrate remembering inputs and performing actions based on the input.
* Build a simple skill that will search through an online database through an NPM package.
* Students will have the ability to expand on the simple examples

### Tools for this skill
* [Alexa-App Boilerplate](https://github.com/sammyboy45467/AlexaBoilerplate)
* Your favorite text editor
* And of course your VM

### The Guest Skill

The first skill we are going to build is based on a 'Call and Response' method, where we will use Intents to determine 
what output will be returned to the user. 

Like with most of the skills in this course we are going to try and keep the size as minimal as possible. 

The way this skill will work is that you will simply tell Alexa that there is someone at the door, with their name, and 
Alexa will give a short welcome.

1. First lets pull in our dependencies. If you are using the boilerplate you should just have to `npm install` and you 
will have the ability to use `alexa-app`.
```
var alexa = require('alexa-app');
var app = new alexa.app();
```

2. The next part that we will work on are the intents. Let's setup the first intent.
```
app.intent('GuestIntent', {}, function(request, response){
    var guest = request.slot('Guest');
    if(guest >= 1){
        response.say('Hello'+' I am happy Jeremy has friends, if I can help you with anything let me know, if you are looking for music just ask me!');
        response.shouldEndSession(true);
        response.send();
    }else{
        response.say("Is someone here? Because I can't see them.");
        response.shouldEndSession(true);
        response.send();
    }
});
```

