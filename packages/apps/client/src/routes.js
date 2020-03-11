import Loadable from 'react-loadable'
import React from 'react'
import {CUnauthorized, CLoading} from '@frontend-appointment/ui-elements'

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

const AddHospitalComponent = Loadable({
    loader: () => import('./container/HospitalSetup/Add/HospitalAdd'),
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

const ManageHospitalComponent = Loadable({
    loader: () => import('./container/HospitalSetup/Manage/HospitalManage'),
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
})
/* ****** Q ***** */

/* ****** R ***** */

const RescheduleLog = Loadable({
    loader: () => import('./container/ClientRescheduleLog/RescheduleLog'),
    loading: () => getLoader()
});



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
        name: 'Dashboard'
    },
    {
        path: '/generalSetup',
        name: 'General Setup',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: false,
        isTab: true
    },
    {
        path: '/generalSetup/profile',
        component: ProfileComponent,
        isLink: false,
        icon: '',
        hasTab: true,
        isTab: false,
        name: 'Profile Setup'
    },
    {
        path: '/generalSetup/profile/add',
        name: 'Add',
        component: AddProfileComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true
    },
    {
        path: '/generalSetup/profile/manage',
        component: ManageProfileComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Manage'
    },
    {
        path: '/generalSetup/specialization/add',
        component: AddSpecializationComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Add'
    },
    {
        path: '/generalSetup/specialization/manage',
        component: ManageSpecializationComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Manage'
    },
    {
        path: '/generalSetup/specialization',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: false,
        isTab: false,
        name: 'Specialization Setup'
    },
    {
        path: '/generalSetup/department',
        component: <></>,
        isLink: false,
        icon: '',
        hasTab: true,
        isTab: false,
        name: 'Department Setup'
    },
    {
        path: '/generalSetup/department/add',
        name: 'Add',
        component: AddDepartmentComponent,
        icon: '',
        hasTab: true,
        isTab: true,
        isLink: true
    },
    {
        path: '/generalSetup/department/manage',
        name: 'Manage',
        component: ManageDepartmentComponent,
        icon: '',
        hasTab: true,
        isTab: true,
        isLink: true
    },
    {
        path: '/generalSetup/admin-setup',
        name: 'Admin Setup',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: true
    },
    {
        path: '/generalSetup/admin-setup/add',
        name: 'Add',
        component: AddAdminComponent,
        icon: '',
        hasTab: true,
        isLink: true
    },
    {
        path: '/generalSetup/admin-setup/manage',
        name: 'Manage',
        component: ManageAdminComponent,
        icon: '',
        hasTab: true,
        isLink: true
    },
    {
        path: '/doctorDutyRoster',
        name: 'Doctor Duty Roster',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: false,
        isTab: false
    },
    {
        path: '/doctorDutyRoster/add',
        name: 'Add',
        component: AddDoctorDutyRosterComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true
    },
    {
        path: '/doctorDutyRoster/manage',
        name: 'Manage',
        component: ManageDoctorDutyRosterComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true
    },
    {
        path: '/generalSetup/hospital/add',
        component: AddHospitalComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Add'
    },
    {
        path: '/generalSetup/hospital/manage',
        component: ManageHospitalComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Manage'
    },
    {
        path: '/generalSetup/hospital',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: false,
        isTab: false,
        name: 'Hospital Setup'
    },
    {
        path: '/generalSetup/qualification/add',
        component: AddQualificationComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Add'
    },
    {
        path: '/generalSetup/qualification/manage',
        component: ManageQualificationComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Manage'
    },
    {
        path: '/generalSetup/qualification',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: false,
        isTab: false,
        name: 'Qualification Setup'
    },
    {
        path: '/generalSetup/doctor',
        component: <></>,
        icon: '',
        hasTab: true,
        isLink: false,
        isTab: false,
        name: 'Doctor'
    },
    {
        path: '/generalSetup/doctor/add',
        component: AddDoctorComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Add'
    },
    {
        path: '/generalSetup/doctor/manage',
        component: ManageDoctorComponent,
        icon: '',
        hasTab: true,
        isLink: true,
        isTab: true,
        name: 'Manage'
    },
    {
        path: '/appointment/appointmentRefundRequest',
        component: AppointmentRefundListComponent,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Appointment Refund'
    },
    {
        path: '/appointment/appointmentApprovalRequest',
        component: AppointmentApprovalListComponent,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Appointment Approval'
    },
    {
        path: '/reports/appointmentLog',
        component: AppointmentLogListComponent,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Appointment Log'
    },
    {
        path: '/appointment/appointmentStatus',
        component: AppointmentStatusComponent,
        icon: '',
        hasTab: false,
        isLink: true,
        isTab: false,
        name: 'Appointment Status'
    },
    {
        path: '/appointment',
        component: <></>,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Appointment'
    },
    {
        path: '/patientInformation',
        component: PatientComponent,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Patient Information'
    },
    {
        path: '/reports',
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
        path: '/reports/rescheduleLog',
        component: RescheduleLog,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Reschedule Log'
    },
    {
        path: '/patientInformation',
        component: PatientComponent,
        icon: '',
        hasTab: false,
        isLink: false,
        isTab: false,
        name: 'Patient Information'
    }
];
