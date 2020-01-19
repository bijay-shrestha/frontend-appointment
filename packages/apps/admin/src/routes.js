import Loadable from 'react-loadable';
import React from 'react';
import { CUnauthorized, CLoading } from '@frontend-appointment/ui-components';

const getLoader = () => <CLoading />;

const DashboardComponent = Loadable({
    loader: () => import('./container/AdminDashboard/AdminDashboard'),
    loading: () => getLoader(),
});

const ProfileComponent = Loadable({
    loader: () => import('./container/ProfileSetup/ProfileSetup'),
    loading: () => getLoader(),
});
const AddProfileComponent = Loadable({
    loader: () => import('./container/ProfileSetup/Add/Add'),
    loading: () => getLoader()
});
const ManageProfileComponent = Loadable({
    loader: () => import('./container/ProfileSetup/Manage/Manage'),
    loading: () => getLoader()
});
const AddSpecializationComponent = Loadable({
    loader: () => import('./container/SpecializationSetup/Add/SpecializationAdd'),
    loading: () => getLoader()
});
export const routes = [
    {
        "path": "/admin/dashboard",
        "component": DashboardComponent,
        "isLink": true,
        "icon": "",
        "hasTab":false,
        "name": "Dashboard"
    },
    {
        "path": "/admin/profile",
        "component": ProfileComponent,
        "isLink": false,
        "icon": "",
        "hasTab":true,
        "isTab":false,
        "name": "Profile Setup"
    },
    {
        "path": "/admin/profile/add",
        "name": "Add",
        "component": AddProfileComponent,
        "icon": "",
        "hasTab":true,
        "isLink": true
    },

    {
        "path": "/admin/profile/manage",
        "component": ManageProfileComponent,
        "icon": "",
        "hasTab":true,
        "isLink": true,
        "name": "Manage",
    },

    {
        "path": "/admin/specialization/add",
        "component": AddSpecializationComponent,
        "icon": "",
        "hasTab":true,
        "isLink": true,
        "name": "Add",
    }
    
];
