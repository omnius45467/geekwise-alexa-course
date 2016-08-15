## Sessions as Asset Managers

Sessions are typically used as a means of storing information for later recall, Alexa Skills are no different.

### Objectives
* Learn how to use sessions to manage for your skill

### If you don't want to connect to a database
In some cases your skill might not need to offload user data to a off site database. If you don't care about user 
progress after the skill is complete a great alternative is simply store them in sessions.

### Before we go deeper...
We have been using slots to pull user commands and perform actions, with those slot values. But what happens when 
you move to another intent? In most cases these slot values are lots unless you have the user pass the same slot values again.

If someone wanted to make a more complex skill, like a madlib skill this would be a daunting task with no clear solution, 
yet if we store slot values into the intent session we can call them later.

What could this look like as far as an intent goes?

### On Launch

To begin with, when the skill is first launched you will need to set the session items as an empty string so we can fill them up later.
Think of the session like an empty bucket.

```
app.launch(function(request,response) {

	response.say("Welcome to the madlib skill. ");
	response.say("To use this skill you will need to set the values for various parts of speech.");
	response.reprompt("Are you ready to start the game?");

	response.session('name','');
	response.session('subject','');
	response.session('object','');

	response.card({
		type:    "Simple",
		title:   "Madlib Skill",  //this is not required for type Simple 
		content: "Welcome to the madlib skill"
	});
	response.shouldEndSession(false);
	response.send();


});
```

The only difference in the coding example above is that I have the block of code .... 
```
	response.session('name','');
	response.session('subject','');
	response.session('object','');
```

which will take three parameters. I matched these up with some intents that you will see later.

### An Intent that Saves

Don't be afraid of this intent, there is nothing exceptionally new to what we are doing here, 

```
app.intent('SetNameIntent', {
	'utterances':[ 'set the name {name}' ]
}, function(request, response){
	var name = request.slot('name');
	response.session('name', name);
	response.say('setting the name to '+name);
	response.reprompt('what do you want to set the name to?');
	response.shouldEndSession(false);
	response.send();
});
```

the only new concept here is where we are writing the slot value to an appropriate section in the session

```
	var name = request.slot('name');
	response.session('name', name);
```

In the case of producing a madlib skill we will need the various parts of speech for the skill within the session and 
make them available to call them later.

### Using Session Data

If you are working on a madlib skill and all the parts of speech that you are wanting to use are filled in the session 
the thing you might want to do now is call these session values inside the `response.say()`.

An example of this is 
```
if(request.session('name') != '' && request.session('subject') != '' && request.session('object')!= '' ){
		var paragraph = [
			request.session('name')+" is the only "+request.session('object')+" who is able to see the "+request.session('subject')+".",
			"The "+request.session('subject')+'is the '+request.session('object')+"of"+request.session('name')
		];
		response.say(paragraph[Math.floor(Math.random()*paragraph.length)]);
		response.shouldEndSession(true);
		response.send();
}
```

### If you want to see the full example...

[Madlib Skill](https://github.com/sammyboy45467/madlib-skill)
