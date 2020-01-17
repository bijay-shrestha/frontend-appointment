import profiles from '../menu.json';
import { UserMenuUtils } from "./index";
const checkIfChildExist = child => (child.length ? true : false)

// const getNewSubDepartmentMenu = (subdept, childMenus, role) => ({})

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
  subDepartmentCode: children.subDepartmentCode,
  childMenus: [...childMenus]
});

const usermenufilter = userMenus => {
  const {subDepartmentCode, assignedRolesResponseDTOS} = userMenus;
  const deptUserMenus = profiles[subDepartmentCode];
  const filteredMenus = []
  assignedRolesResponseDTOS &&
    assignedRolesResponseDTOS.map((assignedRoles, index) => {
      console.log('From Backend, Assigned Roles::', assignedRoles);
      const {parentId, childMenus} = assignedRoles
      deptUserMenus.map((depts, ind) => {
        console.log('From Frontend Department menus')
        if (Number(depts.id) === Number(parentId)) {
          let hasChild = checkIfChildExist(depts.childMenus)
          if (hasChild) {
            let childMens = []
            childMenus.map((assignedChild, indx) => {
              const {userMenuId, roleId} = assignedChild
              depts.childMenus.map((dept, iddx) => {
                if (Number(dept.id) === Number(userMenuId)) {
                  let child = getChildMenuFirst(dept, roleId, [])
                  childMens.push(child)
                }
              })
            });
            filteredMenus.push(getChildMenuFirst(depts, [], childMens))
          } else {
            filteredMenus.push(getChildMenuFirst(depts, depts.roleId, []))
          }
        }
      })
    });
    let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson([...filteredMenus]);
    localStorage.setItem('userMenus',JSON.stringify(alphabeticallySortedMenus));
  return filteredMenus;
};
export default  usermenufilter;
