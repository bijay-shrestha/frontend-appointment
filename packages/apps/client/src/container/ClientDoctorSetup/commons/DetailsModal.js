import React from 'react'
import {
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect, CHybridTextArea,
    CImageDisplayAndView,
    CRadioButton
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import * as DefaultProfileImage from '../img/picture.png'
import {AuditableEntityHoc} from '@frontend-appointment/commons';

const DetailsModal = ({type, doctorData}) => {
    let images;//,doctorName,code,mobileNumber,specilizationName,qualificationName,hospitalName,status,remarks,email,nmcNumber;

    if (type !== 'A') {
        images = [
            {
                src: doctorData.fileUri ? doctorData.fileUri : DefaultProfileImage,
                alt: 'Doctor Avatar',
                width: 4,
                height: 3
            }
        ]
        // contactNumber =getOnlyContactNumber(hospitalData.contactNumberResponseDTOS)
    } else {
        images = [
            {
                src: doctorData.doctorAvatarUrl
                    ? doctorData.doctorAvatarUrl
                    : DefaultProfileImage,
                alt: 'Doctor Avatar',
                width: 4,
                height: 3
            }
        ]
        //  contactNumber = hospitalData.contactNumber
    }

    return (
        <>
            <Container-fluid>
                <CForm id="hospital-info" className="mt-2">
                    <Container-fluid>
                        <Row>
                            <Col
                                sm={12}
                                md={12}
                                lg={3}
                                className="order-md-first order-lg-last"
                            >
                                <CImageDisplayAndView images={images}/>
                            </Col>
                            <Col lg={9}>
                                <Row>
                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="doctor-name"
                                            name="name"
                                            placeholder="Doctor Name"
                                            value={type === 'A' ? doctorData.name : doctorData.doctorName}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        {type === 'A' ?
                                            <CHybridSelect
                                                id="salutation"
                                                name="salutationList"
                                                label="Salutation"
                                                options={doctorData.salutationList}
                                                value={doctorData.salutations}
                                                required={true}
                                                placeholder={"Select Salutation."}
                                                isDisabled={true}
                                                isMulti={true}
                                                className="multiple-select"
                                            />
                                            :
                                            <CHybridInput
                                                id="salutation"
                                                placeholder={"Salutation"}
                                                value={doctorData.doctorSalutation || 'N/A'}
                                                disabled={true}
                                            />
                                        }
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CFLabel labelName="Gender" id="Gender"></CFLabel><br></br>
                                        <CRadioButton
                                            checked={
                                                type === 'A'
                                                    ? doctorData.genderCode === 'M'
                                                    : doctorData.gender === 'MALE'
                                            }
                                            name="genderCode"
                                            id="radio1"
                                            label="Male"
                                            type="radio"
                                            value="M"
                                            disabled={true}
                                            readOnly={true}
                                        />
                                        <CRadioButton
                                            checked={
                                                type === 'A'
                                                    ? doctorData.genderCode === 'F'
                                                    : doctorData.gender === 'FEMALE'
                                            }
                                            name="genderCode"
                                            id="radio2"
                                            label="Female"
                                            type="radio"
                                            value="F"
                                            disabled={true}
                                            readOnly={true}
                                        />
                                        <CRadioButton
                                            checked={
                                                type === 'A'
                                                    ? doctorData.genderCode === 'O'
                                                    : doctorData.gender === 'OTHERS'
                                            }
                                            name="genderCode"
                                            id="radio3"
                                            label="Other"
                                            type="radio"
                                            value="O"
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </Col>


                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="nmcNumber"
                                            placeholder="NMC Number"
                                            value={doctorData.nmcNumber}
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        {/* <CHybridSelect
                      id="specializationName"
                      label="Specialization Names"
                      value={doctorData.specializationIds}
                      isMulti={true}
                      isDisabled={true}
                    /> */}
                                        {type !== 'A' ? (
                                            <CHybridTextArea
                                                id="specializationNames"
                                                placeholder="Specialization Names"
                                                value={doctorData.specializationName}
                                                disabled={true}
                                            />
                                        ) : (
                                            <CHybridSelect
                                                id="specializationNames"
                                                label="Specialization Names"
                                                value={doctorData.specializationIds}
                                                isMulti={true}
                                                isDisabled={true}
                                            />
                                        )}
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        {type !== 'A' ? (
                                            <CHybridTextArea
                                                id="qualificationIds"
                                                placeholder="Qualification Name"
                                                value={doctorData.qualificationName}
                                                disabled={true}
                                            />
                                        ) : (
                                            <CHybridSelect
                                                id="qualificationIds"
                                                label="Qualification Name"
                                                value={doctorData.qualificationIds}
                                                isDisabled={true}
                                                isMulti={true}
                                            />
                                        )}
                                    </Col>


                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="doctor-email"
                                            name="email"
                                            placeholder="Doctor Email"
                                            value={doctorData.email}
                                            type="email"
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="doctor-number"
                                            placeholder="Doctor Phone Number"
                                            value={
                                                type !== 'A'
                                                    ? doctorData.mobileNumber
                                                    : doctorData.contactNumber
                                            }
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="appointment-charge"
                                            placeholder="Doctor Appointment Charge"
                                            value={doctorData.appointmentCharge || '0'}
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="appointment-follow-up-charge"
                                            placeholder="Doctor Appointment Follow Up Charge"
                                            value={doctorData.appointmentFollowUpCharge ?
                                                doctorData.appointmentFollowUpCharge : '0'}
                                            disabled={true}
                                            readOnly={true}
                                        />
                                    </Col>


                                    <Col sm={12} md={6} lg={6}>
                                        <CFLabel labelName="Doctor Status" id="status"/>
                                        <CRadioButton
                                            checked={doctorData.status === 'Y'}
                                            disabled={true}
                                            readOnly={true}
                                            id="radio1"
                                            label="Active"
                                            type="radio"
                                        />
                                    </Col>
                                    {type !== 'A' && (
                                        <Col sm={12} md={6} lg={6}>
                                            <CHybridTextArea
                                                id="doctor-remarks"
                                                placeholder="Doctor Remarks"
                                                value={doctorData.remarks || 'N/A'}
                                                disabled={true}
                                            />
                                        </Col>
                                    )}
                                </Row>

                                <Row className="mt-4">

                                    {AuditableEntityHoc(doctorData)}
                                </Row>
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default DetailsModal
