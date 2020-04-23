import Loadable from 'react-loadable'
import React from 'react'
import {CLoading, CUnauthorized} from '@frontend-appointment/ui-elements'
import loadable from "@loadable/component";

const getLoader = () => <CLoading/>;
/* ****** A ***** */

const AddProfileComponent = Loadable({
    loader: () => import('./container/ClientProfileSetup/Add/ProfileAdd'),
    loading: () => getLoader()
});

const AddDepartmentComponent = Loadable({
    loader: () => import('./container/ClientDepartmentSetup/Add/DepartmentAdd'),
    loading: () => getLoader()
});

const AddAdminComponent = Loadable({
    loader: () => import('./container/ClientAdminSetup/Add/AdminAdd'),
    loading: () => getLoader()
});

const AddDoctorDutyRosterComponent = Loadable({
    loader: () => import('./container/ClientDoctorDutyRoster/Add/DoctorDutyRosterAdd'),
    loading: () => getLoader()
});

const AddQualificationComponent = Loadable({
    loader: () => import('./container/ClientQualificationSetup/Add/QualificationAdd'),
    loading: () => getLoader()
});

const AddSpecializationComponent = Loadable({
    loader: () => import('./container/ClientSpecializationSetup/Add/SpecializationAdd'),
    loading: () => getLoader()
});

const AddDoctorComponent = Loadable({
    loader: () => import('./container/ClientDoctorSetup/Add/DoctorAdd'),
    loading: () => getLoader()
});

const AppointmentRefundListComponent = Loadable({
    loader: () => import('./container/ClientAppointmentRefund/AppointmentRefund'),
    loading: () => getLoader()
});

const AppointmentApprovalListComponent = Loadable({
    loader: () => import('./container/ClientAppointmentApproval/AppointmentApproval'),
    loading: () => getLoader()
});

const AppointmentStatusComponent = Loadable({
    loader: () => import('./container/ClientAppointmentStatus/AppointmentStatus'),
    loading: () => getLoader()
});

const AppointmentLogListComponent = Loadable({
    loader: () => import('./container/ClientAppointmentLog/AppointmentLog'),
    loading: () => getLoader()
});
/* ****** B ***** */

/* ****** C ***** */

/* ****** D ***** */

const DashboardComponent = Loadable({
    loader: () => import('./container/ClientDashboard/ClientDashboard'),
    loading: () => getLoader()
});

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
});

const ManageDepartmentComponent = Loadable({
    loader: () => import('./container/ClientDepartmentSetup/Manage/DepartmentManage'),
    loading: () => getLoader()
});

const ManageSpecializationComponent = Loadable({
    loader: () => import('./container/ClientSpecializationSetup/Manage/SpecializationManage'),
    loading: () => getLoader()
});

const ManageAdminComponent = Loadable({
    loader: () => import('./container/ClientAdminSetup/Manage/AdminManage'),
    loading: () => getLoader()
});

const ManageDoctorDutyRosterComponent = Loadable({
    loader: () =>
        import('./container/ClientDoctorDutyRoster/Manage/DoctorDutyRosterManage'),
    loading: () => getLoader()
});

const ManageQualificationComponent = Loadable({
    loader: () =>
        import('./container/ClientQualificationSetup/Manage/QualificationManage'),
    loading: () => getLoader()
});

const ManageDoctorComponent = Loadable({
    loader: () =>
        import('./container/ClientDoctorSetup/Manage/DoctorManage'),
    loading: () => getLoader()
});
/* ****** N ***** */

/* ****** O ***** */

/* ****** P ***** */

const ProfileComponent = Loadable({
    loader: () => import('./container/ClientProfileSetup/ProfileSetup'),
    loading: () => getLoader()
});

const PatientComponent = Loadable({
     loader: () => import('./container/ClientPatientDetails/ClientPatientDetails'),
     loading: () => getLoader()
});
/* ****** Q ***** */

const QualificationAlias = loadable(
    () => import('./container/ClientQualificationAliasSetup/QualificationAlias'),
    {fallback: () => getLoader()}
);

/* ****** R ***** */

const RescheduleLog = Loadable({
    loader: () => import('./container/ClientRescheduleLog/RescheduleLog'),
    loading: () => getLoader()
});

