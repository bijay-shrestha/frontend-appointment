export default {
    errorHandler: error => {
        const {response} = error;
        const status = response ? response.status : '';

        switch (status) {
            case 400:
            case 401:
            case 403:
            case 404:
            case 409:
            case 417:
            case 500:
            case 502:
                console.log("Developer Api Error:", error);
                throw error.response.data;
            default:
                console.log("Developer Api Error:", error);
                let errorObj = {
                    errorMessage: error.message,
                    stack: error.stack
                };
                throw errorObj;
        }
    }

}
