import {localStorageSecurity} from './localStorageUtils'
export const checkDashboardRole = dashRoleCode => {
  let adminRole = localStorageSecurity.localStorageDecoder('adminDashRole')
    ? localStorageSecurity.localStorageDecoder('adminDashRole')
    : []
  let adminRoleCode = adminRole.length
    ? adminRole.map(adRole => adRole.code)
    : []
  if (adminRoleCode.includes(dashRoleCode)) return true
  else return false
}
