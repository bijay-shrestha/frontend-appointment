import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AppointmentDetailsMiddleware,
  //DoctorMiddleware,
  // HospitalSetupMiddleware,
  PatientDetailsMiddleware,
  //SpecializationSetupMiddleware,
  HospitalDepartmentSetupMiddleware,
 // RoomSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  DateTimeFormatterUtils,
  EnterKeyPressUtils
} from '@frontend-appointment/helpers'
import './appointment-status.scss'
import {CAlert} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'

const {
  fetchAppointmentStatusList,
  fetchAppointmentStatusListByDepartment,
  fetchAppointmentStatusListByRoom,
  clearAppointmentStatusMessage,
  appointmentApprove
} = AppointmentDetailsMiddleware
// const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
// const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware
// const {
//   fetchSpecializationHospitalWiseForDropdown
// } = SpecializationSetupMiddleware

const {fetchPatientDetailByAppointmentId} = PatientDetailsMiddleware

const {
 // fetchActiveHospitalDepartmentForDropdownByHospitalId,
  fetchAllHospitalDepartmentForDropdown
} = HospitalDepartmentSetupMiddleware

const {
  appointmentSetupApiConstant,
  // hospitalSetupApiConstants,
  // doctorSetupApiConstants,
  // specializationSetupAPIConstants,
  patientSetupApiConstant,
  // roomSetupApiConstants,
  hospitalDepartmentSetupApiConstants
} = AdminModuleAPIConstants

// const {FETCH_HOSPITALS_FOR_DROPDOWN} = hospitalSetupApiConstants
// const {
//   FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN
// } = doctorSetupApiConstants
// const {
//   SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL
// } = specializationSetupAPIConstants
const {
  //APPOINTMENT_STATUS_LIST,
  APPOINTMENT_HOSPITAL_DEPARTMENT_LIST,
  APPOINTMENT_HOSPITAL_DEPARTMENT_ROOM_LIST,
  APPOINTMENT_APPROVE
} = appointmentSetupApiConstant

const {FETCH_PATIENT_DETAIL_BY_APPOINTMENT_ID} = patientSetupApiConstant

const {
  isFirstDateGreaterThanSecondDate,
  getDateWithTimeSetToGivenTime,
  getNoOfDaysBetweenGivenDatesInclusive
} = DateTimeFormatterUtils

const SELECT_DEPARTMENT_MESSAGE = 'Select Department.'
const DATE_RANGE_ERROR_MESSAGE =
  'From date and to date must be within 7 days or less.'

