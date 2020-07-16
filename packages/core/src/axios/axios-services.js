import Axios from './axios-interceptor'
import {TryCatchHandler} from './axios-helper'
import {
    addObjectAsRequestParam,
    convertObjectToRequestParam,
    createPathWithPathVariable,
    Headers
} from './axios-helper'

// ********************************* START GENERIC REQUESTS ********************************//

// const domain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN;
// const SERVER_DOMAIN = domain ? domain : '';

const GET = (path, headers) => Axios.get(`${path}`, headers)

const POST = (path, data, headers) => {
    return Axios.post(`${path}`, data, headers)
}

const PUT = (path, data, headers) => Axios.put(`${path}`, data, headers)

const API_WRAPPER = TryCatchHandler.genericTryCatch

const DEFAULT_HEADER = Headers.DEFAULT_HEADER()

const FILE_HEADER = Headers.FILE_HEADER()

const DELETE_API_HEADER = Headers.DELETE_API_HEADER()

const MULTIPART_HEADER = Headers.MULTIPART_HEADER()
const newGet = (path, headers) => Axios.get(`${path}`, headers, {
    crossOrigin: true,
    crossDomain: true,
    withCredentials: true
})
const newPost = (path, data, headers) => {
    return Axios.post(`${path}`, data, {headers: {...headers}}, {
        crossOrigin: true,
        crossDomain: true,
        withCredentials: true
    })
}

const newPut = (path, data, headers) => {
    return Axios.put(`${path}`, data, {headers: {...headers}}, {
        crossOrigin: true,
        crossDomain: true,
        withCredentials: true
    })
}


export default {
    dynamicMethod: option =>
        option.method === 'post'
            ? API_WRAPPER(newPost(option.url, option.data, option.headers))
            : option.method === 'put' ? API_WRAPPER(newPut(option.url, option.data, option.headers))
            : API_WRAPPER(newGet(option.url, option.headers)),

    getRaw: path => API_WRAPPER(Axios.get(`${path}`)),

    get: path => API_WRAPPER(GET(path, DEFAULT_HEADER)),

    getWithPathVariables: (path, pathVariable) =>
        API_WRAPPER(
            GET(createPathWithPathVariable(path, pathVariable), DEFAULT_HEADER)
        ),

    getWithRequestParams: (path, paramsObj) =>
        API_WRAPPER(
            GET(convertObjectToRequestParam(path, paramsObj), DEFAULT_HEADER)
        ),

    getWithPagination: (path, paginationObject) =>
        API_WRAPPER(
            GET(convertObjectToRequestParam(path, paginationObject), DEFAULT_HEADER)
        ),

    getFile: path => API_WRAPPER(GET(path, FILE_HEADER)),
    // ********************************* END GET REQUESTS *******************************//

    // ********************************* POST REQUESTS **********************************//

    postRaw: (path, data) =>
        API_WRAPPER(Axios.post(`${path}`, data, DEFAULT_HEADER)),

    post: (path, data) => API_WRAPPER(POST(path, data)),

    postWithPathVariables: (path, pathVariable, data) =>
        API_WRAPPER(
            POST(createPathWithPathVariable(path, pathVariable), data, DEFAULT_HEADER)
        ),

    postWithRequestParams: (path, paramsObj, data) =>
        API_WRAPPER(
            POST(convertObjectToRequestParam(path, paramsObj), data, DEFAULT_HEADER)
        ),

    postWithPagination: (path, paginationObject, data) =>
        API_WRAPPER(
            POST(
                convertObjectToRequestParam(path, paginationObject),
                data,
                DEFAULT_HEADER
            )
        ),

    postForFile: (path, data) => API_WRAPPER(POST(path, data, FILE_HEADER)),

    postForMultipart: (path, paramVariable, data, formData) =>
        API_WRAPPER(
            POST(
                addObjectAsRequestParam(path, paramVariable, data),
                formData,
                MULTIPART_HEADER
            )
        ),
    // ********************************* END POST REQUESTS *******************************//

    // ********************************* PATCH REQUESTS **********************************//

    patch: (path, id, data) =>
        API_WRAPPER(
            Axios.patch(
                `${createPathWithPathVariable(path, id)}`,
                data,
                DEFAULT_HEADER
            )
        ),

    // ********************************* END PATCH REQUESTS *******************************//

    // ********************************* PUT REQUESTS **********************************//

    put: (path, data) => API_WRAPPER(PUT(path, data, DEFAULT_HEADER)),

    putWithPathVariables: (path, pathVariable, data) =>
        API_WRAPPER(
            PUT(createPathWithPathVariable(path, pathVariable), data, DEFAULT_HEADER)
        ),

    putWithRequestParam: (path, paramsObj, data) =>
        API_WRAPPER(
            PUT(convertObjectToRequestParam(path, paramsObj), data, DEFAULT_HEADER)
        ),

    putWithPagination: (path, paginationObject, data) =>
        API_WRAPPER(
            PUT(
                convertObjectToRequestParam(path, paginationObject),
                data,
                DEFAULT_HEADER
            )
        ),

    putForFile: (path, data) => API_WRAPPER(PUT(path, data, FILE_HEADER)),

    putWithPaginationForFile: (path, paginationObject, data) =>
    API_WRAPPER(
        PUT(
            convertObjectToRequestParam(path, paginationObject),
            data,
            FILE_HEADER
        )
    ),

    putMultipart: (path, data) => API_WRAPPER(PUT(path, data, MULTIPART_HEADER)),

    putWithMultiPart: (path, paramVariable, data, formData) =>
        API_WRAPPER(
            PUT(
                addObjectAsRequestParam(path, paramVariable, data),
                formData,
                MULTIPART_HEADER
            )
        ),
    // ********************************* END PUT REQUESTS *******************************//

    // ********************************* DELETE REQUESTS **********************************//
    del: (path, data) =>
        API_WRAPPER(
            Axios.delete(`${path}`, {
                headers: DELETE_API_HEADER,
                data
            })
        )

    // ********************************* END DELETE REQUESTS ******************************//
}
