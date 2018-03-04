# Postman SDK
<table>
    <tr>
      <td><img width="100" src="https://github.com/layoutzweb/postman-sdk/raw/master/media/postman-logo.png"/></td>
      <td>
        A simple Postman SDK to interact with the Postman REST Api
		![Travis](https://img.shields.io/travis/layoutzweb/postman-sdk.svg)
      </td> 
    </tr>
</table>

![Travis](https://img.shields.io/travis/layoutzweb/postman-sdk.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/73cc03084b25454ebaa1cd2b8f101669)](https://www.codacy.com/app/layoutzweb/postman-sdk?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=layoutzweb/postman-sdk&amp;utm_campaign=Badge_Grade)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/badges/shields.svg)](https://github.com/layoutzweb/postman-sdk)


# How to use it

Have a environment variable set with your Postman Api Key:
```apacheconfig
POSTMAN_API_KEY=[YOUR KEY HERE]
```

Import what you need from the SDK:
```javascript
import {Collections, Environments, User} from 'posrman-sdk'
```

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