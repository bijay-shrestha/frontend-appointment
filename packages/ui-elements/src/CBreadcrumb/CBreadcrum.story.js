import React from 'react';
import {storiesOf} from "@storybook/react";

import CBreadcrumb from './CBreadcrumb';
import {HashRouter} from 'react-router-dom';

storiesOf('CBreadcrumb', module)
    .add('default CBreadcrumb', () => {
        const dataForBreadCrumb = [
            {
                id: '1',
                name: 'Home',
                path: '/home'
            },
            {
                id: '2',
                name: 'General Setup',
                path: '/generalSetup'
            },
            {
                id: '3',
                name: 'Admin Setup',
                path: '/adminSetup'
            },
            {
                id: '4',
                name: 'Add Admin',
                path: '/adminSetup/add'
            },
        ];
        return (
            <HashRouter>
                <CBreadcrumb breadcrumbData={dataForBreadCrumb}/>
            </HashRouter>
        )
    });