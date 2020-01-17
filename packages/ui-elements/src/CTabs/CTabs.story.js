import React from 'react';
import {storiesOf} from "@storybook/react";

import CTabs from './CTabs';
import {HashRouter} from 'react-router-dom';

storiesOf('CTabs', module)
    .add('default CTabs', () => {
        const tabData = [
            {
                id: "1",
                name: "Add",
                icon: "fa fa-plus-circle",
                component: '',
                eventKey: "/generalSetup/adminSetup/add"
            },
            {
                id: "2",
                name: "Manage",
                icon: "fa fa-clipboard",
                component: '',
                eventKey: "/generalSetup/adminSetup/manage"
            },
            {
                id: "3",
                name: "Contact",
                icon: "fa fa-phone",
                component: '',
                eventKey: "/generalSetup/adminSetup/contact"
            }];
        return (
            <HashRouter>
                <CTabs data={tabData}/>
            </HashRouter>
        )
    });