import roles from '../roles.json'
export const getOnlyAllTabsRoles = () => {
    console.log('roles',roles);
    return roles.filter(role=> !role.parent_role_id)
}  