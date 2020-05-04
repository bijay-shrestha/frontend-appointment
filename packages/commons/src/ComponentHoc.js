import React from 'react'
import {CommonUtils, menuRoles as roless, RolesUtils} from '@frontend-appointment/helpers';
import {Redirect} from 'react-router-dom'
import {CNavTabs} from '@frontend-appointment/ui-elements';
import connectHoc from './connectHoc'
const ComponentHoc = (ComposedComponent, userMenus, path, props) => {
    class CheckTabs extends React.PureComponent {
        state = {
            isLoading: true,
            filteredAction: [],
            filteredRolesTab: [],
            pathFound: false,
            currentActiveTab: 0,
            unauthorized: false
        }

        getAction = (childMenus, newPath) => {
            let filteredActions = []
            const {roles, path} = childMenus
            // const newPath1 = newPath.split('/')
            if (newPath.includes(path)) {
                roless.map((role, id) => {
                    roles.map((rol, ind) => {
                        if (Number(rol) === Number(role.id)) {
                            if (role.role_type === 'action') {
                                filteredActions.push({
                                    id: role.id,
                                    name: role.name,
                                    parent: role.parent_role_id
                                })
                            }
                        }
                        return rol;
                    })
                    return role;
                })
            }
            if (filteredActions.length) return filteredActions
            else {
                return [{id: '', name: '', parent: ''}]
            }
        }

        getUniquesElement = data => {
            let result = []
            //let flag = false
            if(data){
            if (data.length === 1) result.push(data[0])
            else {
                const map = new Map();
                for (const item of data) {
                    if(!map.has(item.id)){
                        map.set(item.id, true);    // set any value to Map
                        result.push({
                            ...item
                        });
                    }
                }
            }
            // console.log(result)
            return result
          }
        }

        removeDuplicatePathInUrl = newFilteredTabs => {
            let splittedPath = newFilteredTabs.split('/')
            let newPath = newFilteredTabs
            if (
                splittedPath[splittedPath.length - 1] ===
                splittedPath[splittedPath.length - 2]
            ) {
                splittedPath.pop()
                newPath = splittedPath.join('/')
            }
            return newPath
        }

        getFilterTabs = (filteredAction, newPath) => {
            let filteredTabs = [];
            let newBase = path.split('/');
            if (CommonUtils.checkIfOneArrayElementContainOther(RolesUtils.getOnlyAllTabsRoles(), newBase))
                newBase = newBase.splice(0, newBase.length - 1)
            newBase = newBase.join('/')
            roless.map(role => {
                filteredAction.map(actions => {
                    if (Number(actions.parent) === Number(role.id))
                        filteredTabs.push({
                            id: role.id,
                            url: this.removeDuplicatePathInUrl(`${newBase}${role.path}`),
                            name: role.name
                        })
                        return actions;
                })
                return role;
            })
            let newSet = this.getUniquesElement(filteredTabs)
            return newSet
        }

        checkRoles = () => {
            let filteredRolesTab = [],
                filteredAction = []
            const splittedPath = path.split('/')
            // console.log(splittedPath)
            let newPath = splittedPath.filter((sp, id) => id >= 1)
            newPath = newPath.join('/')
            newPath = '/'.concat(newPath)
            let newUserMenus = []
            if (userMenus.length) newUserMenus = [...userMenus]

            newUserMenus &&
            newUserMenus.map(userMenu => {
                const {childMenus} = userMenu
                if (userMenu.childMenus.length) {
                    childMenus.map((child) => {
                        filteredAction = [
                            ...filteredAction,
                            ...this.getAction(child, newPath)
                        ]
                        return child
                    })
                } else {
                    filteredAction = [
                        ...filteredAction,
                        ...this.getAction(userMenu, newPath)
                    ]
                }
                return userMenu
            })
            filteredRolesTab = [...this.getFilterTabs(filteredAction, newPath)]
            this.setState({
                filteredAction: [...filteredAction],
                filteredRolesTab: [...this.state.filteredRolesTab, ...filteredRolesTab]
            })
            return filteredRolesTab
        }

        checkIfPathIsTabPath = filteredRolesTab => {
            //const {filteredRolesTab} = this.state
            let isTab = false,
                loading = true,
                currentActiveTab
            if (filteredRolesTab.length) {
                for (let filteredRole of filteredRolesTab) {
                    if (this.removeDuplicatePathInUrl(filteredRole.url) === path) {
                        isTab = true
                        loading = false
                        currentActiveTab = filteredRole.id
                        break
                    }
                }
                if (isTab) {
                    this.setState({
                        pathFound: true,
                        isLoading: loading,
                        currentActiveTab: currentActiveTab,
                        unauthorized: false
                    })
                } else {
                    let newPathUrl = this.removeDuplicatePathInUrl(
                        filteredRolesTab[0].url
                    )
                    props.history.push(newPathUrl)
                }
            } else {
                this.setState({
                    pathFound: false,
                    isLoading: true,
                    unauthorized: true
                })
            }
        }

         async componentDidMount() {
             // console.log("===usermenus",userMenus);
            const filteredRolesTab = await this.checkRoles()
            this.checkIfPathIsTabPath(filteredRolesTab)
            this.props.dispatch({type:'LOCATION_CHANGE'})
        }

        render() {
            // console.log("========componenthoc",props)
            const {
                filteredAction,
                filteredRolesTab,
                isLoading,
                pathFound,
                currentActiveTab,
                unauthorized
            } = this.state
            return !isLoading &&
            filteredAction.length &&
            filteredRolesTab.length &&
            pathFound ? (
                <>
                    <CNavTabs
                        filteredAction={filteredAction}
                        roles={filteredRolesTab}
                        currentActiveTab={currentActiveTab}
                        customClass="page-tabs"
                    />
                    <ComposedComponent
                        {...this.props}
                        {...props}
                        filteredAction={filteredAction}
                        roles={filteredRolesTab}
                        hasTabs={true}
                    />
                </>
            ) : isLoading && !unauthorized ? (
                <div>loading</div>
            ) : (
                <Redirect to="/unauthorized"/>
            )
        }
    }
 return connectHoc(CheckTabs,[],null);
}

export default ComponentHoc
