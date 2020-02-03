import ApiError from "@frontend-appointment/commons/src/api-error";

export default {
    genericTryCatch: async executionMethod => {
        try {
            const response = await executionMethod;
            console.log("Response:", response);
            return response;
        } catch (error) {
            console.log("Catched:", error);
            throw ApiError.errorHandler(error instanceof Promise ? await error : error);
        }
    }
}
