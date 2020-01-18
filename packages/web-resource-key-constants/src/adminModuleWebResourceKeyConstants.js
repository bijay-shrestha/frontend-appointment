const BASE = "/admin/api/v1";
const SP_BASE="/specialization";
const HP_BASE="/hospital";
const CS_BASE="/consultant";
// export const profileSetupAPIConstants = {
//     CREATE_PROFILE: BASE.concat("/profiles"),
//     FETCH_DEPARTMENTS_FOR_DROPDOWN: BASE.concat("/departments/dropdown/active"),
//     FETCH_SUB_DEPARTMENT_BY_DEPARTMENT_ID: BASE.concat("/sub-departments/dropdown/active"),
//     SEARCH_PROFILE: BASE.concat("/profiles/search"),
//     DELETE_PROFILE: BASE.concat("/profiles"),
//     FETCH_PROFILE_DETAILS: BASE.concat("/profiles/details"),
//     EDIT_PROFILE: BASE.concat("/profiles")
//};

// export const departmentSetupAPIConstants = {
//     CREATE_DEPARTMENT: BASE.concat("/departments"),
//     SEARCH_DEPARTMENT: BASE.concat("/departments/search"),
//     FETCH_DEPARTMENT_DETAILS: BASE.concat("/departments/details"),
//     EDIT_DEPARTMENT: BASE.concat("/departments"),
//     EXPORT_DEPARTMENT_EXCEL : BASE.concat("/departments/excel"),
//     ACTIVE_DROPDOWN_DEPARTMENT : BASE.concat("/departments/dropdown/active")
//}    

export const specializationSetupAPIConstants = {
    CREATE_SPECIALIZATION: BASE.concat(SP_BASE),
    SEARCH_SPECIALIZATION: BASE.concat(SP_BASE+"/search"),
    FETCH_SPECIALIZATION_DETAILS: BASE.concat(SP_BASE+"/details"),
    EDIT_SPECIALIZATION: BASE.concat(SP_BASE),
    EXPORT_SPECIALIZATION_EXCEL : BASE.concat(SP_BASE+"/excel"),
    DELETE_SPECIALIZATION:BASE.concat(SP_BASE),
    DROPDOWN_SPECIALIZATION:BASE.concat(SP_BASE+"/dropdown"),
    ACTIVE_DROPDOWN_SPECIALIZATION:BASE.concat(SP_BASE+"/dropdown/active"),
    SPECIFIC_DROPDOWN_SPECIALIZATION:BASE.concat(SP_BASE+"/dropdown/active")
};

export const hostpitalSetupApiConstants = {
    CREATE_HOSPITAL: BASE.concat(HP_BASE),
    SEARCH_HOSPITAL: BASE.concat(HP_BASE+"/search"),
    FETCH_HOSPITAL_DETAILS: BASE.concat(HP_BASE+"/details"),
    EDIT_HOSPITAL: BASE.concat(HP_BASE),
    EXPORT_HOSPITAL_EXCEL : BASE.concat(HP_BASE+"/excel"),
    DELETE_HOSPITAL:BASE.concat(HP_BASE),
    DROPDOWN_HOSPITAL:BASE.concat(HP_BASE+"/dropdown"),
    ACTIVE_DROPDOWN_HOSPITAL:BASE.concat(HP_BASE+"/dropdown/active"),
    SPECIFIC_DROPDOWN_HOSPITAL:BASE.concat(HP_BASE+"/dropdown/active")
}

export const consultantSetupApiConstants = {
    CREATE_CONSULTANT: BASE.concat(HP_BASE),
    SEARCH_CONSULTANT: BASE.concat(HP_BASE+"/search"),
    FETCH_CONSULTANT: BASE.concat(HP_BASE+"/details"),
    EDIT_CONSULTANT: BASE.concat(HP_BASE),
    EXPORT_CONSULTANT : BASE.concat(HP_BASE+"/excel"),
    DELETE_CONSULTANT:BASE.concat(HP_BASE),
    DROPDOWN_CONSULTANT:BASE.concat(HP_BASE+"/dropdown"),
    ACTIVE_DROPDOWN_CONSULTANT:BASE.concat(HP_BASE+"/dropdown/active"),
    SPECIFIC_DROPDOWN_CONSULTANT:BASE.concat(HP_BASE+"/dropdown/active")
}
