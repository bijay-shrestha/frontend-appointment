import React, {memo} from 'react'
import DefaultPic from './picture.png'
//import {Row, Col, Container} from 'react-bootstrap'
const DoctorWithImage = props => {
    const {doctorSalutation, doctorName, doctorAvatar, fileUri} = props.node.data;
    return (
        <div className="di-column">
            {doctorAvatar || fileUri ? (
                <div className="data-image">
                    <img
                        alt="PIC"
                        src={doctorAvatar || fileUri}
                    />{' '}
                </div>
            ) : (
                <div className="data-image">
                    <img alt="PIC" src={DefaultPic}/>
                </div>
            )}

            <ul>
                <li>{doctorSalutation ? doctorSalutation.concat(" ") : ''}{doctorName || ''}</li>
            </ul>
        </div>
    )
}

export default memo(DoctorWithImage)
