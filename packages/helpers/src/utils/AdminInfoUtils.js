export const saveLoggedInAdminInfo = (adminInfo) => {
    localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
};
