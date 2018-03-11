# <img width="50" src="https://github.com/layoutzweb/postman-sdk/raw/master/media/postman-logo.png"/> Postman SDK
A Postman SDK that provides helpers to create collections & environments and to communicate with the latest Postman REST api.

![Travis](https://img.shields.io/travis/layoutzweb/postman-sdk.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/73cc03084b25454ebaa1cd2b8f101669)](https://www.codacy.com/app/layoutzweb/postman-sdk?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=layoutzweb/postman-sdk&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/postman-sdk.svg)](https://github.com/layoutzweb/postman-sdk)
[![license](https://img.shields.io/github/license/layoutzweb/postman-sdk.svg)](https://github.com/layoutzweb/postman-sdk)

# [Why a Postman SDK?](#why-postman)
Postman is well known for providing a great tool to perform request's against any api server, but if you look deeper there are other nice features to it, that maybe you are overlooking.

One of them is a Collection. A Collection holds groups of pre-configured requests, that you can access and use it with just a couple of clicks.
The best part of this feature is that collections can be shared!

But that is not all, a Collection can also be used to export full featured documentation pages for your api's, that users can visit and interact with by checking request & response examples, and parameter descriptions .

Sooo I created this SDK to help me automate the generation of collections and it's proper documentation page in a Express server middleware, witch you can find here (link available soon).

If you find it useful it's your's to use! Cheers!

# [How to use it](#how-to-use-it)
Have a environment variable set with your Postman Api Key:
```apacheconfig
POSTMAN_API_KEY=[YOUR KEY HERE]
```

Import what you need from the SDK:
```javascript
import {Collections, Environments, User} from 'posrman-sdk'
```
## [REST Api](#rest-api)
With this adk you have easy access to all rest methods provided by the Postman REST api.
### [Methods](#rest-api-methods)
Use one of the collections to make an api call:
```javascript
Collections.get([id])
    .then((response =>
        console.log(response))
    .catch(err => 
        console.error(err))
        
Collections.post([...props])
    .then((response =>
        console.log(response))
    .catch(err => 
        console.error(err))
```

### [Available Methods](#available-methods)
All of the common REST methods are available:
#### GET
>.get([id = null], [params = {}])

**@accept:**
* ```id``` Optional, if null will grab all records, otherwise the record matching the provided id
* ```params``` A prams object that will be appended as a query string to the url
 
**@returns** ```Object|Array``` 

#### POST
>.post([params])

**@accept:**
* ```params``` A params object that will be sent in the request body in JSON format
 
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

## [Collection Builder](#collection-builder)
The postman-sdk also provides an easy interface to create collection files that can be imported into the Postman aplpication, from there share betwen team members and the option to create full featured documentation pages.

### [How To Use It](#how-to-use-the-collection-builder)
Import the builder from the SDK:
```javascript
import { Builder } from 'postman-sdk'
```

#### [Create a new collection](#creating-a-collection)
Create a new collection:
```javascript
const builder = new Builder.Collection([name], [version])
```
Now you can add items and folders:
```javascript
builder.item.add('/tes-endpoint')
builder.item.addFolder('folder name')
```
You can also add items to specific folders:
```javascript
builder.item.addToFolder('/tes-endpoint')
```
You can also add items to specific folders:
```javascript
builder.item.addToFolder('/tes-endpoint')
```
Get the collection JSON
```javascript
builder.collection
```

#### [Create enviroments](#creating-an-environment)
Same concept as the collection above:
```javascript
const builder = new Builder.Environment([name]) // Environments have no version
builder.add('Variable Name', 'Variable Value')
builder.add('Variable Name 2', 'Variable Value 2')
builder.has('Variable Name')
builder.find('Variable Name')
builder.remove('Variable Name')
```
Get the collection JSON
```javascript
builder.environment
```

# [Adding to Postman](#adding-collections-to-postman)
Once you have a collection, you can save to a file and manually import into Postman, or you can use the rest api to upload it directly to Postman cloud and have it show up on your Postman account.

# [Tests](#tests)
Assuming you have dependencies installed by running ```npm install```, run:
```javascript
npm run jest
```

# [Collaboration](#Collaboration)
If you like the SDK and found bug's, or have suggestions on how we could improve it please submit your pull requests. I will consider all suggestions. One rule, make sure you have tests included! Cheers!

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