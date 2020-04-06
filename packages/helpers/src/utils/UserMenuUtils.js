export const sortUserMenuJson = userMenus => {
    if (userMenus) {
        userMenus.map(menu =>
            menu.childMenus &&
            menu.childMenus.sort((firstElement, secondElement) =>
                (firstElement.name).toLowerCase().localeCompare((secondElement.name).toLowerCase())));
        return userMenus.sort((firstElement, secondElement) =>
            (firstElement.name).toLowerCase().localeCompare((secondElement.name).toLowerCase()));
    }
    return [];
};

 