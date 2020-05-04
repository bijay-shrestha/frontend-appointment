import React from 'react';
import {Accordion, Card, Col, Row} from "react-bootstrap";
import {
   // CCheckbox,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect,
    CHybridTextArea,
    CRadioButton,
    CScrollbar
} from "@frontend-appointment/ui-elements";
import {AuditableEntityHoc} from '@frontend-appointment/commons';
class ModalContent extends React.PureComponent {

    state = {
        childMenusOfSelectedParent: [],
        activeKey: '',
        activeKeyChild: '',
        selectedChildMenu: '',
        tabsWithRolesForSelectedMenu: []
    };

    handleParentMenuClick = childMenusOfParent => {
        let menuType = Array.isArray(childMenusOfParent);
        let menuToGetRolesOf = menuType ? childMenusOfParent[0] : childMenusOfParent;
        let tabsWithRoles = this.getTabsAndRolesForSelectedMenu(menuToGetRolesOf);
        this.setState({
            activeKey: menuToGetRolesOf.parentId !== null ? menuToGetRolesOf.parentId : menuToGetRolesOf.id,
            activeKeyChild: menuToGetRolesOf.parentId !== null ? menuToGetRolesOf.id : '',
            childMenusOfSelectedParent: Array.isArray(childMenusOfParent) ? childMenusOfParent : [],
            tabsWithRolesForSelectedMenu: [...tabsWithRoles],
            selectedChildMenu: menuToGetRolesOf
        });
    };

    handleChildMenuClick = childMenu => {
        let tabsWithRoles = this.getTabsAndRolesForSelectedMenu(childMenu);
        this.setState({
            activeKeyChild: childMenu.id,
            tabsWithRolesForSelectedMenu: [...tabsWithRoles],
            selectedChildMenu: childMenu
        });
    };

    getTabsAndRolesForSelectedMenu(childMenu) {

        const rolesJson = JSON.stringify([...this.props.rolesJson]);
        const roles = JSON.parse(rolesJson);

        const selectedRoles = this.props.profileData.selectedMenus.filter(menu => Number(menu.userMenuId) === Number(childMenu.id));
        let rolesForSelectedMenu = [];
        let tabs = new Set();

        roles.map(role => {
            if (childMenu.roles.includes(role.id)
                && selectedRoles.find(selectedRole => (selectedRole.roleId === role.id)
                    && (Number(selectedRole.userMenuId) === Number(childMenu.id)))) {
                rolesForSelectedMenu.push(role);
                let parent = roles.find(rol => rol.id === role.parent_role_id);
                tabs.add(parent);
            }
            return role;
        });
        let tabsWithRoles = Array.from(tabs).map(tab => {
            return {
                id: tab.id,
                name: tab.name,
                isChecked: true,
                status: tab.status,
                parent_role_id: tab.parent_role_id,
                roles: rolesForSelectedMenu.filter(role => role.parent_role_id === tab.id)
            }
        });
        return tabsWithRoles;
    }

    componentDidMount() {
        this.props.profileData.selectedUserMenusForModal
        && this.props.profileData.selectedUserMenusForModal.length !== 0
        && this.handleParentMenuClick(
            this.props.profileData.selectedUserMenusForModal[0].childMenus.length ?
                this.props.profileData.selectedUserMenusForModal[0].childMenus
                : this.props.profileData.selectedUserMenusForModal[0]);
    }

