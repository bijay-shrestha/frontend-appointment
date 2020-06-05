import React from 'react'
import loadable from '@loadable/component'
import {CUnauthorized, CLoading} from '@frontend-appointment/ui-elements'
import Loadable from 'react-loadable'

const getLoader = () => <CLoading />
/* ****** A ***** */
const AdminActivityLog = loadable(
  () => import('./container/AdminActivitiesLog/AdminActivityLog'),
  {fallback: getLoader()}
)

const AdminApiIntegrationAdd = loadable(
  () => import('./container/AdminApiIntegration/Add/AdminApiIntegrationAddForm'),
  {fallback: getLoader()}
)
const AdminApiIntegrationManage = loadable(
  () => import('./container/AdminApiIntegration/Manage/AdminApiIntegrationManage'),
  {fallback: getLoader()}
)
const ClientActivityLog = loadable(
  () => import('./container/ClientActivitiesLog/ClientActivityLog'),
  {fallback: getLoader()}
)

const AddProfileComponent = loadable(
  () => import('./container/ProfileSetup/Add/ProfileAdd'),
  {fallback: getLoader()}
)

const AddUnitComponent = loadable(
  () => import('./container/UnitSetup/Add/UnitAdd'),
  {fallback: getLoader()}
)

const AddAdminComponent = loadable(
  () => import('./container/AdminSetup/Add/AdminAdd'),
  {fallback: getLoader()}
)

const AddHospitalComponent = loadable(
  () => import('./container/HospitalSetup/Add/HospitalAdd'),
  {fallback: getLoader()}
)

const AddDoctorDutyRosterComponent = loadable(
  () => import('./container/DoctorDutyRoster/Add/DoctorDutyRosterAdd'),
  {fallback: () => getLoader()}
)

const AddQualificationComponent = loadable(
  () => import('./container/QualificationSetup/Add/QualificationAdd'),
  {fallback: () => getLoader()}
)

const AddSpecializationComponent = loadable(
  () => import('./container/SpecializationSetup/Add/SpecializationAdd'),
  {fallback: () => getLoader()}
)

const AddDoctorComponent = loadable(
  () => import('./container/DoctorSetup/Add/DoctorAdd'),
  {fallback: () => getLoader()}
)

const AppointmentRefundListComponent = loadable(
  () => import('./container/AppointmentRefund/AppointmentRefund'),
  {fallback: () => getLoader()}
)

const AppointmentApprovalListComponent = loadable(
  () => import('./container/AppointmentApproval/AppointmentApproval'),
  {fallback: () => getLoader()}
)

const AppointmentStatusComponent = loadable(
  () => import('./container/AppointmentStatus/AppointmentStatus'),
  {fallback: () => getLoader()}
)

const AppointmentLogListComponent = loadable(
  () => import('./container/AppointmentLog/AppointmentLog'),
  {fallback: () => getLoader()}
)

const AddCompanyProfileComponent = loadable(
  () => import('./container/CompanyProfileSetup/Add/CompanyProfileSetupAdd'),
  {fallback: getLoader()}
)

const AppointmentModeComponent = loadable(
  () => import('./container/AppointmentMode/AppointmentMode'),
  {fallback: getLoader()}
)

const AddCompanyAdminComponent = loadable(
  () => import('./container/CompanySetupAdmin/Add/CompanyAdminAdd'),
  {fallback: () => getLoader()}
)

const AddDepartmentSetup = loadable(
  () => import('./container/HospitalDepartmentSetup/Add/HospitalDepartmentAdd'),
  {fallback: () => getLoader()}
)
const AddDepartmentDutyRosterComponent = loadable(
  () => import('./container/DepartmentDutyRoster/Add/DepartmentDutyRosterAdd'),
  {fallback: () => getLoader()}
)

/* ****** B ***** */

/* ****** C ***** */
const CompanyManageComponent = loadable(
  () => import('./container/CompanySetup/Manage/CompanyManage'),
  {fallback: () => getLoader()}
)
const CompanyAddComponent = loadable(
  () => import('./container/CompanySetup/Add/CompanyAdd'),
  {fallback: () => getLoader()}
)
const ClientApiIntegration = loadable(
  () =>
    import('./container/ClientApiIntegration/Add/ClientApiIntegrationAddForm'),
  {fallback: () => getLoader()}
)
const ClientApiIntegrationManage = loadable(
  () =>
    import(
      './container/ClientApiIntegration/Manage/ClientApiIntegrationManage'
    ),
  {fallback: () => getLoader()}
)

