import React, {PureComponent} from 'react';
import {Accordion, Card, Col, Row} from "react-bootstrap";
import {CCheckbox, CScrollbar, CSearch} from "@frontend-appointment/ui-elements";
import {menuRoles, TryCatchHandler} from '@frontend-appointment/helpers';

class ProfileUpdateMenuAssignment extends PureComponent {

    state = {
        showModal: false,
        tabs: [],
        rolesForTabs: [],
        tabsCopyForSearch: [],
        rolesCopyForSearch: [],
        currentSelectedChildMenu: '',
        activeKey: '',
        checkedAllRolesAndTabs: false,
        checkedAllUserMenus: false,
        totalNoOfMenusAndRoles: 0,
        userMenus: []// For displaying user menus ,value will be changing when searched.
    };

    setShowModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    checkIfUserMenusHaveBeenSelected = (tabsData, rolesForTabs, childMenu) => {
        let allTabsChecked;
        if (this.state.checkedAllUserMenus) {
            for (let tabVal of tabsData) {
                tabVal.isChecked = this.state.checkedAllUserMenus;
            }
            for (let role of rolesForTabs) {
                role.isChecked = this.state.checkedAllUserMenus;
            }
            allTabsChecked = true;
        } else {
            rolesForTabs.forEach(role =>
                role.isChecked = !!this.props.selectedMenus.find(selected =>
                    Number(selected.roleId) === Number(role.id) && Number(childMenu.id) === Number(selected.userMenuId)
                    && selected.status === 'Y')
            );
            tabsData.forEach(tab => {
                let totalNumberOfRolesForTab = rolesForTabs.filter(role => Number(role.parent_role_id) === Number(tab.id)).length,
                    selectedNumberOfRolesForTab = rolesForTabs.filter(role =>
                        (Number(role.parent_role_id) === Number(tab.id) && role.isChecked === true)).length;
                tab.isChecked = totalNumberOfRolesForTab === selectedNumberOfRolesForTab;
            });

            let totalNumberOfTabsForMenu = tabsData.length,
                selectedNumberOfTabsForMenu = tabsData.filter(tabs => tabs.isChecked === true).length;
            allTabsChecked = totalNumberOfTabsForMenu === selectedNumberOfTabsForMenu;
        }
        return {tabsData, rolesForTabs, allTabsChecked};
    };

    setCurrentChildMenuAndTabsWithRoles = async (childMenu) => {
        const rolesJson = JSON.stringify([...menuRoles]);
        const allRolesFromJson = JSON.parse(rolesJson);

        let rolesForSelectedMenu = [];
        let tabs = new Set();

        allRolesFromJson.map(role => {
            if (childMenu.roles.includes(role.id)) {
                rolesForSelectedMenu.push(role);
                let parent = allRolesFromJson.find(rol => rol.id === role.parent_role_id);
                tabs.add(parent);
            }
        });

        let {tabsData, rolesForTabs, allTabsChecked} = this.checkIfUserMenusHaveBeenSelected(Array.from(tabs), rolesForSelectedMenu, childMenu);
        await this.setState({
            currentSelectedChildMenu: childMenu,
            tabs: [...tabsData],
            rolesForTabs: [...rolesForTabs],
            tabsCopyForSearch: [...tabsData],
            rolesCopyForSearch: [...rolesForTabs],
            checkedAllRolesAndTabs: allTabsChecked
        });
    };

    handleAccordionSelect = async parentMenu => {
        let active = parentMenu.id === this.state.activeKey ? "0" : parentMenu.id.toString();
        !parentMenu.childMenus.length > 0 && await this.setCurrentChildMenuAndTabsWithRoles(parentMenu);

        this.setState({
            activeKey: active
        });
    };

    setTotalNumberOfMenusAndRoles = async () => {
        let countOfMenus = 0;
        this.props.userMenus.forEach(menu => {
            if (menu.childMenus.length) {
                menu.childMenus.forEach(childMenu => {
                    countOfMenus += childMenu.roles.length;
                })
            } else {
                countOfMenus += menu.roles.length;
            }
        });
        await this.setState({
            userMenus: [...this.props.userMenus],
            totalNoOfMenusAndRoles: countOfMenus,
            checkedAllUserMenus: countOfMenus === this.props.selectedMenus.length
        });
    };

