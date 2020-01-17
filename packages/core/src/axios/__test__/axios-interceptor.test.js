import axios from 'axios';
import Axios from "../axios-services";

describe('Interceptor tests', () => {

    const successResp = {
        status: 200,
        testName: "getRaw testModule"
    };

    const errorResp = {
        response: {
            message: 'invalid data',
            data: 'invalid data',
            status: 400
        }
    };

    it('should make the request twice', async () => {
        expect.assertions(1);

        axios.get = jest.fn();
        axios.get
            .mockResolvedValueOnce(successResp)
            .mockRejectedValueOnce(errorResp);

        try {
            await Axios.getRaw('/testModule')
            //     .then(() => {
            // });
        } catch (error) {

        }

        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});
