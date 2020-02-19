import adminMenus from "../cogent-appointment-admin-menu.json";
import clientMenus from "../cogent-appointment-client-menu.json";
import {localStorageSecurity} from "./localStorageUtils";
import {sortUserMenuJson} from "./UserMenuUtils";
import {EnvironmentVariableGetter} from '../utils';

const checkIfChildExist = child => (child.length > 1 ? true : false)

const getChildMenuFirst = (children, roleId, childMenus) => ({
    id: children.id,
    parentId: children.parentId,
    name: children.name,
    path: children.path,
    roles: [...roleId],
    icon: children.icon,
    leftNavigation: children.leftNavigation,
    checked: children.checked,
    order: children.order,
    enabled: children.enabled,
    menuFor: children.menuFor,
    description: children.description,
    childMenus: [...childMenus]
})

const usermenufilter = userMenus => {
    const {assignedRolesResponseDTOS} = userMenus;
    const moduleCode = EnvironmentVariableGetter.REACT_APP_MODULE_CODE;
    const deptUserMenus = moduleCode === 'ADMIN' ? adminMenus[moduleCode] : clientMenus[moduleCode];
    let filteredMenus = [];
    assignedRolesResponseDTOS &&
    assignedRolesResponseDTOS.map((assignedRoles, index) => {
        const {parentId, childMenus} = assignedRoles;
        deptUserMenus.map((depts, ind) => {
            if (Number(depts.id) === Number(parentId)) {
                let hasChild = checkIfChildExist(depts.childMenus);
                if (hasChild) {
                    let childMens = [];
                    childMenus.map((assignedChild, indx) => {
                        const {userMenuId, roleId} = assignedChild;
                        depts.childMenus.map((dept, iddx) => {
                            if (Number(dept.id) === Number(userMenuId)) {
                                let child = getChildMenuFirst(dept, roleId, [])
                                childMens.push(child)
                            }
                        })
                    });
                    filteredMenus.push(getChildMenuFirst(depts, [], childMens))
                } else {
                    filteredMenus.push(getChildMenuFirst(depts, childMenus[0].roleId, []))
                }
            }
        })
    })
    let alphabeticallySortedMenus = sortUserMenuJson([...filteredMenus]);
    localStorageSecurity.localStorageEncoder("userMenus", alphabeticallySortedMenus)

    return filteredMenus;
}
export default usermenufilter
