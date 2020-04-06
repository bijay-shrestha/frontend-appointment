import {
    DashboardDetailsMiddleware,
    fetchLoggedInAdminUserInfo,
    fetchUserMenus,
    signinUser
} from '@frontend-appointment/thunk-middleware'
import {ClientLogin} from '@frontend-appointment/ui-components'
import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {LocalStorageSecurity} from '@frontend-appointment/helpers'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';

const {fetchDashboardFeaturesByAdmin} = DashboardDetailsMiddleware;
const {DASHBOARD_FEATURE} = AdminModuleAPIConstants.DashboardApiConstant;
const {LOGIN_API, GET_SIDEBAR_DATA, GET_LOGGED_IN_ADMIN_INFO_CLIENT} = AdminModuleAPIConstants.initialApiConstantsOfAdmin;

class LoginPage extends React.PureComponent {
    onSubmitHandler = async user => {
        try {
            await this.props.signinUser(LOGIN_API, {...user});
            await this.props.fetchUserMenus(GET_SIDEBAR_DATA, {
                username: user.username,
                hospitalCode: user.hospitalCode
            });
            const userMenus = await this.props.fetchLoggedInAdminUserInfo(GET_LOGGED_IN_ADMIN_INFO_CLIENT, {
                username: user.username
            });
            const featuresAdmin = await this.props.fetchDashboardFeaturesByAdmin(
                DASHBOARD_FEATURE,
                userMenus.adminId
            );
            LocalStorageSecurity.localStorageEncoder(
                'adminDashRole',
                featuresAdmin.data
            );
            const selectedPath = LocalStorageSecurity.localStorageDecoder('active')
            const pathToRedirect = selectedPath
                ? '' + selectedPath.replace('true', '')
                : '/dashboard';
            await this.props.history.push(pathToRedirect);
            return null
        } catch (e) {
            console.log(e);
            const err = e.errorMessage
                ? e.errorMessage
                : 'Sorry Server Could not process data';
            return err
        }
    };

    componentDidMount() {
        document.title = 'Cogent-Appointment-Client'
    }

    render() {
        return (
            <ClientLogin {...this.props} onSubmitHandler={this.onSubmitHandler}/>
        )
    }
}

//Mapping the thunkActions to Dispatcher to props
export default ConnectHoc(LoginPage,
    [
        'loginReducers',
        'userMenuReducers',
        'DashboardFeaturesByAdminReducer'],
    {
        fetchUserMenus,
        signinUser,
        fetchLoggedInAdminUserInfo,
        fetchDashboardFeaturesByAdmin
    })
