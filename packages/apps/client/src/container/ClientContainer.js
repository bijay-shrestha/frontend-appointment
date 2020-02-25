import React from 'react';
import {HashRouter} from 'react-router-dom';
import AuthenticationModule from '../AuthenticateHOC';


const ClientContainer = props => {
    const authenticatePath = (<AuthenticationModule/>);
    return (
        <HashRouter>
           {authenticatePath}
        </HashRouter>
    )

};

export default ClientContainer;
