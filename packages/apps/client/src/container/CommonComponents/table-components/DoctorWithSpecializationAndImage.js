import React, {memo} from 'react'
import DefaultPic from './picture.png'
import {Row, Col, Form, Container} from 'react-bootstrap'
const DoctorWithSpecializationAndImage = props => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="3">
            {props.node.data.doctorAvatar ||props.node.data.fileUri ? (
              <div className="data-image">
                <img alt="PIC" src={props.node.data.doctorAvatar||props.node.data.fileUri} />{' '}
              </div>
            ) : (
              <div className="data-image">
                <img alt="PIC" src={DefaultPic} />
              </div>
            )}
          </Col>
          <Col xs="9">
            <ul>
              <li>Dr. {props.node.data.doctorName || ''}</li>
              <li>({props.node.data.specializationName ||props.node.data.specialization||''})</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default memo(DoctorWithSpecializationAndImage)
