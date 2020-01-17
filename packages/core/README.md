# core

`core` is the module that contains `axios api calls`, `request/response interceptor` and `api errors`. This module helps in making api calls by simply passing in the `api endpoint`,`path variables`(if any),`request params`(if any) and `request data`(in case of post and patch requests). The necessary headers are taken care of by the module and can be modified if necessary.

The obective of this module is to generalize axios api calls and enable developers to make api calls without worry about the configs of axios, url patterns and error handling in any of the modules *(Laboratory, Pharmacy, Admin, et cetera.)* of entire __Cogent V2.0__ application.

## Developer Note

If additional headers are needed to add for any requests, follow the following steps:

__Step 1:__ Goto "headers.js" file at `core/axios/axio-helper/headers.js` directory.

You'll see a factory function over there.

``` javascript
export default {
    DEFAULT_HEADER: () => {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
    }
}

```

__Step 2:__ Let's say now we want to add another header for file requests. Add another method that returns the required headers. Assign the function a name following the convention (ALL_CAPITAL_LETTERS).

We are adding a method 'FILE_HEADER' that returns headers for file requests(PDF/EXCEL requests).

``` javascript
export default {
    DEFAULT_HEADER: () => {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
    },
    FILE_HEADER: () => {
        return {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
    }
}

```

__Note:__ If you need to add headers that are common for all requests, add it in `DEFAULT_HEADER`.

__Step 3:__ "axios-services.js" file at `core/axios/axios-services.js` contains all our requests. So import this header within "START GENERIC BLOCK" as shown below.

```javascript
// ********************************* START GENERIC REQUESTS ********************************//

const SERVER_DOMAIN = "";

const GET = (path, headers) => axios.get(`${SERVER_DOMAIN}${path}`, headers);

const POST = (path, data, headers) => axios.post(`${SERVER_DOMAIN}${path}`, data, headers)

const API_WRAPPER = TryCatchHandler.genericTryCatch;

const DEFAULT_HEADER = Headers.DEFAULT_HEADER();

const FILE_HEADER = Headers.FILE_HEADER();  // assign to variable

// ********************************* END GENERIC REQUESTS **********************************//

```

__Step 4:__ Go to the method where you need to use this recently added header. A sample has been provided below:

```javascript

// ********************************* POST REQUESTS **********************************//
export default {
    postRaw: (path, data) => API_WRAPPER(axios.post(`${SERVER_DOMAIN}${path}`, data)),

    post: (path, data) => API_WRAPPER(POST(path, data, DEFAULT_HEADER)),

    postForFile: (path, data) => API_WRAPPER(POST(path, data, FILE_HEADER)),

    // ********************************* END POST REQUESTS *******************************//
}
```

## Information about files

__axios-services.js:__ Contains all http requests (get,post,patch,delete,et cetera.)

__axios-interceptor.js:__ Contains request and response interceptor.

__api-error.js:__ Contains method that handles api errors.This file is located in commons module.

__try-catch-wrapper.js:__ Contains generic try/catch method that wraps api calls or other methods passed.

__headers.js:__ Contains method that returns headers for api requests.

## Api Request Samples

__get without headers:__  Axios.getRaw('/endpoint')

__get:__  Axios.get('/endpoint')

__get with path variable:__  Axios.getWithPathVariables('/endpoint', pathVariable)
 it will send request of type: http://localhost:8080/endpoint/1

__get with pagination :__   Axios.getWithPagination('/endpoint', paginationObject)
Example of paginationObject:
```
 paginationObject = {
    page: 1,
    size: 10
 }
 it will send request of type: http://localhost:8080/endpoint?page=1&size=10

```

__get with request params :__ Axios.getWithRequestParams('/endpoint', requestParamsObject)
Example of requestParamsObject:
```javascript
 requestParamsObject = {
    name: "ABC",
    id: 10
 }

 it will send request of type: http://localhost:8080/endpoint?name=ABC&id=10

```

__post without headers :__   Axios.postRaw('/endPoint',dataObject)
Example of dataObject:
```javascript
 dataObject = {
    userId: 1,
    id: 1,
    title: "test",
    body: "testing"
 }

```

__post :__  Axios.post('/endPoint',dataObject)

__post with path variable :__  Axios.postWithPathVariables('/endPoint', pathVariable, dataObject)

__post with pagination :__  Axios.postWithPagination('/endPoint', paginationObject, dataObject)

__post with request params :__  Axios.postWithRequestParams('/endPoint', requestParamsObject, dataObject)

__post with file :__  Axios.postForFile('/endPoint', requestParamsObject, dataObject)

__patch :__  Axios.patch('/endpoint',id)

__delete :__  Axios.del('/endpoint/id')

## Authors

The application is developed and maintained by a team of following *kaptains:*

- **[Sabu Shakya](https://gitlab-01.f1soft.com/sabu.shakya)** :information_desk_person:
- **[Smriti Mool](https://gitlab-01.f1soft.com/smriti.mool)** :dancer:
- **[Sauravi Thapa](https://gitlab-01.f1soft.com/sauravi.thapa)** :raising_hand:
- **[Kaushal Regmi](https://gitlab-01.f1soft.com/kaushal.regmi)** :stuck_out_tongue_winking_eye: and
- **[@bijay](https://gitlab-01.f1soft.com/bijay)**:bow:

## Stacks

- [x] Axios (https://github.com/axios/axios)
- [x] ReactJS (https://reactjs.org)
- [x] Redux (https://redux.js.org)
- [x] Jest (https://jestjs.io)
- [x] Enzyme (https://airbnb.io/enzyme/)
- [x] Lerna (https://github.com/lerna/lerna)
- [x] HTML, CSS3


Powered by : [Emojis](https://www.webfx.com/tools/emoji-cheat-sheet/) and [Markdown cheetsheet](https://docs.gitlab.com/ee/user/markdown.html): 