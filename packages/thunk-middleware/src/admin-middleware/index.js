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
export {
    fetchDepartments,
    fetchSubDepartmentsByDepartmentId,
    createProfile,
    fetchProfileList,
    deleteProfile,
    editProfile,
    previewProfile,
    clearSuccessErrorMessagesFromStore,
    SpecializationSetupMiddleware
}
