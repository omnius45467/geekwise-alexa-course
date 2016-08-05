## Continued Team Skill Assignments

### Objectives

* Finish previous days team assignments
* Begin new assignments (listed below)
* Brainstorm with your team about constructing individual skills

### Finishing skills

Look back to yesterday for your assignments. Continue working and perfecting your skills.

### New Assignments

#### Team 1 New Assignment
 
If you have completed your previous days Grocery List today you will be working on using an NPM module yourself.
The module that you will be using is the [Hulu Package](https://www.npmjs.com/package/hulu-node).

##### Your Tool Set
* Use the [AlexaBoilerplate](https://github.com/sammyboy45467/AlexaBoilerplate)
* Use the unofficial [Hulu Package](https://www.npmjs.com/package/hulu-node)
* You will need to think back to the iTunes example that we used in a previous lesson, do you remember how I 
tested sections of the code?
* You may find it easier to include the [Request Package](https://www.npmjs.com/package/request)

#### Team 2 New Assignment

Create a skill that will scrape word definitions from the wikipedia. You will need to use slots, intents, and utterances. 
You will also need to figure out how to incorporate requests into your skill. Your job will be to parse the HTML that 
is coming from the wikipedia page and determine which sections hold the definitions that you are looking for. 
It will be beneficial to plan out how the code will work and see if there is a standard way the definitions are placed.

##### Your Tool Set
* Use the [AlexaBoilerplate](https://github.com/sammyboy45467/AlexaBoilerplate)
* You may find it easier to include the [Request Package](https://www.npmjs.com/package/request)
* An HTML parser to JSON [Node Parser](https://github.com/tautologistics/node-htmlparser) there are many other options, and a module might not be necessary

#### Team 3 New Assignment

If you have completed your previous days assignment I want you to consider simple node servers for this next assignment.
This one is crucially important. Your assignment is to spin up a node server and have your skill interact with a node server.

The purpose is to effect changes on a web interface. Let your imagination run with this one. Here is a couple example utterance...

`Alexa ask node to change the color of the background on the webpage`

`Alexa ask node to move the box to the left on the webpage`

There will be a number of moving parts. Using a handful of intents and a handful of utterances will be helpful. 
Don't be afraid to use a switch case to make `requests` to your node server. Feel free to use ES5 or ES6, there is no real need for verbose frameworks. 
You can host the node server and the web interface locally, but host the skill on the lambda. 

The goal is to create a skill that can interact with a node server by matching up intents to routes.
If you want to tie in a json formatted database into your node server that would be beneficial for future lessons.

##### Your Tool Set
* Use the [AlexaBoilerplate](https://github.com/sammyboy45467/AlexaBoilerplate)
* Feel free to use [Express](https://github.com/expressjs/express) or [Restify](https://github.com/restify/node-restify)
* You may find it easier to include the [Request Package](https://www.npmjs.com/package/request)