    render() {
        const {profileData} = this.props;
        return <>
            {/* <Col sm={12} md={12} > */}
            <Container-fluid>
                {/*<Row className="pl-4 pr-4"><h5>Profile Info</h5></Row>*/}

                <CForm
                    id="profile-info"
                    className="mt-2 add-info">
                    <Container-fluid>
                        <Row>
                            <Col sm={4} md={4} lg={4}>
                                <CHybridSelect
                                    id="department"
                                    label="Department"
                                    name="selectedDepartment"
                                    // options={departmentList}
                                    value={profileData.departmentValue}
                                    isDisabled={true}
                                />
                            </Col>
                            <Col sm={4} md={4} lg={4}>
                                <CHybridInput
                                    id="profile-name"
                                    name="profileName"
                                    placeholder="Profile Name"
                                    value={profileData.profileName}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={4} md={4} lg={4}>
                                <CHybridTextArea
                                    id="profile-description"
                                    name="profileDescription"
                                    placeholder="Profile Description"
                                    value={profileData.profileDescription}
                                    disabled={true}
                                />
                            </Col>
                            {AuditableEntityHoc(profileData,false,4)}
                            <Col sm={4} md={4} lg={4}>
                                <CFLabel labelName="Status" id="status"></CFLabel>
                                <CRadioButton
                                    checked={profileData.status === "Y"}
                                    disabled={true}
                                    readOnly={true}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                />

                                <CRadioButton
                                    checked={profileData.status === "N"}
                                    disabled={true}
                                    readOnly={true}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                />
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>

            </Container-fluid>
            <h5> Assigned Menus</h5>
            <Container-fluid>
                <Row className="view-assigned-menu">
                    {profileData.selectedUserMenusForModal && profileData.selectedUserMenusForModal.length !== 0 ?
                        <>
                            <Col sm={12} md={6} lg={3} className="menu-list-wrapper">
                                <div className="assign-menu">
                                    <div className="am-header">
                                        <span className="am-title">
                                            Menus
                                        </span>
                                    </div>
                                    <CScrollbar
                                        id="menus"
                                        autoHide={true}
                                        style={{height: 313}}>
                                        <Accordion
                                            activeKey={this.state.activeKey}
                                        >
                                            {profileData.selectedUserMenusForModal.length !== 0 && profileData.selectedUserMenusForModal.map(userMenu =>
                                                <Card
                                                    key={userMenu.id}>
                                                    <Accordion.Toggle
                                                        eventKey={userMenu.id}
                                                        key={userMenu.id}
                                                        as={Card.Header}
                                                        className={this.state.activeKey === userMenu.id ?
                                                            'activeParent' : ''}
                                                        onClick={() => this.handleParentMenuClick(userMenu.childMenus.length ? userMenu.childMenus : userMenu)}>
                                                        <i className={userMenu.icon}> </i>
                                                        {userMenu.name}
                                                    </Accordion.Toggle>
                                                </Card>
                                            )}
                                        </Accordion>
                                    </CScrollbar>
                                </div>
                            </Col>
                            <Col sm={12} md={6} lg={3} className="menu-list-wrapper">
                                <div className="assign-menu">
                                    <div className="am-header">
                                        <span className="am-title">
                                            Sub Menus
                                        </span>
                                    </div>
                                    <CScrollbar
                                        id="menus"
                                        autoHide={true}
                                        style={{height: 313}}>
                                        <Accordion
                                            activeKey={this.state.activeKeyChild}>
                                            {this.state.childMenusOfSelectedParent.length !== 0 &&
                                            this.state.childMenusOfSelectedParent.map(childMenu =>
                                                <Card
                                                    key={childMenu.id}>
                                                    <Accordion.Toggle
                                                        eventKey={childMenu.id}
                                                        key={childMenu.id}
                                                        as={Card.Header}
                                                        className={this.state.activeKeyChild === childMenu.id ?
                                                            'activeChild' : ''}
                                                        onClick={() => this.handleChildMenuClick(childMenu)}>
                                                        {childMenu.icon}{childMenu.name}
                                                    </Accordion.Toggle>
                                                </Card>
                                            )}
                                        </Accordion>
                                    </CScrollbar>
                                </div>
                            </Col>
                            <Col sm={12} md={12} lg={6} className="menu-list-wrapper">
                                <div className="assign-previledge">
                                    <div className="am-header">
                                    <span className="am-title">
                                       Assigned Roles : {this.state.selectedChildMenu.name}
                                    </span>
                                    </div>
                                    <CScrollbar
                                        id="menus"
                                        autoHide={true}
                                      >
                                        <div className="assign-body">
                                            {this.state.tabsWithRolesForSelectedMenu.map(tabWithRoles =>
                                                <div
                                                    className="assign-item"
                                                    key={tabWithRoles.id}>
                                                    <div
                                                        key={tabWithRoles.id}
                                                        className="assign-header">
                                                        <i className=" fa fa-check"> </i> {tabWithRoles.name ?
                                                        tabWithRoles.name : this.state.selectedChildMenu.name}

                                                    </div>
                                                    {/*Roles of child menus*/}
                                                    <Row>
                                                        {tabWithRoles.roles.map(role =>
                                                            <Col
                                                                key={role.id}
                                                                sm={6}>
                                                                <i className=" fa fa-check"> </i> {role.name}

                                                            </Col>
                                                        )}
                                                    </Row>
                                                </div>
                                            )}
                                        </div>
                                    </CScrollbar>
                                </div>
                            </Col>
                        </> :
                        <Col sm={12} md={6} lg={3} className="menu-list-wrapper">
                            <div className="assign-menu">
                                <div className="filter-message">
                                    <div className="no-data">
                                        <i className="fa fa-file-text-o"></i>
                                    </div>
                                    <div
                                        className="message text-center">No Menus Selected
                                    </div>
                                </div>
                            </div>
                        </Col>
                    }
                </Row>
            </Container-fluid>
        </>;
    }
}

export default ModalContent;
