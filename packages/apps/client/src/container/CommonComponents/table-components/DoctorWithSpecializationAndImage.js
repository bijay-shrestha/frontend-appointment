import React, {memo} from 'react'
import DefaultPic from './picture.png'
import {Row, Col, Form, Container} from 'react-bootstrap'
const DoctorWithSpecializationAndImage = props => {
  return (
    <>
      <div className="di-column">
            {props.node.data.doctorAvatar ||props.node.data.fileUri ? (
              <div className="data-image">
                <img alt="PIC" src={props.node.data.doctorAvatar||props.node.data.fileUri} />{' '}
              </div>
            ) : (
              <div className="data-image">
                <img alt="PIC" src={DefaultPic} />
              </div>
            )}
        
            <ul className="di-details">
              <li>Dr. {props.node.data.doctorName || ''}</li>
              <li>({props.node.data.specializationName ||props.node.data.specialization||''})</li>
            </ul>
      </div>
    </>
  )
}

export default memo(DoctorWithSpecializationAndImage)
