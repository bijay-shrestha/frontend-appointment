import React from 'react'
import {CForm, CModal} from '@frontend-appointment/ui-elements'
import {Form, InputGroup, Row} from 'react-bootstrap'

const AddFavourites = ({
                           showModal,
                           setShowModal,
                       }) => {
    const bodyContent = <>
        <Container-fluid>
            <CForm>
                <Row>
                    <InputGroup id="fav-search">
                        <Form.Control
                            type="search"
                            placeholder='Search Menus'
                            autoComplete="off"/>
                        <InputGroup.Append>
                            <InputGroup.Text> <i className="fa fa-search"></i></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>

                    <div
                        className="menu-link ">
                        <div className="anchor-icon">
                            a
                        </div>
                        <div className="menu-box">
                            <div className="menu">Doctor Checkcin</div>
                            <a className="add-fav" href=""><i className="fa fa-plus"/></a>
                        </div>
                    </div>

                    <div
                        className="menu-link ">
                        <div className="anchor-icon">
                            a
                        </div>
                        <div className="menu-box">
                            <div className="menu">Doctor Checkcin</div>
                            <a className="add-fav" href=""><i className="fa fa-plus"/></a>
                        </div>
                    </div>

                    <div
                        className="menu-link ">
                        <div className="menu-box">
                            <div className="menu">No menu found!</div>
                        </div>
                    </div>


                </Row>
            </CForm>
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
