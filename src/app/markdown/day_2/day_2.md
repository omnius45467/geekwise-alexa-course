## The Headless Browser and a Little Bit of A.I.

### Objectives
* We will be touching bases on C.R.U.D. operations with Node and simple json
* Review Sessions, Requests, and Responses with Node
* Introduce some basic concepts of A.I.


### Server Background

![alt-text-1](assets/images/server.png "title-1")

When you visit a website you are interacting with a server. When your browser makes a connection to the server, you get a response. 
Usually this response is in a browser readable format like `.xml`, `.html` or `.json`.
For the purpose of this course it is important to keep some of these basic concepts in mind because they will come in handy later.


### The Headless Browser

When it comes to any of the Amazon Alexa enabled devices, you can think of it as essentially a browser. Your voice is the GUI. 

From a software perspective the User Interface presents some interesting opportunities to change the way people interact with technology.

For our projects we will be interacting with external servers like Lambda and servers that we create through requests, sessions, and json in order to get a response.

#### Simple Request Using [NPM Request Library](https://github.com/request/request)

```
var request = require('request');
request('http://www.google.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
```

### Simple Response

```
var http = require("http");
   http.createServer(function(request, response) {
     response.writeHead(200, {"Content-Type": "text/plain"});
     response.write("Hello World");
     response.end();
   }).listen(8888);
```

### Simple Session Using [Express](http://expressjs.com/)

```
var express = require('express');
var app = express();

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

app.get('/awesome', function(req, res) {
  if(req.session.lastPage) {
    res.write('Last page was: ' + req.session.lastPage + '. ');
  }

  req.session.lastPage = '/awesome';
  res.send('Your Awesome.');
});

app.get('/radical', function(req, res) {
  if(req.session.lastPage) {
    res.write('Last page was: ' + req.session.lastPage + '. ');
  }

  req.session.lastPage = '/radical';
  res.send('What a radical visit!');
});

app.get('/tubular', function(req, res) {
  if(req.session.lastPage) {
    res.write('Last page was: ' + req.session.lastPage + '. ');
  }

  req.session.lastPage = '/tubular';
  res.send('Are you a surfer?');
});

app.listen(process.env.PORT || 8080);

```


### How do users interact with a headless browser?

Something that has been very useful for me is [this guide](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-voice-design-handbook) 
created by the alexa team.

We will get into what `FillIntent`, `Partial Intent`, and `No Intent` actually mean a little later, but you can think of
 these as the actuators that the user can have control over.

### Voice User Interface Basics

Designing voice interfaces is an art in and of itself. [This page](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-voice-design-best-practices) has some interesting details on some do's and don't.