/* ****** D ***** */

const DashboardComponent = loadable(
  () => import('./container/AdminDashboard/AdminDashboard'),
  {fallback: () => getLoader()}
)


// const AddCompanyAdminComponent = loadable(
//   () => import('./container/CompanySetupAdmin/Add/CompanyAdminAdd'),
//   {fallback: () => getLoader()}
// )

// const ManageCompanyAdminComponent = loadable(
//   () => import('./container/CompanySetupAdmin/Manage/CompanyAdminManage'),
//   {fallback: () => getLoader()}
// )

/* ****** E ***** */

/* ****** F ***** */

/* ****** G ***** */

/* ****** H ***** */

/* ****** I ***** */

/* ****** J ***** */

/* ****** K ***** */

/* ****** L ***** */

/* ****** M ***** */

const ManageProfileComponent = loadable(
  () => import('./container/ProfileSetup/Manage/ProfileManage'),
  {fallback: () => getLoader()}
)

const ManageUnitComponent = loadable(
  () => import('./container/UnitSetup/Manage/UnitManage'),
  {fallback: () => getLoader()}
)

const ManageSpecializationComponent = loadable(
  () => import('./container/SpecializationSetup/Manage/SpecializationManage'),
  {fallback: () => getLoader()}
)

const ManageAdminComponent = loadable(
  () => import('./container/AdminSetup/Manage/AdminManage'),
  {fallback: () => getLoader()}
)

const ManageHospitalComponent = loadable(
  () => import('./container/HospitalSetup/Manage/HospitalManage'),
  {fallback: () => getLoader()}
)

const ManageDoctorDutyRosterComponent = loadable(
  () => import('./container/DoctorDutyRoster/Manage/DoctorDutyRosterManage'),
  {fallback: () => getLoader()}
)

const ManageQualificationComponent = loadable(
  () => import('./container/QualificationSetup/Manage/QualificationManage'),
  {fallback: () => getLoader()}
)

const ManageDoctorComponent = loadable(
  () => import('./container/DoctorSetup/Manage/DoctorManage'),
  {fallback: () => getLoader()}
)

const ManageCompanyProfileComponent = loadable(
  () =>
    import('./container/CompanyProfileSetup/Manage/CompanyProfileSetupManage'),
  {fallback: getLoader()}
)

const ManageCompanyAdminComponent = loadable(
  () => import('./container/CompanySetupAdmin/Manage/CompanyAdminManage'),
  {fallback: () => getLoader()}
)

const ManageDepartmentComponent = Loadable({
  loader: () =>
    import(
      './container/HospitalDepartmentSetup/Manage/HospitalDepartmentManage'
    ),
  loading: () => getLoader()
})

const ManageDepartmentDutyRosterComponent = loadable(
  () =>
    import(
      './container/DepartmentDutyRoster/Manage/DepartmentDutyRosterManage'
    ),
  {fallback: () => getLoader()}
)
/* ****** N ***** */

/* ****** O ***** */

/* ****** P ***** */

const ProfileComponent = loadable(
  () => import('./container/ProfileSetup/ProfileSetup'),
  {fallback: () => getLoader()}
)

const PatientInformationComponent = loadable(
  () => import('./container/PatientDetails/PatientDetails'),
  {fallback: () => getLoader()}
)
/* ****** Q ***** */

const QualificationAlias = loadable(
  () => import('./container/QualificationAliasSetup/QualificationAlias'),
  {fallback: () => getLoader()}
)

/* ****** R ***** */

const RescheduleLog = loadable(
  () => import('./container/RescheduleLog/RescheduleLog'),
  {fallback: () => getLoader()}
)

const RequestBodyIntegrationAdd = loadable(
  () => import('./container/RequestBodyApiIntegration/Add/RequestBodyAdd'),
  {fallback: () => getLoader()}
)

const RequestBodyIntegrationManage = loadable(
  () =>
    import('./container/RequestBodyApiIntegration/Manage/RequestBodyManage'),
  {fallback: () => getLoader()}
)

