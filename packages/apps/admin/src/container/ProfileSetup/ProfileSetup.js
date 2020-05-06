import React, { PureComponent } from 'react';
class ProfileSetup extends PureComponent {
    // state = {
    //     tabData: [
    //         {
    //             id: "1",
    //             name: "Add",
    //             // icon: "fa fa-plus-circle",
    //             component: <Add />,
    //             eventKey: "/admin/profile/add"
    //         },
    //         {
    //             id: "2",
    //             name: "Manage",
    //             // icon: "fa fa-clipboard",
    //             component: <Manage />,
    //             eventKey: "/admin/profile/manage",
    //             tabpanelClass: "tabpanel-manage"
    //         }]
    // };

    // static getDerivedStateFromProps(props, state) {
    //     if (props !== state.tabData[0].component.props) {
    //         const tabsData = [...state.tabData];
    //         const selectedData = tabsData.map(data => {
    //             return ({
    //                 id: data.id,
    //                 name: data.name,
    //                 icon: data.icon,
    //                 component: React.cloneElement(data.component, {...props, profileInfo: state.profileInfo}),
    //                 eventKey: data.eventKey
    //             })
    //         });
    //         return ({
    //             tabData: [...selectedData]
    //         });
    //     }
    //     return null;
    // }

    // filterTabsByRoles = roles => {
    //     return this.state.tabData.filter(tab => roles.includes(tab.id));
    // };

    render() {
        // const rolesForAdmin = ['1', '2'];
        // console.log(this.props.path)
        // const Tabs =
        //     TabsHOC(CNavTabs,
        //         this.props.userMenus,
        //         this.props.path)
        // console.log(tabs);
        return (

            <></>

        );
    }
}

export default ProfileSetup;
