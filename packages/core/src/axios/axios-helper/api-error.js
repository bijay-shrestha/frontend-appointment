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
                if(error.response.data)
                  throw error.response.data
                 else{
                     throw new Error('Sorry Internal Server Error')
                 } 
                // if(error.response)
                //  throw Error({...error.response,errorMessage:error.response.error})
              //break;
            default:
                console.log("Developer Api Error:", error);
                let errorObj = {
                    errorMessage: error.message||error.errorMessage||'Sorry, Internal Server Problem occurred.',
                    stack: error.stack
                };
                throw errorObj;
        }
    }

}