const ClientAppointmentStatusHOCByDepartment = (ComposedComponent, props, type) => {
  class ClientAppointmentStatusByDepartment extends React.PureComponent {
    state = {
      searchParameters: {
        fromDate: new Date(),
        toDate: new Date(),
        hospitalDepartmentId: '',
        hospitalDepartmentRoomInfoId: '',
        status: '',
        uniqueIdentifier: '',
        roomFromDate:'',
        roomToDate:'',
        appointmentNumber:'',
        hasAppointmentNumber:''
      },
      showModal: false,
      appointmentStatusDetails: [],
      doctorInfoList: [],
      appointmentStatusDetailsCopy: [],
      selectedPatientData: {},
      errorMessageForStatusDetails: SELECT_DEPARTMENT_MESSAGE,
      showAlert: false,
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      activeStatus: 'ALL',
      previousSelectedTimeSlotIds: '', // used for changing class of time slots, remove /add active class
      previousSelectedTimeSlotRowIndex: '',
      appointmentDetails: '',
      showCheckInModal: false,
      isConfirming: false,
      showAppointmentDetailModal: false,
      searchErrorMessage: '',
      searchStatusLoading: ''
    }

    onChangeRoom = async (roomId, departmentId, uniqueIdentifier,date) => {
      await this.handleSearchFormChange(
        {target: {name: 'hospitalDepartmentRoomInfoId', value: roomId}},
        ''
      )
      await this.handleSearchFormChange({target: {...departmentId}})

      await this.handleSearchFormChange({
        target: {name: 'uniqueIdentifier', value: uniqueIdentifier}
      })

      this.searchAppointmentStatus('C', roomId, departmentId,date)
    }

   
    fetchDepartment= async() => {
      await this.props.fetchAllHospitalDepartmentForDropdown(
        hospitalDepartmentSetupApiConstants.FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN,
      )
    }

    // fetchRoomByDepartmentId = async departmentId => {
    //   await this.props.fetchActiveRoomNumberForDropdownByDepartmentId(
    //     roomSetupApiConstants.FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_FOR_DROPDOWN,
    //     departmentId
    //   )
    // }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchAppointmentStatus()
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          fromDate: new Date(),
          toDate: new Date(),
          //doctorId: '',
          hospitalDepartmentId: '',
          hospitalDepartmentRoomInfoId: '',
          status: '',
          uniqueIdentifier: '',
          roomFromDate:'',
          roomToDate:'',
          appointmentNumber:'',
          hasAppointmentNumber:''
        },
        statusDetails: [],
        errorMessageForStatusDetails: SELECT_DEPARTMENT_MESSAGE,
        appointmentStatusDetails: [],
        appointmentStatusDetailsCopy: [],
        previousSelectedTimeSlotRowIndex: '',
        previousSelectedTimeSlotIds: '',
        searchErrorMessage: '',
        searchStatusLoading: ''
      })
      this.props.clearAppointmentStatusMessage()
    }

    handleSearchFormChange = async (event, field) => {
      if (event) {
        let fieldName, value, label, fileUri
        fieldName = field ? field : event.target.name
        value = field ? event : event.target.value
        label = field ? '' : event.target.label
        fileUri = field ? '' : event.target.fileUri

        let searchParams = {...this.state.searchParameters}
        searchParams[fieldName] = label
          ? value
            ? fileUri
              ? {value, label, fileUri}
              : {
                  value,
                  label
                }
            : ''
          : value
        await this.setStateValuesForSearch(searchParams)


        let errorMsg = ''
        if (['fromDate', 'toDate'].indexOf(fieldName) >= 0) {
          if (
            isFirstDateGreaterThanSecondDate(
              getDateWithTimeSetToGivenTime(searchParams.fromDate, 0, 0, 0),
              getDateWithTimeSetToGivenTime(searchParams.toDate, 0, 0, 0)
            )
          ) {
            errorMsg = 'From date cannot be greater than To date!'
            this.showWarningAlert(errorMsg)
            this.clearAlertTimeout()
          } else if (
            getNoOfDaysBetweenGivenDatesInclusive(
              searchParams.fromDate,
              searchParams.toDate
            ) > 7
          ) {
            errorMsg = DATE_RANGE_ERROR_MESSAGE
            this.showWarningAlert(errorMsg)
            this.clearAlertTimeout()
          }
        }
      }
    }

    handleCheckIn = async appointmentStatusDetail => {
      sessionStorage.setItem('actionType', 14)
      let appointmentData = {
        hospitalName: appointmentStatusDetail.patientDetails.hospitalName || '',
        doctorName: appointmentStatusDetail.doctorName,
        specializationName: appointmentStatusDetail.specializationName,
        appointmentId: appointmentStatusDetail.patientDetails.appointmentId,
        appointmentDate: appointmentStatusDetail.date,
        appointmentTime:
          appointmentStatusDetail.patientDetails.appointmentTime || 'N/A',
        appointmentNumber:
          appointmentStatusDetail.patientDetails.appointmentNumber,
        appointmentAmount:
          appointmentStatusDetail.patientDetails.appointmentAmount,
        patientName:
          appointmentStatusDetail.patientDetails.name +
          ' (' +
          appointmentStatusDetail.patientDetails.age +
          ' / ' +
          appointmentStatusDetail.patientDetails.gender +
          ')',
        mobileNumber: appointmentStatusDetail.patientDetails.mobileNumber,
        patientType:
          appointmentStatusDetail.patientDetails.patientType || 'N/A',
        registrationNumber:
          appointmentStatusDetail.patientDetails.registrationNumber || 'N/A',
        esewaId: appointmentStatusDetail.patientDetails.esewaId || 'N/A',
        transactionNumber:
          appointmentStatusDetail.patientDetails.transactionNumber || 'N/A',
        appointmentMode:
          appointmentStatusDetail.patientDetails.appointmentMode || 'N/A'
      }
      this.setState({
        showCheckInModal: true,
        appointmentDetails: {...appointmentData}
      })
    }

    handleViewAppointmentDetails = async appointmentStatusDetail => {
      let appointmentData = {
        hospitalName: appointmentStatusDetail.patientDetails.hospitalName || '',
        doctorName: appointmentStatusDetail.doctorName,
        specializationName: appointmentStatusDetail.specializationName,
        appointmentId: appointmentStatusDetail.patientDetails.appointmentId,
        appointmentDate: appointmentStatusDetail.date,
        appointmentTime:
          appointmentStatusDetail.patientDetails.appointmentTime || 'N/A',
        appointmentNumber:
          appointmentStatusDetail.patientDetails.appointmentNumber,
        appointmentAmount:
          appointmentStatusDetail.patientDetails.appointmentAmount,
        patientName:
          appointmentStatusDetail.patientDetails.name +
          ' (' +
          appointmentStatusDetail.patientDetails.age +
          ' / ' +
          appointmentStatusDetail.patientDetails.gender +
          ')',
        mobileNumber: appointmentStatusDetail.patientDetails.mobileNumber,
        patientType:
          appointmentStatusDetail.patientDetails.patientType || 'N/A',
        registrationNumber:
          appointmentStatusDetail.patientDetails.registrationNumber || 'N/A',
        esewaId: appointmentStatusDetail.patientDetails.esewaId || 'N/A',
        transactionNumber:
          appointmentStatusDetail.patientDetails.transactionNumber || 'N/A',
        appointmentMode:
          appointmentStatusDetail.patientDetails.appointmentMode || 'N/A'
      }
      this.setState({
        showAppointmentDetailModal: true,
        appointmentDetails: {...appointmentData}
      })
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    setShowModal = () => {
      this.setState(prevState => ({
        showCheckInModal: !prevState.showCheckInModal
      }))
    }

    showWarningAlert = message => {
      this.setState({
        showAlert: true,
        alertMessageInfo: {
          variant: 'warning',
          message: message
        }
      })
    }

    showErrorAlert = message => {
      this.setState({
        showAlert: true,
        alertMessageInfo: {
          variant: 'danger',
          message: message
        }
      })
    }

    checkInAppointment = async appointmentId => {
      try {
        this.setState({
          isConfirming: true
        })
        await this.props.appointmentApprove(APPOINTMENT_APPROVE, appointmentId)
        this.setState({
          showCheckInModal: false,
          showAlert: true,
          isConfirming: false,
          alertMessageInfo: {
            variant: 'success',
            message: this.props.AppointmentApproveReducer.approveSuccessMessage
          }
        })
        await this.searchAppointmentStatus()
      } catch (e) {
        this.setState({
          showAlert: true,
          isConfirming: false,
          alertMessageInfo: {
            showCheckInModal: false,
            variant: 'danger',
            message: this.props.AppointmentApproveReducer.approveErrorMessage
          }
        })
      }
    }

    clearAlertTimeout = () => {
      setTimeout(() => this.closeAlert(), 5000)
    }

    closeAlert = () => {
      this.setState({
        showAlert: false
      })
    }

    closeAppointmentDetailModal = () => {
      this.setState({
        showAppointmentDetailModal: false,
        appointmentDetails: {}
      })
    }

    callApiForHospitalChange = async hospitalId => {
      await this.fetchDepartmentByHospitalId(hospitalId)
      //this.fetchDoctorsByHospital(hospitalId);
      // this.fetchSpecializationByHospital(hospitalId);
      this.setState({
        searchParameters: {
          ...this.state.searchParameters,
          doctorId: '',
          specializationId: ''
        }
      })
    }

    initialApiCalls = async () => {
      await this.fetchDepartment()
    }

    setDoctorInfoInDepartMentList = (departmentList, doctorList) => {
      if (!departmentList) return []
      if (!departmentList.length) return []
      return departmentList.map(deptInfo => {
        return {
          ...deptInfo,
          doctorInfoList: doctorList.filter(
            doctorInfo =>
              doctorInfo.hospitalDepartmentId === deptInfo.hospitalDepartmentId
          )
        }
      })
    }

    findRoomFromGivenList = roomList => {
      if (!roomList) return []
      if (!roomList.length) return []
      let found = null
      for (let count = 0; count < roomList.length; count++) {
        let room = roomList[count]
        if (
          room.value ===
          this.state.searchParameters.hospitalDepartmentRoomInfoId
        ) {
          found = {
            hospitalDepartmentRoomInfoId: room.value,
            roomNumber: room.label
          }
          break
        }
      }
      return found
    }
    filterAndChangeValueForRoomAndTimeSlot = filterValuesList => {
      let changedApptStatusList = []
      if (filterValuesList.length) {
        this.state.appointmentStatusDetailsCopy.map(apptDetail => {
          let roomChosedValue = filterValuesList[0]
          if (
            roomChosedValue.uniqueIdentifier===
            apptDetail.uniqueIdentifier
          ) {
            changedApptStatusList.push({
              ...apptDetail,
              hospitalDepartmentRoomInfoId:roomChosedValue.hospitalDepartmentRoomInfoId,
              roomNumber: roomChosedValue.roomNumber,
              appointmentTimeSlots: roomChosedValue.appointmentTimeSlots,
              patientDetails:null
            })
          } else changedApptStatusList.push(apptDetail)
          return apptDetail
        })
      } else {
        this.state.appointmentStatusDetailsCopy.map(apptDetail => {
          if (
            this.state.searchParameters.uniqueIdentifier ===
            apptDetail.uniqueIdentifier
          ) {
            const room = this.findRoomFromGivenList(apptDetail.roomList)
            changedApptStatusList.push({
              ...apptDetail,
              ...room,
              appointmentTimeSlots: [],
              patientDetails:null
            })
          } else changedApptStatusList.push(apptDetail)
          return apptDetail
        })
      }
      return changedApptStatusList
    }

    searchAppointmentStatus = async (type, roomId,departmentId,date) => {
      const {
        fromDate,
        toDate,
        hospitalDepartmentId,
        //hospitalDepartmentRosterId,
        appointmentNumber,
        //hasAppointmentNumber,
        status
      } = this.state.searchParameters
    
      let searchErrorMessage, searchStatusLoading;

      if (this.isSearchParametersValid()) {
        if(type!=='C')
        this.setState({
         appointmentStatusDetails: [],
         searchErrorMessage: '',
         searchStatusLoading: true
       })
        let searchData = {
          fromDate:type!=='C'?fromDate:date,
          toDate:type!=='C'?toDate:date,
          hospitalDepartmentId:
            type !== 'C'
              ? hospitalDepartmentId.value || ''
              : departmentId.value,
          hospitalDepartmentRoomInfoId: roomId || '',
          appointmentNumber:appointmentNumber,
          hasAppointmentNumber:appointmentNumber?'Y':'N',
          status: (status.value === 'ALL' ? '' : status.value) || ''
        }

        try {
          let appointmentStatusList = []
          let apptStatusInfo = []
          let doctorList = []
          if (type !== 'C') {
            await this.props.fetchAppointmentStatusListByDepartment(
              APPOINTMENT_HOSPITAL_DEPARTMENT_LIST,
              searchData
            )
            apptStatusInfo = [
              ...this.props.AppointmenStatusByDepartmentListReducer
                .apptStatusInfo
            ]
            doctorList = [
              ...this.props.AppointmenStatusByDepartmentListReducer
                .doctorStatusInfo
            ]
            appointmentStatusList = this.setDoctorInfoInDepartMentList(
              apptStatusInfo,
              doctorList
            )

            // if (this.props.AppointmenStatusByDepartmentListReducer.statusList) {
            //   if (
            //     this.props.AppointmenStatusByDepartmentListReducer.statusList
            //       .doctorDutyRosterInfo.length
            //   )
            //     statusList = [
            //       ...this.props.AppointmentStatusListReducer.statusList
            //         .doctorDutyRosterInfo
            //     ]
            //   doctorInfo = this.props.AppointmentStatusListReducer.statusList && [
            //     ...this.props.AppointmentStatusListReducer.statusList.doctorInfo
            //   ]
            // }   isAppointmentStatusByRoomListLoading,
            searchErrorMessage = this.props
              .AppointmenStatusByDepartmentListReducer
              .isAppointmentStatusErrorMessage
            searchStatusLoading = this.props
              .AppointmenStatusByDepartmentListReducer
              .isAppointmentStatusListLoading
          } else {
            await this.props.fetchAppointmentStatusListByRoom(
              APPOINTMENT_HOSPITAL_DEPARTMENT_ROOM_LIST,
              searchData
            )

            apptStatusInfo = [
              ...this.props.AppointmenStatusByRoomListReducer.apptRoomStatusInfo
            ]

            appointmentStatusList = this.filterAndChangeValueForRoomAndTimeSlot(
              apptStatusInfo
            )
            searchErrorMessage=""
            searchStatusLoading=false;
            // searchErrorMessage = this.props.AppointmenStatusByRoomListReducer
            //   .isAppointmentStatusByRoomErrorMessage
            // searchStatusLoading = this.props.AppointmenStatusByRoomListReducer
            //   .isAppointmentStatusByRoomListLoading
          }

          await this.setState({
            appointmentStatusDetails: appointmentStatusList,
            appointmentStatusDetailsCopy: appointmentStatusList,
            previousSelectedTimeSlotIds: '',
            searchErrorMessage: searchErrorMessage,
            searchStatusLoading: searchStatusLoading
          })
        } catch (e) {
          console.log(e);
        }
      }
    }

    filterAppointmentDetailsByStatus = async (status, event) => {
      event.preventDefault()
      let appointmentStatus = [...this.state.appointmentStatusDetailsCopy],
        filteredStatus

      if (status !== 'ALL') {
        filteredStatus = appointmentStatus.map(appointment => {
          let appointmentCopy = {...appointment}
          if (appointment.appointmentTimeSlots) {
            let filteredTimeSlots = appointment.appointmentTimeSlots.filter(
              time =>
                status === 'F'
                  ? time.isFollowUp === 'Y'
                  : time.status === status
            )
            appointmentCopy.appointmentTimeSlots = [...filteredTimeSlots]
          }
          return appointmentCopy
        })
      } else {
        filteredStatus = [...this.state.appointmentStatusDetailsCopy]
      }

      await this.setState({
        appointmentStatusDetails: [...filteredStatus],
        activeStatus: status,
        previousSelectedTimeSlotIds: ''
      })
    }

    getPatientDataByAppointmentId = async appointmentId => {
      await this.props.fetchPatientDetailByAppointmentId(
        FETCH_PATIENT_DETAIL_BY_APPOINTMENT_ID,
        appointmentId
      )
    }

    getPatientDetails = async (
      timeSlot,
      appointmentDate,
      rowIndex,
      timeSlotIndex
    ) => {
      let elementId = timeSlot.appointmentTime + '-' + rowIndex + timeSlotIndex
      let statusDetails = [...this.state.appointmentStatusDetails]

      let selectedElementsArray = this.addRemoveActiveClassFromTimeSlots(
        elementId,
        rowIndex
      )

      if (timeSlot.appointmentId) {
        try {
          await this.getPatientDataByAppointmentId(timeSlot.appointmentId)

          let patientDetail = this.setPatientDataProps(
            appointmentDate,
            timeSlot
          )
          statusDetails[rowIndex].patientDetails = {...patientDetail}
          this.setState({
            appointmentStatusDetails: [...statusDetails],
            previousSelectedTimeSlotIds: selectedElementsArray
          })
        } catch (e) {
          this.showErrorAlert(
            this.props.PatientDetailReducer.patientDetailErrorMessage
          )
          this.clearAlertTimeout()
        }
      } else {
        statusDetails[rowIndex].patientDetails = null
        await this.setState({
          appointmentStatusDetails: [...statusDetails],
          previousSelectedTimeSlotIds: selectedElementsArray
        })
      }
    }

    addRemoveActiveClassFromTimeSlots = (elementId, rowIndex) => {
      let selectedElement = document.getElementById(elementId)
      selectedElement && selectedElement.classList.add('active')

      let previousElement = this.state.previousSelectedTimeSlotIds
        ? {...this.state.previousSelectedTimeSlotIds}
        : ''
      let selectedElementsArray
      if (previousElement !== '') {
        selectedElementsArray = {
          ...previousElement,
          [rowIndex]: elementId
        }
      } else {
        selectedElementsArray = {
          [rowIndex]: elementId
        }
      }

      if (
        this.state.previousSelectedTimeSlotIds &&
        Object.keys(this.state.previousSelectedTimeSlotIds).includes(
          rowIndex.toString()
        ) &&
        this.state.previousSelectedTimeSlotIds[rowIndex] !== elementId
      ) {
        let previousElement = document.getElementById(
          this.state.previousSelectedTimeSlotIds[rowIndex]
        )
        previousElement && previousElement.classList.remove('active')
      }

      return selectedElementsArray
    }

    setPatientDataProps = (appointmentDate, timeSlot) => {
      let patientData = this.props.PatientDetailReducer.patientDetails

      let isFutureDate = DateTimeFormatterUtils.isFirstDateGreaterThanSecondDate(
        new Date(appointmentDate),
        new Date()
      )
      return {
        ...patientData,
        appointmentTime: timeSlot.appointmentTime,
        appointmentId: timeSlot.appointmentId,
        canCheckIn: !isFutureDate,
        showCheckInButton:
          ['A', 'C'].indexOf(timeSlot.status) >= 0 ? false : true
      }
    }

    isSearchParametersValid = () => {
      const {
        fromDate,
        toDate,
        //hospitalId,
        appointmentNumber,
        hospitalDepartmentId
      } = this.state.searchParameters

      let errorMessageForStatus =""
      let appointmentStatusDetails = [...this.state.appointmentStatusDetails]

      // if (
      //   fromDate &&
      //   toDate &&
      //   getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) === 1
      // ) {
      //   errorMessageForStatus =  ? '' : SELECT_HOSPITAL_MESSAGE
      // } else
      if(!appointmentNumber){
       if (
        fromDate &&
        toDate &&
        getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) <= 7
      ) {
        errorMessageForStatus = //hospitalId
         // ? 
            hospitalDepartmentId
            ? ''
            : SELECT_DEPARTMENT_MESSAGE
          //: SELECT_HOSPITAL_AND_DOCTOR_MESSAGE
      } else if (
        fromDate &&
        toDate &&
        getNoOfDaysBetweenGivenDatesInclusive(fromDate, toDate) > 7
      ) {
        errorMessageForStatus = DATE_RANGE_ERROR_MESSAGE
      }

      this.setState({
        errorMessageForStatusDetails: errorMessageForStatus,
        appointmentStatusDetails: errorMessageForStatus
          ? []
          : appointmentStatusDetails
      })
    }

      return errorMessageForStatus ? false : true
    }

    componentDidMount () {
      this.initialApiCalls()
    }

    componentWillUnmount () {
      clearTimeout(this.clearAlertTimeout)
    }

    render () {
      const {
        searchParameters,
        appointmentStatusDetails,
        doctorInfoList,
        errorMessageForStatusDetails,
        showAlert,
        alertMessageInfo,
        activeStatus,
        showCheckInModal,
        appointmentDetails,
        isConfirming,
        showAppointmentDetailModal,
        searchErrorMessage,
        searchStatusLoading
      } = this.state

      // const {hospitalsForDropdown} = this.props.HospitalDropdownReducer

      // const {
      //   activeDoctorsByHospitalForDropdown,
      //   doctorDropdownErrorMessage
      // } = this.props.DoctorDropdownReducer

      // const {
      //   activeSpecializationListByHospital,
      //   dropdownErrorMessage
      // } = this.props.SpecializationDropdownReducer

    
      const {
        isFetchAllHospitalDepartmentLoading,
        allHospitalDepartmentForDropdown,
        allDepartmentDropdownErrorMessage
      } = this.props.HospitalDepartmentDropdownReducer

      // const {
      //   isFetchActiveRoomNumberByDepartmentLoading,
      //   activeRoomNumberForDropdownByDepartment,
      //   activeRoomsByDepartmentDropdownErrorMessage
      // } = this.props.RoomNumberDropdownReducer
      return (
        <>
          <div id="appointment-status">
            <ComposedComponent
              {...this.props}
              {...props}
              searchHandler={{
                handleSearchFormChange: this.handleSearchFormChange,
                resetSearchForm: this.handleSearchFormReset,
                searchAppointmentStatus: this.searchAppointmentStatus,
                searchParameters: searchParameters,
                isFetchAllHospitalDepartmentLoading,
                activeHospitalDepartmentForDropdown:allHospitalDepartmentForDropdown,
                activeDepartmentDropdownErrorMessage:allDepartmentDropdownErrorMessage
              }}
              statusDetailsData={{
                appointmentStatusDetails,
                doctorInfoList,
                errorMessageForStatusDetails,
                searchErrorMessage: searchErrorMessage,
                isStatusListLoading: searchStatusLoading,
                searchAppointmentStatus: this.searchAppointmentStatus,
                getPatientDetails: this.getPatientDetails,
                handleCheckIn: this.handleCheckIn,
                activeStatus: activeStatus,
                filterAppointmentDetailsByStatus: this
                  .filterAppointmentDetailsByStatus,
                showCheckInModal: showCheckInModal,
                handleViewAppointmentDetails: this.handleViewAppointmentDetails,
                onChangeRoom: this.onChangeRoom
              }}
              checkInModalData={{
                showCheckInModal: showCheckInModal,
                showAppointmentDetailModal: showAppointmentDetailModal,
                setShowModal: this.setShowModal,
                checkInAppointment: this.checkInAppointment,
                appointmentDetails: {...appointmentDetails},
                isConfirming: isConfirming,
                closeAppointmentDetailModal: this.closeAppointmentDetailModal
              }}
            />
            <CAlert
              id="profile-manage"
              variant={alertMessageInfo.variant}
              show={showAlert}
              onClose={this.closeAlert}
              alertType={
                alertMessageInfo.variant === 'success' ? (
                  <>
                    <Material.MdDone />
                  </>
                ) : (
                  <>
                    <i
                      className="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    />
                  </>
                )
              }
              message={alertMessageInfo.message}
            />
          </div>
        </>
      )
    }
  }

  return ConnectHoc(
    ClientAppointmentStatusByDepartment,
    [
      'AppointmentStatusListReducer',
      'AppointmentApproveReducer',
      'PatientDetailReducer',
      'HospitalDepartmentDropdownReducer',
      'AppointmenStatusByDepartmentListReducer',
      'AppointmenStatusByRoomListReducer'
    ],
    {
      fetchAppointmentStatusList,
      clearAppointmentStatusMessage,
      fetchPatientDetailByAppointmentId,
      appointmentApprove,
      fetchAllHospitalDepartmentForDropdown,
      fetchAppointmentStatusListByDepartment,
      fetchAppointmentStatusListByRoom
    }
  )
}

export default ClientAppointmentStatusHOCByDepartment
