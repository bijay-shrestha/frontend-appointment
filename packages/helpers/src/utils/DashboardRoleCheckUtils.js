import {localStorageSecurity} from './localStorageUtils'
export const checkDashboardRole = dashRoleCode => {
  let adminRole = localStorageSecurity.localStorageEncoder('adminDashRole')
  let adminRoleCode = adminRole.map(adRole => adRole.code)
  if (adminRoleCode.includes(dashRoleCode)) return true
  else return false
}
