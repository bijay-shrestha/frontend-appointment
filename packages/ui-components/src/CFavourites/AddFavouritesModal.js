import React from 'react'
import {CForm, CLoading, CModal} from '@frontend-appointment/ui-elements'
import {Form, InputGroup, Row} from 'react-bootstrap'

const AddFavourites = ({
                           showModal,
                           setShowModal,
                           onAddToFavourite,
                           onRemoveFavourite,
                           menuListForFavourites,
                           onSearchMenus,
                           searchKeyword,
                           isLoading
                       }) => {
    const bodyContent = <>
        <Container-fluid>
            {
                isLoading ?
                    <CLoading/>
                    :
                    <CForm id={"fav-form"}>
                        <Row>
                            <InputGroup id="fav-search">
                                <Form.Control
                                    type="search"
                                    placeholder='Search Menus'
                                    onChange={onSearchMenus}
                                    value={searchKeyword}
                                    autoComplete="off"/>
                                <InputGroup.Append>
                                    <InputGroup.Text> <i className="fa fa-search"/></InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>

                            {
                                menuListForFavourites ? menuListForFavourites.map(menu => (
                                        <div key={menu.id}
                                             className="menu-link ">
                                            <div className="anchor-icon">
                                                {menu.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="menu-box">
                                                <div className="menu">{menu.name}</div>
                                                {menu.isFavourite ?
                                                    <a className="remove-fav" href="">
                                                        <i className="fa fa-times"
                                                           onClick={() => onRemoveFavourite(menu)}/>
                                                    </a>
                                                    :
                                                    <a className="add-fav" href="">
                                                        <i className="fa fa-plus"
                                                           onClick={() => onAddToFavourite(menu)}/>
                                                    </a>}
                                            </div>
                                        </div>
                                    )) :
                                    <div
                                        className="menu-link ">
                                        <div className="menu-box">
                                            <div className="menu">No menu found!</div>
                                        </div>
                                    </div>
                            }
                        </Row>
                    </CForm>
            }

        </Container-fluid>

    </>
    return (
        <>
            <CModal
                id={""}
                // backdrop="static"
                show={showModal}
                size="sm"
                modalHeading="Add Favourites Menu"
                bodyChildren={bodyContent}
                onHide={setShowModal}
                dialogClassName="cogent-modal add-fav-modal"
            />
        </>
    )
}

export default AddFavourites
