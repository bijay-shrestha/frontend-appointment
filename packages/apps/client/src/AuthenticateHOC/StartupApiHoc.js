import React, {PureComponent} from 'react'
import {ComponentHoc, ConnectHoc, NoRoleTabComponentHOC, SingleTabComponentHOC} from '@frontend-appointment/commons'
import {
    AdminInfoUtils,
    CommonUtils,
    EnvironmentVariableGetter,
    LocalStorageSecurity,
} from '@frontend-appointment/helpers'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    DashboardDetailsMiddleware,
    fetchLoggedInAdminIP,
    fetchLoggedInAdminUserInfo,
    fetchUserMenusNew,
    logoutUser,
    MinioMiddleware,
    signinUser
} from '@frontend-appointment/thunk-middleware'
import {CLoading, CUnauthorized} from '@frontend-appointment/ui-elements'

const {fetchDashboardFeaturesByAdmin} = DashboardDetailsMiddleware
const {DASHBOARD_FEATURE} = AdminModuleAPIConstants.DashboardApiConstant

const {fetchPresignedUrlForGetOperation} = MinioMiddleware;

const {
    GET_LOGGED_IN_ADMIN_INFO_CLIENT,
    GET_SIDEBAR_DATA
} = AdminModuleAPIConstants.initialApiConstantsOfAdmin

// const {fetchFavouritesByAdminId, saveFavourites, updateFavourites} = FavouritesMiddleware
// const {FETCH_FAVOURITES_FOR_DROPDOWN, SAVE_FAVOURITES, UPDATE_FAVOURITES} = AdminModuleAPIConstants.favouritesApiConstants

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
                await this.props.fetchLoggedInAdminUserInfo(GET_LOGGED_IN_ADMIN_INFO_CLIENT, {
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
            if (!LocalStorageSecurity.localStorageDecoder("clientIp")) {
                const clientIp = await this.props.fetchLoggedInAdminIP();
                LocalStorageSecurity.localStorageEncoder('clientIp', clientIp)
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

    logoutHandler = e => {
        if (e.key === EnvironmentVariableGetter.AUTH_TOKEN && e.oldValue && !e.newValue) {
            this.props.logoutUser();
            this.props.history.push('/');
        }
    }

    // fetchLoggedInAdminFavourites = async () => {
    //     try {
    //         await this.props.fetchFavouritesByAdminId(FETCH_FAVOURITES_FOR_DROPDOWN);
    //     } catch (e) {
    //         console.log("ERRRRRRRR", e)
    //     }
    // }
    //
    // addToFavourites = async (menu) => {
    //     let requestData = {
    //         userMenuId: menu.id
    //     }
    //     try {
    //         const response = await this.props.saveFavourites(SAVE_FAVOURITES, requestData)
    //         await this.fetchLoggedInAdminFavourites();
    //     } catch (e) {
    //         console.log("ADD ERROR", e)
    //     }
    // }
    //
    // removeFromFavourites = async (menu) => {
    //     try {
    //         const response = await this.props.updateFavourites(UPDATE_FAVOURITES, menu)
    //         await this.fetchLoggedInAdminFavourites()
    //     } catch (e) {
    //
    //     }
    // }

    async componentDidMount() {
        window.addEventListener('storage', this.logoutHandler)
        await this.startUpApiCall()
    }

    componentWillUnmount() {
        window.removeEventListener('storage', this.logoutHandler)
    }

    render() {
        const {fetch, loading} = this.state
        const {ComposedComponent, otherProps} = this.props
        const {component, activeStateKey, hasTab, isSingleTab} = otherProps

        // const {favouritesList} = this.props.FavouritesDropdownReducer;

        return this.getUserMenusFromLocalStorage().length ? (
            <ComposedComponent
                {...otherProps}
                history={this.props.history}
                {...this.props}
                // favouritesProp={{
                //     favouritesList: favouritesList,
                //     addToFavourites: this.addToFavourites,
                //     removeFromFavourites: this.removeFromFavourites,
                //     fetchLoggedInAdminFavourites: this.fetchLoggedInAdminFavourites
                // }}
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

export default ConnectHoc(StartupApiHoc, [
    // 'FavouritesSaveReducer',
    // 'FavouritesUpdateReducer',
    // 'FavouritesDropdownReducer'
], {
    fetchUserMenusNew,
    signinUser,
    fetchLoggedInAdminUserInfo,
    fetchDashboardFeaturesByAdmin,
    fetchLoggedInAdminIP,
    logoutUser,
    // fetchFavouritesByAdminId,
    // saveFavourites,
    // updateFavourites
})
