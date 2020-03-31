import React from 'react';
import {checkDashboardRole} from '@frontend-appointment/helpers'
const CheckDashBoardRole = (ComposedComponent,code) => props => {
    return (
    checkDashboardRole(code)?<ComposedComponent {...props}/>:null
    )
}
export default CheckDashBoardRole;