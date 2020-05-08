import React, {memo} from 'react'
import DefaultPic from './picture.png'
//import {Row, Col, Container} from 'react-bootstrap'
const DoctorWithImage = props => {
  return (
  <div className="di-column">
      {props.node.data.doctorAvatar || props.node.data.fileUri ? (
        <div className="data-image">
          <img
            alt="PIC"
            src={props.node.data.doctorAvatar || props.node.data.fileUri}
          />{' '}
        </div>
      ) : (
        <div className="data-image">
          <img alt="PIC" src={DefaultPic} />
        </div>
      )}

      <ul>
        <li>Dr. {props.node.data.doctorName || ''}</li>
      </ul>
    </div>
  )
}

export default memo(DoctorWithImage)
