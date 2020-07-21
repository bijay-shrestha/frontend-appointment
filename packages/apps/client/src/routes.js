import Loadable from 'react-loadable'
import React from 'react'
import {CLoading, CUnauthorized} from '@frontend-appointment/ui-elements'
import loadable from '@loadable/component'

const getLoader = () => <CLoading />
/* ****** A ***** */

const AddProfileComponent = Loadable({
  loader: () => import('./container/ClientProfileSetup/Add/ProfileAdd'),
  loading: () => getLoader()
})

const AddUnitComponent = Loadable({
  loader: () => import('./container/ClientUnitSetup/Add/UnitAdd'),
  loading: () => getLoader()
})

const AddAdminComponent = Loadable({
  loader: () => import('./container/ClientAdminSetup/Add/AdminAdd'),
  loading: () => getLoader()
})

const AddDoctorDutyRosterComponent = Loadable({
  loader: () =>
    import('./container/ClientDoctorDutyRoster/Add/DoctorDutyRosterAdd'),
  loading: () => getLoader()
})

const AddQualificationComponent = Loadable({
  loader: () =>
    import('./container/ClientQualificationSetup/Add/QualificationAdd'),
  loading: () => getLoader()
})

const AddSpecializationComponent = Loadable({
  loader: () =>
    import('./container/ClientSpecializationSetup/Add/SpecializationAdd'),
  loading: () => getLoader()
})

const AddDoctorComponent = Loadable({
  loader: () => import('./container/ClientDoctorSetup/Add/DoctorAdd'),
  loading: () => getLoader()
})

const AppointmentRefundListComponent = Loadable({
  loader: () => import('./container/ClientAppointmentRefund/AppointmentRefund'),
  loading: () => getLoader()
})

const AppointmentDepartmentRefundListComponent = Loadable({
  loader: () =>
    import(
      './container/ClientAppointmentDepartmentRefund/AppointmentDepartmentRefund'
    ),
  loading: () => getLoader()
})

const AppointmentApprovalListComponent = Loadable({
  loader: () =>
    import('./container/ClientAppointmentApproval/AppointmentApproval'),
  loading: () => getLoader()
})

const AppointmentStatusComponent = Loadable({
  loader: () => import('./container/ClientAppointmentStatus/AppointmentStatus'),
  loading: () => getLoader()
})

const AppointmentLogListComponent = Loadable({
  loader: () => import('./container/ClientAppointmentLog/AppointmentLog'),
  loading: () => getLoader()
})

const AppointmentRefundStatusListComponent = Loadable({
  loader: () =>
    import('./container/ClientAppointmentRefundStatus/AppointmentRefundStatus'),
  loading: () => getLoader()
})

const AppointmentDepartmentRefundStatusListComponent = Loadable({
  loader: () =>
    import(
      './container/ClientAppointmentDepartmentRefundStatus/ClientAppointmentDepartmentRefundStatus'
    ),
  loading: () => getLoader()
})

const ActivityLog = loadable(
  () => import('./container/ClientActivitiesLog/ClientActivityLog'),
  {fallback: () => getLoader()}
)

const AddDepartmentSetup = loadable(
  () =>
    import(
      './container/ClientHospitalDepartmentSetup/Add/HospitalDepartmentAdd'
    ),
  {fallback: () => getLoader()}
)

const DepartmentStatusComponent = loadable(
  () =>
    import(
      './container/ClientAppointmentStatusByDepartment/ClientStatusByDepartment'
    ),
  {fallback: () => getLoader()}
)

const AddDepartmentDutyRosterComponent = Loadable({
  loader: () =>
    import(
      './container/ClientDepartmentDutyRoster/Add/DepartmentDutyRosterAdd'
    ),
  loading: () => getLoader()
})

/* ****** B ***** */

/* ****** C ***** */

/* ****** D ***** */

const DashboardComponent = Loadable({
  loader: () => import('./container/ClientDashboard/ClientDashboard'),
  loading: () => getLoader()
})

const DepartmentWiseQuickCheckInComponent = loadable(
  () =>
    import(
      './container/ClientAppointmentDepartmentCheckinQuickMenu/AppointmentDepartmentCheckinFast'
    ),
  {fallback: () => getLoader()}
)

