import React from 'react'
import {Dropdown, OverlayTrigger, Tooltip} from 'react-bootstrap'
import AddFavouritesModal from "./AddFavouritesModal";
import {Link} from 'react-router-dom'
import {FavouritesUtils, LocalStorageSecurity} from '@frontend-appointment/helpers'
import {Axios} from '@frontend-appointment/core'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'

const {FETCH_FAVOURITES_FOR_DROPDOWN, SAVE_FAVOURITES, UPDATE_FAVOURITES} = AdminModuleAPIConstants.favouritesApiConstants

class CFavourites extends React.PureComponent {
    state = {
        showAddFavouritesModal: false,
        searchKeyword: '',
        filteredMenus: [],
        menuListForFavourites: [],
        loggedInAdminFavourites: [],
        isAddPending: false,
    }

    getUserMenusFromLocalStorage = () => {
        const userMenus = LocalStorageSecurity.localStorageDecoder('userMenus')
        return userMenus ? userMenus : []
    }

    setShowAddFavouritesModal = () => {
        this.setState({showAddFavouritesModal: !this.state.showAddFavouritesModal})
    }

    handleAddFavourite = async menu => {
        this.setState({
            isAddPending: true
        })
        try {
            await Axios.post(SAVE_FAVOURITES, {userMenuId: menu.id})
            await this.fetchLoggedInAdminFavourites();
            this.setState({
                isAddPending: false
            })
        } catch (e) {

        }
    }

    handleRemoveFavourite = async menu => {
        this.setState({
            isAddPending: true
        })
        try {
            await Axios.post(UPDATE_FAVOURITES, {userMenuId: menu.id, status: 'D'})
            await this.fetchLoggedInAdminFavourites();
            this.setState({
                isAddPending: false
            })
        } catch (e) {

        }
    }

    handleSearchInputChange = event => {
        this.setState({
            searchKeyword: event.target.value
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
        try {
            const response = await Axios.get(FETCH_FAVOURITES_FOR_DROPDOWN)
            const favouriteMenus = FavouritesUtils.getFavouritesDetails(response.data);
            this.prepareUserMenusData(favouriteMenus)
        } catch (e) {
            console.log("FETCH ERROR", e)
        }
    }

    async componentDidMount() {
        await this.fetchLoggedInAdminFavourites()
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
            isAddPending
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
                                                     {favourite.name.charAt(0).toUpperCase()}
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
                                     <a className="btn btn-outline-secondary add-new-fav"
                                        onClick={this.setShowAddFavouritesModal}>
                                          <i className="fa fa-plus"/>&nbsp;Add Favourites </a>
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

        </>;
    }

}


export default CFavourites;
