import React from 'react';
import {HashRouter} from 'react-router-dom';
import AuthenticationModule from '../AuthenticateHOC';


const AdminContainer = props => {
    const authenticatePath = (<AuthenticationModule/>);
    return (
        <HashRouter>
           {authenticatePath}
        </HashRouter>
    )

};

export default AdminContainer;
