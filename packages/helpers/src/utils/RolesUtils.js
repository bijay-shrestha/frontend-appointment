import roles from '../roles.json'
export const getOnlyAllTabsRoles = () => {
    return roles.filter(role=> !role.parent_role_id && !role.isSingleTab)
};

export const getOnlyGivenRole = (roleId) => {
    return roles.find((role)=> Number(role.id) === Number(roleId))
}
