import moxios from 'moxios';
import axios from 'axios';
import Axios from '../axios-services';
import Headers from '../axios-helper/headers';
import {mockAndAssertForApiRejection, mockRequestsAndAssert} from "../axios-helper/utils";

describe('Testing Axios apis', () => {
    let onSuccess,
        defaultHeaders = Headers.DEFAULT_HEADER().headers,
        fileHeaders = Headers.FILE_HEADER(),
        deleteReqHeaders = Headers.DELETE_API_HEADER(),
        multiPartHeaders = Headers.MULTIPART_HEADER();
    beforeEach(() => {
        onSuccess = jest.fn();
        moxios.install();
    });

    afterEach(() => moxios.uninstall());

    it('should call `axios.get` with received path on getRaw method call',
        done => {
            Axios.getRaw('/testModule').then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "getRaw testModule"
                },
                methodType: 'get',
                url: '/testModule',
                headers: "",
                done
            };
            mockRequestsAndAssert(params);
        });

    it('should call axios.get with path and headers  when get method is invoked', done => {
        Axios.get('/testModule').then(onSuccess);
        let params = {
            onSuccess,
            responseObject: {
                status: 200,
                testName: "get testModule"
            },
            methodType: 'get',
            url: '/testModule',
            headers: defaultHeaders,
            done
        };
        mockRequestsAndAssert(params);
    });

    it('should call axios.get with path and pathVariable and headers when getWithPathVariables is invoked',
        done => {
            Axios.getWithPathVariables("/testModule", "testValue").then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "getWithPathVariable"
                },
                methodType: 'get',
                url: '/testModule/testValue',
                headers: defaultHeaders,
                done
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.get with path and paramObj and headers when getWithRequestParams is invoked',
        done => {
            Axios.getWithRequestParams("/testModule", {name: 'axios', id: 5}).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "getWithRequestParams"
                },
                methodType: 'get',
                url: '/testModule?name=axios&id=5',
                headers: defaultHeaders,
                done
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.get with path and pagination values as request params and headers when ' +
        'getWithPagination is invoked', done => {
            Axios.getWithRequestParams("/testModule", {page: 1, size: 5}).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "getWithPagination"
                },
                methodType: 'get',
                url: '/testModule?page=1&size=5',
                headers: defaultHeaders,
                done
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.get headers for file download when ' +
        'getFile is invoked', done => {
            Axios.getFile("/testModule").then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "getFile"
                },
                methodType: 'get',
                url: '/testModule',
                headers: fileHeaders.headers,
                done,
                data: undefined,
                responseType: fileHeaders.responseType
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.post with path when postRaw is invoked',
        done => {
            let data = {
                "name": "axios"
            };
            Axios.postRaw("/postTest", data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "postRaw"
                },
                methodType: 'post',
                url: '/postTest',
                headers: "",
                done,
                data
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.post with path, data and header when post is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            Axios.post("/postTest", data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "post"
                },
                methodType: 'post',
                url: '/postTest',
                headers: defaultHeaders,
                done,
                data
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.post with path, pathVariable, data and header when postWithPathVariables is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            Axios.postWithPathVariables("/postTest", "testVariable", data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "postWithPathVariables"
                },
                methodType: 'post',
                url: '/postTest/testVariable',
                headers: defaultHeaders,
                done,
                data
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.post with path, paramsObj, data and header when postWithRequestParams is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            Axios.postWithRequestParams("/postTest", {id: 3}, data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "postWithRequestParams"
                },
                methodType: 'post',
                url: '/postTest?id=3',
                headers: defaultHeaders,
                done,
                data
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.post with path, paginationObject, data and header when postWithPagination is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            Axios.postWithPagination("/postTest", {page: 3, size: 10}, data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "postWithPagination"
                },
                methodType: 'post',
                url: '/postTest?page=3&size=10',
                headers: defaultHeaders,
                done,
                data
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.post with path, data and headerForFile when postForFile is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            Axios.postForFile("/postTest", data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "post for file"
                },
                methodType: 'post',
                url: '/postTest',
                headers: fileHeaders.headers,
                done,
                data,
                responseType: fileHeaders.responseType
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.post with path, reqParam with Object value and headerFormMultipart when postForMultipart is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            let fileTestData = {
                lastModified: 1560923826199,
                lastModifiedDate: 'Wed Jun 19 2019 11:42:06 GMT+0545 (Nepal Time) {}',
                name: "IMG_20190619_104000.jpg",
                size: 3821095,
                type: "image/jpeg",
                webkitRelativePath: "",
            };
            let formData = new FormData();
            formData.append('file', fileTestData);
            const encodedData = encodeURIComponent(JSON.stringify(data));

            Axios.postForMultipart("/postTest", "request", data, formData).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "post for file"
                },
                methodType: 'post',
                url: '/postTest?request=' + encodedData,
                headers: multiPartHeaders.headers,
                done,
                encodedData
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.patch with path, id, data and header when patch is invoked',
        done => {
            let data = {
                "name": "axios"
            };
            Axios.patch("/patchTest", 1, data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "patch testModule"
                },
                methodType: 'patch',
                url: '/patchTest/1',
                headers: defaultHeaders,
                done
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.put with path, data and header when put is invoked',
        done => {
            let data = {
                "name": "axios"
            };
            Axios.put("/putTest", data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "put testModule"
                },
                methodType: 'put',
                url: '/putTest',
                headers: defaultHeaders,
                done
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.put with path, pathVariable, data and header when putWithPathVariables is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            Axios.putWithPathVariables("/putTest", "testVariable", data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "putWithPathVariables"
                },
                methodType: 'put',
                url: '/putTest/testVariable',
                headers: defaultHeaders,
                done,
                data
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.put with path, paramsObj, data and header when putWithRequestParams is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            Axios.putWithRequestParam("/putTest", {id: 3}, data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "putWithRequestParams"
                },
                methodType: 'put',
                url: '/putTest?id=3',
                headers: defaultHeaders,
                done,
                data
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.put with path, paginationObject, data and header when putWithPagination is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            Axios.putWithPagination("/putTest", {page: 3, size: 10}, data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "putWithPagination"
                },
                methodType: 'put',
                url: '/putTest?page=3&size=10',
                headers: defaultHeaders,
                done,
                data
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.put with path, data and headerForFile when putForFile is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            Axios.putForFile("/putTest", data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "put for file"
                },
                methodType: 'put',
                url: '/putTest',
                headers: fileHeaders.headers,
                done,
                data,
                responseType: fileHeaders.responseType
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.put with path, reqParam with Object value and headerFormMultipart when putWithMultiPart is invoked',
        done => {
            let data = {
                "name": "axios"
            };

            let fileTestData = {
                lastModified: 1560923826199,
                lastModifiedDate: 'Wed Jun 19 2019 11:42:06 GMT+0545 (Nepal Time) {}',
                name: "IMG_20190619_104000.jpg",
                size: 3821095,
                type: "image/jpeg",
                webkitRelativePath: "",
            };

            let formData = new FormData();
            formData.append('file', fileTestData);
            const encodedData = encodeURIComponent(JSON.stringify(data));

            Axios.putWithMultiPart("/putTest", "request", data, formData).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200,
                    testName: "put for multipart"
                },
                methodType: 'put',
                url: '/putTest?request=' + encodedData,
                headers: multiPartHeaders.headers,
                done,
                encodedData
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should call axios.delete with path and header when del is invoked',
        done => {
            let data = {
                id: 1,
                remarks: "DeleteTest"
            };
            Axios.del("/deleteTest", data).then(onSuccess);
            let params = {
                onSuccess,
                responseObject: {
                    status: 200
                },
                methodType: 'delete',
                url: '/deleteTest',
                headers: deleteReqHeaders,
                done,
                data
            };
            mockRequestsAndAssert(params);
        }
    );

    it('should handle rejection and return error data when getRaw request is rejected', done => {
        const errorResp = {
            response: {
                message: 'invalid data',
                data: 'invalid data',
                status: 400
            }
        };
        const promise = Axios.getRaw('/testModule');
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when get request is rejected', done => {
        const errorResp = {
            response: {
                message: 'invalid data',
                status: 400,
                data: 'invalid data'
            }
        };
        const promise = Axios.get('/testModule');
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when getWithPathVariables request is rejected', done => {
        const errorResp = {
            response: {
                message: 'invalid data',
                status: 400,
                data: 'invalid data'
            }
        };
        const promise = Axios.getWithPathVariables('/testModule', "1");
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when getWithRequestParams request is rejected', done => {
        const errorResp = {
            response: {
                message: 'invalid data',
                status: 400,
                data: 'invalid data'
            }
        };
        const promise = Axios.getWithRequestParams('/testModule', {name: 'Sabu', id: '1'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when getWithPagination request is rejected', done => {
        const errorResp = {
            response: {
                message: 'invalid data',
                status: 400,
                data: 'invalid data'
            }
        };
        const promise = Axios.getWithPagination('/testModule', {page: 1, size: 10});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when getFile request is rejected', done => {
        const errorResp = {
            response: {
                status: 404,
                data: 'Not found'
            }
        };
        const promise = Axios.getFile('/testModule');
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when postRaw request is rejected', done => {
        const errorResp = {
            response: {
                message: 'invalid data',
                status: 400,
                data: 'invalid data'
            }
        };
        const promise = Axios.postRaw('/testModule', {name: 'test'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when post request is rejected', done => {
        const errorResp = {
            response: {
                message: 'invalid data',
                status: 400,
                data: 'invalid data'
            }
        };
        const promise = Axios.post('/testModule', {name: 'test'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when postWithPathVariables request is rejected', done => {
        const errorResp = {
            response: {
                message: 'invalid data',
                status: 400,
                data: 'invalid data'
            }
        };
        const promise = Axios.postWithPathVariables('/testModule', '1', {name: 'testData'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when postWithRequestParams request is rejected', done => {
        const errorResp = {
            response: {
                status: 404,
                data: 'Not found'
            }
        };
        const promise = Axios.postWithRequestParams('/testModule', {testData: 'testingParam'},
            {name: 'testData'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when postWithPagination request is rejected', done => {
        const errorResp = {
            response: {
                status: 404,
                data: 'Not found'
            }
        };
        const promise = Axios.postWithPagination('/testModule', {page: 1, size: 10},
            {name: 'testData'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when postForFile request is rejected', done => {
        const errorResp = {
            response: {
                status: 404,
                data: 'Not found'
            }
        };
        const promise = Axios.postForFile('/testModule', {name: 'testData'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when postForMultipart request is rejected', done => {
        const errorResp = {
            response: {
                status: 404,
                data: 'Not found'
            }
        };
        let data = {
            "name": "axios"
        };
        const promise = Axios.postForMultipart("/postTest", "request", data);
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when patch request is rejected', done => {
        const errorResp = {
            response: {
                status: 404,
                data: 'Not found'
            }
        };
        const promise = Axios.patch('/testModule', 1, {test: "data testModule"});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when put request is rejected', done => {
        const errorResp = {
            response: {
                status: 500,
                data: 'Server Error'
            }
        };
        const promise = Axios.put('/testModule', {test: "data testModule"});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when putWithPathVariables request is rejected', done => {
        const errorResp = {
            response: {
                message: 'invalid data',
                status: 400,
                data: 'invalid data'
            }
        };
        const promise = Axios.putWithPathVariables('/testModule', '1', {name: 'testData'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when putWithRequestParams request is rejected', done => {
        const errorResp = {
            response: {
                status: 404,
                data: 'Not found'
            }
        };
        const promise = Axios.putWithRequestParam('/testModule', {testData: 'testingParam'},
            {name: 'testData'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when putWithPagination request is rejected', done => {
        const errorResp = {
            response: {
                status: 404,
                data: 'Not found'
            }
        };
        const promise = Axios.putWithPagination('/testModule', {page: 1, size: 10},
            {name: 'testData'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when putForFile request is rejected', done => {
        const errorResp = {
            response: {
                status: 404,
                data: 'Not found'
            }
        };
        const promise = Axios.putForFile('/testModule', {name: 'testData'});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when putWithMultipart request is rejected', done => {
        const errorResp = {
            response: {
                status: 500,
                data: 'Server Error'
            }
        };
        let data = {
            "name": "axios"
        };

        const promise = Axios.putWithMultiPart("/putTest", "request", data);
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

    it('should handle rejection and return error data when delete request is rejected', done => {
        const errorResp = {
            response: {
                status: 500,
                data: 'Server Error'
            }
        };
        const promise = Axios.del('/testModule', {id: 1, remarks: "DeleteTest"});
        let paramsForTest = {
            errorResponse: errorResp,
            promise,
            done
        };
        mockAndAssertForApiRejection(paramsForTest);
    });

});
