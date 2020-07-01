import React from 'react'
import {Dropdown, OverlayTrigger, Tooltip} from 'react-bootstrap'
import AddFavouritesModal from "./AddFavouritesModal";
import {Link} from 'react-router-dom'
import {FavouritesUtils, LocalStorageSecurity, StringUtils} from '@frontend-appointment/helpers'
import {Axios} from '@frontend-appointment/core'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {CAlert} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'

const {FETCH_FAVOURITES_FOR_DROPDOWN, SAVE_FAVOURITES, UPDATE_FAVOURITES} = AdminModuleAPIConstants.favouritesApiConstants

class CFavourites extends React.PureComponent {
    state = {
        showAddFavouritesModal: false,
        searchKeyword: '',
        filteredMenus: [],
        menuListForFavourites: [],
        loggedInAdminFavourites: [],
        isAddPending: false,
        showAlert: false,
        alertMessageInfo: {
            variant: '',
            message: ''
        },
        adminInfo: ''
    }

    alertTimer = '';


    clearAlertTimeout = () => {
        this.alertTimer = setTimeout(() => this.closeAlert(), 90000)
    };

    closeAlert = () => {
        this.setState({
            showAlert: false
        })
    };

    getUserMenusFromLocalStorage = () => {
        const userMenus = LocalStorageSecurity.localStorageDecoder('userMenus')
        return userMenus ? userMenus : []
    }

    openManageFavouritesModal = (event) => {
        event.preventDefault()
        this.setState({showAddFavouritesModal: !this.state.showAddFavouritesModal})
    }

    setShowAddFavouritesModal = (event) => {
        // event.preventDefault()
        this.setState({showAddFavouritesModal: !this.state.showAddFavouritesModal})
    }

    showAlertMessage = (type, message) => {
        this.setState({
            isAddPending: false,
            showAlert: true,
            alertMessageInfo: {
                variant: type,
                message: message
            }
        });
        this.clearAlertTimeout();
    };

