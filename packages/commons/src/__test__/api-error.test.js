import {ApiError} from "../../index";

describe('Errorhandler tests', () => {
    it('should handle 500 server error', () => {
        let errorResponse = {
            response: {
                data: {
                    errorMessage: "server error occurred"
                },
                status: 500
            }
        };
        try {
            ApiError.errorHandler(errorResponse);
        } catch (e) {
            expect(e.errorMessage).toEqual("server error occurred");
        }
    });

    it('should handle unmentioned server error', () => {
        let errorResponse = {
            message: "method not allowed",
            stack: '',
            response: {
                status: 405
            }
        };
        try {
            ApiError.errorHandler(errorResponse);
        } catch (e) {
            console.log(e);
            expect(e.errorMessage).toEqual("method not allowed");
        }
    });

});