const ActivityLog = loadable(
    () => import('./container/ClientActivitiesLog/ClientActivityLog'),
    {fallback: () => getLoader()}
);

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
        path: '/dashboard',
        component: DashboardComponent,
        isLink: true,
        icon: '',
        isTab: 'false',
        hasTab: false,
        name: 'Dashboard',
        isSingleTab:false,
    },
    {
        path: '/generalSetup',
        name: 'General Setup',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: false,
        isTab: true,
        isSingleTab:false,
    },
    {
        path: '/generalSetup/profile',
        component: ProfileComponent,
        isLink: true,
        icon: '',
        hasTab: true,
        isTab: false,
        name: 'Profile Setup',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/profile/add',
        name: 'Add',
        component: AddProfileComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        isSingleTab:false,
    },
    {
        path: '/generalSetup/profile/manage',
        component: ManageProfileComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Manage',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/specialization/add',
        component: AddSpecializationComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Add',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/specialization/manage',
        component: ManageSpecializationComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Manage',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/specialization',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: false,
        name: 'Specialization Setup',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/department',
        component: <></>,
        isLink: true,
        icon: '',
        hasTab: true,
        isTab: false,
        name: 'Department Setup',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/department/add',
        name: 'Add',
        component: AddDepartmentComponent,
        icon: '',
        hasTab: true,
        isTab: true,
        isLink: true,
        isSingleTab:false,
    },
    {
        path: '/generalSetup/department/manage',
        name: 'Manage',
        component: ManageDepartmentComponent,
        icon: '',
        hasTab: true,
        isTab: true,
        isLink: true,
        isSingleTab:false,
    },
    {
        path: '/generalSetup/admin-setup',
        name: 'Admin Setup',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: true,
        isSingleTab:false,
    },
    {
        path: '/generalSetup/admin-setup/add',
        name: 'Add',
        component: AddAdminComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isSingleTab:false,
    },
    {
        path: '/generalSetup/admin-setup/manage',
        name: 'Manage',
        component: ManageAdminComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isSingleTab:false,
    },
    {
        path: '/doctorDutyRoster',
        name: 'Doctor Duty Roster',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: false,
        isSingleTab:false,
    },
    {
        path: '/doctorDutyRoster/add',
        name: 'Add',
        component: AddDoctorDutyRosterComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        isSingleTab:false,
    },
    {
        path: '/doctorDutyRoster/manage',
        name: 'Manage',
        component: ManageDoctorDutyRosterComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        isSingleTab:false,
    },
    {
        path: '/generalSetup/qualification/add',
        component: AddQualificationComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Add',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/qualification/manage',
        component: ManageQualificationComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Manage',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/qualification',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: false,
        name: 'Qualification Setup',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/doctor',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: false,
        name: 'Doctor',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/doctor/add',
        component: AddDoctorComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Add',
        isSingleTab:false,
    },
    {
        path: '/generalSetup/doctor/manage',
        component: ManageDoctorComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Manage',
        isSingleTab:false,
    },
    {
        path: '/appointment/appointmentRefundRequest',
        component: AppointmentRefundListComponent,
        icon: '',
        hasTab: false,
        isLink: true,
        isTab: false,
        name: 'Pending Refund Approval',
        isSingleTab:true,
    },
    {
        path: '/appointment/appointmentApprovalRequest',
        component: AppointmentApprovalListComponent,
        icon: '',
        hasTab: false,
        isLink: true,
        isTab: false,
        name: 'Appointment Check-In',
        isSingleTab:true,
    },
    {
        path: '/reports/appointmentLog',
        component: AppointmentLogListComponent,
        icon: '',
        hasTab: false,
        isLink: true,
        isTab: false,
        name: 'Appointment Log',
        isSingleTab:true,
    },
    {
        path: '/appointment/appointmentStatus',
        component: AppointmentStatusComponent,
        icon: '',
        hasTab: false,
        isLink: true,
        isTab: false,
        name: 'Appointment Status',
        isSingleTab:true,
    },
    {
        path: '/appointment',
        component: <></>,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Appointment',
        isSingleTab:false,
    },
    {
        path: '/patientInformation',
        component: PatientComponent,
        icon: '',
        hasTab: false,
        isLink: true,
        isTab: false,
        name: 'Patient Information',
        isSingleTab:true,
    },
    {
        path: '/reports',
        component: <></>,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Reports',
        isSingleTab:false,
    },
    {
        path: '/activityLog',
        component: ActivityLog,
        icon: '',
        hasTab: false,
        isLink: true,
        isTab: false,
        name: 'Activity Log',
        isSingleTab:true,
    },
    
    {
        path: '/reports/rescheduleLog',
        component: RescheduleLog,
        icon: '',
        hasTab: false,
        isLink: true,
        isTab: false,
        name: 'Reschedule Log',
        isSingleTab:true,
    },
    {
        path: '/generalSetup/qualificationAlias',
        component: QualificationAlias,
        icon: '',
        hasTab: false,
        isLink: true,
        isTab: false,
        name: 'Qualification Alias',
        isSingleTab:true,
    },

    {
        path: '/unauthorized',
        component: CUnauthorized,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Unauthorized',
        isSingleTab:false,
    }
];