    handleAddFavourite = async (event,menu) => {
        event.preventDefault();
        const {adminInfo} = this.state
        this.setState({
            isAddPending: true
        })
        try {
            await Axios.post(SAVE_FAVOURITES, {
                adminId: adminInfo.adminId,
                userMenuId: menu.id
            })
            await this.fetchLoggedInAdminFavourites();
            this.showAlertMessage("success", `${menu.menuName} has been added to favourites.`)
        } catch (e) {
            this.showAlertMessage('danger', e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Problem occurred.')
        }
    }

    handleRemoveFavourite = async (event,menu) => {
        const {adminInfo} = this.state
        event.preventDefault();
        this.setState({
            isAddPending: true
        })
        try {
            await Axios.put(UPDATE_FAVOURITES,
                {
                    adminId: adminInfo.adminId,
                    userMenuId: menu.id,
                    status: 'N'
                })
            await this.fetchLoggedInAdminFavourites();
            this.showAlertMessage("success", `${menu.menuName} has been removed from favourites.`)
        } catch (e) {
            this.showAlertMessage('danger', e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Problem occurred.')
        }
    }

    handleSearchInputChange = event => {
        const {menuListForFavourites} = this.state
        let keyWord = event.target.value;
        let menusMatchingKeyWord = []
        let count = 0
        if (keyWord !== '') {
            keyWord = keyWord.toLowerCase();
            menuListForFavourites && menuListForFavourites.map(menu => {
                if (StringUtils.compareStrings(keyWord, menu.name)) {
                    let displayData = {
                        ...menu,
                        iCharacter: FavouritesUtils.getInitialCharactersOfName(menu.name,2),
                        menuName: menu.name,
                        name: StringUtils.boldCharactersOfString(keyWord, menu.name, count < 1 ? count : count++),
                    };
                    menusMatchingKeyWord.push(displayData);
                    count++;
                }
                return ''
            })
        } else {
            menusMatchingKeyWord = [...menuListForFavourites]
        }

        this.setState({
            searchKeyword: event.target.value,
            filteredMenus: menusMatchingKeyWord ? [...menusMatchingKeyWord] : []
        })
    }

    prepareUserMenusData = async (favouriteMenus) => {
        let menusForFavourite = FavouritesUtils.filterFavouritesAndPrepareUserMenus(
            favouriteMenus, this.getUserMenusFromLocalStorage())
        await this.setState({
            loggedInAdminFavourites: favouriteMenus ? [...favouriteMenus] : [],
            menuListForFavourites: menusForFavourite ? [...menusForFavourite] : [],
            filteredMenus: menusForFavourite ? [...menusForFavourite] : []
        })
    }

    fetchLoggedInAdminFavourites = async () => {
        const {adminInfo} = this.state
        try {
            const response = await Axios.getWithPathVariables(FETCH_FAVOURITES_FOR_DROPDOWN, adminInfo.adminId)
            const favouriteMenus = FavouritesUtils.getFavouritesDetails(response.data);
            this.prepareUserMenusData(favouriteMenus)
        } catch (e) {
            this.prepareUserMenusData([])
            console.log("FETCH ERROR", e)
        }
    }

    setLoggedInAdminInfo = async () => {
        await this.setState({
            adminInfo: LocalStorageSecurity.localStorageDecoder('adminInfo')
        })
    }

    async componentDidMount() {
        await this.setLoggedInAdminInfo()
        this.fetchLoggedInAdminFavourites()
    }


    componentWillUnmount() {
        clearTimeout(this.alertTimer)
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const {favouritesList} = this.props.favouritesProp
    //     if (favouritesList && !ObjectUtils.checkObjectEquality(favouritesList, prevProps.favouritesProp.favouritesList)) {
    //         console.log("FAVOURITES LIST UPDATE=========================", favouritesList)
    //         this.prepareUserMenusData()
    //     }
    // }

    render() {
        // const {favouritesList} = this.props.favouritesProp
        const {
            searchKeyword,
            filteredMenus,
            loggedInAdminFavourites,
            showAddFavouritesModal,
            isAddPending,
            showAlert,
            alertMessageInfo
        } = this.state

        return <>
            <OverlayTrigger
                trigger={'hover'}
                placement="top"
                overlay={<Tooltip id="tooltip-disabled">Favourite Links</Tooltip>}>
                    <span className="d-inline-block">

                         <Dropdown alignRight className="user-profile quick-links">
                             <Dropdown.Toggle variant="default" id="dropdown-basic"><i
                                 className="fa fa-star"/></Dropdown.Toggle>
                             <Dropdown.Menu>
                                 {
                                     loggedInAdminFavourites && loggedInAdminFavourites.length ?
                                         loggedInAdminFavourites.map(favourite => (
                                             <Dropdown.Item className="menu-link "
                                                            id={"fav-dropdown".concat(favourite.id)}
                                                            key={'fav-li' + favourite.id}
                                                            as={Link}
                                                            to={favourite.path}>
                                                 <div className="anchor-icon">
                                                     {favourite.iCharacter}
                                                 </div>
                                                 <div className="menu-box">
                                                     <div className="menu">{favourite.name}</div>
                                                     {/*<a className="remove-fav"><i className="fa fa-times"/></a>*/}
                                                 </div>
                                             </Dropdown.Item>
                                         ))
                                         :
                                         <Dropdown.Item>
                                             <div className="my-4">
                                                 No Favourite(s) added.
                                             </div>
                                         </Dropdown.Item>
                                 }
                                 <div className="add-bar ">
                                    {/* <p className="add-title">Favourite links</p> */}
                                     <a className="btn btn-outline-secondary add-new-fav" href={'/'}
                                        onClick={this.openManageFavouritesModal}>
                                          <i className="fa fa-plus"/>&nbsp;Manage Favourites </a>
                                  </div>
                             </Dropdown.Menu>
                         </Dropdown>
                    </span>
            </OverlayTrigger>

            {/* end fav link */}

            {showAddFavouritesModal ?
                <AddFavouritesModal
                    isLoading={isAddPending}
                    showModal={showAddFavouritesModal}
                    setShowModal={this.setShowAddFavouritesModal}
                    onAddToFavourite={this.handleAddFavourite}
                    onRemoveFavourite={this.handleRemoveFavourite}
                    menuListForFavourites={filteredMenus}
                    onSearchMenus={this.handleSearchInputChange}
                    searchKeyword={searchKeyword}
                /> : ""}
            <CAlert
                id="favourites"
                variant={alertMessageInfo.variant}
                show={showAlert}
                onClose={this.closeAlert}
                className="fav-alert"
                alertType={
                    alertMessageInfo.variant === 'success' ? (
                        <>
                            <Material.MdDone/>
                        </>
                    ) : (
                        <>
                            <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                        </>
                    )
                }
                message={alertMessageInfo.message}
            />
        </>;
    }

}


export default CFavourites;
