import SecureLS from 'secure-ls'
const env =process.env.NODE_ENV;
const encodingType=env.toString() === "development"?'':'aes';
const isCompression=env.toString() === "development"?false:true;
const ls = new SecureLS({encodingType:encodingType ,isCompression:isCompression})
export const localStorageSecurity = {
  localStorageDecoder: key => {
    try {
      return ls.get(key)
    } catch (e) {
      return false
    }
  },
  localStorageEncoder: (key, encodeValue) => {
    try {
      ls.set(key, encodeValue)
    } catch (e) {
      console.log('localstorage setting error', e)
    }
  },
  localStorageRemover: () => {
    try {
     ls.removeAll()
    ls.remove('_secure__ls__metadata')
    } catch (e) {
      console.log('localstorage removing error', e)
    }
  },
  particularValueRemover: key => {
    try {
      ls.remove(key)
      ls.remove('_secure__ls__metadata')
    } catch (e) {
      console.log('localstorage removing error', e)
    }
  }
}
export default localStorageSecurity;
