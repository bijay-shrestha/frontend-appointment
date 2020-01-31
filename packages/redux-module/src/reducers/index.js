import {loginReducers} from './common/loginreducers'
import {
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfileListReducer,
    ProfilePreviewReducer,
    ProfileSetupReducer
} from './admin-module/profileSetupReducer'
import {
    SpecializationDeleteReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer,
    SpecializationDropdownReducer
} from './admin-module/specializationSetupReducer'
import {
    HospitalDeleteReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    HospitalDropdownReducer
} from './admin-module/hospitalSetupReducer'
import {
    DoctorDeleteReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    DoctorDropdownReducer
} from './admin-module/doctorSetupReducer'
import {
    DepartmentDeleteReducer,
    DepartmentEditReducer,
    DepartmentListReducer,
    DepartmentPreviewReducer,
    DepartmentSetupReducer
} from './admin-module/departmentSetupReducer';
import {
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminPreviewReducer,
    AdminSetupReducer
} from "./admin-module/adminSetupReducer";

import {loggedInAdminInfoReducer} from './common/loggedInAdminInfoReducer';
import {logoutReducer} from './common/logoutReducer';


export {
    loginReducers,
    ProfileSetupReducer,
    ProfileListReducer,
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfilePreviewReducer,
    SpecializationDeleteReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer,
    SpecializationDropdownReducer,
    HospitalDeleteReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    DoctorDeleteReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    DoctorDropdownReducer,
    DepartmentDeleteReducer,
    DepartmentEditReducer,
    DepartmentListReducer,
    DepartmentPreviewReducer,
    DepartmentSetupReducer,
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminPreviewReducer,
    AdminSetupReducer,
    loggedInAdminInfoReducer,
    logoutReducer,
    HospitalDropdownReducer
}
