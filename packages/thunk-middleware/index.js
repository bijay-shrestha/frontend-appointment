import {signinUser} from './src/login-middleware'
import {
    AdminLoggingMiddleware,
    AdminApiIntegrationMiddleware,
    AppointmentModeMiddleware,
    AppointmentServiceTypeMiddleware,
    AppointmentTransferMiddleware,
    BillingModeMiddleware,
    clearAdminSuccessErrorMessagesFromStore,
    clearErrorMessageForDropdown,
    clearSuccessErrorMessagesFromStore,
    CompanyAdminSetupMiddleware,
    CompanyProfileSetupMiddleware,
    CompanySetupMiddleware,
    createAdmin,
    createProfile,
    deleteAdmin,
    deleteProfile,
    DepartmentDutyRosterMiddleware,
    DoctorDutyRosterMiddleware,
    DoctorMiddleware,
    editAdmin,
    editProfile,
    fetchActiveProfileListForDropdown,
    fetchActiveProfilesByDepartmentId,
    fetchAdminList,
    fetchAdminMetaInfo,
    fetchAdminMetaInfoByHospitalId,
    fetchAllProfileListForSearchDropdown,
    fetchProfileList,
    fetchProfileListBySubDepartmentId,
    HospitalApiIntegrationMiddleware,
    HospitalDepartmentSetupMiddleware,
    HospitalSetupMiddleware,
    PatientDetailsMiddleware,
    previewAdmin,
    previewProfile,
    QualificationAliasSetupMiddleware,
    QualificationSetupMiddleware,
    RequestBodyApiIntegrationMiddleware,
    RoomSetupMiddleware,
    SpecializationSetupMiddleware,
    UnitSetupMiddleware,
    UniversitySetupMiddleware
} from './src/admin-middleware'
import {fetchUserMenus, fetchUserMenusNew, savePinOrUnpinUserMenu} from './src/menu-middleware'
import {fetchLoggedInAdminIP, fetchLoggedInAdminUserInfo,uploadLoggedInAdminImage} from './src/logged-in-admin-info-middleware'
import {logoutUser} from './src/logout-middleware'
import {changePassword, resetPassword, savePassword, verifyToken} from './src/password-save-middleware'
import * as WeekdaysMiddleware from './src/weekdays-middleware/weekdaysMiddleware'
import * as AppointmentDetailsMiddleware
    from './src/admin-middleware/appointment-details-middleware/appointmentDetailsMiddleware'
import * as DashboardDetailsMiddleware from './src/dashboard-middleware/dashboardMiddleware'
import * as ForgotPasswordMiddleware
    from './src/forgot-password-and-verification-middleware/forgotPasswordAndVerificationMiddleware';
import * as CountryMiddleware from './src/country-middleware/countryMiddleware';
import * as SalutationMiddleware from './src/salutation-middleware/salutationMiddleware';
import * as GenericThirdPartyApiMiddleware
    from './src/generic-third-party-api-middleware/genericThirdPartyApiMiddleware';
import * as HmacMiddleware
    from './src/hmac-middleware/hmacMiddleware';
import * as FavouritesMiddleware from './src/favourites-middleware/favouritesMiddleware'
import * as MinioMiddleware from './src/minio-middleware/minioMiddleware'

export {
    AppointmentDetailsMiddleware,
    changePassword,
    clearAdminSuccessErrorMessagesFromStore,
    clearErrorMessageForDropdown,
    clearSuccessErrorMessagesFromStore,
    createAdmin,
    createProfile,
    DashboardDetailsMiddleware,
    deleteAdmin,
    deleteProfile,
    UnitSetupMiddleware,
    DoctorDutyRosterMiddleware,
    DoctorMiddleware,
    editAdmin,
    editProfile,
    fetchActiveProfileListForDropdown,
    fetchAdminList,
    fetchAdminMetaInfo,
    fetchAllProfileListForSearchDropdown,
    fetchLoggedInAdminUserInfo,
    fetchProfileList,
    fetchProfileListBySubDepartmentId,
    fetchUserMenus,
    fetchActiveProfilesByDepartmentId,
    HospitalSetupMiddleware,
    logoutUser,
    previewAdmin,
    previewProfile,
    resetPassword,
    savePassword,
    signinUser,
    SpecializationSetupMiddleware,
    QualificationSetupMiddleware,
    verifyToken,
    WeekdaysMiddleware,
    PatientDetailsMiddleware,
    ForgotPasswordMiddleware,
    CompanyProfileSetupMiddleware,
    CompanySetupMiddleware,
    CompanyAdminSetupMiddleware,
    AdminLoggingMiddleware,
    QualificationAliasSetupMiddleware,
    UniversitySetupMiddleware,
    CountryMiddleware,
    AppointmentModeMiddleware,
    fetchUserMenusNew,
    savePinOrUnpinUserMenu,
    fetchAdminMetaInfoByHospitalId,
    fetchLoggedInAdminIP,
    AppointmentTransferMiddleware,
    RoomSetupMiddleware,
    HospitalDepartmentSetupMiddleware,
    DepartmentDutyRosterMiddleware,
    HospitalApiIntegrationMiddleware,
    RequestBodyApiIntegrationMiddleware,
    BillingModeMiddleware,
    AppointmentServiceTypeMiddleware,
    AdminApiIntegrationMiddleware,
    SalutationMiddleware,
    GenericThirdPartyApiMiddleware,
    HmacMiddleware,
    FavouritesMiddleware,
    MinioMiddleware,
    uploadLoggedInAdminImage
}
