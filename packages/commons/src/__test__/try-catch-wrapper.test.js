import {TryCatchHandler} from "../../index";

describe('Try Catch testModule', () => {
    it('should execute the passed method', () => {
        let mockFunction = jest.fn().mockResolvedValue(new Promise(resolve => resolve('success')));
        TryCatchHandler.genericTryCatch(mockFunction()).then(
            () => {
                expect(mockFunction).toHaveBeenCalled();
            })
    });

    it('should execute and handle error when the passed method is rejected', async () => {
        let mockFunction = jest.fn().mockRejectedValue(new Promise(reject => reject(new Error('Error Thrown'))));
        await TryCatchHandler.genericTryCatch(mockFunction()).catch(error => {
            expect(error.errorMessage).toEqual('Error Thrown')
        });
    });
});
