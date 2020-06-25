import React from 'react'
import {CScrollbar} from '@frontend-appointment/ui-elements'

import {
  Badge,
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip
} from 'react-bootstrap'
import {CButton, CLoading, CNavTabs} from '@frontend-appointment/ui-elements'

import './appointment-status.scss'
import {
  appointmentStatusList,
  DateTimeFormatterUtils
} from '@frontend-appointment/helpers'

const TIME_SLOT_EMPTY_ERROR_MESSAGE = 'APPOINTMENTS NOT AVAILABLE'
const DAY_OFF_MESSAGE = 'DAY OFF'

const AppointmentStatusDetails = ({
  statusDetailsData,
  showAppointmentDetailModal
}) => {
  const {
    appointmentStatusDetails,
    // doctorInfoList,
    errorMessageForStatusDetails,
    searchErrorMessage,
    isStatusListLoading,
    filterAppointmentDetailsByStatus,
    activeStatus,
    getPatientDetails,
    handleCheckIn,
    showCheckInModal,
    handleViewAppointmentDetails,
    onChangeRoom
  } = statusDetailsData
  return (
    <>
      <div className="manage-title">
        {!isStatusListLoading &&
        !searchErrorMessage &&
        appointmentStatusDetails.length ? (
          <Row>
            <Col className="p-0" lg={4}>
              <h5 className="title">Appointment Status Details</h5>
            </Col>

            <Col lg={8}>
              <div className="appointment-badge float-right">
                {appointmentStatusList.map(appointmentStatus =>
                  appointmentStatus.value === 'F' ? (
                    <div>
                      <i className="fa fa-tag" />
                      <div className="status-legend">
                      <a
                        href="!#"
                        className={
                          activeStatus === appointmentStatus.value
                            ? 'active'
                            : ''
                        }
                        onClick={event =>
                          filterAppointmentDetailsByStatus(
                            appointmentStatus.value,
                            event
                          )
                        }
                      >
                        Follow Up
                      </a>
                      <span>44</span>
                      </div>
                      {/* <Button
                          variant="link"
                          className={
                            activeStatus === appointmentStatus.value
                              ? 'active'
                              : ''
                          }
                          onClick={event =>
                            filterAppointmentDetailsByStatus(
                              appointmentStatus.value,
                              event
                            )
                          }
                        >
                          Follow Up
                        </Button> */}
                    </div>
                  ) : (
                    <div>
                      <Badge variant={appointmentStatus.variant}>&nbsp;</Badge>
                      <div className="status-legend">
                      <a
                        href="!#"
                        className={
                          activeStatus === appointmentStatus.value
                            ? 'active'
                            : ''
                        }
                        onClick={event =>
                          filterAppointmentDetailsByStatus(
                            appointmentStatus.value,
                            event
                          )
                        }
                      >
                        {appointmentStatus.label}
                      </a>
                      <span>44</span>
                      </div>

                      {/* <Button
                          variant="link"
                          className={
                            activeStatus === appointmentStatus.value
                              ? 'active'
                              : ''
                          }
                          onClick={event =>
                            filterAppointmentDetailsByStatus(
                              appointmentStatus.value,
                              event
                            )
                          }
                        >
                          {appointmentStatus.label}
                        </Button> */}
                    </div>
                  )
                )}
              </div>
            </Col>
          </Row>
        ) : (
          ''
        )}
      </div>
      <div className="manage-details">
        <CScrollbar id="sidebar-scrollbar">
          <Container fluid>
            {!isStatusListLoading &&
            !searchErrorMessage &&
            appointmentStatusDetails.length ? (
              appointmentStatusDetails.map(
                (appointmentStatusDetail, rowIndex) => (
                  <Row
                    className="appointment-status-list"
                    key={'detail-' + rowIndex}
                  >
                    <Col
                      md={2}
                      className="d-flex  flex-column justify-content-start"
                    >
                      <h5 className="title">Department Details</h5>
                      {/* <div className="doctor-image">
                        <div className="anchor-icon">
                          {appointmentStatusDetail.hospitalDepartmentName[0].toUpperCase()}
                        </div>
                      </div> */}
                      <div className="doctor-details">
                      <p className="department-name">
                         {' '}
                          {appointmentStatusDetail.hospitalDepartmentName}
                        </p>
                       
                        <div>
                        {/* <p>Available Doctors</p> */}
                          <ul>
                            {appointmentStatusDetail.doctorInfoList[0].doctorInfo.map(
                              doctorInfo => {
                                return (
                                  <li>
                                    <img
                                      src={doctorInfo.fileUri}
                                      alt={doctorInfo.label[0].toUpperCase()}
                                    ></img>
                                    {doctorInfo.label}
                                  </li>
                                )
                              }
                            )}
                          </ul>
                        </div>
                      </div>
                    </Col>

                    <Col sm={12} md={8} lg={8} className="time-container">
                    
                      <h5 className="title">Appointment Slots</h5>
                      <div className="room-tabs">
                        <CNavTabs
                          roles={appointmentStatusDetail.hospitalDepartmentRoomInfoId?appointmentStatusDetail.roomList:[]}
                          currentActiveTab={
                            appointmentStatusDetail.hospitalDepartmentRoomInfoId
                          }
                          onClick={onChangeRoom}
                          departmentInfoId={{
                            value: appointmentStatusDetail.hospitalDepartmentId,
                            label:
                              appointmentStatusDetail.hospitalDepartmentName
                          }}
                          uniqueIdentifier={appointmentStatusDetail.uniqueIdentifier}
                          date={appointmentStatusDetail.date}
                        />
                      </div>

                    
                      <p className="time-details">
                        <i className="fa fa-calendar"></i> &nbsp;
                        {DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
                          appointmentStatusDetail.date
                        )}
                        &nbsp;,&nbsp;
                        {appointmentStatusDetail.weekDayName}
                        {appointmentStatusDetail.appointmentTimeSlots ? (
                          appointmentStatusDetail.appointmentTimeSlots.length ? (
                            <span className="time">
                              <i className="fa fa-clock-o"></i> &nbsp;
                              {DateTimeFormatterUtils.convertDateToHourMinuteFormat(
                                DateTimeFormatterUtils.convertStringTimeInHourMinuteFormatToDate(
                                  appointmentStatusDetail.startTime
                                )
                              )}{' '}
                              -&nbsp;
                              {DateTimeFormatterUtils.convertDateToHourMinuteFormat(
                                DateTimeFormatterUtils.convertStringTimeInHourMinuteFormatToDate(
                                  appointmentStatusDetail.endTime
                                )
                              )}
                            </span>
                          ) : (
                            ''
                          )
                        ) : (
                          ''
                        )}
                        &nbsp;
                        {appointmentStatusDetail.dayOffStatus === 'Y' &&
                        appointmentStatusDetail.doctorTimeSlots &&
                        appointmentStatusDetail.doctorTimeSlots.length ? (
                          <div className="back-day-off">
                            <i className="fa fa-calendar-times-o" />{' '}
                            {DAY_OFF_MESSAGE}{' '}
                          </div>
                        ) : (
                          ''
                        )}
                      </p>
                      <ul>
                        {appointmentStatusDetail.appointmentTimeSlots ? (
                          appointmentStatusDetail.appointmentTimeSlots
                            .length ? (
                            appointmentStatusDetail.appointmentTimeSlots.map(
                              (timeSlot, index) => (
                                <li key={'timeSlot-' + index}>
                                  {['PA', 'A', 'C'].indexOf(timeSlot.status) >=
                                  0 ? (
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip
                                          id={timeSlot.status + '-' + index}
                                        >
                                          App no: {timeSlot.appointmentNumber}
                                          <br></br>
                                          {timeSlot.patientName} ({timeSlot.age}{' '}
                                          / {timeSlot.gender})<br></br>
                                          Mobile No:{' '}
                                          {timeSlot.mobileNumber || 'N/A'}
                                        </Tooltip>
                                      }
                                    >
                                      <Button
                                        id={
                                          timeSlot.appointmentTime +
                                          '-' +
                                          rowIndex +
                                          index
                                        }
                                        onClick={() =>
                                          getPatientDetails(
                                            timeSlot,
                                            appointmentStatusDetail.date,
                                            rowIndex,
                                            index
                                          )
                                        }
                                        variant={
                                          timeSlot.status === 'PA'
                                            ? 'warning'
                                            : timeSlot.status === 'A'
                                            ? 'primary'
                                            : timeSlot.status === 'C'
                                            ? 'danger'
                                            : 'info'
                                        }
                                        size="lg block"
                                        className="time-button"
                                      >
                                        <i className="fa fa-check-circle" />
                                        &nbsp;
                                        {timeSlot.isFollowUp === 'Y' ? (
                                          <>
                                            {' '}
                                            <i className="fa fa-tag" />
                                            &nbsp;
                                          </>
                                        ) : (
                                          ''
                                        )}
                                        {timeSlot.appointmentTime}
                                      </Button>
                                    </OverlayTrigger>
                                  ) : timeSlot.status === 'V' &&
                                    appointmentStatusDetail.dayOffStatus !==
                                      'Y' ? (
                                    <CButton
                                      id={
                                        timeSlot.appointmentTime +
                                        '-' +
                                        rowIndex +
                                        index
                                      }
                                      variant={'success'}
                                      size="lg"
                                      // id="vacant"
                                      disabled={timeSlot.hasTimePassed}
                                      name=""
                                      onClickHandler={() =>
                                        getPatientDetails(
                                          timeSlot,
                                          appointmentStatusDetail.date,
                                          rowIndex,
                                          index
                                        )
                                      }
                                    >
                                      {timeSlot.isFollowUp === 'Y' ? (
                                        <>
                                          {' '}
                                          <i className="fa fa-tag" />
                                          &nbsp;
                                        </>
                                      ) : (
                                        ''
                                      )}
                                      {timeSlot.appointmentTime}
                                    </CButton>
                                  ) : (
                                    ''
                                  )}
                                </li>
                              )
                            )
                          ) : appointmentStatusDetail.dayOffStatus === 'Y' ? (
                            <div className="day-off">
                              <i className="fa  fa-calendar-times-o" />
                              <span>{DAY_OFF_MESSAGE}</span>
                            </div>
                          ) : (
                            <div className="day-off">
                              <i className="fa  fa-calendar-times-o" />
                              <span>{TIME_SLOT_EMPTY_ERROR_MESSAGE}</span>
                            </div>
                          )
                        ) : appointmentStatusDetail.dayOffStatus === 'Y' ? (
                          <div className="day-off">
                            <i className="fa fa-calendar-times-o" />
                            <span>{DAY_OFF_MESSAGE}</span>
                          </div>
                        ) : (
                          <div className="day-off">
                            <i className="fa  fa-calendar-times-o" />
                            <span>{TIME_SLOT_EMPTY_ERROR_MESSAGE}</span>
                          </div>
                        )}
                      </ul>
                    </Col>
                    {appointmentStatusDetail.patientDetails ? (
                      <Col sm={12} md={2} lg={2}>
                        <div className="patient-container">
                          <h5 className="title">Patients Details </h5>
                          <br></br>
                          <div className="patient-details">
                            <div className="label">Appointment No.</div>
                            <div className="data">
                              {
                                appointmentStatusDetail.patientDetails
                                  .appointmentNumber
                              }
                              <br />
                              {appointmentStatusDetail.patientDetails
                                .isFollowUp === 'Y' ? (
                                <>
                                  <span className="pd-followup">
                                    <i className="fa fa-tag" />
                                    &nbsp; Follow Up
                                  </span>
                                </>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>

                          <div className="patient-details">
                            <div className="label">Appointment Amount</div>
                            <div className="data">
                              {
                                appointmentStatusDetail.patientDetails
                                  .appointmentAmount
                              }
                            </div>
                          </div>

                          <div className="patient-details">
                            <div className="label">Appointment Mode</div>
                            <div className="data">
                              {
                                appointmentStatusDetail.patientDetails
                                  .appointmentMode
                              }
                            </div>
                          </div>

                          <div className="patient-details">
                            <div className="label">Patient Details</div>
                            <div className="data">
                              {appointmentStatusDetail.patientDetails.name}
                              <br />
                              {' (' +
                                appointmentStatusDetail.patientDetails.age +
                                ' / ' +
                                appointmentStatusDetail.patientDetails.gender +
                                ')'}
                              <br />
                              <Badge
                                variant={
                                  appointmentStatusDetail.patientDetails
                                    .patientType === 'N'
                                    ? 'primary'
                                    : 'success'
                                }
                              >
                                {appointmentStatusDetail.patientDetails
                                  .patientType === 'N'
                                  ? 'NEW'
                                  : 'REGISTERED'}
                              </Badge>{' '}
                            </div>
                          </div>

                          <div className="patient-details">
                            <div className="label">Contact No.</div>
                            <div className="data">
                              {
                                appointmentStatusDetail.patientDetails
                                  .mobileNumber
                              }
                            </div>
                          </div>

                          <div className="patient-details">
                            <div className="label">Address</div>
                            <div className="data">
                              {appointmentStatusDetail.patientDetails.address}
                            </div>
                          </div>

                          <CButton
                            name=""
                            variant="outline-primary"
                            size="sm"
                            block
                            onClickHandler={() =>
                              handleViewAppointmentDetails(
                                appointmentStatusDetail
                              )
                            }
                            disabled={showAppointmentDetailModal}
                            // className="btn-checkin"
                          >
                            <i className="fa fa-eye" /> &nbsp;
                            {showAppointmentDetailModal ? (
                              <span className="saving">
                                Viewing Details{' '}
                                <img
                                  alt="three-dots"
                                  src={require('../../images/three-dots.svg')}
                                />
                              </span>
                            ) : (
                              'View Details'
                            )}
                          </CButton>

                          {appointmentStatusDetail.patientDetails
                            .showCheckInButton ? (
                            <CButton
                              name=""
                              // className={showCheckInModal ? 'btn-checkin':'btn-checkin'}
                              vairant="primary "
                              size="sm"
                              className="btn-checkin"
                              onClickHandler={() =>
                                handleCheckIn(appointmentStatusDetail)
                              }
                              disabled={
                                !appointmentStatusDetail.patientDetails
                                  .canCheckIn || showCheckInModal
                              }
                              // isLoading={showCheckInModal}
                            >
                              <i className="fa fa-sign-in" /> &nbsp;
                              {showCheckInModal ? (
                                <span className="saving">
                                  Checking-In{' '}
                                  <img
                                    alt="three-dots"
                                    src={require('../../images/three-dots.svg')}
                                  />
                                </span>
                              ) : (
                                'Check-In'
                              )}
                            </CButton>
                          ) : (
                            ''
                          )}
                        </div>
                      </Col>
                    ) : (
                      ''
                    )}
                  </Row>
                )
              )
            ) : (
              <>
                {!isStatusListLoading && errorMessageForStatusDetails ? (
                  <Row>
                    <Col>
                      <div className="filter-message">
                        <div className="no-data ">
                          <i className="fa fa-hand-o-up" />
                        </div>
                        <div className="message text-center">
                          {errorMessageForStatusDetails}
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : !isStatusListLoading && searchErrorMessage ? (
                  <Row>
                    <Col>
                      <div className="filter-message">
                        <div className="no-data primary">
                          <i className="fa fa-file-text-o" />
                        </div>
                        <div className="message text-center">
                          {searchErrorMessage}
                        </div>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <CLoading />
                )}
              </>
            )}
          </Container>
        </CScrollbar>
      </div>
    </>
  )
}
export default AppointmentStatusDetails
