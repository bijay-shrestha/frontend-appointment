const BASE = "/admin/api/v1";
const SD_BASE="/specialization";
// export const profileSetupAPIConstants = {
//     CREATE_PROFILE: BASE.concat("/profiles"),
//     FETCH_DEPARTMENTS_FOR_DROPDOWN: BASE.concat("/departments/dropdown/active"),
//     FETCH_SUB_DEPARTMENT_BY_DEPARTMENT_ID: BASE.concat("/sub-departments/dropdown/active"),
//     SEARCH_PROFILE: BASE.concat("/profiles/search"),
//     DELETE_PROFILE: BASE.concat("/profiles"),
//     FETCH_PROFILE_DETAILS: BASE.concat("/profiles/details"),
//     EDIT_PROFILE: BASE.concat("/profiles")
// };

// export const departmentSetupAPIConstants = {
//     CREATE_DEPARTMENT: BASE.concat("/departments"),
//     SEARCH_DEPARTMENT: BASE.concat("/departments/search"),
//     FETCH_DEPARTMENT_DETAILS: BASE.concat("/departments/details"),
//     EDIT_DEPARTMENT: BASE.concat("/departments"),
//     EXPORT_DEPARTMENT_EXCEL : BASE.concat("/departments/excel"),
//     ACTIVE_DROPDOWN_DEPARTMENT : BASE.concat("/departments/dropdown/active")
// }    

export const specializationSetupAPIConstants = {
    CREATE_SPECIALIZATION: BASE.concat(SD_BASE),
    SEARCH_SPECIALIZATION: BASE.concat(SD_BASE+"/search"),
    FETCH_SPECIALIZATION_DETAILS: BASE.concat(SD_BASE+"/details"),
    EDIT_SPECIALIZATION: BASE.concat(SD_BASE),
    EXPORT_SPECIALIZATION_EXCEL : BASE.concat(SD_BASE+"/excel"),
    DELETE_SPECIALIZATION:BASE.concat(SD_BASE),
    DROPDOWN_SPECIALIZATION:BASE.concat(SD_BASE+"/dropdown"),
    ACTIVE_DROPDOWN_SPECIALIZATION:BASE.concat(SD_BASE+"/dropdown/active"),
    SPECIFIC_DROPDOWN_SPECIALIZATION:BASE.concat(SD_BASE+"/dropdown/active")
};
