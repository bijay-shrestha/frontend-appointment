import axios from 'axios'

export const uploadImageInMinio = async (url, file) => {
    try {
        const uploadedUrl = await axios.put(url, {data: file})
        return uploadedUrl;
    } catch (e) {
        console.log('=== minio upload error', e)
        throw e
    }
}
