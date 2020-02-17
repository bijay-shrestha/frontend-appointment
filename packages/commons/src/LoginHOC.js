import React from 'react'
import {Axios} from '@frontend-appointment/core'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom';
import {CLoading} from '@frontend-appointment/ui-components';
import {CFullPageLoading} from '@frontend-appointment/ui-elements';
import {LocalStorageSecurity} from '@frontend-appointment/helpers';

const LoginHoc = (ComposedComponent, dashboardPath) => {
    const  CheckAuthentication = props =>{
     let path=dashboardPath;
     let isLoggedIn = false;
     const checkIfUserIsLoggedInAlready =()=> {
         if(LocalStorageSecurity.localStorageDecoder('auth-token')){
             isLoggedIn=true;
             path = ''
         }
     }   

            return !this.state.isLoading && !this.state.isOk ? (
                <ComposedComponent {...this.props} history={this.props.history}/>
            ) : this.state.isLoading && !this.state.isOk ? (
                <CFullPageLoading/>
            ) : (
                <Redirect to={dashboardPath}/>
            )
        }
    }
export default LoginHoc;
