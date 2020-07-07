import {EnvironmentVariableGetter, LocalStorageSecurity} from './index'

export const getFavouritesDetails = favourites => {
    let userMenus = LocalStorageSecurity.localStorageDecoder('userMenus');
    let favouritesWithDetail = [];

    userMenus && userMenus.map(parentMenu => {
        let favouriteMenu
        if (!parentMenu.childMenus.length) {
            favouriteMenu = favourites && favourites.find(favourite =>
                Number(favourite) === Number(parentMenu.id))
            if (favouriteMenu)
                addMenuToList(favouritesWithDetail, parentMenu, true)
        } else {
            parentMenu.childMenus.map(child => {
                favouriteMenu = favourites && favourites.find(favourite =>
                    Number(favourite) === Number(child.id))
                if (favouriteMenu)
                    addMenuToList(favouritesWithDetail, child, true)
                return ''
            })
        }
        return ''
    })
    return favouritesWithDetail;
}

export const filterFavouritesAndPrepareUserMenus = (favouritesList, userMenus) => {
    let menusForFavourites = [];
    userMenus && userMenus.map(parentMenu => {
        let favouriteMenu
        if (!parentMenu.childMenus.length) {
            favouriteMenu = favouritesList && favouritesList.find(favourite =>
                Number(favourite.id) === Number(parentMenu.id))
            if (!favouriteMenu)
                addMenuToList(menusForFavourites, parentMenu, false)
            else
                addMenuToList(menusForFavourites, parentMenu, true)
        } else {
            parentMenu.childMenus.map(child => {
                favouriteMenu = favouritesList && favouritesList.find(favourite =>
                    Number(favourite.id) === Number(child.id))
                if (!favouriteMenu)
                    addMenuToList(menusForFavourites, child, false)
                else
                    addMenuToList(menusForFavourites, child, true)
                return ''
            })
        }
        return ''
    })
    return menusForFavourites
}

const addMenuToList = (listToAddTo, menu, isFavourite) => {
    const {REACT_APP_MODULE_CODE, ADMIN_MODULE_CODE} = EnvironmentVariableGetter;
    listToAddTo.push({
        name: menu.name,
        iCharacter: getInitialCharactersOfName(menu.name, 2),
        path: REACT_APP_MODULE_CODE === ADMIN_MODULE_CODE ? "/admin" + menu.path : menu.path,
        id: menu.id,
        parentId: menu.parentId,
        isFavourite: isFavourite,
        menuName: menu.name
    })
}

export const getInitialCharactersOfName = (name, length) => {
    let nameArray = name.split(" ");
    let iCharacter = nameArray.length === 1 ? nameArray[0].charAt(0) :
        nameArray.reduce((a, b) => {
            return a + b.charAt(0)
        },"")
    return iCharacter.substring(0, length).toUpperCase()
}