import React, {PureComponent} from 'react';
import {Redirect} from "react-router-dom";
import {menuRoles} from "@frontend-appointment/helpers";
import {CLoading} from "@frontend-appointment/ui-elements";
import connectHoc from './connectHoc';
const SingleTabComponentHOC = (ComposedComponent, userMenus, path, props) => {
    class SingleTabComponent extends PureComponent {

        state = {
            isLoading: true,
            filteredAction: [],
            unauthorized: false
        };

        getFilteredRole = (assignedRolesList) => {
            let filteredAction = [];
            assignedRolesList.map(assignedRole => {
                let roleObj = menuRoles.find(menuRole => Number(menuRole.id) === Number(assignedRole));
                roleObj && filteredAction.push({
                    id: roleObj.id,
                    name: roleObj.name,
                    parent: roleObj.parent_role_id
                })
                return assignedRole;
            });
            return filteredAction;
        };

        checkRolesAssigned = () => {
            let filteredAction = [], userMenuList = userMenus.length ? [...userMenus] : [];
            const splitPath = path.split('/');
            let pathWithoutBase = splitPath.filter((sp, id) => id >= 1);
            pathWithoutBase = pathWithoutBase.join('/');
            pathWithoutBase = '/'.concat(pathWithoutBase);

            let currentMenu = new Set();
            userMenuList.map(
                userMenu => {
                    let childMenus = userMenu.childMenus;
                    if (childMenus.length) {
                        let menu = childMenus.find(child => pathWithoutBase.includes(child.path));
                        if (menu) currentMenu.add(menu);
                    } else {
                        if (pathWithoutBase.includes(userMenu.path)) currentMenu.add(userMenu);
                    }
                    return userMenu;
                }

            );

            let menusMatchingPath = Array.from(currentMenu);
            if (menusMatchingPath.length) {
                menusMatchingPath.map(menu => filteredAction = [...this.getFilteredRole(menu.roles)])
            }

            this.setState({
                filteredAction: [...filteredAction],
                isLoading: filteredAction.length <= 0,
                unauthorized: Boolean(filteredAction.length)
            })
        };

        async componentDidMount() {
            await this.checkRolesAssigned();
            this.props.dispatch({type:'LOCATION_CHANGE'})
        }

        render() {
            const {
                filteredAction,
                isLoading,
                unauthorized
            } = this.state;
            return (
                !isLoading && filteredAction.length ?
                    (
                        <ComposedComponent
                            {...this.props}
                            {...props}
                            filteredAction={filteredAction}
                            hasTabs={false}
                        />
                    )
                    : isLoading && !unauthorized ? (
                        <CLoading/>
                    )
                    : (
                        <Redirect to="/unauthorized"/>
                    )
            )
        }
    }

    return connectHoc(SingleTabComponent,[],null);
};

export default SingleTabComponentHOC;
