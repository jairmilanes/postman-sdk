# ![Postman Unofficial SDK - By Jair Milanes](https://github.com/layoutzweb/postman-sdk/raw/master/media/postman-logo.png "Postman SDK")

An unoficial Postman SDK to create and manage collections & environments localy and in the cloud.

![Travis](https://img.shields.io/travis/layoutzweb/postman-sdk.svg) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/73cc03084b25454ebaa1cd2b8f101669)](https://www.codacy.com/app/layoutzweb/postman-sdk?utm_source=github.com&utm_medium=referral&utm_content=layoutzweb/postman-sdk&utm_campaign=Badge_Grade) [![npm](https://img.shields.io/npm/v/postman-sdk.svg)](https://github.com/layoutzweb/postman-sdk) [![license](https://img.shields.io/github/license/layoutzweb/postman-sdk.svg)](https://github.com/layoutzweb/postman-sdk)

# [Why a Postman SDK?](#why-postman)

Postman is well known for providing a great tool to perform request's against any api server, but if you look deeper there are other nice features to it, that maybe you are overlooking.

One of them is a Collection. A Collection holds groups of pre-configured requests, that you can access and use it with just a couple of clicks and the best part of this feature is that collections can be shared!

But that is not all, a Collection can also be used to export full featured documentation pages for your api's, that users can visit and interact with by checking request properties, parameter descriptions & response examples.

Sooo I created this SDK to help me automate the generation of collections and it's proper documentation page in a Express server middleware, witch you can find here (link available soon).

If you find it useful it's your's to use! Cheers!  

# [How to use it](#how-to-use-it)

The Postman Sdk provides 3 main classes to help you create and manage your collections, EnvironmentManager, CollectionsManager and the Client, but first things first, if you plan on using the client to interact with the Postman Api, start by installing the package:

```
npm install postman-sdk --save
```

Next, have a environment variable set with your Postman Api Key:

```apacheconfig
POSTMAN_API_KEY=[YOUR KEY HERE]  
```

The api key can also be passed to the Client constructor as you will see below, but setting it as an environment variable is highly recommended.

Now for each helper class:


## EnvironmentManager

The EnvironmentManager creates a new Environment and allows you to manage it's variables just like managing collections items and events.
<br><br>

```javascript
const envrionments = []
// You can create environments to handle specific variables that change between environments
const dev = new EnvironmentManager('development') // you can give any name
dev.add({
	key: 'HOST',
	value: 'dev.myhost.com',
	type: 'string',
	enabled: true
})
// Passing properties as arguments also works
dev.add('PROTOCOL', 'http', 'string', true)

// You can give any name
const staging = new EnvironmentManager('staging')
staging.add({
	key: 'HOST',
	value: 'staging.myhost.com',
	type: 'string',
	enabled: true
})
// Passing properties as arguments also works
staging.add('PROTOCOL', 'http', 'string', true)

// Lets added here for now so we can use in the examples bellow
envrionments.concat([dev, staging])
```


## CollectionManager
The CollectionManager creates a new collection and allows you to manage it's items & events by providing stray forward methods to add, find & remove entries.
```javascript
const collection = new CollectionManager('my-collection', '1.0.0')
collection.item.add('test-endpoint', {
	path: '/test-endpoint',
	method: 'GET',
	protocol: 'http',
	host: 'localhost',
	query: 'test=1'
})
collection.item.addFolder('First Folder')
collection.item.addToFolder('First Folder', 'test-endpoint-2', {
	path: '/test-endpoint-2',
	method: 'DELETE',
	protocol: 'http',
	host: 'localhost'
})
```


## Client
The Client is a simple Promise based client to communicate with the Postman REST api and get/save/update/delete your collections, environments, mocks, monitors & the user profile in the cloud, from there you can share and or publish your api documentation.
```javascript
// Provide the api key only if you have no set it as a env variable
const environmentClient = new Client('environments', '[API_KEY]') 
// We can post each environment we created ealier:
envrionments.forEach(env => {
    client.post(env.toJSON())
        .then(response => console.log(response)
        .catch(error => console.error(error))
})

const collectionClient = new Client('collections', '[APY_KEY]')
// Like the environment, we can post or collection we created in the example above:
collectionClient.post(collection.toJSON())
.then(response => console.log(response))
.match(error => console.log(error))

```     


# [Advanced Usage](#advanced-usage)
There is more you can do with the CollectionManager if you want to enhance your collections and documentation even more:
Use helper methods to programaticaly generate, update or remove collection items:

### Easily find & remove items
```

// You can find items inside collections
const item = collection.item.find('test-endpoint-2')
console.log(item)

// Remove items from collections
collection.item.remove('test-endpoint')

// Check if an item exists
const exists = collection.item.has('test-endpoint')
// Will log 'false'
console.log(exists)

// Find an item with a custom function
const item =

```

### Add custom headers
```

const item = collection.find('test-endpoint-2')
item.request.headers.add('Content-type', 'application/json')

// You can also use any methods available for the item it self
item.request.headers.find('Content-type')
item.request.headers.has('Content-type')
item.request.headers.findIndex('Content-type')
item.request.headers.remove('Content-type')

```

### Add events
Events can be added to the collection level or the item level. This means that if you add it at the collection level or the item level. If added to the collection, any request item on that collection can trigger, otherwise only the item you add to it will trigger.
```

collection.event.add({
name: 'My Script',
listen: 'prerequest', // This is the default value and could be omitted
disabled: false,
type: 'text/javascript', // Also the default value and could be omitted
exec: ['console.log('MY LOG!')', 'ANY JAVASCRIPT SCRIPT'], // Provide either the exec or source property, never both, only added here for demonstration, see below for source example.
})

// Lets add one to an item:
const item = collection.find('test-endpoint-2')
item.event.add({
name: 'My Script',
listen: 'prerequest', // This is the default value and could be omitted
disabled: false,
type: 'text/javascript', // Also the default value and could be omitted
source: 'http://myhost.com/myscript.js'
})

// You can also use any methods available for the item it self
item.event.find('Content-type')
item.event.has('Content-type')
item.event.findIndex('Content-type')
item.event.remove('Content-type')

````

## [Full Documentation](#full-docs)
You can also find a more detailed documentation with each method and class available here:
[Postman SDK Documentaion Page](https://layoutzweb.github.io/postman-sdk/postman-sdk/1.3.0/Client.html)

## [Official Api Docs](#official-docs)
Used as reference for the development of this SDK.
[Official Api Docs](https://docs.api.getpostman.com)

# [Tests](#tests)  
Assuming you have cloned this repo and have dependencies installed by running ```npm install```, run:  
```javascript  
npm run jest  
````

# [Contributions](#Collaboration)

If you like the SDK and found bug's, or have suggestions on how we could improve it please submit your pull requests. I will consider all suggestions. One rule, make sure you have tests included! Cheers!  

# [License](#license)
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
