import React from 'react'
import {
    CForm,
    CHybridInput,
    CHybridSelect,
    CHybridSelectWithImage,
    CHybridTextArea
} from '@frontend-appointment/ui-elements'
import {DoctorWithSpecImage} from '@frontend-appointment/ui-components'
import {Col, Row} from 'react-bootstrap'
import {EnvironmentVariableGetter} from '@frontend-appointment/helpers'
// import './appointment-approval.scss'

const TransferContent = ({
                             transferData,
                             transferTime,
                             transferDate,
                             specializationList,
                             doctorList,
                             onChangeHandler
                         }) => {
    const {
        appointmentDate,
        appointmentNumber,
        appointmentTime,
        patientName,
        patientGender,
        patientAge,
        isRegistered,
        mobileNumber,
        doctorName,
        fileUri,
        remarks,
        specializationName,
        appointmentAmount,
        transferredSpecialization,
        transferredDoctor,
        transferredDate,
        transferredTime,
        transferredCharge,
        // appointmentId,
        // hospitalName,
        // esewaId,
        // patientDob,
        // transactionNumber,
        // isSelf,
        // appointmentMode,
        // doctorId,
        // specializationId,
        // followUp,
    } = transferData
    const patientMetaInfo = patientName && patientName
        .concat(', ')
        .concat(patientAge + '/' + patientGender)
        .concat(',')
        .concat(isRegistered === 'N' ? 'Registered' : 'New')
        .concat(', ')
        .concat(mobileNumber)
    const doctorDetails = <DoctorWithSpecImage node={{data: {fileUri: fileUri, doctorName, specializationName}}}/>

    let optionsDate, optionsTime;
    optionsDate = transferDate.appointmentTransferDate && transferDate.appointmentTransferDate.map(tdate => ({
        value: tdate,
        label: tdate
    }))
    optionsTime = transferTime.appointmentTransferTime && transferTime.appointmentTransferTime.map(tTime => ({
        value: tTime,
        label: tTime
    }))
    return (
        <>
            <Container-fluid className="transfer-modal">
                <CForm id="refund-info" className="mt-2">
                    <Container-fluid>

                        <Row className="patient-box">
                            <Col xs={12}><h5 className="title">Patient Details</h5></Col>

                            {/*<Col sm={12} md={6} lg={6}>*/}
                            {/*    <CHybridInput*/}
                            {/*        id="clientName"*/}
                            {/*        placeholder="Client Name"*/}
                            {/*        value={transferData.hospitalName}*/}
                            {/*        disabled={true}*/}
                            {/*    />*/}
                            {/*</Col>*/}
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="Appointment Number"
                                    placeholder="Appointment Number"
                                    value={appointmentNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridTextArea
                                    id="patientMetaInfo"
                                    placeholder="Patient Meta Info"
                                    value={patientMetaInfo || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                        </Row>
                        <Row>
                            <Col xs={12} md={6} className="">
                                <div className="box box-1 ">
                                    <Col xs={12}><h5 className="title">Present Appointment Details</h5></Col>
                                    <Col xs={12}>
                                        <div className="doctor-box">
                                            <span className="doctor-label">Doctor Details </span>
                                            {doctorDetails}
                                        </div>

                                    </Col>
                                    <Col xs={12}>
                                        <CHybridInput
                                            id="date"
                                            placeholder="Appointment Date"
                                            value={appointmentDate || 'N/A'}
                                            disabled={true}
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <CHybridInput
                                            id="date"
                                            placeholder="Appointment Time"
                                            value={appointmentTime || 'N/A'}
                                            disabled={true}
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <CHybridInput
                                            id="date"
                                            placeholder="Appointment Charge"
                                            value={appointmentAmount || 'N/A'}
                                            disabled={true}
                                        />
                                    </Col>
                                </div>
                            </Col>


                            <Col xs={12} md={6} className="px-0 ">
                                <div className="box ">
                                    <Col xs={12}><h5 className="title">Transfer Details</h5></Col>
                                    {EnvironmentVariableGetter.REACT_APP_MODULE_CODE === EnvironmentVariableGetter.ADMIN_MODULE_CODE ?
                                        <Col xs={12}>
                                            <CHybridSelect
                                                id="transferredHospital"
                                                name="transferredHospital"
                                                value={{value: transferData.hospitalId, label: transferData.hospitalName}}
                                                isDisabled={true}
                                            />
                                        </Col> : ''
                                    }
                                    <Col xs={12}>
                                        <CHybridSelect
                                            id="transferredSpecialization"
                                            name="transferredSpecialization"
                                            placeholder={'Select Specialization'}
                                            label="Select Transferred Specialization"
                                            value={transferredSpecialization}
                                            options={specializationList}
                                            isDisabled={true}
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <CHybridSelectWithImage
                                            id="transferredDoctor"
                                            name="transferredDoctor"
                                            placeholder={
                                                transferredSpecialization.value
                                                    ? 'Select Doctor To Transfer'
                                                    : 'Select Specialization First..'
                                            }
                                            label="Transferred Doctor"
                                            value={transferredDoctor}
                                            options={doctorList}
                                            onChange={onChangeHandler}
                                            isDisabled={!doctorList.length}
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <CHybridSelect
                                            id="transferredDate"
                                            name="transferredDate"
                                            placeholder={
                                                transferredDoctor.value
                                                    ? 'Select Date To Transfer'
                                                    : 'Select Doctor First..'
                                            }
                                            label="Transferred Date"
                                            value={transferredDate}
                                            options={optionsDate}
                                            onChange={onChangeHandler}
                                            isDisabled={!optionsDate.length || !transferredDoctor.value}
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <CHybridSelect
                                            id="transferredTime"
                                            name="transferredTime"
                                            placeholder={
                                                transferredDate.value
                                                    ? 'Select Time To Transfer'
                                                    : 'Select Date First..'
                                            }
                                            label="Transferred Time"
                                            value={transferredTime}
                                            options={optionsTime}
                                            onChange={onChangeHandler}
                                            isDisabled={!optionsTime.length || !transferredDate.value}
                                        />

                                    </Col>
                                    <Col xs={12}>
                                        <CHybridInput
                                            id="charge"
                                            placeholder="Transferred Charge"
                                            name="transferredCharge"
                                            value={transferredCharge || 0}
                                            disabled={true}
                                        />
                                    </Col>
                                    <Col xs={12}>
                                        <CHybridTextArea
                                            id="remarks"
                                            name="remarks"
                                            placeholder="Remarks"
                                            onChange={(e) => onChangeHandler(e)}
                                            value={remarks}
                                        />
                                    </Col>
                                </div>
                            </Col>
                        </Row>

                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default TransferContent
