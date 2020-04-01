import SecureLS from 'secure-ls';
import {APP_SECRET_KEY} from './EnvironmentVariableGetter'
const env =process.env.NODE_ENV;
const encodingType='des'//env.toString() === "development"?'':'aes';
const isCompression=true//env.toString() === "development"?false:true;
const encryptionSecret=APP_SECRET_KEY;
const ls = new SecureLS({encodingType: encodingType, isCompression: isCompression, encryptionSecret: encryptionSecret})
export const localStorageSecurity = {
  localStorageDecoder:  key => {
    try {
      const newKey  = ls.get(key);
      return newKey;
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
