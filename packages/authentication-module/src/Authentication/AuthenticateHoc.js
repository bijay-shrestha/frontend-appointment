import React from 'react';
import {Redirect} from 'react-router-dom';

const AuthenticateHOC = (ComposedComponent, condition) => {
    function Authenticate(props) {
        return (
            <>
                {condition() ? <ComposedComponent {...props} history={props.history}/> : <Redirect to="/"/>}
            </>
        );
    }
    return Authenticate;
};
export default AuthenticateHOC;
