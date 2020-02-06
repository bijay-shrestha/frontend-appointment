import Loadable from 'react-loadable';
import React from 'react';
import {CUnauthorized, CLoading} from '@frontend-appointment/ui-elements';

const getLoader = () => <CLoading/>;
/* ****** A ***** */

const AddProfileComponent = Loadable({
  loader: () => import('./container/ProfileSetup/Add/ProfileAdd'),
  loading: () => getLoader()
});

const AddDepartmentComponent = Loadable({
  loader: () => import('./container/DepartmentSetup/Add/DepartmentAdd'),
  loading: () => getLoader()
});

const AddAdminComponent = Loadable({
  loader: () => import('./container/AdminSetup/Add/AdminAdd'),
  loading: () => getLoader()
});

const AddHospitalComponent = Loadable({
  loader: () => import('./container/HospitalSetup/Add/HospitalAdd'),
  loading: () => getLoader()
});

const AddDoctorDutyRosterComponent = Loadable({
  loader: () => import('./container/DoctorDutyRoster/Add/DoctorDutyRosterAdd'),
  loading: () => getLoader()
});

const AddQualificationComponent = Loadable({
  loader: () => import('./container/QualificationSetup/Add/QualificationAdd'),
  loading: () => getLoader()
});

const AddSpecializationComponent = Loadable({
  loader: () => import('./container/SpecializationSetup/Add/SpecializationAdd'),
  loading: () => getLoader()
});

const AddDoctorComponent = Loadable({
  loader: () => import('./container/DoctorSetup/Add/DoctorAdd'),
  loading: () => getLoader()
});
/* ****** B ***** */

/* ****** C ***** */

/* ****** D ***** */

const DashboardComponent = Loadable({
  loader: () => import('./container/AdminDashboard/AdminDashboard'),
  loading: () => getLoader()
});


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
  loader: () => import('./container/ProfileSetup/Manage/ProfileManage'),
  loading: () => getLoader()
});

const ManageDepartmentComponent = Loadable({
  loader: () => import('./container/DepartmentSetup/Manage/DepartmentManage'),
  loading: () => getLoader()
});

const ManageSpecializationComponent = Loadable({
  loader: () => import('./container/SpecializationSetup/Manage/SpecializationManage'),
  loading: () => getLoader()
});

const ManageAdminComponent = Loadable({
  loader: () => import('./container/AdminSetup/Manage/AdminManage'),
  loading: () => getLoader()
});

const ManageHospitalComponent = Loadable({
  loader: () => import('./container/HospitalSetup/Manage/HospitalManage'),
  loading: () => getLoader()
});

const ManageDoctorDutyRosterComponent = Loadable({
  loader: () =>
    import('./container/DoctorDutyRoster/Manage/DoctorDutyRosterManage'),
  loading: () => getLoader()
});

const ManageQualificationComponent = Loadable({
  loader: () =>
    import('./container/QualificationSetup/Manage/QualificationManage'),
  loading: () => getLoader()
});

const ManageDoctorComponent =Loadable({
  loader: () =>
    import('./container/DoctorSetup/Manage/DoctorManage'),
  loading: () => getLoader()
})
/* ****** N ***** */

/* ****** O ***** */

/* ****** P ***** */

const ProfileComponent = Loadable({
  loader: () => import('./container/ProfileSetup/ProfileSetup'),
  loading: () => getLoader()
});
/* ****** Q ***** */

/* ****** R ***** */

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
    component:<></>,
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
    'path': '/admin/generalSetup/admin-setup',
    'name': 'Admin Setup',
    'component': <></>,
    'icon': '',
    'hasTab': true,
    'isLink': true
  },
  {
    'path': '/admin/generalSetup/admin-setup/add',
    'name': 'Add',
    'component': AddAdminComponent,
    'icon': '',
    'hasTab': true,
    'isLink': true
  },
  {
    'path': '/admin/generalSetup/admin-setup/manage',
    'name': 'Manage',
    'component': ManageAdminComponent,
    'icon': '',
    'hasTab': true,
    'isLink': true
  },
  {
    path: '/admin/generalSetup/doctordutyroster/add',
    name: 'Add',
    component: AddDoctorDutyRosterComponent,
    icon: '',
    hasTab: true,
    isLink: true,
    isTab: true
  },
  {
    path: '/admin/generalSetup/doctordutyroster/manage',
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
    path: '/admin/doctorDutyRoster',
    component: <></>,
    icon: '',
    hasTab: true,
    isLink: false,
    isTab: false,
    name: 'Doctor Duty Roster Setup'

  },

  {
    'path': '/unauthorized',
    'component': CUnauthorized,
    'icon': '',
    'hasTab': false,
    'isLink': false,
    'isTab': false,
    'name': 'Unauthorized'
  }
];
