import React, {memo} from 'react'
import DefaultPic from './img/default-logo.png'
//import {Row, Col, Container} from 'react-bootstrap'
const ClientNameWithLogo = props => {
    const {name, fileUri} = props.node.data;
    return (
        <div className="di-column">
            {fileUri ? (
                <div className="data-image">
                    <img
                        alt="PIC"
                        src={fileUri}
                    />{' '}
                </div>
            ) : (
                <div className="data-image">
                    <img alt="PIC" src={DefaultPic}/>
                </div>
            )}

            <ul>
                <li>{name || ''}</li>
            </ul>
        </div>
    )
}

export default memo(ClientNameWithLogo)
