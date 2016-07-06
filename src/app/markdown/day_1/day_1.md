## Introduction to Alexa

### What is Alexa?

When it comes down to it, Alexa is simply a headless browser with microphones and a speaker assembly. 

Because the device is essentially a browser, developers like you and me have the ability to write small 
scripts that can be ran from external services.

#### Objectives of the Class

Your challenge, if you choose to accept...

* Expose students to the fundamentals of developing skills for Alexa.
* Give students the tools to build consumable Skills and publish them on the [Alexa Developer Portal](https://developer.amazon.com/edw/home.html)
* Expose students to developing web software for things other than web browsers


### Installing Virtual Box and Vagrant




#### Why Vagrant?

The main reason we are using Virtualbox is because it will act as a equal playing field for everyone. 
It will also act like AWS if you plan on developing other apps or services.

Using Virtual Box might take a little while to get used to if you are used to a windows environment, 
but it is very rewarding.

* Visit [this link](https://www.virtualbox.org/wiki/Downloads) to download Virtual Box.
* You will need to install Vagrant, so you can get access to some cool tools, download it [here](https://www.vagrantup.com/)
* Once this is installed you will need to clone a git repo that has the tools we will use [here](https://github.com/lennycartier/nodejs-vagrantbox)
* From here you will pop open a terminal or command prompt and move to your directory where you cloned the vagrant box from github
    * `vagrant up`
    * When you are done simply `vagrant suspend`
    * If something goes wrong you can get rid of the instance of the virtual machine by `vagrant destroy`
    
    
#### Installing Dependencies

We will be installing a few dependencies

* First try checking your version of node to see if it is installed `node --version`
* If all goes well you should see a version number. This means that you have node installed.
    * If you don't have node installed follow this guide
        * `curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -`
        * `sudo apt-get install -y nodejs`
        * The next major dependency that we will need to install is [grunt](https://github.com/gruntjs/grunt)
        
Like it or not much of what we will be doing with lambda and the skills is dependant on grunt. If you prefer gulp write a `gulpfile.js` for it!

* We will next install the [AWS CLI](https://aws.amazon.com/cli/)
    * The [Get Started Guide](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html)
    
* Outside of your virtual box we will need to install [Postman](https://www.getpostman.com/)
    * Postman gives us a tool that will allow us to handle requests that are sent from out skill to the Amazon Servers
    * Postman is mostly helpful when you have to debug or when you want to connect to things like robots
    


#### Node Primer

If you haven't used node for a little while [this](http://www.nodebeginner.org) short primer might be useful

The biggest take away from this short primer should be standing up a small toy server.

```var http = require("http");
   
   http.createServer(function(request, response) {
     response.writeHead(200, {"Content-Type": "text/plain"});
     response.write("Hello World");
     response.end();
   }).listen(8888);```

Notice there are many built in functions that we can use to our advantage

In many cases for what we are going to do the "Content-Type" will be handled by some 
pieces of code that we will be using later.



