import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AppointmentDetailsMiddleware,
  AppointmentServiceTypeMiddleware,
  DoctorMiddleware,
  HospitalDepartmentSetupMiddleware,
  HospitalSetupMiddleware,
  PatientDetailsMiddleware,
  SpecializationSetupMiddleware,
  RoomSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  DateTimeFormatterUtils,
  EnterKeyPressUtils
} from '@frontend-appointment/helpers'
import {CAlert} from '@frontend-appointment/ui-elements'
import {MdDone} from 'react-icons/md'

const {
  searchRescheduleLog,
  clearRescheduleLogMessage,
  appointmentExcelDownload
} = AppointmentDetailsMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsHospitalWiseForDropdown} = DoctorMiddleware
const {
  fetchSpecializationHospitalWiseForDropdown
} = SpecializationSetupMiddleware
const {fetchPatientMetaDropdown} = PatientDetailsMiddleware
const {
  fetchAllHospitalDepartmentForDropdownByHospitalId
} = HospitalDepartmentSetupMiddleware
const {
  fetchActiveAppointmentServiceTypeByHopitalId
} = AppointmentServiceTypeMiddleware

const {
  appointmentSetupApiConstant,
  hospitalSetupApiConstants,
  doctorSetupApiConstants,
  specializationSetupAPIConstants,
  patientSetupApiConstant
} = AdminModuleAPIConstants

const {FETCH_HOSPITALS_FOR_DROPDOWN} = hospitalSetupApiConstants
const {
  FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN
} = doctorSetupApiConstants
const {
  SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL
} = specializationSetupAPIConstants
const {SEARCH_APPOINTMENT_RESCHEDULE} = appointmentSetupApiConstant
const {ALL_PATIENT_META_INFO_HOSPITAL_ID} = patientSetupApiConstant

