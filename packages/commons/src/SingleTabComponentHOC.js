import React, {PureComponent} from 'react';
import {Redirect} from "react-router-dom";
import {menuRoles} from "@frontend-appointment/helpers";

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
            });
            return filteredAction;
        };

        checkRolesAssigned = () => {
            let filteredAction = [], userMenuList = userMenus.length ? [...userMenus] : [];
            const splitPath = path.split('/');
            let pathWithoutBase = splitPath.filter((sp, id) => id >= 1);
            pathWithoutBase = pathWithoutBase.join('/');
            pathWithoutBase = '/'.concat(pathWithoutBase);

            let parentMenu = userMenuList.find(userMenu => pathWithoutBase.includes(userMenu.path));
            let childMenu = parentMenu && parentMenu.childMenus.find(child => pathWithoutBase.includes(child.path));

            if (parentMenu && parentMenu.childMenus.length === 0) {
                filteredAction = [...this.getFilteredRole(parentMenu.roles)]
            }else {
                filteredAction = childMenu && [...this.getFilteredRole(childMenu.roles)]
            }

            this.setState({
                filteredAction: [...filteredAction],
                isLoading: filteredAction.length <= 0,
                unauthorized: Boolean(filteredAction.length)
            })
        };

        async componentDidMount() {
            await this.checkRolesAssigned();
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
                        <>
                            <ComposedComponent
                                {...this.props}
                                {...props}
                                filteredAction={filteredAction}
                                hasTabs={false}
                            />
                        </>
                    )
                    : isLoading && !unauthorized ? (
                        <div>loading</div>
                    )
                    : (
                        <Redirect to="/unauthorized"/>
                    )
            )
        }
    }

    return <SingleTabComponent/>;
};

export default SingleTabComponentHOC;