const DepartmentCheckInComponent = loadable(
  () =>
    import(
      './container/ClientAppointmentDepartmentCheckIn/AppointmentDepartmentCheckin'
    ),
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

const ManageProfileComponent = Loadable({
  loader: () => import('./container/ClientProfileSetup/Manage/ProfileManage'),
  loading: () => getLoader()
})

const ManageUnitComponent = Loadable({
  loader: () => import('./container/ClientUnitSetup/Manage/UnitManage'),
  loading: () => getLoader()
})

const ManageSpecializationComponent = Loadable({
  loader: () =>
    import('./container/ClientSpecializationSetup/Manage/SpecializationManage'),
  loading: () => getLoader()
})

const ManageAdminComponent = Loadable({
  loader: () => import('./container/ClientAdminSetup/Manage/AdminManage'),
  loading: () => getLoader()
})

const ManageDoctorDutyRosterComponent = Loadable({
  loader: () =>
    import('./container/ClientDoctorDutyRoster/Manage/DoctorDutyRosterManage'),
  loading: () => getLoader()
})

const ManageQualificationComponent = Loadable({
  loader: () =>
    import('./container/ClientQualificationSetup/Manage/QualificationManage'),
  loading: () => getLoader()
})

const ManageDoctorComponent = Loadable({
  loader: () => import('./container/ClientDoctorSetup/Manage/DoctorManage'),
  loading: () => getLoader()
})

const ManageDepartmentComponent = Loadable({
  loader: () =>
    import(
      './container/ClientHospitalDepartmentSetup/Manage/HospitalDepartmentManage'
    ),
  loading: () => getLoader()
})

const ManageDepartmentDutyRosterComponent = Loadable({
  loader: () =>
    import(
      './container/ClientDepartmentDutyRoster/Manage/DepartmentDutyRosterManage'
    ),
  loading: () => getLoader()
})
/* ****** N ***** */

/* ****** O ***** */

/* ****** P ***** */

const ProfileComponent = Loadable({
  loader: () => import('./container/ClientProfileSetup/ProfileSetup'),
  loading: () => getLoader()
})

const PatientComponent = Loadable({
  loader: () => import('./container/ClientPatientDetails/ClientPatientDetails'),
  loading: () => getLoader()
})
/* ****** Q ***** */

const QualificationAlias = loadable(
  () => import('./container/ClientQualificationAliasSetup/QualificationAlias'),
  {fallback: () => getLoader()}
)

const QuickCheckInComponent = loadable(
  () =>
    import(
      './container/ClientAppointmentCheckinQuickMenu/AppointmentCheckinFast'
    ),
  {fallback: () => getLoader()}
)

/* ****** R ***** */

const RescheduleLog = Loadable({
  loader: () => import('./container/ClientRescheduleLog/RescheduleLog'),
  loading: () => getLoader()
})

const RoomSetup = loadable(
  () => import('./container/ClientRoomSetup/RoomSetup'),
  {fallback: () => getLoader()}
)

/* ****** S ***** */

/* ****** T ***** */

const TransactionLogComponent = loadable(
  () => import('./container/ClientTransactionLog/TransactionLog'),
  {fallback: () => getLoader()}
)

const TransferLogComponent = loadable(
  () => import('./container/ClientTransferLog/AppointmentTransferLog'),
  {fallback: () => getLoader()}
)

/* ****** U ***** */

/* ****** V ***** */

/* ****** W ***** */

/* ****** X ***** */

/* ****** Y ***** */

/* ****** Z ***** */

export const routes = [
  {
    path: '/dashboard',
    component: DashboardComponent,
    isLink: true,
    icon: '',
    isTab: 'false',
    hasTab: false,
    name: 'Dashboard',
    isSingleTab: false
  },
  {
    path: '/generalSetup',
    name: 'General Setup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/generalSetup/profileSetup',
    component: ProfileComponent,
    isLink: true,
    icon: '',
    hasTab: true,
    isTab: false,
    name: 'Profile Setup',
    isSingleTab: false
  },
  {
    path: '/generalSetup/profileSetup/add',
    name: 'Add',
    component: AddProfileComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/generalSetup/profileSetup/manage',
    component: ManageProfileComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/generalSetup/specialization/add',
    component: AddSpecializationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/generalSetup/specialization/manage',
    component: ManageSpecializationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/generalSetup/specialization',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Specialization Setup',
    isSingleTab: false
  },
  {
    path: '/generalSetup/unitSetup',
    component: <></>,
    isLink: true,
    icon: '',
    hasTab: true,
    isTab: false,
    name: 'Unit Setup',
    isSingleTab: false
  },
  {
    path: '/generalSetup/unitSetup/add',
    name: 'Add',
    component: AddUnitComponent,
    icon: '',
    hasTab: true,
    isTab: true,
    isLink: true,
    isSingleTab: false
  },
  {
    path: '/generalSetup/unitSetup/manage',
    name: 'Manage',
    component: ManageUnitComponent,
    icon: '',
    hasTab: true,
    isTab: true,
    isLink: true,
    isSingleTab: false
  },
  {
    path: '/generalSetup/adminSetup',
    name: 'Admin Setup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isSingleTab: false
  },
  {
    path: '/generalSetup/adminSetup/add',
    name: 'Add',
    component: AddAdminComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isSingleTab: false
  },
  {
    path: '/generalSetup/adminSetup/manage',
    name: 'Manage',
    component: ManageAdminComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isSingleTab: false
  },
  {
    path: '/rosterSettings/doctorDutyRoster',
    name: 'Doctor Duty Roster',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    isSingleTab: false
  },
  {
    path: '/rosterSettings/doctorDutyRoster/add',
    name: 'Add',
    component: AddDoctorDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/rosterSettings/doctorDutyRoster/manage',
    name: 'Manage',
    component: ManageDoctorDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/generalSetup/qualification/add',
    component: AddQualificationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/generalSetup/qualification/manage',
    component: ManageQualificationComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/generalSetup/qualification',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Qualification Setup',
    isSingleTab: false
  },
  {
    path: '/generalSetup/doctorSetup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Doctor',
    isSingleTab: false
  },
  {
    path: '/generalSetup/doctorSetup/add',
    component: AddDoctorComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/generalSetup/doctorSetup/manage',
    component: ManageDoctorComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/appointment/pendingRefundApproval',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Appointment Cancellation',
    isSingleTab: false
  },
  {
    path: '/appointment/pendingRefundApproval/doctor',
    component: AppointmentRefundListComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Doctor Pending Refund Approval',
    isSingleTab: false
  },
  {
    path: '/appointment/pendingRefundApproval/department',
    component: AppointmentDepartmentRefundListComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Department Pending Refund Approval',
    isSingleTab: false
  },
  {
    path: '/appointment/checkIn',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Appointment Check-In',
    isSingleTab: false
  },
  {
    path: '/appointment/refundStatus',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Appointment Cancellation Status',
    isSingleTab: false
  },
  {
    path: '/appointment/refundStatus/doctor',
    component: AppointmentRefundStatusListComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Doctor Consultation',
    isSingleTab: false
  },
  {
    path: '/appointment/refundStatus/department',
    component: AppointmentDepartmentRefundStatusListComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Department Consultation',
    isSingleTab: false
  },

  {
    path: '/appointment/checkIn/doctor',
    component: AppointmentApprovalListComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Doctor Consultation',
    isSingleTab: false
  },
  {
    path: '/appointment/checkIn/department',
    component: DepartmentCheckInComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Department Consultation',
    isSingleTab: false
  },
  {
    path: '/reports/appointmentLog',
    component: AppointmentLogListComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Appointment Log',
    isSingleTab: true
  },
  {
    path: '/appointment',
    component: <></>,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Appointment',
    isSingleTab: false
  },
  {
    path: '/patientInformation',
    component: PatientComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Patient Information',
    isSingleTab: true
  },
  {
    path: '/reports',
    component: <></>,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Reports',
    isSingleTab: false
  },
  {
    path: '/activityLog',
    component: ActivityLog,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Activity Log',
    isSingleTab: true
  },

  {
    path: '/reports/rescheduleLog',
    component: RescheduleLog,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Reschedule Log',
    isSingleTab: true
  },
  {
    path: '/generalSetup/qualificationAlias',
    component: QualificationAlias,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Qualification Alias',
    isSingleTab: true
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
    path: '/reports/transactionLog',
    component: TransactionLogComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Transaction Log',
    isSingleTab: true
  },
  {
    path: '/reports/transferLog',
    component: TransferLogComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Transfer Log',
    isSingleTab: true
  },
  {
    path: '/quickMenu',
    component: <></>,
    icon: '',
    hasTab: false,
    isLink: false,
    isTab: false,
    name: 'Quick Menu',
    isSingleTab: false
  },
  {
    path: '/quickMenu/doctorCheckIn',
    component: QuickCheckInComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Doctor Check-In',
    isSingleTab: true
  },
  {
    path: '/quickMenu/departmentCheckIn',
    component: DepartmentWiseQuickCheckInComponent,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Department Check-In',
    isSingleTab: true
  },
  {
    path: '/generalSetup/roomSetup',
    component: RoomSetup,
    icon: '',
    hasTab: false,
    isLink: true,
    isTab: false,
    name: 'Room Setup',
    isSingleTab: true
  },
  {
    path: '/generalSetup/departmentSetup',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Department Setup',
    isSingleTab: false
  },
  {
    path: '/generalSetup/departmentSetup/add',
    component: AddDepartmentSetup,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Add',
    isSingleTab: false
  },
  {
    path: '/generalSetup/departmentSetup/manage',
    component: ManageDepartmentComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Manage',
    isSingleTab: false
  },
  {
    path: '/rosterSettings/departmentDutyRoster',
    name: 'Department Duty Roster',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    isSingleTab: false
  },
  {
    path: '/rosterSettings/departmentDutyRoster/add',
    name: 'Add',
    component: AddDepartmentDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/rosterSettings/departmentDutyRoster/manage',
    name: 'Manage',
    component: ManageDepartmentDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    isSingleTab: false
  },
  {
    path: '/appointment/status',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: false,
    name: 'Appointment Status',
    isSingleTab: false
  },
  {
    path: '/appointment/status/doctor',
    component: AppointmentStatusComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Doctor Consultation',
    isSingleTab: false
  },
  {
    path: '/appointment/status/department',
    component: DepartmentStatusComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true,
    name: 'Department Consultation',
    isSingleTab: false
  }
]
