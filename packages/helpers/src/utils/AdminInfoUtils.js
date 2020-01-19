export const saveLoggedInAdminInfo = (adminInfo, assignedMenus) => {
    localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
    localStorage.setItem("assignedModules", JSON.stringify(assignedMenus));
};
