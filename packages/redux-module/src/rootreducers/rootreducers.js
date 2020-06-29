import {combineReducers} from 'redux'
// import { LOCATION_CHANGE } from 'react-router-redux';
import {
    AdminApiIntegrationReducers,
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminLoggingDiagramSearchReducer,
    AdminLoggingSearchReducer,
    AdminLoggingStatsSearchReducer,
    AdminPreviewReducer,
    AdminSetupReducer,
    AppointmentApprovalListReducer,
    AppointmentApproveReducer,
    AppointmentDetailReducer,
    AppointmentLogListReducer,
    AppointmentModeDeleteReducer,
    AppointmentModeDropdownReducer,
    AppointmentModeEditReducer,
    AppointmentModePreviewReducer,
    AppointmentModeSaveReducer,
    AppointmentModeSearchReducer,
    AppointmentRefundDetailReducer,
    AppointmentRefundListReducer,
    AppointmentRefundReducer,
    AppointmentRefundRejectReducer,
    AppointmentRejectReducer,
    AppointmentServiceTypeDropdownReducer,
    AppointmentStatusListReducer,
    AppointmentTransferReducers,
    BillingModeDeleteReducer,
    BillingModeDropdownReducer,
    BillingModeEditReducer,
    BillingModePreviewReducer,
    BillingModeSaveReducer,
    BillingModeSearchReducer,
    CompanyAdminReducer,
    companyDeleteReducer,
    companyDropdownReducer,
    companyPreviewReducer,
    CompanyProfileCreateReducer,
    CompanyProfileDeleteReducer,
    CompanyProfileDropdownReducer,
    CompanyProfileEditReducer,
    CompanyProfilePreviewReducer,
    CompanyProfileSearchReducer,
    companySaveReducer,
    companySearchReducer,
    companyUpdateReducer,
    CountryCodeDropdownReducer,
    CountryDropdownReducer,
    DashboardAppointmentQueueReducer,
    DashboardAppointmentStatisticsReducer,
    DashboardFeaturesByAdminReducer,
    DashboardFeaturesReducer,
    DashboardRegisteredPatientReducer,
    DashboardRevenueGeneratedByDoctorReducer,
    DashboardRevenueGeneratedDayReducer,
    DashboardRevenueGeneratedMonthReducer,
    DashboardRevenueGeneratedWeekReducer,
    DashboardRevenueGeneratedYearReducer,
    DashboardRevenueStatisticsReducer,
    DepartmentDutyRosterDeleteReducer,
    DepartmentDutyRosterEditReducer,
    DepartmentDutyRosterExistingReducer,
    DepartmentDutyRosterListReducer,
    DepartmentDutyRosterOverrideDeleteReducer,
    DepartmentDutyRosterOverrideRevertReducer,
    DepartmentDutyRosterOverrideUpdateReducer,
    DepartmentDutyRosterPreviewReducer,
    DepartmentDutyRosterSaveReducer,
    DoctorDeleteReducer,
    DoctorDropdownReducer,
    DoctorDutyRosterDeleteReducer,
    DoctorDutyRosterEditReducer,
    DoctorDutyRosterListReducer,
    DoctorDutyRosterPreviewReducer,
    DoctorDutyRosterSaveReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    SalutationDropdownReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    ForgotPasswordVerification,
    FavouritesReducers,
    HospitalDeleteReducer,
    HospitalDepartmentDeleteReducer,
    HospitalDepartmentDropdownReducer,
    HospitalDepartmentEditReducer,
    HospitalDepartmentPreviewReducer,
    HospitalDepartmentSaveReducer,
    HospitalDepartmentSearchReducer,
    HospitalDropdownReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    loggedInAdminInfoReducer,
    loginReducers as login,
    logoutReducer,
    PatientDetailReducer,
    PatientDropdownListReducer,
    PatientDropdownWithoutHospitalListReducer,
    PatientEditReducer,
    PatientEsewaIdReducer,
    PatientPreviewReducer,
    PatientSearchReducer,
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfileListReducer,
    ProfilePreviewReducer,
    ProfileSetupReducer,
    QualificationAliasDeleteReducer,
    QualificationAliasDropdownReducer,
    QualificationAliasEditReducer,
    QualificationAliasSaveReducer,
    QualificationAliasSearchReducer,
    QualificationDeleteReducer,
    QualificationDropdownReducer,
    QualificationEditReducer,
    QualificationPreviewReducer,
    QualificationSaveReducer,
    QualificationSearchReducer,
    RescheduleLogReducer,
    RoomNumberDeleteReducer,
    RoomNumberDropdownReducer,
    RoomNumberEditReducer,
    RoomNumberSaveReducer,
    RoomNumberSearchReducer,
    SpecializationDeleteReducer,
    SpecializationDropdownReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer,
    TransactionLogReducer,
    UnitDeleteReducer,
    UnitDropdownReducer,
    UnitEditReducer,
    UnitListReducer,
    UnitPreviewReducer,
    UnitSetupReducer,
    UniversitiesForDropdownReducer,
    UniversityDeleteReducer,
    UniversityDropdownReducer,
    UniversityEditReducer,
    UniversityPreviewReducer,
    UniversitySaveReducer,
    UniversitySearchReducer,
    WeekdaysReducer,
    HospitalApiIntegrationReducers,
    RequestBodyIntegrationReducers,
    AppointmenStatusByDepartmentListReducer,
    AppointmenStatusByRoomListReducer
} from '../reducers'

