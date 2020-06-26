import React, { Component } from 'react'
import { Button, Dropdown, Image, OverlayTrigger, Tooltip, Form, InputGroup } from 'react-bootstrap'
import AddFavouritesModal from "./AddFavouritesModal";

class CFavourites extends React.Component {
  state = { showAddFavouritesModal: false }
  setShowAddFavouritesModal = () => {
    this.setState({ showAddFavouritesModal: !this.state.showAddFavouritesModal })
  }
  render() {

    return <>

      {/* <div className="fav-links" onClick={this.handleQuickLinkClick}> */}

      <OverlayTrigger
        trigger={'hover'}
        placement="top"
        overlay={
          <Tooltip id="tooltip-disabled">Favourite Links</Tooltip>}>
        <span className="d-inline-block">

          <Dropdown alignRight className="user-profile quick-links">
            <Dropdown.Toggle variant="default" id="dropdown-basic"><i className="fa fa-star"></i></Dropdown.Toggle>
            <Dropdown.Menu>

              <Dropdown.Item

                className="menu-link ">


                <div className="anchor-icon">
                  a </div>
                <div className="menu-box">
                  <div className="menu">Doctor Checkcin</div>
                  <a className="remove-fav"><i className="fa fa-times"></i></a>
                </div>

              </Dropdown.Item>      

              <div className="add-bar ">
                {/* <p className="add-title">Favourite links</p> */}
                <a className="btn btn-outline-secondary add-new-fav" onClick={this.setShowAddFavouritesModal}> <i className="fa fa-plus"></i>&nbsp;Add Favourites </a>
              </div>



            </Dropdown.Menu>
          </Dropdown>

        </span>
      </OverlayTrigger>


      {/* end fav link */}

      {this.state.showAddFavouritesModal ? <AddFavouritesModal
        showModal={this.state.showAddFavouritesModal}
        setShowModal={this.setShowAddFavouritesModal}
      /> : ""}

    </>;
  }

}


export default CFavourites;
