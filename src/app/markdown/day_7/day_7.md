## Developing Student Examples

### Brainstorming

Today we will spending some time brainstorming on how we can build our dream skills


### Looking at the NPM Registry

Think of services that you use everyday. For me I tend to use a lot of Apple products so personally 
I want to explore integrating them over my home servers.
Visit the [npm registry](https://www.npmjs.com/).

### What does a snapshot of your Voice User Interface look like?

How do you want your users to interact with your skill? Preferably you want to give the users the results 
they are looking for as soon as possible. In some cases this might mean... 

* Well Placed Callbacks and setTimeouts
* Limited Number of Intents
* Varied and animated responses, when possible

#### Ensuring Quick and Accurate Response

You can achieve greater customer satisfaction by using well placed callbacks and setTimeouts to deliver what the user 
is looking for faster. 

#### Keeping Your Skill Lean

Lambda functions and Alexa Skills have a core axiom underlining their construction. They encourage lean development. 
By limiting the number of necessary intents your skill will be more flexible and easier to use, 
and this will keep the user using your skill.

#### Varied Responses

Just like in Game Design, a good user experience will have varied voice interactions. For most of the skills that are 
used in this course we haven't spent much time constructing varied responses. 
For production level skills you will want to make some varied responses. Going back to day #5, remember the greeter skill we made?
How much more useful and fun would it be to make it so that Alexa could have a verity of random responses? 
Sure you could code a cognitive system for this but for now we can settle with just a simple array with values.

```var myArray = [
    'hello',
    'hi',
    'why are you talking to me?'
]```

```var rand = myArray[Math.floor(Math.random() * myArray.length)];```

### Does your plan require a server associated with your skill? 

Meaning will you need somewhere to store data or do you need to save a snapshot of the user 
interaction with the skill? If you feel like you might need to save user interactions you might want to connect a database, we will cover this later

### Does your skill require a external login?

If you are trying to utilize information from an external webapp like, a solar system you might want to think about 
constructing a login page that will authorize the user to sign in or create an account.



