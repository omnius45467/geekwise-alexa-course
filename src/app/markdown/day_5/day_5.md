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
    Before we move onto the next step, lets take a deeper look at this intent. We won't be testing it out till later, 
    but if you want to you can run some tests on your own. 

    Can you foresee any points of failure? Would it make more sense to have a switch case?

3. The last intent that I want to point out is something I typically have in my skills even though there are functions 
to handle this. It is the `EndIntent`. This will basically stop the skill when a user gives the command.

    ```
    app.intent('EndIntent',
	{},
	function(request,response) {
		setTimeout(function() {		// simulate an async request

	        // This is async and will run after a brief delay
	        response.say('alright');

	        // Must call send to end the original request
	        response.send();

		}, 250);

	    // Return false immediately so alexa-app doesn't send the response
	    return false;
    });

    ```

4. If you notice above the second parameter being passed into the system is an empty object. Like I mentioned in previous 
lessons, this is where you can insert your `Sample Utterances` and `Slots`. 

    Here's a sample...
    ```
    {
    'slots':{'Guest':'LIST_OF_GUESTS'},
    'utterances':[
		'{Guest} {Guest} and {Guest}',
		'{Guest}',
		'{Guest} and {Guest}',
		'{Guest} and his family',
		'{Guest} and her family',
		'{Guest} and his boyfriend',
		'{Guest} and her boyfriend',
		'{Guest} and his girlfriend',
		'{Guest} and her girlfriend',
		'{Guest} and his wife',
		'{Guest} and her wife',
		'{Guest} and his husband',
		'{Guest} and her husband',
		'{Guest} and his friends',
		'{Guest} and her friends',
		'{Guest} and friends'
	    ]
    }
    ```

    Notice I tried to cover a lot of different use cases. You can modify them as you wish, these are mainly for demonstration purposes. 
    Can you guess what the `EndIntent` utterances might look like?
5. The next big thing that we need to do is zip up the package and send it over to lambda.
    Remember the command to do this? `grunt lambda_package`. We will also need to setup the lambda function to prepare for this. 
    Go to your Lambda account and create a new function.

6. Now we will setup the skill itself in the Amazon Developer Portal. 

If step `5` and `6` seem a little obscure check back on day `3` for the walk through. But remember this time we will be uploading a zip file of our code.


### The iTunes Search Skill

I like Apple, and from time to time I don't want to have to search through everything on my computer to find a TV show. 
So I made an Alexa Skill to do it for me. 
This skill is rather simple. We will be using the boilerplate like above. This time we will be adding another simple node library to the skill. 

#### Installing the NPM Library
 
The library we will be using for this skill is the `itunes-search`. Install it by 
`npm install itunes-search --save` that way it will be saved to your package.json file.

This is an extremely simple library this is something we could code out without the use of the library, but I'm somewhat lazy. 
If we take a look at the source code for this project. You will notice that the main portion of the library is in the file `lib/itunes.js`.
```
exports.search = function(options, callback) {
   
     var url = generateURL("http://itunes.apple.com/search?", options, {
       country: "US"
     });
       
     makeRequest(url, callback);
};
```

Basically this works by passing options into a callback. The response that we get is the objects matching our query. 
From here we have access to a ton of different information that might be useful for the end user.
Our goal as developers is to find out what the user might be looking for and find a systematic way to parse this 
incoming data, only sharing the data that is relevant.
