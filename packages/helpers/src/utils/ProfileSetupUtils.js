import {adminUserMenusJson, clientUserMenusJson, EnvironmentVariableGetter, LocalStorageSecurity} from "../../index";
import * as UserMenuUtils from "./UserMenuUtils";

export const prepareProfilePreviewData = (profileResponseDTO, profileMenuResponseDTOS, profileType) => {
    let filteredProfiles = {};
    let selectedMenus = [],
        selectedUserMenusForModal = [];

    Object.keys(profileMenuResponseDTOS).map((parentMenuId, idx) => {
        // For each parent menu's selected menus
        // IN CASE DETAILS OF CLIENT PROFILE FROM ADMIN MODULE IS VIEWED, TAKE ACTUAL MENU JSON
        // ELSE TAKE USER MENU FROM STORAGE
        const userMenus = (
            profileType === 'CLIENT' && Object.is(
                EnvironmentVariableGetter.REACT_APP_MODULE_CODE,
                EnvironmentVariableGetter.ADMIN_MODULE_CODE)
        ) ? UserMenuUtils.sortUserMenuJson(clientUserMenusJson[EnvironmentVariableGetter.CLIENT_MODULE_CODE])
            : LocalStorageSecurity.localStorageDecoder("userMenus");

        const selectedUserMenus = profileMenuResponseDTOS[parentMenuId];
        let selectedParentMenus = new Set();
        let selectedChildMenus = new Set();

        selectedUserMenus &&
        selectedUserMenus.map((selectedMenu, indx) => {
            //filter out the selected unique parent menu and child menus
            selectedMenus.push({...selectedMenu});
            let parent = userMenus && userMenus.find(
                userMenu => Number(userMenu.id) === Number(selectedMenu.parentId)
            );
            parent && selectedParentMenus.add(parent);
            let child = parent && parent.childMenus.length && parent.childMenus.find(childMenu =>
                Number(childMenu.id) === Number(selectedMenu.userMenuId)
            );
            child && selectedChildMenus.add(child)
            return selectedMenu;
        });
        selectedUserMenusForModal = selectedUserMenusForModal.concat(Array.from(selectedParentMenus).map(
            // add filtered out child to their respective filtered out parent menu.
            parent => {
                let data = {
                    id: parent.id,
                    name: parent.name,
                    icon: parent.icon,
                    parentId: parent.parentId,
                    roles: [...parent.roles],
                    childMenus: []
                };
                let childrenOfParent = Array.from(selectedChildMenus).filter(
                    child => {
                        return (
                            child.parentId === parent.id && {
                                id: child.id,
                                name: child.name,
                                icon: child.icon,
                                parentId: child.parentId,
                                roles: child.roles,
                                childMenus: []
                            }
                        )
                    }
                );
                data.childMenus = [...childrenOfParent];
                return data
            }
        ));
        filteredProfiles = {
            selectedMenus,
            selectedUserMenusForModal
        }
        return parentMenuId;
    });
    let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson([...selectedUserMenusForModal]);
    if (profileResponseDTO)
        switch (profileType) {
            case 'CLIENT':
                filteredProfiles = {
                    ...filteredProfiles,
                    selectedUserMenusForModal: [...alphabeticallySortedMenus],
                    profileName: profileResponseDTO.name,
                    hospitalValue: {
                        value: profileResponseDTO.hospitalId,
                        label: profileResponseDTO.hospitalName
                    },
                    profileDescription: profileResponseDTO.description,
                    departmentValue: {
                        value: profileResponseDTO.departmentId,
                        label: profileResponseDTO.departmentName
                    },
                    status: profileResponseDTO.status,
                    hospitalAlias: profileResponseDTO.hospitalAlias || '',
                    createdBy: profileResponseDTO.createdBy,
                    lastModifiedBy: profileResponseDTO.lastModifiedBy,
                    lastModifiedDate: profileResponseDTO.lastModifiedDate,
                    createdDate: profileResponseDTO.createdDate,
                    remarks: profileResponseDTO.remarks
                };
                break;
            case 'COMPANY':
                filteredProfiles = {
                    ...filteredProfiles,
                    selectedUserMenusForModal: [...alphabeticallySortedMenus],
                    profileName: profileResponseDTO.name,
                    profileDescription: profileResponseDTO.description,
                    company: {
                        value: profileResponseDTO.companyId,
                        label: profileResponseDTO.companyName
                    },
                    createdBy: profileResponseDTO.createdBy,
                    lastModifiedBy: profileResponseDTO.lastModifiedBy,
                    lastModifiedDate: profileResponseDTO.lastModifiedDate,
                    createdDate: profileResponseDTO.createdDate,
                    status: profileResponseDTO.status,
                    remarks: profileResponseDTO.remarks
                };
                break;
            default:
                break;
        }

    return filteredProfiles
};

export const getAlphabeticallySortedUserMenusByHospitalType = (hospitalList, selectedHospitalId) => {
    let selectedHospital = hospitalList.find(hosp =>
        hosp.value === selectedHospitalId);
    let isCompany = (selectedHospital && Object.keys(selectedHospital).includes('isCompany')) ? selectedHospital.isCompany : 'N';
    let userMenus = isCompany === 'Y' ? adminUserMenusJson : clientUserMenusJson;
    let moduleCode = isCompany === 'Y' ? EnvironmentVariableGetter.ADMIN_MODULE_CODE : EnvironmentVariableGetter.CLIENT_MODULE_CODE;
    let menusForDept = Object.keys(userMenus).find(code => code === moduleCode)
        ? [...userMenus[moduleCode]] : [];
    return UserMenuUtils.sortUserMenuJson([...menusForDept]);
};


export const countTotalNoOfMenusAndRoles = userMenus => {
    let countOfMenus = 0;
    userMenus && userMenus.length && userMenus.map(menu => {
        if (menu.childMenus.length && menu.enabled === 'Y')
            menu.childMenus.forEach(childMenu => {
                countOfMenus += childMenu.enabled === 'Y' ? childMenu.roles.length : 0;
            });
        else
            countOfMenus += menu.enabled === 'Y' ? menu.roles.length : 0;
    });

    return countOfMenus;
};


export const prepareUserMenusAndRolesCombinationList = userMenus => {
    let userMenuWithRoleList = [];
    userMenus && userMenus.map(menu => {
        if (menu.childMenus.length) {
            menu.childMenus.map(child => {
                child.roles.map(role => {
                    userMenuWithRoleList.push({
                        parentId: menu.id,
                        userMenuId: child.id,
                        roleId: role,
                        status: 'Y'
                    })
                })
            });
        } else {
            menu.roles.map(role => {
                userMenuWithRoleList.push({
                    parentId: menu.id,
                    userMenuId: menu.id,
                    roleId: role,
                    status: 'Y'
                })
            })
        }
    });
    return userMenuWithRoleList;
};
