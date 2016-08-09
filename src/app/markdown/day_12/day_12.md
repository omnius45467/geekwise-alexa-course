## Servers and Alexa

In the beginning of the class we touched a little bit on servers. 
Today we are going to take a deeper dive into servers with node and how you can unload some of your skill logic onto another server.

### Objectives

* Learn how you can setup a server and connect your skill to it
* Connect to a database, get results from the database and have Alexa speak it back to you

### Express Servers

Express is a great tool for setting up light weight servers. These servers can do a variety of things, for instance they can load html markup and function as a API for applications.
Our main focus will be to construct an API that will connect to our Alexa skills, do some business logic and deliver the results to the user.

Remember in the beginning of the class I discussed the Amazon Echo/Tap being a headless browser, this essentially means that it 
functions as a browser does in that it spits out the information that is sent to it. I want you to take a moment and think about the services that you use online. 
 No matter if they are a phone app or a government website or a video game they are all tied to a server. 
 The same is true for smart home devices that can operate over a network connection.
 
 Almost every programming language has something that resembles a web server. Everything from Python, Java, C++, and the one that we will be using javascript.
 For most use cases you will probably use a node server of some kind to do a lot of the heavy lifting.
 
 When it comes to databases we have a couple options that will allow us to either communicate with the database through an off site connection or we can interface with it directly.


#### Express Server example

[Express Server](https://github.com/sammyboy45467/Simple-Express)

Clone the example and get it running on your local machine.

In this example I'm spinning up a simple server that will simple respond to 2 routes. 
Routes are `endpoint` that can deliver results in the format such as html or json or xml depending on your use case. 
These endpoints are what you visit when you go to a url such as your facebook page or a google search.


