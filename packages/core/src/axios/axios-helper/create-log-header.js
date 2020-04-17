import {LocalStorageSecurity, RolesUtils} from '@frontend-appointment/helpers'
import {excludedUrl, includeAppUrl} from './excludedUrl'
export const createLogHeader = request => {
  const appStorageMenu = LocalStorageSecurity.localStorageDecoder('active')
  let getActMenu = ''
  let actionId, menuId
  let logHeader = null
  if (checkIfItIsNotAnAction(request.url)) {
    if (appStorageMenu) {
      getActMenu = appStorageMenu.replace('true', '')

      getActMenu = getActMenu.split('/')
      getActMenu = getActMenu[getActMenu.length - 1]
    }
    menuId = sessionStorage.getItem('activeMenu') || ''
    if (!checkIfItIsAdd()) {
      actionId = sessionStorage.getItem('actionType') || ''

      let role, roleName
      if (menuId) role = RolesUtils.getOnlyGivenRole(actionId) || {}
      if (role) roleName = role.name
      if (menuId && actionId && getActMenu && roleName)
        logHeader = {
          parentId: menuId,
          roleId: actionId,
          feature: getActMenu,
          actionType: roleName,
          logDescription: ''
        }
    } else {
      if(request.method==='post')
      logHeader = {
        parentId: menuId,
        roleId: 2,
        feature: getActMenu,
        actionType: 'Add',
        logDescription: ''
      }
    }
  }
  return logHeader
}
const checkIfItIsNotAnAction = url => {
  let flag = false
  for (let i = 0; i < excludedUrl.length - 1; i++) {
    //  console.log(excludedUrl[i])
    if (url.includes(excludedUrl[i])) {
      flag = true
      break
    }
  }
  for (let j = 0; j < includeAppUrl.length; j++) {
    if (url.includes('/appointment'))
      if (!url.includes(includeAppUrl[j])) {
        flag = false
        break
      }
  }
  // console.log('======fag', flag)
  return !flag
}

const checkIfItIsAdd = () => {
  // console.log('===location.pathname', window.location.hash)
  if (window.location.hash.includes('/add')) {
    return true
  }
  return false
}