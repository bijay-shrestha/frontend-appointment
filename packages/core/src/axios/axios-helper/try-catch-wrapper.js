import ApiError from "./api-error";

export default {
    genericTryCatch: async executionMethod => {
        try {
            const response = await executionMethod;
            // console.log("Response:", response);
            return response;
        } catch (error) {
            // console.log(error)
            // console.log("Catched:", error);
            throw ApiError.errorHandler(error instanceof Promise ? await error : error);
        }
    }
}
