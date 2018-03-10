# <img width="50" src="https://github.com/layoutzweb/postman-sdk/raw/master/media/postman-logo.png"/> Postman SDK
A Postman SDK that provides helpers to create collections & environments and to communicate with the latest Postman REST api.

![Travis](https://img.shields.io/travis/layoutzweb/postman-sdk.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/73cc03084b25454ebaa1cd2b8f101669)](https://www.codacy.com/app/layoutzweb/postman-sdk?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=layoutzweb/postman-sdk&amp;utm_campaign=Badge_Grade)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/badges/shields.svg)](https://github.com/layoutzweb/postman-sdk)

# Why a Postman SDK?
Postman is well known for providing a great tool to perform request's against any api server, but if you look deeper there are other nice features.

One of them is a Collection. A Collection holds groups of pre-configured requests, that you can access and use it with just a couple of clicks.
The best part of this feature is that collections can be shared!

But that is not all, a Collection can also be used to export full featured documentation pages for your api's, that users can visit and interact with by checking request & response examples, and parameter descriptions .

Sooo I created this SDK to help me automate the generation of collections and it's proper documentation page in a Express server middleware, witch you can find here (link available soon).

If you find it useful it's your's to use! Cheers!


# How to use it

Have a environment variable set with your Postman Api Key:
```apacheconfig
POSTMAN_API_KEY=[YOUR KEY HERE]
```

Import what you need from the SDK:
```javascript
import {Collections, Environments, User} from 'posrman-sdk'
```

## Methods
Use one of the collections to make an api call:
```javascript
Collections.get([id])
    .then((response =>
        console.log(response))
    .catch(err => 
        console.error(err))

```

## Available Methods
All of the commen REST methods are available:
#### GET
>.get([id = null], [params = {}])

**@accept:**
* ```id``` Optional, if null will grab all records, otherwise the record matching the provided id
* ```params``` A prams object that will be appended as a query string to the url
 
**@returns** ```Object|Array``` 

#### POST
>.post([params])

**@accept:**
* ```params``` A prams object that will be sent in the request body in JSON format
 
**@returns** ```Object``` 

#### PUT
>.put([id], [params = {}])

**@accept:**
* ```id``` Id of the collection to be updated
* ```params``` A prams object that will be sent in the request body in JSON format
 
**@returns** ```Object``` 

#### DESTROY (DELETE)
>.destroy([id])

**@accept:**
* ```id``` Id of the collection to be removed
 
**@returns** ```Object``` 

# Tests
Assuming you have dependencies installed by running ```npm install```, run:
```
npm run jest
```

# Collaboration
Please send your pull requests, I'll look into it on a weekly basis but as soon as I can, work family, I'm sure you know how it is! But the SDK really could use some spying up, so don't be shy! 

# License
```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

# Official Api Docs
[Official Api Docs](https://docs.api.getpostman.com) 