const {
  isFirstDateGreaterThanSecondDate,
  getDateWithTimeSetToGivenTime
} = DateTimeFormatterUtils
const {fetchActiveRoomNumberForDropdownByDepartmentId} = RoomSetupMiddleware
const RescheduleLogHOC = (ComposedComponent, props, type) => {
  class RescheduleLogHOC extends React.PureComponent {
    state = {
      searchParameters: {
        fromDate: new Date(),
        toDate: new Date(),
        hospitalId: '',
        doctorId: '',
        specializationId: '',
        patientMetaInfoId: '',
        appointmentNumber: '',
        esewaId: '',
        patientType: '',
        appointmentServiceTypeCode: '',
        hospitalDepartmentId: '',
        roomId: ''
      },
      primaryAppointmentService: '',
      showModal: false,
      rescheduleLogList: [],
      showAlert: false,
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      queryParams: {
        page: 0,
        size: 10
      },
      totalRecords: 0
    }

    alertTimer = ''

    clearAlertTimeout = () => {
      this.alertTimer = setTimeout(() => this.closeAlert(), 5000)
    }

    closeAlert = () => {
      this.showOrCloseAlertMessage(false, '', '')
    }

    showOrCloseAlertMessage = (showAlert, type, message) => {
      this.setState({
        showAlert,
        alertMessageInfo: {
          variant: type,
          message: message
        }
      })
      this.clearAlertTimeout()
    }

    fetchHospitalForDropDown = async () => {
      try {
        await this.props.fetchActiveHospitalsForDropdown(
          FETCH_HOSPITALS_FOR_DROPDOWN
        )
      } catch (e) {
        console.log(e)
      }
    }

    fetchDoctorsByHospital = async hospitalId => {
      await this.props.fetchActiveDoctorsHospitalWiseForDropdown(
        FETCH_ACTIVE_DOCTORS_HOSPITAL_WISE_FOR_DROPDOWN,
        hospitalId
      )
    }

    fetchSpecializationByHospital = async hospitalId => {
      await this.props.fetchSpecializationHospitalWiseForDropdown(
        SPECIFIC_DROPDOWN_SPECIALIZATION_BY_HOSPITAL,
        hospitalId
      )
    }

    fetchPatientMetaInfo = async hospitalId => {
      await this.props.fetchPatientMetaDropdown(
        ALL_PATIENT_META_INFO_HOSPITAL_ID,
        hospitalId
      )
    }

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    fetchRoomByDepartmentId = async departmentId => {
      await this.props.fetchActiveRoomNumberForDropdownByDepartmentId(
        AdminModuleAPIConstants.roomSetupApiConstants
          .FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_FOR_DROPDOWN,
        departmentId
      )
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchRescheduleLog()
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          fromDate: new Date(),
          toDate: new Date(),
          hospitalId: '',
          doctorId: '',
          specializationId: '',
          patientMetaInfoId: '',
          appointmentNumber: '',
          esewaId: '',
          patientType: '',
          appointmentServiceTypeCode: '',
          hospitalDepartmentId: '',
          roomId: ''
        },
        rescheduleLogList: []
      })
      this.props.clearRescheduleLogMessage()
      this.searchRescheduleLog()
    }

    handleSearchFormChange = async (event, field) => {
      if (event) {
        let fieldName, value, label, fileUri
        if (field) {
          fieldName = field
          value = event
        } else {
          fieldName = event.target.name
          value = event.target.value
          label = event.target.label
          fileUri = event.target.fileUri
        }
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

        if (fieldName === 'appointmentServiceTypeCode')
          if (value === 'DOC') {
            searchParams['hospitalDepartmentId'] = ''
            searchParams['roomId'] = ''
          } else {
            searchParams['doctorId'] = ''
            searchParams['specializationId'] = ''
          }
        if (fieldName === 'hospitalDepartmentId')
          await this.fetchRoomByDepartmentId(value)
        await this.setStateValuesForSearch(searchParams)

        if (fieldName === 'hospitalId') {
          if (value) {
            this.callApiForHospitalChange(value)
          }
          await this.setState({
            searchParameters: {
              ...this.state.searchParameters,
              doctorId: '',
              specializationId: '',
              patientMetaInfoId: '',
              roomId: '',
              hospitalDepartmentId: ''
            }
          })
        }

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
          }
        }
      }
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    setShowModal = () => {
      this.setState(prevState => ({
        showModal: !prevState.showModal
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

    searchAppointmentServiceType = async hospitalId => {
      await this.props.fetchActiveAppointmentServiceTypeByHopitalId(
        AdminModuleAPIConstants.hospitalSetupApiConstants
          .HOSPITAL_API_SERVICE_TYPE,
        hospitalId
      )
    }

    setPrimaryAppointmentService = async () => {
      const {
        activeAppointmentServiceTypeWithCodeForDropdown
      } = this.props.AppointmentServiceTypeDropdownReducer
      if (activeAppointmentServiceTypeWithCodeForDropdown) {
        const allAppointmentServices = activeAppointmentServiceTypeWithCodeForDropdown
        const primaryAppointmentService = allAppointmentServices
          ? allAppointmentServices.length
            ? allAppointmentServices.filter(
                service => service.isPrimary === 'Y'
              )
            : []
          : []
        if (primaryAppointmentService.length) {
          let searchParams = {...this.state.searchParameters}
          searchParams['appointmentServiceTypeCode'] = {
            value: primaryAppointmentService[0].code,
            label: primaryAppointmentService[0].name
          }
          await this.setState({
            searchParameters: searchParams
          })
          this.searchRescheduleLog()
        }
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

    callApiForHospitalChange = async hospitalId => {
      this.fetchDoctorsByHospital(hospitalId)
      this.fetchSpecializationByHospital(hospitalId)
      this.fetchPatientMetaInfo(hospitalId)
      this.props.fetchAllHospitalDepartmentForDropdownByHospitalId(
        AdminModuleAPIConstants.hospitalDepartmentSetupApiConstants
          .FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN,
        hospitalId
      )
      await this.searchAppointmentServiceType(hospitalId)
      await this.setPrimaryAppointmentService()
    }

    initialApiCalls = async () => {
      await this.fetchHospitalForDropDown()
      await this.searchRescheduleLog(1)
    }

    searchRescheduleLog = async page => {
      const {
        fromDate,
        toDate,
        hospitalId,
        doctorId,
        specializationId,
        appointmentNumber,
        esewaId,
        patientMetaInfoId,
        patientType,
        appointmentServiceTypeCode,
        hospitalDepartmentId,
        roomId
      } = this.state.searchParameters

      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page

      let searchData = {
        fromDate,
        toDate,
        hospitalId: hospitalId.value || '',
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || '',
        appointmentNumber,
        esewaId,
        patientMetaInfoId: patientMetaInfoId.value || '',
        patientType: patientType.value || '',
        appointmentServiceTypeCode: appointmentServiceTypeCode.value || '',
        hospitalDepartmentId: hospitalDepartmentId.value || '',
        roomId: roomId.value||''
      }

      try {
        await this.props.searchRescheduleLog(
          SEARCH_APPOINTMENT_RESCHEDULE,
          {
            page: updatedPage,
            size: this.state.queryParams.size
          },
          searchData
        )
        let rescheduleLogs = this.appendSNToTable([
          ...this.props.RescheduleLogReducer.rescheduleLogList
        ])
        await this.setState({
          rescheduleLogList: [...rescheduleLogs],
          totalRecords: this.props.RescheduleLogReducer.rescheduleLogList.length
            ? this.props.RescheduleLogReducer.totalItems
            : 0,
          queryParams: {
            ...this.state.queryParams,
            page: updatedPage
          }
        })
      } catch (e) {}
    }

    appendSNToTable = logList => {
      let newLogList = []
      newLogList =
        logList.length &&
        logList.map((rescheduleData, index) => ({
          ...rescheduleData,
          // sN: index + 1,
          appointmentAmount: rescheduleData.appointmentAmount || 'N/A',
          appointmentNumber: rescheduleData.appointmentNumber || 'N/A',
          doctorName: rescheduleData.doctorName || 'N/A',
          esewaId: rescheduleData.esewaId || 'N/A',
          hospitalName: rescheduleData.hospitalName || 'N/A',
          mobileNumber: rescheduleData.mobileNumber || 'N/A',
          patientAge: rescheduleData.age || 'N/A',
          age: rescheduleData.age && rescheduleData.age.slice(0, 4),
          patientGender: rescheduleData.patientGender || 'N/A',
          gender:
            rescheduleData.patientGender &&
            rescheduleData.patientGender.split('')[0],
          patientName: rescheduleData.patientName || 'N/A',
          appointmentDate: rescheduleData.previousAppointmentDate || 'N/A',
          appointmentTime: rescheduleData.previousAppointmentTime || 'N/A',
          registrationNumber: rescheduleData.registrationNumber || 'N/A',
          remarks: rescheduleData.remarks || 'N/A',
          rescheduleAppointmentDate:
            rescheduleData.rescheduleAppointmentDate || 'N/A',
          rescheduleAppointmentTime:
            rescheduleData.rescheduleAppointmentTime || 'N/A',
          specializationName: rescheduleData.specializationName || 'N/A',
          transactionNumber: rescheduleData.transactionNumber || 'N/A',
          patientAddress: rescheduleData.patientAddress || 'N/A'
        }))
      return newLogList
    }

    downloadExcel = async () => {
      const {
        fromDate,
        toDate,
        hospitalId,
        doctorId,
        specializationId,
        appointmentNumber,
        esewaId,
        patientMetaInfoId,
        patientType,
        appointmentServiceTypeCode,
        hospitalDepartmentId,
        roomId
      } = this.state.searchParameters
      let searchData = {
        fromDate,
        toDate,
        hospitalId: hospitalId.value || '',
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || '',
        appointmentNumber,
        esewaId,
        patientMetaInfoId: patientMetaInfoId.value || '',
        patientType: patientType.value || '',
        appointmentServiceTypeCode: appointmentServiceTypeCode.value || '',
        hospitalDepartmentId: hospitalDepartmentId.value || '',
        roomId: roomId.value || ''
      }

      try {
        await appointmentExcelDownload(
          AdminModuleAPIConstants.excelApiConstants.RESCHEDULE_LOG_EXCEL,
          this.state.queryParams,
          searchData,
          `rescheduleLog ${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            fromDate
          )} - ${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            toDate
          )} downloaded successfully!!`
        )
        this.showOrCloseAlertMessage(
          true,
          'success',
          `rescheduleLog ${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            fromDate
          )} - ${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            toDate
          )} downloaded successfully!!`
        )

        return false
      } catch (e) {
        this.showOrCloseAlertMessage(
          true,
          'success',
          e.errorMessage || 'Sorry Internal Server Error'
        )
      }
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
        rescheduleLogList,
        showAlert,
        alertMessageInfo,
        queryParams,
        totalRecords,
        primaryAppointmentService
      } = this.state

      const {hospitalsForDropdown} = this.props.HospitalDropdownReducer

      const {
        activeDoctorsByHospitalForDropdown,
        doctorDropdownErrorMessage
      } = this.props.DoctorDropdownReducer

      const {
        activeSpecializationListByHospital,
        dropdownErrorMessage
      } = this.props.SpecializationDropdownReducer

      const {
        isRescheduleLogLoading,
        rescheduleLogErrorMessage
      } = this.props.RescheduleLogReducer

      const {
        patientList,
        patientDropdownErrorMessage
      } = this.props.PatientDropdownListReducer

      const {
        isFetchAppointmentServiceTypeWithCodeLoading,
        activeAppointmentServiceTypeWithCodeForDropdown,
        dropdownWithCodeErrorMessage
      } = this.props.AppointmentServiceTypeDropdownReducer

      const {
        isFetchAllHospitalDepartmentLoading,
        allHospitalDepartmentForDropdown,
        allDepartmentDropdownErrorMessage
      } = this.props.HospitalDepartmentDropdownReducer

      const {
        isFetchActiveRoomNumberByDepartmentLoading,
        activeRoomNumberForDropdownByDepartment,
        activeRoomsByDepartmentDropdownErrorMessage
      } = this.props.RoomNumberDropdownReducer

      return (
        <>
          <div id="reschedule-log">
            <ComposedComponent
              {...this.props}
              {...props}
              searchHandler={{
                handleSearchFormChange: this.handleSearchFormChange,
                handleEnter: this.handleEnterPress,
                resetSearch: this.handleSearchFormReset,
                searchRescheduleLog: this.searchRescheduleLog,
                hospitalList: hospitalsForDropdown,
                doctorList: activeDoctorsByHospitalForDropdown,
                doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                specializationList: activeSpecializationListByHospital,
                specializationDropdownErrorMessage: dropdownErrorMessage,
                searchParameters: searchParameters,
                patientListDropdown: patientList,
                patientDropdownErrorMessage: patientDropdownErrorMessage,
                isFetchAppointmentServiceTypeWithCodeLoading,
                activeAppointmentServiceTypeWithCodeForDropdown,
                dropdownWithCodeErrorMessage,
                isFetchAllHospitalDepartmentLoading,
                allHospitalDepartmentForDropdown,
                allDepartmentDropdownErrorMessage,
                isFetchActiveRoomNumberByDepartmentLoading,
                activeRoomNumberForDropdownByDepartment,
                activeRoomsByDepartmentDropdownErrorMessage
              }}
              rescheduleLogData={{
                rescheduleLogList,
                searchErrorMessage:
                  searchParameters.hospitalId &&
                  searchParameters.appointmentServiceTypeCode
                    ? rescheduleLogErrorMessage
                    : 'Select Client and Appointment Service type first.',
                isRescheduleLogLoading,
                searchAppointmentStatus: this.searchRescheduleLog,
                appointmentServiceTypeCode: primaryAppointmentService,
                downloadExcel: this.downloadExcel
              }}
              paginationProps={{
                queryParams: queryParams,
                totalRecords: totalRecords,
                handlePageChange: this.handlePageChange
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
                    <MdDone />
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
    RescheduleLogHOC,
    [
      'RescheduleLogReducer',
      'SpecializationDropdownReducer',
      'DoctorDropdownReducer',
      'HospitalDropdownReducer',
      'PatientDropdownListReducer',
      'AppointmentServiceTypeDropdownReducer',
      'HospitalDepartmentDropdownReducer',
      'RoomNumberDropdownReducer'
    ],
    {
      fetchActiveHospitalsForDropdown,
      fetchActiveDoctorsHospitalWiseForDropdown,
      fetchSpecializationHospitalWiseForDropdown,
      searchRescheduleLog,
      clearRescheduleLogMessage,
      fetchPatientMetaDropdown,
      fetchActiveAppointmentServiceTypeByHopitalId,
      fetchAllHospitalDepartmentForDropdownByHospitalId,
      fetchActiveRoomNumberForDropdownByDepartmentId
    }
  )
}

export default RescheduleLogHOC
