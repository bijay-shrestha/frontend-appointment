import React, {memo} from 'react'
import DefaultPic from './picture.png'
import {Row, Col, Container} from 'react-bootstrap'
const DoctorWithSpecializationAndImage = props => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="3">
            {props.node.data.doctorAvatar||props.node.data.fileUri ? (
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
          </Col>
          <Col xs="9" className="doctor-column">
            <ul>
              <li>Dr. {props.node.data.doctorName || ''}</li>
              <li>
                <span className="spec">
                
                {props.node.data.specializationName ||
                  props.node.data.specialization ||
                  'N/A'}
                
                </span>
              </li>
            </ul>
          </Col>
          
        </Row>
      </Container>
    </>
  )
}

export default memo(DoctorWithSpecializationAndImage)
