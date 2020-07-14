import React, {PureComponent} from 'react'
import {ComponentHoc, ConnectHoc, NoRoleTabComponentHOC, SingleTabComponentHOC} from '@frontend-appointment/commons'
import {
    AdminInfoUtils,
    CommonUtils,
    EnvironmentVariableGetter,
    LocalStorageSecurity
} from '@frontend-appointment/helpers'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    DashboardDetailsMiddleware,
    fetchLoggedInAdminIP,
    fetchLoggedInAdminUserInfo,
    fetchUserMenusNew,
    MinioMiddleware,
    signinUser
} from '@frontend-appointment/thunk-middleware'
import {CLoading, CUnauthorized} from '@frontend-appointment/ui-elements'

const {fetchPresignedUrlForGetOperation} = MinioMiddleware;

const {fetchDashboardFeaturesByAdmin} = DashboardDetailsMiddleware
const {DASHBOARD_FEATURE} = AdminModuleAPIConstants.DashboardApiConstant
const {
    GET_LOGGED_IN_ADMIN_INFO,
    GET_SIDEBAR_DATA
} = AdminModuleAPIConstants.initialApiConstantsOfAdmin

class StartupApiHoc extends PureComponent {
    state = {
        fetch: false,
        loading: true
    }
    startUpApiCall = async () => {
        const auth_token = EnvironmentVariableGetter.AUTH_TOKEN
        try {
            const user = await CommonUtils.getUserNameHospitalIdAndAdminId(
                LocalStorageSecurity.localStorageDecoder(auth_token)
            )
            if (!LocalStorageSecurity.localStorageDecoder('userMenus')) {
                await this.props.fetchUserMenusNew(GET_SIDEBAR_DATA, {
                    username: user.username,
                    hospitalCode: user.hospitalCode
                })
                this.setState({fetch: true, loading: false})
            }
            if (!LocalStorageSecurity.localStorageDecoder('adminInfo')) {
                await this.props.fetchLoggedInAdminUserInfo(GET_LOGGED_IN_ADMIN_INFO, {
                    email: user.username
                })
            } else {
                let adminData = LocalStorageSecurity.localStorageDecoder('adminInfo');
                adminData.fileUri = await fetchPresignedUrlForGetOperation(adminData.fileLocation || '') || ''
                await AdminInfoUtils.saveLoggedInAdminInfo(adminData);
            }
            if (!LocalStorageSecurity.localStorageDecoder('adminDashRole')) {
                const featuresAdmin = await this.props.fetchDashboardFeaturesByAdmin(
                    DASHBOARD_FEATURE,
                    user.id
                )
                LocalStorageSecurity.localStorageEncoder(
                    'adminDashRole',
                    featuresAdmin.data
                )
            }
            if (!LocalStorageSecurity.localStorageDecoder("adminIp")) {
                const adminIp = await this.props.fetchLoggedInAdminIP();
                LocalStorageSecurity.localStorageEncoder('adminIp', adminIp)
            }
        } catch (e) {
            let userMenus = this.getUserMenusFromLocalStorage()
            if (!userMenus.length) this.setState({fetch: false, loading: false})
        }
    }

    getUserMenusFromLocalStorage = () => {
        const userMenus = LocalStorageSecurity.localStorageDecoder('userMenus')
        return userMenus ? userMenus : []
    }

    async componentDidMount() {
        await this.startUpApiCall()
    }

    render() {
        const {fetch, loading} = this.state
        const {ComposedComponent, otherProps} = this.props
        const {component, activeStateKey, hasTab, isSingleTab} = otherProps
        return this.getUserMenusFromLocalStorage().length ? (
            <ComposedComponent
                {...otherProps}
                history={this.props.history}
                {...this.props}
                userMenus={this.getUserMenusFromLocalStorage()}
                MainViewComponent={
                    hasTab
                        ? ComponentHoc(
                        component,
                        this.getUserMenusFromLocalStorage(),
                        activeStateKey,
                        this.props
                        )
                        : isSingleTab
                        ? SingleTabComponentHOC(
                            component,
                            this.getUserMenusFromLocalStorage(),
                            activeStateKey,
                            this.props
                        )
                        : NoRoleTabComponentHOC(
                            component,
                            this.getUserMenusFromLocalStorage(),
                            activeStateKey,
                            this.props
                        )
                }
            />
        ) : !loading && !fetch ? (
            <ComposedComponent
                {...otherProps}
                history={this.props.history}
                userMenus={this.getUserMenusFromLocalStorage()}
                MainViewComponent={CUnauthorized}
            />
        ) : (
            <ComposedComponent
                {...otherProps}
                history={this.props.history}
                userMenus={this.getUserMenusFromLocalStorage()}
                MainViewComponent={CLoading}
            />
        )
    }
}

export default ConnectHoc(StartupApiHoc, [], {
    fetchUserMenusNew,
    signinUser,
    fetchLoggedInAdminUserInfo,
    fetchDashboardFeaturesByAdmin,
    fetchLoggedInAdminIP
})
