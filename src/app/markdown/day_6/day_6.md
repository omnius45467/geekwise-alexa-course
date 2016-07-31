## More Skills
 
### Objectives

* Continue working on previous weeks skills.
* Develop new an iTunes Search Skill

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

1. If you haven't already cloned the [boilerplate](https://github.com/sammyboy45467/AlexaBoilerplate) that we have been using. 
And install the library listed above.

2. Let's setup a test file to make sure we can ping the itunes servers.

3. Let's write a welcome intent

4. Let's put in some basic error handling.

5. Let's create a couple different options for the users.

6. Let's test it with out devices.

7. How can we improve this?