const RoomSetup = loadable(() => import('./container/RoomSetup/RoomSetup'), {
  fallback: () => getLoader()
})

/* ****** S ***** */

/* ****** T ***** */

const TransactionLogComponent = loadable(
  () => import('./container/TransactionLog/TransactionLog'),
  {fallback: () => getLoader()}
)

const TransferLogComponent = loadable(
  () => import('./container/TransferLog/AppointmentTransferLog'),
  {fallback: getLoader()}
)

/* ****** U ***** */

const UniversitySetupComponent = loadable(
  () => import('./container/UniversitySetup/UniversitySetup'),
  {fallback: () => getLoader()}
)

/* ****** V ***** */

/* ****** W ***** */

/* ****** X ***** */

/* ****** Y ***** */

/* ****** Z ***** */

export const routes = [
  {
    path: '/admin/dashboard',
    component: DashboardComponent,
    isLink: true,
    icon: '',
    isTab: 'false',
    hasTab: false,
    name: 'Dashboard',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup',
    name: 'Client Setting',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/profileSetup',
    component: ProfileComponent,
    isLink: true,
    icon: '',
    hasTab: true,
    isTab: false,
    name: 'Client Profile Setup',
    isSingleTab: false
  },
  //   {
  //     path: '/forgotPassword',
  //     name: '',
  //     component: ForgotPassword,
  //     icon: '',
  //     hasTab: false,
  //     isLink: false,
  //     isTab: false
  //   },
  //   {
  //     path: '/verifyToken',
  //     name: '',
  //     component: VerifyToken,
  //     icon: '',
  //     hasTab: false,
  //     isLink: false,
  //     isTab: false
  //   },
  {
    path: '/admin/generalSetup/profileSetup/add',
    name: 'Add',
    component: AddProfileComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/profileSetup/manage',
    component: ManageProfileComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/specialization/add',
    component: AddSpecializationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/admin/apiIntegration/clientApiIntegration',
    name: 'Client Api Integration',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    isSingleTab: false
  },
  {
    path: '/admin/apiIntegration/clientApiIntegration/add',
    name: 'Add',
    component: ClientApiIntegration,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/apiIntegration/clientApiIntegration/manage',
    name: 'Manage',
    component:ClientApiIntegrationManage,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/apiIntegration/adminApiIntegration',
    name: 'Admin Api Integration',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    isSingleTab: false
  },
  {
    path: '/admin/apiIntegration/adminApiIntegration/add',
    name: 'Add',
    component: AdminApiIntegrationAdd,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/apiIntegration/adminApiIntegration/manage',
    name: 'Manage',
    component: AdminApiIntegrationManage,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/apiIntegration/requestBodyIntegration/add',
    name: 'Add',
    component: RequestBodyIntegrationAdd,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/apiIntegration/requestBodyIntegration',
    name: 'Request Body Integration',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    isSingleTab: false
  },
  {
    path: '/admin/apiIntegration/requestBodyIntegration/manage',
    name: 'Add',
    component: RequestBodyIntegrationManage,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/specialization/manage',
    component: ManageSpecializationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/specialization',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Specialization Setup',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/unitSetup',
    component: <></>,
    isLink: true,
    icon: '',
    hasTab: true,
    isTab: false,
    name: 'Unit Setup',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/unitSetup/add',
    name: 'Add',
    component: AddUnitComponent,
    icon: '',
    hasTab: true,
    isTab: true,
    isLink: true,
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/unitSetup/manage',
    name: 'Manage',
    component: ManageUnitComponent,
    icon: '',
    hasTab: true,
    isTab: true,
    isLink: true
  },
  {
    path: '/admin/generalSetup/adminSetup',
    name: 'Client Admin Setup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/adminSetup/add',
    name: 'Add',
    component: AddAdminComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/adminSetup/manage',
    name: 'Manage',
    component: ManageAdminComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isSingleTab: false
  },
  {
    path: '/admin/rosterSettings/doctorDutyRoster',
    name: 'Doctor Duty Roster',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    isSingleTab: false
  },
  {
    path: '/admin/rosterSettings/doctorDutyRoster/add',
    name: 'Add',
    component: AddDoctorDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/rosterSettings/doctorDutyRoster/manage',
    name: 'Manage',
    component: ManageDoctorDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/clientSetup/add',
    component: AddHospitalComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/clientSetup/manage',
    component: ManageHospitalComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/clientSetup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Client Setup',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/qualification/add',
    component: AddQualificationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/qualification/manage',
    component: ManageQualificationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/qualification',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Qualification Setup',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/doctorSetup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Doctor',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/doctorSetup/add',
    component: AddDoctorComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/doctorSetup/manage',
    component: ManageDoctorComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/admin/appointment/pendingRefundApproval',
    component: AppointmentRefundListComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Pending Refund Approval',
    isSingleTab: true
  },
  {
    path: '/admin/appointment/checkIn',
    component: AppointmentApprovalListComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Appointment Check-In',
    isSingleTab: true
  },
  {
    path: '/admin/reports/appointmentLog',
    component: AppointmentLogListComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Appointment Log',
    isSingleTab: true
  },
  {
    path: '/admin/appointment/appointmentStatus',
    component: AppointmentStatusComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Appointment Status',
    isSingleTab: true
  },
  {
    path: '/admin/appointment',
    component: <></>,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Appointment',
    isSingleTab: false
  },
  {
    path: '/admin/patientInformation',
    component: PatientInformationComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Patient Information',
    isSingleTab: true
  },
  {
    path: '/admin/reports',
    component: <></>,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Reports',
    isSingleTab: false
  },
  {
    path: '/unauthorized',
    component: CUnauthorized,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Unauthorized',
    isSingleTab: false
  },
  {
    path: '/admin/reports/rescheduleLog',
    component: RescheduleLog,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Reschedule Log',
    isSingleTab: true
  },
  {
    path: '/admin/companySettings/qualificationAlias',
    component: QualificationAlias,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Qualification Alias',
    isSingleTab: true
  },
  {
    path: '/admin/companySettings/companyProfile',
    component: <></>,
    isLink: true,
    icon: '',
    hasTab: true,
    isTab: false,
    name: 'Company Profile Setup',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/companyProfile/add',
    name: 'Add',
    component: AddCompanyProfileComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/companyProfile/manage',
    component: ManageCompanyProfileComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/companySetup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Company Setup',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/companySetup/add',
    component: CompanyAddComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/companySetup/manage',
    component: CompanyManageComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },

  {
    path: '/admin/companySettings/companyAdmin/add',
    component: AddCompanyAdminComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/companyAdmin/manage',
    component: ManageCompanyAdminComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/companyAdmin',
    name: 'Company Admin',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/activityLog',
    name: 'Activity Log',
    component: <></>,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    isSingleTab: false
  },
  {
    path: '/admin/activityLog/adminLog',
    name: 'Admin Log',
    component: AdminActivityLog,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    isSingleTab: true
  },
  {
    path: '/admin/activityLog/clientLog',
    name: 'Client Log',
    component: ClientActivityLog,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    isSingleTab: true
  },
  {
    path: '/admin/companySettings',
    name: 'Company Settings',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/companySettings/universitySetup',
    component: UniversitySetupComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'University Setup',
    isSingleTab: true
  },
  {
    path: '/admin/companySettings/appointmentMode',
    component: AppointmentModeComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Appointment Mode Setup',
    isSingleTab: true
  },
  {
    path: '/admin/reports/transactionLog',
    component: TransactionLogComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Transaction Log',
    isSingleTab: true
  },
  {
    path: '/admin/reports/transferLog',
    component: TransferLogComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Transfer Log',
    isSingleTab: true
  },
  {
    path: '/admin/generalSetup/roomSetup',
    component: RoomSetup,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Room Setup',
    isSingleTab: true
  },
  {
    path: '/admin/generalSetup/departmentSetup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Department Setup',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/departmentSetup/add',
    component: AddDepartmentSetup,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/admin/generalSetup/departmentSetup/manage',
    component: ManageDepartmentComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/admin/rosterSettings/departmentDutyRoster',
    name: 'Department Duty Roster',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    isSingleTab: false
  },
  {
    path: '/admin/rosterSettings/departmentDutyRoster/add',
    name: 'Add',
    component: AddDepartmentDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/admin/rosterSettings/departmentDutyRoster/manage',
    name: 'Manage',
    component: ManageDepartmentDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  }
]
