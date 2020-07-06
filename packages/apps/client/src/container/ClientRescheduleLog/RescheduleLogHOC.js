import React from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
  AppointmentDetailsMiddleware,
  DoctorMiddleware,
  HospitalSetupMiddleware,
  PatientDetailsMiddleware,
  SpecializationSetupMiddleware,
  AppointmentServiceTypeMiddleware,
  HospitalDepartmentSetupMiddleware
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
  DateTimeFormatterUtils,
  EnterKeyPressUtils,
  LocalStorageSecurity
} from '@frontend-appointment/helpers'
import {CAlert} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'

const {
  searchRescheduleLog,
  clearRescheduleLogMessage
} = AppointmentDetailsMiddleware
const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDoctorsForDropdown} = DoctorMiddleware
const {fetchSpecializationForDropdown} = SpecializationSetupMiddleware
const {fetchPatientMetaDropdownForClient} = PatientDetailsMiddleware
const {
    fetchActiveAppointmentServiceTypeWithCode
  } = AppointmentServiceTypeMiddleware
const {
  appointmentSetupApiConstant,
  hospitalSetupApiConstants,
  doctorSetupApiConstants,
  specializationSetupAPIConstants,
  patientSetupApiConstant
} = AdminModuleAPIConstants
const {
    // fetchActiveHospitalDepartmentForDropdownByHospitalId,
    fetchAllHospitalDepartmentForDropdown
  } = HospitalDepartmentSetupMiddleware
const {FETCH_HOSPITALS_FOR_DROPDOWN} = hospitalSetupApiConstants
const {FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN} = doctorSetupApiConstants
const {ACTIVE_DROPDOWN_SPECIALIZATION} = specializationSetupAPIConstants
const {SEARCH_APPOINTMENT_RESCHEDULE} = appointmentSetupApiConstant
const {ACTIVE_PATIENT_META_INFO_DETAILS} = patientSetupApiConstant

const {
  isFirstDateGreaterThanSecondDate,
  getDateWithTimeSetToGivenTime
} = DateTimeFormatterUtils

