## What the Heck is an Arduino
### Objectives
* Learn about Arduinos
* Find out how to program Arduinos with javascript

An Arduino is basically a device that has a small amount of built in RAM, and a small amount of built in 'flash memory'. 
The Arduino is great at running small tasks, robots, small embedded systems, and most of all IoT.

When developing an Arduino Application for actual use you will probably want to work with some type of WiFi module attached to the device.

For this introduction we will just be connecting to our local computers to make a connection to an Alexa Skill.

Most typically Arduinos are programmed in a special variety of C++ today we will be exploring programming in javascript.


### Starting out with IoT

The first thing that you want to do is install the Arduino IDE for your computer. This is the easiest and most straight forward way of uploading simple code.

[Arduino IDE](https://www.arduino.cc/en/Main/Software)

Navigate to the File/Examples/Firmata from the top menu, and select the `Standard Firmata` example. 
On the top menu you will see a Tools tab, naviagte to Board and select the Arduino Uno, also you will 
need to select your Port, and it become visible when your board is connected.
On the top left there is a Check button and an Upload button, click the upload button to send the code to the Arduino. 

This Firmata example will turn the Arduino board into simply a IO port that will allow you to send signals to the board 
in languages other then Arduino C/C++.

### Introducing Another Library

[Cylonjs](https://cylonjs.com/) is the javascript library we will be using to interface and program Arduinos. 
This is a Node Library meaning that we can use it in a traditional express server like we covered in the previous lesson.

To install the cylon packages there are a couple that you will need to install.

``` 
npm install cylon-firmata --save
npm install cylon-gpio --save
npm install cylon-i2c --save
npm install cylon-api-http --save
```

Additionally Cylonjs has a built in API that we can use to interact with our Alexa Skills. 
You will *not* be able to include these directly into your Alexa Skills, you will have to 
include them on a server and have the Alexa Skill make a `GET` request to your node express server.
