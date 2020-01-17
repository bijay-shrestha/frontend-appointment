export default {
    DEFAULT_HEADER: () => {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
    },
    FILE_HEADER: () => {
        return {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    },
    DELETE_API_HEADER: () => {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    },
    MULTIPART_HEADER: () => {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }
    }
}