const {
  ForgotPasswordReducer,
  VerificationCodeReducer,
  ChangePasswordForgotReducer
} = ForgotPasswordVerification
const {
  CompanyAdminDeleteReducer,
  CompanyAdminEditReducer,
  CompanyAdminListReducer,
  CompanyAdminPreviewReducer,
  CompanyAdminSetupReducer,
  CompanyAdminMetaInfoReducer,
  CompanyAdminMetaInfoByCompanyIdReducer
} = CompanyAdminReducer
const appReducers = combineReducers({
    ...AdminApiIntegrationReducers,
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminLoggingDiagramSearchReducer,
    AdminLoggingSearchReducer,
    AdminLoggingStatsSearchReducer,
    AdminPreviewReducer,
    AdminSetupReducer,
    AppointmentApprovalListReducer,
    AppointmentApproveReducer,
    AppointmentDetailReducer,
    AppointmentLogListReducer,
    AppointmentModeDeleteReducer,
    AppointmentModeDropdownReducer,
    AppointmentModeEditReducer,
    AppointmentModePreviewReducer,
    AppointmentModeSaveReducer,
    AppointmentModeSearchReducer,
    AppointmentRefundDetailReducer,
    AppointmentRefundListReducer,
    AppointmentRefundReducer,
    AppointmentRefundRejectReducer,
    AppointmentRejectReducer,
    AppointmentServiceTypeDropdownReducer,
    AppointmentStatusListReducer,
    BillingModeDeleteReducer,
    BillingModeDropdownReducer,
    BillingModeEditReducer,
    BillingModePreviewReducer,
    BillingModeSaveReducer,
    BillingModeSearchReducer,
    ChangePasswordForgotReducer,
    CompanyAdminDeleteReducer,
    CompanyAdminEditReducer,
    CompanyAdminListReducer,
    CompanyAdminMetaInfoByCompanyIdReducer,
    CompanyAdminMetaInfoReducer,
    CompanyAdminPreviewReducer,
    CompanyAdminSetupReducer,
    companyDeleteReducer,
    companyDropdownReducer,
    companyPreviewReducer,
    CompanyProfileCreateReducer,
    CompanyProfileDeleteReducer,
    CompanyProfileDropdownReducer,
    CompanyProfileEditReducer,
    CompanyProfilePreviewReducer,
    CompanyProfileSearchReducer,
    companySaveReducer,
    companySearchReducer,
    companyUpdateReducer,
    CountryCodeDropdownReducer,
    CountryDropdownReducer,
    DashboardAppointmentQueueReducer,
    DashboardAppointmentStatisticsReducer,
    DashboardFeaturesByAdminReducer,
    DashboardFeaturesReducer,
    DashboardRegisteredPatientReducer,
    DashboardRevenueGeneratedByDoctorReducer,
    DashboardRevenueGeneratedDayReducer,
    DashboardRevenueGeneratedMonthReducer,
    DashboardRevenueGeneratedWeekReducer,
    DashboardRevenueGeneratedYearReducer,
    DashboardRevenueStatisticsReducer,
    UnitDeleteReducer,
    UnitDropdownReducer,
    UnitEditReducer,
    UnitListReducer,
    UnitPreviewReducer,
    UnitSetupReducer,
    DepartmentDutyRosterDeleteReducer,
    DepartmentDutyRosterEditReducer,
    DepartmentDutyRosterExistingReducer,
    DepartmentDutyRosterListReducer,
    DepartmentDutyRosterOverrideDeleteReducer,
    DepartmentDutyRosterOverrideRevertReducer,
    DepartmentDutyRosterOverrideUpdateReducer,
    DepartmentDutyRosterPreviewReducer,
    DepartmentDutyRosterSaveReducer,
    DoctorDeleteReducer,
    DoctorDropdownReducer,
    DoctorDutyRosterDeleteReducer,
    DoctorDutyRosterEditReducer,
    DoctorDutyRosterListReducer,
    DoctorDutyRosterPreviewReducer,
    DoctorDutyRosterSaveReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    ForgotPasswordReducer,
    ...FavouritesReducers,
    HospitalDeleteReducer,
    HospitalDropdownReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    HospitalDepartmentSaveReducer,
    HospitalDepartmentPreviewReducer,
    HospitalDepartmentEditReducer,
    HospitalDepartmentDropdownReducer,
    HospitalDepartmentDeleteReducer,
    HospitalDepartmentSearchReducer,
    loggedInAdminInfoReducer,
    loginReducers: login,
    logoutReducer,
    PatientDetailReducer,
    PatientDropdownListReducer,
    PatientDropdownWithoutHospitalListReducer,
    PatientEditReducer,
    PatientPreviewReducer,
    PatientSearchReducer,
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfileListReducer,
    ProfilePreviewReducer,
    ProfileSetupReducer,
    QualificationAliasDeleteReducer,
    QualificationAliasDropdownReducer,
    QualificationAliasEditReducer,
    QualificationAliasSaveReducer,
    QualificationAliasSearchReducer,
    QualificationDeleteReducer,
    QualificationDropdownReducer,
    QualificationEditReducer,
    QualificationPreviewReducer,
    QualificationSaveReducer,
    QualificationSearchReducer,
    RescheduleLogReducer,
    SalutationDropdownReducer,
    SpecializationDeleteReducer,
    SpecializationDropdownReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer,
    TransactionLogReducer,
    UniversitiesForDropdownReducer,
    UniversityDeleteReducer,
    UniversityDropdownReducer,
    UniversityEditReducer,
    UniversityPreviewReducer,
    UniversitySaveReducer,
    UniversitySearchReducer,
    VerificationCodeReducer,
    WeekdaysReducer,
    PatientEsewaIdReducer,
    ...AppointmentTransferReducers,
    RoomNumberDeleteReducer,
    RoomNumberDropdownReducer,
    RoomNumberEditReducer,
    RoomNumberSaveReducer,
    RoomNumberSearchReducer,
    ...HospitalApiIntegrationReducers,
    ...RequestBodyIntegrationReducers,
    AppointmenStatusByDepartmentListReducer,
    AppointmenStatusByRoomListReducer
})

export const rootReducers = (state, action) => {
  if (action.type === 'LOCATION_CHANGE') {
    state = {}
  }
  return appReducers(state, action)
}
