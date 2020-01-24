import React from 'react'
import {Axios} from '@frontend-appointment/core'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom';
import {CLoading} from '@frontend-appointment/ui-components';
import {CFullPageLoading} from '@frontend-appointment/ui-elements';
import {UserMenusFilter} from '@frontend-appointment/helpers';

const LoginHoc = (ComposedComponent, rolesPath, logoutPath, dashboardPath, userMenusPath) => {
    return class SingleSignOn extends React.PureComponent {
        state = {isLoading: true, isOk: false};
        hitUserMenusApi = async hitUserMenus => {
            if (hitUserMenus) {
                const response = await Axios.put(userMenusPath, {
                    username: 'admin',
                    subDepartmentCode: process.env.REACT_APP_SUB_DEPARTMENT_CODE
                });
                UserMenusFilter(response.data)
            }
        };

        genericApi = async (path, success, error, hitUserMenus) => {
            try {
                await Axios.get(path);
                await this.hitUserMenusApi(hitUserMenus);
                this.setState({
                    isLoading: success.isLoading,
                    isOk: success.isOk
                })
            } catch (e) {
                this.setState({isLoading: error.isLoading, isOk: error.isOk})
            }
        };

        cookieHandler = async () => {
            Cookies.get('XSRF-TOKEN')
                ? await this.genericApi(
                rolesPath,
                {isLoading: false, isOk: true},
                {isLoading: false, isOk: false},
                true
                )
                : await this.genericApi(
                logoutPath,
                {isLoading: false, isOk: true},
                {isLoading: false, isOk: false},
                false
                )
        };

        componentDidMount() {
            // this.cookieHandler();
        }

        render() {
            return !this.state.isLoading && !this.state.isOk ? (
                <ComposedComponent {...this.props} history={this.props.history}/>
            ) : this.state.isLoading && !this.state.isOk ? (
                <CFullPageLoading/>
            ) : (
                <Redirect to={dashboardPath}/>
            )
        }
    }
};
export default LoginHoc;
