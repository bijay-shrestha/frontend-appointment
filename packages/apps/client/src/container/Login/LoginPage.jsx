import {fetchLoggedInAdminUserInfo, fetchUserMenus, signinUser} from '@frontend-appointment/thunk-middleware';
import {ClientLogin} from '@frontend-appointment/ui-components';
import React from 'react';
import {ConnectHoc} from '@frontend-appointment/commons';
import {LocalStorageSecurity} from '@frontend-appointment/helpers';


class LoginPage extends React.PureComponent {
    onSubmitHandler = async user => {
        try {
            await this.props.signinUser('/api/v1/login', {...user});
            await this.props.fetchUserMenus('/api/v1/sidebar', {
                username: user.username, hospitalCode: user.hospitalCode});
            await this.props.fetchLoggedInAdminUserInfo('/api/v1/admin/info',
                {username: user.username});
                
            const selectedPath = LocalStorageSecurity.localStorageDecoder("active");
            const pathToRedirect = selectedPath ? "" + selectedPath.replace("true", "") : "/dashboard"
            await this.props.history.push(pathToRedirect);
            return null;
        } catch (e) {
            console.log(e);
            const err = e.errorMessage
                ? e.errorMessage
                : 'Sorry Server Could not process data';
            return err;
        }
    };
    componentDidMount(){
        document.title="Cogent-Appointment-Client"
    }
    render() {
        return <ClientLogin {...this.props} onSubmitHandler={this.onSubmitHandler}/>;
    }
}

//Mapping the thunkActions to Dispatcher to props
export default ConnectHoc(
    LoginPage,
    ['loginReducers', 'userMenuReducers'],
    {
        fetchUserMenus,
        signinUser,
        fetchLoggedInAdminUserInfo
    }
);
