import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AppointmentDetailsMiddleware,
  DoctorMiddleware,
  PatientDetailsMiddleware,
  SpecializationSetupMiddleware,
  AppointmentServiceTypeMiddleware,
  HospitalDepartmentSetupMiddleware,
  RoomSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  DateTimeFormatterUtils,
  EnterKeyPressUtils,
  CommonUtils,
  LocalStorageSecurity
  //EnvironmentVariableGetter
} from '@frontend-appointment/helpers'
import {MdDone} from 'react-icons/md'
import './appointment-log.scss'
import {CAlert} from '@frontend-appointment/ui-elements'

const {
  clearAppointmentRefundPending,
  fetchAppointmentLogList,
  appointmentExcelDownload
  //downloadExcelForHospitals
} = AppointmentDetailsMiddleware
const {
  fetchAllHospitalDepartmentForDropdown
} = HospitalDepartmentSetupMiddleware
const {fetchActiveDoctorsForDropdown} = DoctorMiddleware
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware
const {fetchPatientMetaDropdownForClient} = PatientDetailsMiddleware
const {
  fetchActiveAppointmentServiceTypeWithCode
} = AppointmentServiceTypeMiddleware
const {fetchActiveRoomNumberForDropdownByDepartmentId} = RoomSetupMiddleware
const AppointmentLogHOC = (ComposedComponent, props, type) => {
  const {
    appointmentSetupApiConstant,
    doctorSetupApiConstants,
    specializationSetupAPIConstants,
    patientSetupApiConstant
  } = AdminModuleAPIConstants

  class AppointmentLogDetails extends React.PureComponent {
    state = {
      searchParameters: {
        appointmentNumber: '',
        fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
        toDate: new Date(),
        patientMetaInfoId: '',
        doctorId: '',
        patientType: '',
        specializationId: '',
        appointmentCategory: '',
        status: {value: 'All', label: 'All'},
        transactionNumber: '',
        transactionFromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
        transactionToDate: new Date(),
        appointmentServiceTypeCode: '',
        hospitalDepartmentId: '',
        roomId: ''
      },
      primaryAppointmentService: '',
      queryParams: {
        page: 0,
        size: 10
      },
      totalRecords: 0,
      showModal: false,
      previewData: {},
      filteredData: [],
      activeStatus: 'All',
      alertMessageInfo: {
        variant: '',
        message: ''
      },
      showAlert: false
    }

    alertTimer = ''

    handleEnterPress = event => {
      EnterKeyPressUtils.handleEnter(event)
    }

    clearAlertTimeout = () => {
      this.alertTimer = setTimeout(() => this.closeAlert(), 5000)
    }

    closeAlert = () => {
      this.setState({
        showAlert: false
      })
    }

    showAlertMessage = (type, message) => {
      this.setState({
        showAlert: true,
        alertMessageInfo: {
          variant: type,
          message: message
        }
      })
      this.clearAlertTimeout()
    }

    searchAppointment = async page => {
      const {
        appointmentNumber,
        fromDate,
        toDate,
        patientMetaInfoId,
        patientType,
        specializationId,
        doctorId,
        appointmentCategory,
        status,
        appointmentServiceTypeCode,
        hospitalDepartmentId,
        roomId
      } = this.state.searchParameters
      let searchData = {
        appointmentNumber,
        fromDate,
        toDate,
        patientMetaInfoId: patientMetaInfoId.value || '',
        patientType: patientType.value || '',
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || '',
        appointmentCategory: appointmentCategory.value || '',
        status: status.value === 'All' ? '' : status.value,
        appointmentServiceTypeCode: appointmentServiceTypeCode.value || '',
        hospitalDepartmentId: hospitalDepartmentId.value || '',
        roomId: roomId.value || ''
      }
      let updatedPage =
        this.state.queryParams.page === 0
          ? 1
          : page
          ? page
          : this.state.queryParams.page
      await this.props.fetchAppointmentLogList(
        appointmentSetupApiConstant.APPOINTMENT_LOG_LIST,
        {
          page: updatedPage,
          size: this.state.queryParams.size
        },
        searchData
      )
      await this.setState({
        totalRecords: this.props.AppointmentLogListReducer.logList.length
          ? this.props.AppointmentLogListReducer.totalItems
          : 0,
        queryParams: {
          ...this.state.queryParams,
          page: updatedPage
        },
        filteredData: [...this.props.AppointmentLogListReducer.logList],
        primaryAppointmentService: appointmentServiceTypeCode
      })
    }

    appendSNToTable = logList => {
      let newLogList = []
      newLogList =
        logList.length &&
        logList.map((spec, index) => ({
          ...spec,
          // sN: index + 1,
          status: spec.status || 'N/A',
          hospitalName: spec.hospitalName || 'N/A',
          appointmentDate: spec.appointmentDate || 'N/A',
          appointmentNumber: spec.appointmentNumber || 'N/A',
          appointmentTime: spec.appointmentTime || 'N/A',
          esewaId: spec.esewaId || 'N/A',
          registrationNumber: spec.registrationNumber || 'N/A',
          patientName: spec.patientName || 'N/A',
          patientAddress: spec.patientAddress || 'N/A',
          gender: spec.patientGender.split('')[0] || 'N/A',
          patientGender: spec.patientGender,
          age: spec.age.slice(0, 4) || 'N/A',
          patientAge: spec.age.slice(0, 4),
          patientDob: spec.patientDob || 'N/A',
          isSelf: spec.isSelf || 'N/A',
          isRegistered: spec.isRegistered || 'N/A',
          mobileNumber: spec.mobileNumber || 'N/A',
          doctorName: spec.doctorName || 'N/A',
          specializationName: spec.specializationName || 'N/A',
          transactionNumber: spec.transactionNumber || 'N/A',
          appointmentAmount: spec.appointmentAmount || '0',
          revenueAmount: spec.revenueAmount || '0',
          refundAmount: spec.refundAmount || '0',
          transactionDate: spec.transactionDate || 'N/A'
        }))
      return newLogList
    }

    handlePageChange = async newPage => {
      await this.setState({
        queryParams: {
          ...this.state.queryParams,
          page: newPage
        }
      })
      this.searchAppointment()
    }

    handleSearchFormReset = async () => {
      await this.setState({
        searchParameters: {
          appointmentNumber: '',
          fromDate: DateTimeFormatterUtils.subtractDate(new Date(), 7),
          toDate: new Date(),
          patientMetaInfoId: '',
          patientType: '',
          specializationId: '',
          doctorId: '',
          appointmentCategory: '',
          status: {value: 'All', label: 'All'},
          appointmentServiceTypeCode: '',
          hospitalDepartmentId: '',
          roomId: ''
        },
        filteredData: [],
        activeStatus: 'All'
      })
      await this.setPrimaryAppointmentService()
      await this.searchAppointment()
    }

    setStateValuesForSearch = searchParams => {
      this.setState({
        searchParameters: searchParams
      })
    }

    previewCall = data => {
      this.setState({
        previewData: data,
        showModal: true
      })
    }

    handleStatusChange = (event, status) => {
      let filteredData = []
      if (this.props.AppointmentLogListReducer.logList.length) {
        if (status === 'All')
          filteredData = [...this.props.AppointmentLogListReducer.logList]
        else
          filteredData = CommonUtils.filterTableDataWithGivenStatus(
            status,
            this.props.AppointmentLogListReducer.logList
          )
      }

      this.setState({
        activeStatus: status,
        filteredData: [...filteredData]
      })
      return false
    }

    handleHospitalChangeReset = async () => {
      await this.setState({
        searchParameters: {
          ...this.state.searchParameters,
          patientMetaInfoId: '',
          patientType: '',
          specializationId: '',
          doctorId: '',
          appointmentCategory: ''
        }
      })
    }

    callApiForHospitalChange = async () => {
      this.props.fetchActiveDoctorsForDropdown(
        doctorSetupApiConstants.FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
      )
      this.props.fetchSpecializationForDropdown(
        specializationSetupAPIConstants.ACTIVE_DROPDOWN_SPECIALIZATION
      )
      this.props.fetchPatientMetaDropdownForClient(
        patientSetupApiConstant.ACTIVE_PATIENT_META_INFO_DETAILS
      )
      this.props.fetchAllHospitalDepartmentForDropdown(
        AdminModuleAPIConstants.hospitalDepartmentSetupApiConstants
          .FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN
      )
    }

    fetchRoomByDepartmentId = async departmentId => {
      await this.props.fetchActiveRoomNumberForDropdownByDepartmentId(
        AdminModuleAPIConstants.roomSetupApiConstants
          .FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_FOR_DROPDOWN,
        departmentId
      )
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

        let newSearchParams = {...this.state.searchParameters}

        newSearchParams[fieldName] = label
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
            newSearchParams['hospitalDepartmentId'] = ''
            newSearchParams['roomId'] = ''
          } else {
            newSearchParams['doctorId'] = ''
            newSearchParams['specializationId'] = ''
          }
        if (fieldName === 'hospitalDepartmentId')
          await this.fetchRoomByDepartmentId(value)
        await this.setStateValuesForSearch(newSearchParams)
      }
    }

    setShowModal = () => {
      this.setState(prevState => ({
        showModal: !prevState.showModal
      }))
    }

    searchAppointmentServiceType = async () => {
      await this.props.fetchActiveAppointmentServiceTypeWithCode(
        AdminModuleAPIConstants.hospitalSetupApiConstants
          .HOSPITAL_API_SERVICE_TYPE
      )
    }

    setPrimaryAppointmentService = async () => {
      const adminInfo = LocalStorageSecurity.localStorageDecoder('adminInfo')
      if (adminInfo) {
        const allAppointmentServices = adminInfo.hospitalAppointmentServiceType
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
        }
      }
    }

    async componentDidMount () {
      this.callApiForHospitalChange()
      await this.searchAppointmentServiceType()
      await this.setPrimaryAppointmentService()
      await this.searchAppointment()
    }

    downloadExcel = async () => {
      const {
        appointmentNumber,
        fromDate,
        toDate,
        // hospitalId,
        patientMetaInfoId,
        patientType,
        specializationId,
        doctorId,
        appointmentCategory,
        status,
        appointmentServiceTypeCode,
        hospitalDepartmentId,
        roomId
      } = this.state.searchParameters
      let searchData = {
        appointmentNumber,
        fromDate,
        toDate,
        // hospitalId: hospitalId.value || '',
        patientMetaInfoId: patientMetaInfoId.value || '',
        patientType: patientType.value || '',
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || '',
        appointmentCategory: appointmentCategory.value || '',
        status: status.value === 'All' ? '' : status.value || '',
        appointmentServiceTypeCode: appointmentServiceTypeCode.value || '',
        hospitalDepartmentId: hospitalDepartmentId.value || '',
        roomId:roomId.value||''
      }

      try {
        await appointmentExcelDownload(
          AdminModuleAPIConstants.excelApiConstants.APPOINTMENT_LOG_EXCEL,
          this.state.queryParams,
          searchData,
          `appointmentLog-${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            fromDate
          )}-${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            toDate
          )}`
        )
        this.showAlertMessage(
          'success',
          `appointmentLog-${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            fromDate
          )}-${DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
            toDate
          )} downloaded successfully!!`
        )
        return false
      } catch (e) {
        // console.log(e);
        this.showAlertMessage(
          'danger',
          e.errorMessage || 'Sorry,Internal Server Error occurred!'
        )
        return false
      }
    }

    render () {
      const {
        searchParameters,
        queryParams,
        totalRecords,
        showModal,
        previewData,
        filteredData,
        activeStatus,
        primaryAppointmentService,
        showAlert,
        alertMessageInfo
      } = this.state

      const {
        isLogListLoading,
        //logList,
        logErrorMessage,
        appointmentStatistics
      } = this.props.AppointmentLogListReducer

      const {
        activeDoctorsForDropdown,
        doctorDropdownErrorMessage
      } = this.props.DoctorDropdownReducer

      const {
        allActiveSpecializationList,
        dropdownErrorMessage
      } = this.props.SpecializationDropdownReducer

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
        patientList,
        patientDropdownErrorMessage
      } = this.props.PatientDropdownListReducer
      const {
        isFetchActiveRoomNumberByDepartmentLoading,
        activeRoomNumberForDropdownByDepartment,
        activeRoomsByDepartmentDropdownErrorMessage
      } = this.props.RoomNumberDropdownReducer
      return (
        <div id="appointment-log">
          <ComposedComponent
            {...this.props}
            {...props}
            searchHandler={{
              handleEnter: this.handleEnterPress,
              handleSearchFormChange: this.handleSearchFormChange,
              resetSearch: this.handleSearchFormReset,
              searchAppointment: this.searchAppointment,
              doctorsDropdown: activeDoctorsForDropdown,
              doctorDropdownErrorMessage: doctorDropdownErrorMessage,
              activeSpecializationList: allActiveSpecializationList,
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
            paginationProps={{
              queryParams: queryParams,
              totalRecords: totalRecords,
              handlePageChange: this.handlePageChange
            }}
            tableHandler={{
              isSearchLoading: isLogListLoading,
              appointmentLogList: this.appendSNToTable(filteredData),
              searchErrorMessage: logErrorMessage,
              setShowModal: this.setShowModal,
              showModal: showModal,
              previewCall: this.previewCall,
              previewData: previewData,
              appointmentServiceTypeCode: primaryAppointmentService,
              downloadExcel: this.downloadExcel
            }}
            activeStatus={activeStatus}
            handleStatusChange={this.handleStatusChange}
            appointmentStatistics={appointmentStatistics}
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
      )
    }
  }

  return ConnectHoc(
    AppointmentLogDetails,
    [
      'AppointmentLogListReducer',
      'SpecializationDropdownReducer',
      'DoctorDropdownReducer',
      'PatientDropdownListReducer',
      'AppointmentServiceTypeDropdownReducer',
      'HospitalDepartmentDropdownReducer',
      'RoomNumberDropdownReducer'
    ],
    {
      clearAppointmentRefundPending,
      fetchAppointmentLogList,
      fetchActiveDoctorsForDropdown,
      fetchSpecializationForDropdown,
      fetchPatientMetaDropdownForClient,
      fetchActiveAppointmentServiceTypeWithCode,
      fetchAllHospitalDepartmentForDropdown,
      fetchActiveRoomNumberForDropdownByDepartmentId
    }
  )
}
export default AppointmentLogHOC
