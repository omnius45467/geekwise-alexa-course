## Continuing Our Deep Dive

Today we will be continuing our look into databases as they can connect to our Alexa Skills and our custom express servers.

We will be working with a simple example for connecting and retrieving database information from the MLAB service.

### Objectives
* Gain familiarity to connect to an off site database store on your own
* Understand a few of the built in functions to `GET` data from MLAB
* Continue building your custom skills

### A Simple Database Connection

If you have already have a MLAB database, and you are ready to connect it to your Alexa Skill the first thing that 
you need to do is write a test.

This test will simply connect and test to see if you can get something back.

The first thing that I'm doing is creating a `test.js` file that will run independently from the Alexa Skill. 
This way I can test locally.

```
var mongoose = require('mongoose'),
    env = require('node-env-file'),
    Promise = require('bluebird');
Schema = mongoose.Schema;

env('./.env'); // only use this if you are wanting to connect with an env file
mongoose.Promise = Promise;
mongoose.connect(process.env.MLAB); // this will change for the specific database I'm connecting to


//this schema is mainly required for creating records, but I usually include it anyway jsut to be safe
var Company = new Schema({
    utteranceName:{
        type: String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    suite: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    }
});

var CompanyModel = mongoose.model('companies', Company); // the model is constructed here to allow for the search and manipulation of the record

function getCompany(company) {
    CompanyModel.findOne({ utterance: company}, function (err, doc){
        console.log(doc);
        mongoose.connection.close();
    });
    
    //when it comes time to test this with Alexa I will have to drop a `return false;` below the async call
}

var c = 'bit wise'; // in this case I will be searching for this record in my database
getCompany(c);
```
