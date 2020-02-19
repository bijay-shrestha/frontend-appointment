import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import AuthenticationModule from '../AuthenticateHOC';
import LoginPage from './Login/LoginPage';
import {LoginHoc} from '@frontend-appointment/commons';


const AdminContainer = props => {
    const authenticatePath = (<AuthenticationModule/>);
    return (
        <HashRouter>
           {authenticatePath}
        </HashRouter>
    )

};

export default AdminContainer;
