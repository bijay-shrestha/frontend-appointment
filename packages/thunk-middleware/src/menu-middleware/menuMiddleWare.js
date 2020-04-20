import {Axios} from '@frontend-appointment/core'
import {MenuActions} from '@frontend-appointment/action-module'
import {UserMenusFilter} from '@frontend-appointment/helpers'

export const fetchUserMenus = (path, code) => async dispatch => {
  dispatch(MenuActions.isMenuLoading(null))
  try {
    const response = await Axios.put(path, code)
    const userMenus = await UserMenusFilter(response.data)
    // dispatch(MenuActions.isMenuSucces(userMenus));
    return userMenus
  } catch (error) {
    // dispatch(MenuActions.isMenuError(error));
  }
}

export const fetchUserMenusNew = (path, code) => async dispatch => {
  dispatch(MenuActions.isMenuLoading(null))
  try {
    const response = await Axios.put(path, code)
    const userMenus = await UserMenusFilter(response.data)
    // dispatch(MenuActions.isMenuSucces(userMenus));
    return userMenus
  } catch (error) {
    throw error
    // dispatch(MenuActions.isMenuError(error));
  }
}

export const savePinOrUnpinUserMenu = (path, status) => async () => {
  try {
    await Axios.put(path, {
      isSideBarCollapse: status.isSideBarCollapse ? 'Y' : 'N'
    })
  } catch (error) {
    console.log('=====SavePinnedor UnpinUser', error)
    return ''
  }
}
