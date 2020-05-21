import React, {memo} from 'react'
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faAlignLeft} from "@fortawesome/free-solid-svg-icons";
import {Button,Image} from 'react-bootstrap'

const SideBarHeader = props => {
    // console.log(props.isHover)
    return (
        <div className='sidebar-header container-fluid'>
            <div className="row">
                <h3>
                <Image src={require("../images/logo4 - white.png")} className="logo" />
                    {/* <label className={props.isOpen || props.isHover ? 'text' : 'collapse'}>{props.header}</label> */}
                    <Button className={!props.isOpen ? 'collapsed':''} variant="primary" onClick={props.toggle}>
                        {/* <FontAwesomeIcon icon={faAlignLeft}/> */}
                        <span>

                        </span>
                    </Button>
                </h3>
            </div>
        </div>
    )
}
export default memo(SideBarHeader)
