import {combineReducers} from 'redux'
import {
  AppointmentApprovalListReducer,
  AppointmentLogListReducer,
  AppointmentStatusListReducer,
  AppointmentRefundListReducer,
  AppointmentRefundReducer,
  AppointmentRefundRejectReducer,
  AdminDeleteReducer,
  AdminEditReducer,
  AdminListReducer,
  AdminPreviewReducer,
  AdminSetupReducer,
  CountryCodeDropdownReducer,
  DashboardAppointmentStatisticsReducer,
  DashboardRegisteredPatientReducer,
  DashboardRevenueGeneratedDayReducer,
  DashboardRevenueGeneratedMonthReducer,
  DashboardRevenueGeneratedWeekReducer,
  DashboardRevenueGeneratedYearReducer,
  DashboardRevenueStatisticsReducer,
  DepartmentDeleteReducer,
  DepartmentEditReducer,
  DepartmentListReducer,
  DepartmentPreviewReducer,
  DepartmentSetupReducer,
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
  HospitalDeleteReducer,
  HospitalDropdownReducer,
  HospitalEditReducer,
  HospitalPreviewReducer,
  HospitalSaveReducer,
  HospitalSearchReducer,
  loggedInAdminInfoReducer,
  loginReducers as login,
  logoutReducer,
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfileListReducer,
  ProfilePreviewReducer,
  ProfileSetupReducer,
  PatientDropdownListReducer,
  QualificationAliasDropdownReducer,
  QualificationDeleteReducer,
  QualificationDropdownReducer,
  QualificationEditReducer,
  QualificationPreviewReducer,
  QualificationSaveReducer,
  QualificationSearchReducer,
  SpecializationDeleteReducer,
  SpecializationDropdownReducer,
  SpecializationEditReducer,
  SpecializationPreviewReducer,
  SpecializationSaveReducer,
  SpecializationSearchReducer,
  UniversitiesForDropdownReducer,
  WeekdaysReducer
} from '../reducers'

export const rootReducers = combineReducers({
  AppointmentApprovalListReducer,
  AppointmentLogListReducer,
  AppointmentStatusListReducer,
  AppointmentRefundListReducer,
  AppointmentRefundReducer,
  AppointmentRefundRejectReducer,
  DashboardAppointmentStatisticsReducer,
  DashboardRegisteredPatientReducer,
  DashboardRevenueGeneratedDayReducer,
  DashboardRevenueGeneratedMonthReducer,
  DashboardRevenueGeneratedWeekReducer,
  DashboardRevenueGeneratedYearReducer,
  DashboardRevenueStatisticsReducer,
  loginReducers: login,
  ProfileSetupReducer,
  ProfileListReducer,
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfilePreviewReducer,
  PatientDropdownListReducer,
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
  HospitalDropdownReducer,
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
  AdminSetupReducer,
  AdminEditReducer,
  AdminDeleteReducer,
  AdminListReducer,
  AdminPreviewReducer,
  loggedInAdminInfoReducer,
  logoutReducer,
  DoctorDutyRosterSaveReducer,
  DoctorDutyRosterEditReducer,
  DoctorDutyRosterDeleteReducer,
  DoctorDutyRosterListReducer,
  DoctorDutyRosterPreviewReducer,
  QualificationSaveReducer,
  QualificationEditReducer,
  QualificationPreviewReducer,
  QualificationSearchReducer,
  QualificationDeleteReducer,
  CountryCodeDropdownReducer,
  QualificationAliasDropdownReducer,
  QualificationDropdownReducer,
  UniversitiesForDropdownReducer,
  WeekdaysReducer
})
