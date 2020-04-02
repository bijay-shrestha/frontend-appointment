import roles from '../roles.json'
export const getOnlyAllTabsRoles = () => {
    return roles.filter(role=> !role.parent_role_id && !role.isSingleTab)
};