const RescheduleLogHOC = (ComposedComponent, props, type) => {
  class RescheduleLogHOC extends React.PureComponent {
    state = {
      searchParameters: {
        fromDate: new Date(),
        toDate: new Date(),
        doctorId: '',
        specializationId: '',
        patientMetaInfoId: '',
        appointmentNumber: '',
        esewaId: '',
        patientType: '',
        appointmentServiceTypeCode: '',
        hospitalDepartmentId:''
      },
      primaryAppointmentServiceType: '',
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

    fetchHospitalForDropDown = async () => {
      try {
        await this.props.fetchActiveHospitalsForDropdown(
          FETCH_HOSPITALS_FOR_DROPDOWN
        )
      } catch (e) {
        console.log(e)
      }
    }

    fetchDoctors = async () => {
      await this.props.fetchActiveDoctorsForDropdown(
        FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN
      )
    }

    fetchSpecializationByHospital = async () => {
      await this.props.fetchSpecializationForDropdown(
        ACTIVE_DROPDOWN_SPECIALIZATION
      )
    }

    fetchPatientMetaInfo = async () => {
      await this.props.fetchPatientMetaDropdownForClient(
        ACTIVE_PATIENT_META_INFO_DETAILS
      )
    }

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
      this.searchRescheduleLog()
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
          hospitalDepartmentId:''
        },
        primaryAppointmentServiceType: '',
        rescheduleLogList: []
      })
      this.props.clearRescheduleLogMessage()
      await this.setPrimaryAppointmentService()
      await this.searchRescheduleLog()
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
          } else {
            searchParams['doctorId'] = ''
            searchParams['specializationId'] = ''
          }
        await this.setStateValuesForSearch(searchParams)

        // if (fieldName === 'hospitalId') {
        //   if (value) {
        //     this.callApiForHospitalChange(value)
        //   }
        //   await this.setState({
        //     searchParameters: {
        //       ...this.state.searchParameters,
        //       doctorId: '',
        //       specializationId: '',
        //       patientMetaInfoId: ''
        //     }
        //   })
        // }

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

    clearAlertTimeout = () => {
      setTimeout(() => this.closeAlert(), 5000)
    }

    closeAlert = () => {
      this.setState({
        showAlert: false
      })
    }

    callApiForHospitalChange = () => {
      this.fetchDoctors()
      this.fetchSpecializationByHospital()
      this.fetchPatientMetaInfo()
      this.props.fetchAllHospitalDepartmentForDropdown(
        AdminModuleAPIConstants.hospitalDepartmentSetupApiConstants
          .FETCH_ALL_HOSPITAL_DEPARTMENT_FOR_DROPDOWN
      )
    }

    initialApiCalls = async () => {
      this.callApiForHospitalChange()
      await this.searchAppointmentServiceType()
      await this.setPrimaryAppointmentService()
      await this.searchRescheduleLog(1)
    }

    searchRescheduleLog = async page => {
      const {
        fromDate,
        toDate,
        doctorId,
        specializationId,
        appointmentNumber,
        esewaId,
        patientMetaInfoId,
        patientType,
        appointmentServiceTypeCode,
        hospitalDepartmentId
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
        specializationId: specializationId.value || '',
        doctorId: doctorId.value || '',
        appointmentNumber,
        esewaId,
        patientMetaInfoId: patientMetaInfoId.value || '',
        patientType: patientType.value || '',
        appointmentServiceTypeCode: appointmentServiceTypeCode.value || '',
        hospitalDepartmentId:hospitalDepartmentId.value||''
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
          },
          primaryAppointmentServiceType: appointmentServiceTypeCode
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
          mobileNumber: rescheduleData.mobileNumber || 'N/A',
          patientAge: rescheduleData.age || 'N/A',
          age:
            rescheduleData.age && rescheduleData.age.slice(0, 4),
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
        primaryAppointmentServiceType
      } = this.state

      const {
        activeDoctorsForDropdown,
        doctorDropdownErrorMessage
      } = this.props.DoctorDropdownReducer

      const {
        allActiveSpecializationList,
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
                doctorList: activeDoctorsForDropdown,
                doctorDropdownErrorMessage: doctorDropdownErrorMessage,
                specializationList: allActiveSpecializationList,
                specializationDropdownErrorMessage: dropdownErrorMessage,
                searchParameters: searchParameters,
                patientListDropdown: patientList,
                patientDropdownErrorMessage: patientDropdownErrorMessage,
                isFetchAppointmentServiceTypeWithCodeLoading,
                activeAppointmentServiceTypeWithCodeForDropdown,
                dropdownWithCodeErrorMessage,
                isFetchAllHospitalDepartmentLoading,
                allHospitalDepartmentForDropdown,
                allDepartmentDropdownErrorMessage
              }}
              rescheduleLogData={{
                rescheduleLogList,
                searchErrorMessage: rescheduleLogErrorMessage,
                isRescheduleLogLoading,
                searchAppointmentStatus: this.searchRescheduleLog,
                appointmentServiceTypeCode: primaryAppointmentServiceType
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
    RescheduleLogHOC,
    [
      'RescheduleLogReducer',
      'SpecializationDropdownReducer',
      'DoctorDropdownReducer',
      'HospitalDropdownReducer',
      'PatientDropdownListReducer',
      'AppointmentServiceTypeDropdownReducer',
      'HospitalDepartmentDropdownReducer'
    ],
    {
      fetchActiveHospitalsForDropdown,
      fetchActiveDoctorsForDropdown,
      fetchSpecializationForDropdown,
      searchRescheduleLog,
      clearRescheduleLogMessage,
      fetchPatientMetaDropdownForClient,
      fetchActiveAppointmentServiceTypeWithCode,
      fetchAllHospitalDepartmentForDropdown
    }
  )
}

export default RescheduleLogHOC
