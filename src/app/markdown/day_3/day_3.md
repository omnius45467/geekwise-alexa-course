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


#### High Level Overview

Form a high level perspective the skills that we write are just small scripts that are stored in AWS Lambda. 
When you make a request to your skill Lambda is fired up and the skill is initiated. 
Depending on how you wrote your skill you might be presented with some type of question or prompt that will ask you for input, 
in most cases this is considered the `LaunchIntent` or the intent that is triggered when the skill is launched. 
From your input you will probably be taken to another `Intent` or possibly even some sort of `EndSessionIntent`.

#### Low Level Overview





### Understanding AWS

#### Step by Step

