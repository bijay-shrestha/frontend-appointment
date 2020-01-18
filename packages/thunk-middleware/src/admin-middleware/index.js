import {
    clearSuccessErrorMessagesFromStore,
    createProfile,
    deleteProfile,
    editProfile,
    fetchDepartments,
    fetchProfileList,
    fetchSubDepartmentsByDepartmentId,
    previewProfile
} from "./profile-setup-middleware/profileSetupMiddleware";

import * as SpecializationSetupMiddleware from './specialization-setup-middleware/specializationSetupMiddleware';
import * as HospitalSetupMiddleware from './hospital-setup-middleware/hospitalSetupMiddleware';
import * as ConsultantMiddleware from  './consultant-setup-middleware/consultantMiddleware';
export {
    fetchDepartments,
    fetchSubDepartmentsByDepartmentId,
    createProfile,
    fetchProfileList,
    deleteProfile,
    editProfile,
    previewProfile,
    clearSuccessErrorMessagesFromStore,
    SpecializationSetupMiddleware,
    HospitalSetupMiddleware,
    ConsultantMiddleware
}