    handleChildMenuClick = async menu => {
        await this.setCurrentChildMenuAndTabsWithRoles(menu);
    };

    checkIfAllRolesOfTabHasBeenChecked = tabId => {
        let currentTabs = [...this.state.tabsCopyForSearch],
            totalNumberOfRolesForTab = this.state.rolesCopyForSearch.filter(role => role.parent_role_id === tabId).length,
            selectedNumberOfRolesForTab = this.state.rolesCopyForSearch.filter(role =>
                (role.parent_role_id === tabId && role.isChecked === true)).length,
            index = currentTabs.findIndex(tab => tab.id === tabId);

        currentTabs[index].isChecked = totalNumberOfRolesForTab === selectedNumberOfRolesForTab;

        this.setState({
            tabs: [...currentTabs],
        });
    };

    checkIfAllTabsOfChildMenuHasBeenChecked = () => {
        let totalNumberOfTabsForMenu = this.state.tabsCopyForSearch.length,
            selectedNumberOfTabsForMenu = this.state.tabsCopyForSearch.filter(tabs => tabs.isChecked === true).length,
            allTabsChecked = totalNumberOfTabsForMenu === selectedNumberOfTabsForMenu;

        this.setState({
            checkedAllRolesAndTabs: allTabsChecked,
        });
    };

    checkIfAllUserMenusAndRolesSelected = () => {
        let countOfMenusWithActiveStatus = this.props.selectedMenus.filter(menu => menu.status === "Y").length;
        let allMenuChecked = this.state.totalNoOfMenusAndRoles === countOfMenusWithActiveStatus;

        if (this.state.checkedAllUserMenus !== allMenuChecked) {
            this.setState({
                checkedAllUserMenus: allMenuChecked
            });
        }
    };

    toggleAndAdd = (role, rolesToAddOrRemove) => {
        role.isChecked = !role.isChecked;
        rolesToAddOrRemove.push(role);
    };

    handleTabsAndRolesCheck = async (isRole, roleOrTabData) => {
        let currentRoles = [...this.state.rolesForTabs],
            currentTabs = [...this.state.tabs],
            rolesToAddOrRemove = [];

        if (isRole) {
            let index = currentRoles.findIndex(role => role.id === roleOrTabData.id);
            currentRoles[index].isChecked = !currentRoles[index].isChecked;
            rolesToAddOrRemove.push(roleOrTabData);
            this.checkIfAllRolesOfTabHasBeenChecked(roleOrTabData.parent_role_id);
        } else {
            // CASE TAB IS SELECTED - SELECT ALL ROLES
            let index = this.state.tabs.findIndex(tab => tab.id === roleOrTabData.id);
            currentTabs[index].isChecked = !currentTabs[index].isChecked;
            currentRoles.forEach(role => {
                if (role.parent_role_id === roleOrTabData.id) {
                    currentTabs[index].isChecked ?
                        // CASE: When tab is selected and role is not selected.
                        !role.isChecked && this.toggleAndAdd(role, rolesToAddOrRemove)
                        :
                        // CASE: When tab is not selected and role is selected.
                        role.isChecked && this.toggleAndAdd(role, rolesToAddOrRemove);

                }
            });
        }
        this.checkIfAllTabsOfChildMenuHasBeenChecked();
        this.props.onTabAndRolesChange(rolesToAddOrRemove, this.state.currentSelectedChildMenu);
        await this.setState({
            tabs: [...currentTabs],
            rolesForTabs: [...currentRoles]
        });
        this.checkIfAllUserMenusAndRolesSelected();
    };

