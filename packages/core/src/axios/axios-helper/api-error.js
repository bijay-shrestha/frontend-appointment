export default {
  errorHandler: error => {
    const {response} = error
    const status = response ? response.status : ''
    let errorObj = {}
    switch (status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 409:
      case 417:
      case 500:
      case 502:
        console.log('Developer Api Error:', error)
        errorObj = {...error.response.data}
      default:
        console.log('Developer Api Error:', error)
        errorObj = {
          errorMessage: error.message || error.errorMessage,
          stack: error.stack
        }
    }
    throw errorObj
  }
}
