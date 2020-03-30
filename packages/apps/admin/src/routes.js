import React from 'react'
import loadable from '@loadable/component'
import {CUnauthorized, CLoading} from '@frontend-appointment/ui-elements'

const getLoader = () => <CLoading />
/* ****** A ***** */

const AddProfileComponent = loadable(
  () => import('./container/ProfileSetup/Add/ProfileAdd'),
  {fallback: getLoader()}
)

const AddDepartmentComponent = loadable(
  () => import('./container/DepartmentSetup/Add/DepartmentAdd'),
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
/* ****** D ***** */

const DashboardComponent = loadable(
  () => import('./container/AdminDashboard/AdminDashboard'),
  {fallback: () => getLoader()}
)

// const AppointmentLogComponent = Loadable({
//   loader: () => import('./container/AppointmentVisitApproval/ClientAppointmentLog'),
//   loading: () => getLoader()
// })

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

const ManageDepartmentComponent = loadable(
  () => import('./container/DepartmentSetup/Manage/DepartmentManage'),
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

/* ****** R ***** */

const RescheduleLog = loadable(
  () => import('./container/RescheduleLog/RescheduleLog'),
  {fallback: () => getLoader()}
)

/* ****** S ***** */

/* ****** T ***** */

/* ****** U ***** */

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
    name: 'Dashboard'
  },
  {
    path: '/admin/generalSetup',
    name: 'General Setup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: true
  },
  {
    path: '/admin/generalSetup/profile',
    component: ProfileComponent,
    isLink: false,
    icon: '',
    hasTab: true,
    isTab: false,
    name: 'Profile Setup'
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
    path: '/admin/generalSetup/profile/add',
    name: 'Add',
    component: AddProfileComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true
  },
  {
    path: '/admin/generalSetup/profile/manage',
    component: ManageProfileComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage'
  },
  {
    path: '/admin/generalSetup/specialization/add',
    component: AddSpecializationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add'
  },
  {
    path: '/admin/generalSetup/specialization/manage',
    component: ManageSpecializationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage'
  },
  {
    path: '/admin/generalSetup/specialization',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: false,
    name: 'Specialization Setup'
  },
  {
    path: '/admin/generalSetup/department',
    component: <></>,
    isLink: false,
    icon: '',
    hasTab: true,
    isTab: false,
    name: 'Department Setup'
  },
  {
    path: '/admin/generalSetup/department/add',
    name: 'Add',
    component: AddDepartmentComponent,
    icon: '',
    hasTab: true,
    isTab: true,
    isLink: true
  },
  {
    path: '/admin/generalSetup/department/manage',
    name: 'Manage',
    component: ManageDepartmentComponent,
    icon: '',
    hasTab: true,
    isTab: true,
    isLink: true
  },
  {
    path: '/admin/generalSetup/admin-setup',
    name: 'Admin Setup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true
  },
  {
    path: '/admin/generalSetup/admin-setup/add',
    name: 'Add',
    component: AddAdminComponent,
    icon: '',
    hasTab: true,
    isLink: true
  },
  {
    path: '/admin/generalSetup/admin-setup/manage',
    name: 'Manage',
    component: ManageAdminComponent,
    icon: '',
    hasTab: true,
    isLink: true
  },
  {
    path: '/admin/doctorDutyRoster',
    name: 'Doctor Duty Roster',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: false
  },
  {
    path: '/admin/doctorDutyRoster/add',
    name: 'Add',
    component: AddDoctorDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true
  },
  {
    path: '/admin/doctorDutyRoster/manage',
    name: 'Manage',
    component: ManageDoctorDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true
  },
  {
    path: '/admin/generalSetup/hospital/add',
    component: AddHospitalComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add'
  },
  {
    path: '/admin/generalSetup/hospital/manage',
    component: ManageHospitalComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage'
  },
  {
    path: '/admin/generalSetup/hospital',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: false,
    name: 'Hospital Setup'
  },
  {
    path: '/admin/generalSetup/qualification/add',
    component: AddQualificationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add'
  },
  {
    path: '/admin/generalSetup/qualification/manage',
    component: ManageQualificationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage'
  },
  {
    path: '/admin/generalSetup/qualification',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: false,
    name: 'Qualification Setup'
  },
  {
    path: '/admin/generalSetup/doctor',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: false,
    name: 'Doctor'
  },
  {
    path: '/admin/generalSetup/doctor/add',
    component: AddDoctorComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add'
  },
  {
    path: '/admin/generalSetup/doctor/manage',
    component: ManageDoctorComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage'
  },
  {
    path: '/admin/adminSetup/companySetup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: false,
    name: 'Company Setup'
  },
  {
    path: '/admin/adminSetup/companySetup/add',
    component: CompanyAddComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add'
  },
  {
    path: '/admin/adminSetup/companySetup/manage',
    component: CompanyManageComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage'
  },
  {
    path: '/admin/appointment/appointmentRefundRequest',
    component: AppointmentRefundListComponent,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Appointment Refund'
  },
  {
    path: '/admin/appointment/appointmentApprovalRequest',
    component: AppointmentApprovalListComponent,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Appointment Approval'
  },
  {
    path: '/admin/reports/appointmentLog',
    component: AppointmentLogListComponent,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Appointment Log'
  },
  {
    path: '/admin/appointment/appointmentStatus',
    component: AppointmentStatusComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Appointment Status'
  },
  {
    path: '/admin/appointment',
    component: <></>,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Appointment'
  },
  {
    path: '/admin/patientInformation',
    component: PatientInformationComponent,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Patient Information'
  },
  {
    path: '/admin/reports',
    component: <></>,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Reports'
  },
  {
    path: '/unauthorized',
    component: CUnauthorized,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Unauthorized'
  },
  {
    path: '/admin/reports/rescheduleLog',
    component: RescheduleLog,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Reschedule Log'
  }
]