    handleCheckAllRolesAndTabs = async childMenu => {
        let tabsForChildMenu = [...this.state.tabs],
            rolesForChildMenu = [...this.state.rolesForTabs],
            allTabsAndRolesChecked = !this.state.checkedAllRolesAndTabs;

        tabsForChildMenu.forEach(tab => {
            tab.isChecked = allTabsAndRolesChecked;
        });

        rolesForChildMenu.forEach(role => {
            role.isChecked = allTabsAndRolesChecked;
        });

        this.props.onTabAndRolesChange(rolesForChildMenu, childMenu);

        await this.setState({
            tabs: [...tabsForChildMenu],
            rolesForTabs: [...rolesForChildMenu],
            checkedAllRolesAndTabs: allTabsAndRolesChecked
        });
        this.checkIfAllUserMenusAndRolesSelected();
    };

    handleCheckAllUserMenus = async userMenus => {
        let tabsForChildMenu = [...this.state.tabs],
            rolesForChildMenu = [...this.state.rolesForTabs],
            allUserMenusSelected = !this.state.checkedAllUserMenus;

        tabsForChildMenu.forEach(tab => {
            tab.isChecked = allUserMenusSelected;
        });
        rolesForChildMenu.forEach(role => {
            role.isChecked = allUserMenusSelected;
        });

        this.setState({
            tabs: [...tabsForChildMenu],
            rolesForTabs: [...rolesForChildMenu],
            checkedAllRolesAndTabs: allUserMenusSelected,
            checkedAllUserMenus: allUserMenusSelected
        });

        await this.props.onCheckAllUserMenus(userMenus, allUserMenusSelected);

        this.checkIfUserMenusHaveBeenSelected(tabsForChildMenu, rolesForChildMenu, this.state.currentSelectedChildMenu);
    };

    searchMenus = async event => {
        let keyWord = event.target.value;
        let menusMatchingKeyWord = [];

        if (keyWord !== '') {
            keyWord = keyWord.toLowerCase();
            this.props.userMenus.forEach(
                userMenu => {
                    if ((userMenu.name).toLowerCase().includes(keyWord)) {
                        // IF PARENT MATCHES THE KEYWORD,ADD PARENT AND ALL ITS CHILDREN
                        menusMatchingKeyWord.push(userMenu);
                    } else {
                        // IF PARENT DID NOT MATCH CHECK CHILDREN, IF ANY  CHILD MATCHED ADD  PARENT AND CHILD
                        let childrenMatchingKeyWord = userMenu.childMenus.filter(
                            child => (child.name).toLowerCase().includes(keyWord));
                        if (childrenMatchingKeyWord.length > 0) {
                            let parent = {...userMenu};
                            parent.childMenus = [];
                            parent.childMenus = [...childrenMatchingKeyWord];
                            menusMatchingKeyWord.push(parent);
                        }
                    }
                }
            )
        } else {
            menusMatchingKeyWord = [...this.props.userMenus];
        }

        // if (menusMatchingKeyWord.length > 0) {
        await this.setState({
            userMenus: [...menusMatchingKeyWord]
        });
        // }
    };

    searchTabsAndRoles = async event => {
        let keyWord = event.target.value;

        let tabsMatchingKeyword = [],
            rolesMatchingKeyword = [];
        if (keyWord !== '') {
            keyWord = keyWord.toLowerCase();
            // CHECK IF ANY TABS CONTAIN THE KEYWORD
            this.state.tabsCopyForSearch.forEach(tab => {
                if ((tab.name).toLowerCase().includes(keyWord)) {
                    // tabsMatchingKeyword.push(tab);
                    // IF ANY TABS CONTAIN KEYWORD, ADD ALL ITS ROLES
                    this.state.rolesCopyForSearch
                        .forEach(role => role.parent_role_id === tab.id ? rolesMatchingKeyword.push(role) : '');
                    rolesMatchingKeyword.length > 0 && tabsMatchingKeyword.push(tab);
                } else {
                    let rolesForTab = this.state.rolesCopyForSearch.filter(role => role.parent_role_id === tab.id);
                    rolesForTab.forEach(role => {
                        if ((role.name).toLowerCase().includes(keyWord)) {
                            rolesMatchingKeyword.push(role);
                        }
                    });
                    rolesMatchingKeyword.filter(role => role.parent_role_id === tab.id).length > 0 && tabsMatchingKeyword.push(tab);
                }
            });
        } else {
            tabsMatchingKeyword = [...this.state.tabsCopyForSearch];
            rolesMatchingKeyword = [...this.state.rolesCopyForSearch];
        }

        if (tabsMatchingKeyword.length > 0 && rolesMatchingKeyword.length > 0) {
            await this.setState({
                tabs: [...tabsMatchingKeyword],
                rolesForTabs: [...rolesMatchingKeyword]
            });
        } else {
            await this.setState({
                tabs: [],
                rolesForTabs: []
            });
        }
        console.log(this.state.tabs)
    };

