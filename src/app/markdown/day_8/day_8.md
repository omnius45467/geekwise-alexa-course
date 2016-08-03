## The Alexa-App-Server

### _Word of Warning: This may be a curve ball..._

The Alexa-App-Server or Alexa-Server is simply a small node server that can handle responses and requests like the 
Amazon Echo with formatted json.

This will help us test code before we bring it into lambda. While using the Alexa Server be prepared to have multiple 
windows open at once to test your skills and 'compile' the code for the lambda servers.

### Objectives
* Gain familiarity with the Alexa Server for testing
* Use debugging tools
* Understand the process of getting a code sample from Alexa-App-Server on the Lambda Servers

### The Repo

Clone the repo with this command into your local machine so that the vagrant box will have access to the repo.

`git clone https://github.com/sammyboy45467/alexa-app-server.git`

After this has completed make sure that you `cd` into the directory and run `npm install` to install all the dependencies.

### Setting up the server

You are able to construct your own version of the server by following the pattern shipped in the repo in the `examples` directory. 
In the root of this directory you will have a server.js file. This is basically the driving force for the server. 
In only 15 lines of code, few support files, and some dependencies our server can accept requests and give output like the Amazon Echo itself.
This is a simulation environment that will act as test bed for your ideas. 

If you are ready to dive deep into the world of testing your skills you will need to do the following

1. Run the command `cp -r examples environment`
2. Inside the `apps` directory you will see a couple example skills that will allow you to follow the same basic pattern.

### Key Points From the README.md

* Multiple apps can be hosted on a single server
    * Apps are stored in the /apps directory by default
    * Each app is a stand-alone Node module, built using the alexa-app framework
    * Each app must export its alexa-app instance to be loaded into the server
    * package.json contains information about the app, including (optionally) the appId
    * The hotswap module reloads code changes to apps, if they set module.change_code=1
* Built-in Echo Simulator
    * Debug apps by issuing a GET request to the app endpoints
    * Send simulated requests to your app, view the JSON response
    * Session variables are automatically maintained between requests
    * Send intent requests and set slot values
    * View generated schema and utterances
    
### An Example Skill for the Server

```
    var alexa = require('alexa-app');
   
   // Allow this module to be reloaded by hotswap when changed
   module.change_code = 1;
   
   // Define an alexa-app
   var app = new alexa.app('test-1');
   app.launch(function(req,res) {
   	res.say("Testing!!");
   });
   app.intent('Intent', {
   		"slots":{"NAME":"LITERAL","AGE":"NUMBER"}
   		,"utterances":["{My name is|my name's} {matt|bob|bill|jake|nancy|mary|jane|NAME} and I am {1-100|AGE}{ years old|}"]
   	},function(req,res) {
   		res.say('Your name is '+req.slot('NAME')+' and you are '+req.slot('AGE')+' years old');
   	}
   );
   module.exports = app;
```

Notice that the first line in that block is just pulling in the dependencies. 
Then in a few lines later we are creating an instance of that library in such a way that the Alexa-App-Server can interpret. 
We are passing in the name of the skill into this line, which will tie it into the server so we can use it in the testing environment.

`var app = new alexa.app('test-1');`

Another interesting line is the `module.change_code = 1;` this is suppose to help reload the skills if they have been edited. 

If you produce a skill in this testing environment and want to bring it over to lambda you will have to modify this line. Or else your skill will complain.

Something else to note is that in this environment the skills that you are creating will need to be exporting their own instance. 

`module.exports = app;`

### The Purpose for this Environment

This testing environment is mostly meant to test your intents and your slots before you take them to an actual skill. 
You can run console.logs here and possible debuggers if you place them in the right place.
You can also use CURL to interact with the skills over command line. 
This will become very helpful when we begin to work with things other than the typical skills that use call and response.

### So you have made a skill and you are ready to move on... 
 
When you have tested your skill and you are ready to move on you can essentially use the [AlexaBoilerplate](https://github.com/sammyboy45467/AlexaBoilerplate) and 
paste in your intents and go through the typical work flow that we have been using up till now.