    componentDidMount() {
        this.prepareValuesForMenuAssignment();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.defaultSelectedMenu !== this.props.defaultSelectedMenu) {
            this.prepareValuesForMenuAssignment();
        }
    }

    prepareValuesForMenuAssignment = () => {
        this.setTotalNumberOfMenusAndRoles();
        this.props.defaultSelectedMenu.length !== 0 ?
            TryCatchHandler.genericTryCatch(this.handleChildMenuClick(this.props.defaultSelectedMenu.childMenus[0]))
            :
            this.setState({
                currentSelectedChildMenu: [],
                tabs: [],
                rolesForTabs: [],
                tabsCopyForSearch: [],
                rolesCopyForSearch: [],
                checkedAllRolesAndTabs: false,
                checkedAllUserMenus: false,
                activeKey: ''
            });
    };

    render() {
        const {userMenus, profileData} = this.props;
        return (
            <>
                {/*Parent Menus*/}
                <Col sm={12} md={6} lg={3} className="menu-list-wrapper">
                    <h5>Assign Menus</h5>
                    <div className="assign-menu">
                        <div className="am-header">
                            <span className="am-title">
                                Menus
                            </span>
                            <span className="searchMenu">
                                <CSearch
                                    // value={this.state.searchMenuValue}
                                    onChange={this.searchMenus}/>
                            </span>
                            <CCheckbox id="check-all-menu-update"
                                       label="All"
                                       className="select-all"
                                       checked={this.state.checkedAllUserMenus}
                                       disabled={this.state.userMenus.length === 0}
                                       onChange={() => this.handleCheckAllUserMenus(this.state.userMenus)}/>
                        </div>
                        <CScrollbar
                            id="menus"
                            autoHide={true}
                            style={{height: 312}}>
                            {
                                userMenus.length === 0 ? (profileData.userMenuAvailabilityMessage
                                    ?
                                    <>
                                        <div className="filter-message">
                                            <div className="no-data">
                                                <i className="fa fa-file-text-o"></i>
                                            </div>
                                            <div
                                                className="message text-center">{profileData.userMenuAvailabilityMessage}</div>
                                        </div>
                                    </>
                                    :
                                    <div className="filter-message">
                                        <div className="no-data">
                                            <i className="fa fa-hand-o-up"></i>
                                        </div>
                                        <div className="message text-center"> Select Department and Sub-department
                                            first.
                                        </div>
                                    </div>) :
                                    this.state.userMenus.length === 0 ?
                                        <div className="filter-message">
                                            <div className="no-data primary">
                                                <i className="fa fa-file-text-o"></i>
                                            </div>
                                            <div className="message text-center"> No menus found.</div>
                                        </div> :
                                        <Accordion className="menu-accordion"
                                                   activeKey={this.state.activeKey ? this.state.activeKey : this.props.defaultSelectedMenu.id}>
                                            {this.state.userMenus.map(userMenu =>
                                                <Card
                                                    key={userMenu.id}>
                                                    <Accordion.Toggle
                                                        eventKey={userMenu.id}
                                                        key={userMenu.id}
                                                        as={Card.Header}
                                                        className={(this.state.activeKey ? this.state.activeKey
                                                            : this.props.defaultSelectedMenu.id) === userMenu.id ?
                                                            'activeParent' : ''}
                                                        onClick={() => this.handleAccordionSelect(userMenu)}>
                                                        <i className={userMenu.icon}> </i>
                                                        <span>{userMenu.name}</span>
                                                        {userMenu.childMenus.length > 0 ?
                                                            <i className='fa fa-sort-down'> </i> : ''}
                                                    </Accordion.Toggle>
                                                    {userMenu.childMenus.map(child =>
                                                        <Accordion.Collapse
                                                            eventKey={userMenu.id}
                                                            id={"child" + child.id}
                                                            className={this.state.currentSelectedChildMenu.id === child.id ? 'activeChild' : ''}
                                                            key={child.id}>
                                                            <Card.Header
                                                                // key={child.id}
                                                                // as={Card.Header}
                                                                onClick={() => this.handleChildMenuClick(child)}>
                                                                {child.name}
                                                            </Card.Header>
                                                        </Accordion.Collapse>
                                                    )}
                                                </Card>
                                            )}
                                        </Accordion>
                            }
                        </CScrollbar>
                    </div>
                </Col>
                {/*Sub-menus and Roles*/}
                <Col sm={12} md={6} lg={5} className="roles-wrapper">
                    <div className='previledge-title'>

                        <div>
                            &nbsp;
                        </div>
                        <h5>Assign Roles</h5>
                    </div>
                    <div className="assign-previledge">
                        <div className="am-header">
                            <span className="am-title">
                                {this.state.currentSelectedChildMenu.name ? this.state.currentSelectedChildMenu.name : "Roles"}
                            </span>
                            <span className="searchMenu">
                                <CSearch onChange={this.searchTabsAndRoles}/>
                            </span>
                            <CCheckbox id="check-all-roles-update"
                                       label="All"
                                       className="select-all"
                                       checked={this.state.checkedAllRolesAndTabs}
                                       disabled={userMenus.length === 0}
                                       onChange={() => this.handleCheckAllRolesAndTabs(this.state.currentSelectedChildMenu)}/>
                        </div>
                        <CScrollbar
                            id="menus"
                            autoHide={true}
                            style={{height: 313}}>
                            <div className="assign-body">
                                {this.state.tabsCopyForSearch.length === 0 ? (profileData.userMenuAvailabilityMessage
                                        ? <div className="filter-message">
                                            <div className="no-data">
                                                <i className="fa fa-file-text-o"></i>
                                            </div>
                                            <div
                                                className="message text-center">{profileData.userMenuAvailabilityMessage}</div>
                                        </div>
                                        :
                                        <div className="filter-message">
                                            <div className="no-data primary">
                                                <i className="fa fa-hand-o-up"></i>
                                            </div>
                                            <div className="message text-center"> Select Sub-department and menu.
                                            </div>
                                        </div>
                                    )
                                    :
                                    this.state.tabs.length === 0 ?
                                        <div className="filter-message">
                                            <div className="no-data">
                                                <i className="fa fa-file-text-o"> </i>
                                            </div>
                                            <div className="message text-center">No roles found.</div>
                                        </div>
                                        : this.state.tabs.map(tab =>
                                            <div
                                                className="assign-item"
                                                key={tab.id}>
                                                <div
                                                    key={tab.id}
                                                    className="assign-header">
                                                    <CCheckbox
                                                        id={tab.id}
                                                        label={tab.name ? tab.name : this.state.currentSelectedChildMenu.name}
                                                        checked={tab.isChecked}
                                                        className="check-all"
                                                        onChange={() => this.handleTabsAndRolesCheck(false, tab)}
                                                    />
                                                </div>
                                                {/*Roles of child menus*/}
                                                <Row>
                                                    {this.state.rolesForTabs.map(role =>
                                                        role.parent_role_id === tab.id && (
                                                            <Col
                                                                key={role.id}
                                                                sm={6}>
                                                                {role.isChecked}
                                                                <CCheckbox
                                                                    id={role.id}
                                                                    label={role.name}
                                                                    checked={role.isChecked}
                                                                    onChange={() => this.handleTabsAndRolesCheck(true, role)}/>
                                                            </Col>)
                                                    )}
                                                </Row>
                                            </div>
                                        )}
                            </div>
                        </CScrollbar>
                    </div>
                </Col>
            </>
        );
    }

}

export default ProfileUpdateMenuAssignment;
